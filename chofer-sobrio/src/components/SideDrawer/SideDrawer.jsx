import React from 'react';
import firebase from '../config/config';
import './SideDrawer.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { CardBody, Card, CardTitle } from 'reactstrap';

class SideDrawer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isAdmin: false,
        };
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            // admins
            this.dbRefAdmins = firebase.database().ref('/admin');
            this.dbCallbackAdmins = this.dbRefAdmins.on('value', (snap) => {
                const admins = snap.val();
                admins.forEach(admin => this.setState({ isAdmin: admin.correo === user.email }));
            });
        }
    }

    componentWillUnmount() {
        this.dbRefAdmins.off('value', this.dbCallbackAdmins);
    }

    render() {
        const props = this.props;
        const { isAdmin } = this.state;

        let drawerClasses = 'side-drawer';
        if (props.show) {
            drawerClasses = 'side-drawer open';
        }

        const user = JSON.parse(localStorage.getItem('user'));
        let mensaje, imagen, usuario;
        if (user) {
            mensaje = 'Cerrar sesion';
            imagen = user.photoURL;
            usuario = user.displayName;
        } else {
            mensaje = 'Iniciar sesion';
            imagen = '/blank.png';
            usuario = '';
        }

        return (
            <nav className={drawerClasses}>
                <Card>
                    <img className="rounded-circle mx-auto d-block" width="70%" src={imagen} alt="Foto de perfil" />
                    <CardBody>
                        <CardTitle className="text-center">{usuario}</CardTitle>
                    </CardBody>
                </Card>
                <ul>
                    {isAdmin ? (
                        <React.Fragment>
                            <Link to="/CrearGerente">
                                <Button onClick={props.hide}> Crear Gerente</Button>
                            </Link>
                            <Link to="/CrearChofer">
                                <Button onClick={props.hide}> Crear Chofer</Button>
                            </Link>
                        </React.Fragment>
                    ) : null}
                    <Link to="/iniciarSesion">
                        <Button>{mensaje}</Button>
                    </Link>
                    <Link to="/">
                        <Button onClick={props.hide} > Home</Button>
                    </Link>
                    <Link to="/precios">
                        <Button onClick={props.hide}> Precios</Button>
                    </Link>
                    <Link to="/seguridad">
                        <Button onClick={props.hide}> Seguridad</Button>
                    </Link>
                    <Link to="/pedidos">
                        <Button onClick={props.hide}> Pedidos</Button>
                    </Link>
                </ul>
            </nav>
        );
    }
};

export default SideDrawer;
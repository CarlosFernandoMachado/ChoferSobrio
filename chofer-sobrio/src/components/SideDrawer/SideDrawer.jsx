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
            isGerente: false,
            isChofer: false,
        };
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            // gerentes
            this.dbRefGerentes = firebase.database().ref('/gerente');
            this.dbCallbackGerentes = this.dbRefGerentes.on('value', (snap) => {
                const gerentes = snap.val();
                let isGerente = false;
                gerentes.forEach(gerente => {
                    isGerente = isGerente || gerente.correo === user.email;
                });
                this.setState({ isGerente });
            });

            // choferes
            this.dbRefChoferes = firebase.database().ref('/chofer');
            this.dbCallbackChoferes = this.dbRefChoferes.on('value', (snap) => {
                const choferes = snap.val();
                let isChofer = false;
                choferes.forEach(chofer => {
                    isChofer = isChofer || chofer.correo === user.email;
                });
                this.setState({ isChofer });
            });
        }
    }

    componentWillUnmount() {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            this.dbRefGerentes.off('value', this.dbCallbackGerentes);
            this.dbRefChoferes.off('value', this.dbCallbackChoferes);
        }
    }

    render() {
        const props = this.props;
        const { isGerente, isChofer } = this.state;

        let drawerClasses = 'side-drawer';
        if (props.show) {
            drawerClasses = 'side-drawer open';
        }

        const user = JSON.parse(localStorage.getItem('user'));
        let mensaje, imagen, usuario;
        if (user) {
            mensaje = 'Cerrar sesion';
            imagen = user.photoURL || '/blank.png';
            usuario = user.displayName;
        } else {
            mensaje = 'Iniciar sesion';
            imagen = '/blank.png';
            usuario = '';
        }

        const menu = [];
        let key = 0;
        if (isGerente) {
            menu.push((
                <Link key={key++} to="/CrearGerente">
                    <Button onClick={props.hide}>Crear Gerente</Button>
                </Link>
            ), (
                <Link key={key++} to="/CrearChofer">
                    <Button onClick={props.hide}>Crear Chofer</Button>
                </Link>
            ));
        }

        if (isChofer || isGerente) {
            menu.push(
                <Link key={key++} to="/reservaciones">
                    <Button onClick={props.hide}>Reservaciones</Button>
                </Link>
            );
        }

        if (isGerente) {
            menu.push(
                <Link key={key++} to="/MostrarChofer">
                    <Button onClick={props.hide}>Mostrar Chofer</Button>
                </Link>
            );
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
                    <Link to="/iniciarSesion">
                        <Button onClick={props.hide}>{mensaje}</Button>
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
                    {menu}
                </ul>
            </nav>
        );
    }
};

export default SideDrawer;
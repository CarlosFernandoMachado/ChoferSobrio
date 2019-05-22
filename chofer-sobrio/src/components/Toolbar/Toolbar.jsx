import React from 'react';
import firebase from '../config/config';
import './Toolbar.css';
import DrawerToggleButton from '../DrawerToggleButton/DrawerToggleButton';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

class Toolbar extends React.Component {
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

        let mensaje;
        if (localStorage.getItem('user')) {
            mensaje = 'Cerrar sesion';
        } else {
            mensaje = 'Iniciar sesion';
        }
    
        return (
            <header className="toolbar">
                <nav className="toolbar__navigation">
                    <div className="toolbar__toggle-button" >
                        <DrawerToggleButton click={props.drawerClickHandler} />
                    </div>
                    <div className="toolbar__logo"> <Link to="/">The Logo</Link> </div>
                    <div className="spacer" />
                    <div className="toolbar_navigation-items">
                        <ul>
                            <Link to="/">
                                <Button bsStyle="primary"> Home</Button>
                            </Link>
                            <Link to="/precios">
                                <Button bsStyle="primary" > Precios</Button>
                            </Link>
                            <Link to="/seguridad">
                                <Button bsStyle="primary"> Seguridad</Button>
                            </Link>

                            {isAdmin ? (
                                <React.Fragment>
                                    <Link to="/CrearGerente">
                                        <Button bsStyle="primary"> Crear Gerente</Button>
                                    </Link>
                                    <Link to="/CrearChofer">
                                        <Button bsStyle="primary"> Crear Chofer</Button>
                                    </Link>
                                    <Link to="/CrearCliente">
                                        <Button bsStyle="primary"> Crear Cliente</Button>
                                    </Link>
                                </React.Fragment>
                            ) : null}

                            <Link to="/pedidos">
                                <Button bsStyle="primary"> Pedidos</Button>
                            </Link>
                            <Link to="/iniciarSesion">
                                <Button bsStyle="primary">{mensaje}</Button>
                            </Link>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }

}

export default Toolbar;
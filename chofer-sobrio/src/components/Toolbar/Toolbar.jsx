import React from 'react';
import firebase from '../config/config';
import './Toolbar.css';
import DrawerToggleButton from '../DrawerToggleButton/DrawerToggleButton';
import { Link } from 'react-router-dom';
import { Button, Dropdown } from 'react-bootstrap';

class Toolbar extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;

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
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.dbRefAdmins.off('value', this.dbCallbackAdmins);
        }
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
                        <Dropdown>
                            <Dropdown.Toggle vari="dropdown-basic">
                                Opciones
                            </Dropdown.Toggle>
        
                            <Dropdown.Menu>
                                <Dropdown.Item><Link to="/"><Button >Home</Button> </Link></Dropdown.Item>
                                <Dropdown.Item><Link to="/precios"><Button>Precios</Button></Link></Dropdown.Item>
                                <Dropdown.Item><Link to="/seguridad"><Button>Seguridad </Button></Link></Dropdown.Item>
                                <Dropdown.Item><Link to="/crear"><Button>Crear</Button></Link></Dropdown.Item>

                                {/* Menus de admin */}
                                {isAdmin ? (
                                    <React.Fragment>
                                        <Dropdown.Item>
                                            <Link to="/CrearGerente">
                                                <Button bsStyle="primary"> Crear Gerente</Button>
                                            </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <Link to="/CrearChofer">
                                                <Button bsStyle="primary"> Crear Chofer</Button>
                                            </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <Link to="/CrearCliente">
                                                <Button bsStyle="primary"> Crear Cliente</Button>
                                            </Link>
                                        </Dropdown.Item>
                                    </React.Fragment>
                                ) : null}

                                <Dropdown.Item><Link to="/pedidos"><Button>Pedidos </Button></Link></Dropdown.Item>
                                <Dropdown.Item><Link to="/iniciarSesion"><Button>Iniciar Sesión </Button></Link></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </nav>
            </header>
        );
    }
};

export default Toolbar;

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
                console.log(choferes)
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

        let mensaje;
        if (localStorage.getItem('user')) {
            mensaje = 'Cerrar sesion';
        } else {
            mensaje = 'Iniciar sesion';
        }

        let menuProtegidos = [];
        if (isGerente) {
            menuProtegidos.push((
                <Dropdown.Item>
                    <Link to="/CrearGerente">
                        <Button bsStyle="primary"> Crear Gerente</Button>
                    </Link>
                </Dropdown.Item>
            ), (
                <Dropdown.Item>
                    <Link to="/CrearChofer">
                        <Button bsStyle="primary"> Crear Chofer</Button>
                    </Link>
                </Dropdown.Item>
            ), (
                <Dropdown.Item>
                    <Link to="/CrearCliente">
                        <Button bsStyle="primary"> Crear Cliente</Button>
                    </Link>
                </Dropdown.Item>
            ));
        }

        if (isChofer || isGerente) {
            menuProtegidos.push(
                <Dropdown.Item>
                    <Link to="/pedidos">
                        <Button>Pedidos </Button>
                    </Link>
                </Dropdown.Item>
            );
        }

        return (
            <header className="toolbar">
                <nav className="toolbar__navigation">
                    <div className="toolbar__toggle-button" >
                        <DrawerToggleButton click={props.drawerClickHandler} />
                    </div>
                    <div className="toolbar__logo"> <Link to="/">Chofer Sobrio</Link> </div>
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

                                {/* Menus de gerente */}
                                {menuProtegidos}

                                <Dropdown.Item><Link to="/iniciarSesion"><Button>{mensaje}</Button></Link></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </nav>
            </header>
        );
    }
};

export default Toolbar;

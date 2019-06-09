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
            isCliente: false,
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
                Object.keys(gerentes).forEach(key => {
                    isGerente = isGerente || gerentes[key].correo === user.email;
                });
                this.setState({ isGerente });
            });

            // choferes
            this.dbRefChoferes = firebase.database().ref('/chofer');
            this.dbCallbackChoferes = this.dbRefChoferes.on('value', (snap) => {
                const choferes = snap.val();
                let isChofer = false;
                Object.keys(choferes).forEach(key => {
                    isChofer = isChofer || choferes[key].correo === user.email;
                });
                this.setState({ isChofer });
            });

            // clientes
            this.dbRefClientes = firebase.database().ref('/cliente');
            this.dbCallbackClientes = this.dbRefClientes.on('value', (snap) => {
                const clientes = snap.val();
                let isCliente = false;
                Object.keys(clientes).forEach(key => {
                    isCliente = isCliente || clientes[key].correo === user.email;
                });
                this.setState({ isCliente });
            });
        }
    }

    componentWillUnmount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.dbRefGerentes.off('value', this.dbCallbackGerentes);
            this.dbRefChoferes.off('value', this.dbCallbackChoferes);
            this.dbRefClientes.off('value', this.dbCallbackClientes);
        }
    }

    render() {
        const props = this.props;
        const { isGerente, isChofer, isCliente } = this.state;

        let mensaje;
        if (localStorage.getItem('user')) {
            mensaje = 'Cerrar sesion';
        } else {
            mensaje = 'Iniciar sesion';
        }

        let key = 0;
        const menu = [];
        if (isGerente) {
            menu.push((
                <Dropdown.Item key={key++}>
                    <Link to="/CrearGerente">
                        <Button> Crear Gerente</Button>
                    </Link>
                </Dropdown.Item>
            ), (
                <Dropdown.Item key={key++}>
                    <Link to="/CrearChofer">
                        <Button> Crear Chofer</Button>
                    </Link>
                </Dropdown.Item>
            ));
        }

        if (isChofer || isGerente) {
            menu.push(
                <Dropdown.Item key={key++}>
                    <Link to="/reservaciones">
                        <Button>Reservaciones </Button>
                    </Link>
                </Dropdown.Item>,
                  <Dropdown.Item key={key++}>
                  <Link to="/miperfil">
                      <Button>Mi Perfil </Button>
                  </Link>
              </Dropdown.Item>,
            );
        }

        if (isGerente) {
            menu.push(
                <Dropdown.Item key={key++}>
                    <Link to="/MostrarChofer">
                        <Button>Mostrar Chofer</Button>
                    </Link>
                </Dropdown.Item>,
            );
        }

        if (isGerente) {
            menu.push(
                <Dropdown.Item key={key++}>
                    <Link to="/MostrarCliente">
                        <Button>Mostrar Cliente</Button>
                    </Link>
                </Dropdown.Item>,
            );
        }

        if (isGerente) {
            menu.push(
                <Dropdown.Item key={key++}>
                    <Link to="/MostrarGerente">
                        <Button>Mostrar Gerente</Button>
                    </Link>
                </Dropdown.Item>,
            );
        }

        if (isGerente) {
            menu.push(
                <Dropdown.Item key={key++}>
                    <Link to="/EliminarCuenta">
                        <Button>Eliminar Cuenta</Button>
                    </Link>
                </Dropdown.Item>,
            );
            menu.push(
                <Dropdown.Item key={key++}>
                    <Link to="/ModificarGerente">
                        <Button>modificar Cuenta Gerente</Button>
                    </Link>
                </Dropdown.Item>,
            );
        }

        if (isChofer) {
            menu.push(
                <Dropdown.Item key={key++}>
                    <Link to="/EliminarCuentaChofer">
                        <Button>Eliminar Cuenta</Button>
                    </Link>
                </Dropdown.Item>,
            );
            menu.push(
                <Dropdown.Item key={key++}>
                    <Link to="/ModificarChofer">
                        <Button>modificar Cuenta Chofer</Button>
                    </Link>
                </Dropdown.Item>,
            );
        }

        if (isCliente) {
            menu.push(
                <Dropdown.Item key={key++}>
                    <Link to="/EliminarCuentaClientes">
                        <Button>Eliminar Cuenta</Button>
                    </Link>
                </Dropdown.Item>,
            );
            menu.push(
                <Dropdown.Item key={key++}>
                    <Link to="/ModificarCliente">
                        <Button>modificar Cuenta Cliente</Button>
                    </Link>
                </Dropdown.Item>,
            );
        }

        let dropdown;
        if (menu.length > 0) {
            dropdown = (
                <Dropdown >
                    <Dropdown.Toggle variant="dropdown-basic">
                        Opciones
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown_menu">
                        {menu}
                    </Dropdown.Menu>
                </Dropdown>
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
                    <div className="toolbar_navigation-items navbar">

                        <Link to="/">
                            <Button className="navbar-item"> Home</Button>
                        </Link>

                        <Link to="/precios">
                            <Button className="navbar-item"> Precios</Button>
                        </Link>
                        <Link to="/seguridad">
                            <Button className="navbar-item"> Seguridad</Button>
                        </Link>
                        <Link to="/iniciarsesion">
                            <Button className="navbar-item"> {mensaje}</Button>
                        </Link>


                        {dropdown}

                    </div>
                </nav>
            </header>
        );
    }
};

export default Toolbar;

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
            this.setState({ user });

            // gerentes
            this.dbRefGerentes = firebase.database().ref('/gerente');
            this.dbCallbackGerentes = this.dbRefGerentes.on('value', (snap) => {
                const gerentes = snap.val();
                let isGerente = false;
                var flag = 0

                Object.keys(gerentes).forEach(key => {
                    if (isGerente = isGerente || (gerentes[key].correo === user.email && gerentes[key].estado === "activo")) {
                        this.setState({ isGerente });
                    } else if ((gerentes[key].correo === user.email && gerentes[key].estado === "inactivo")) {

                        
                    }

                    ;
                });







            });
            // choferes
            this.dbRefChoferes = firebase.database().ref('/chofer');
            this.dbCallbackChoferes = this.dbRefChoferes.on('value', (snap) => {
                const choferes = snap.val();
                let isChofer = false;
                Object.keys(choferes).forEach(key => {
                    if (isChofer = isChofer || (choferes[key].correo === user.email && choferes[key].estado === "activo")) {
                        this.setState({ isChofer });
                    } else if ((choferes[key].correo === user.email && choferes[key].estado === "inactivo")) {
                      
                    };

                });



            });

            // clientes
            this.dbRefClientes = firebase.database().ref('/cliente');
            this.dbCallbackClientes = this.dbRefClientes.on('value', (snap) => {
                const clientes = snap.val();
                let isCliente = false;
                Object.keys(clientes).forEach(key => {
                    if (isCliente = isCliente || (clientes[key].correo === user.email && clientes[key].estado === "activo")) {
                        this.setState({ isCliente });
                    } else if ((clientes[key].correo === user.email && clientes[key].estado === "inactivo")) {
                       
                    };
                });



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

        if (isChofer || isGerente) {
            menu.push(
                <Dropdown.Item key={key++}>
                    <Link to="/reservaciones">
                        <Button>Reservaciones </Button>
                    </Link>
                </Dropdown.Item>
            );
        }

        if (isGerente) {
            menu.push(
                <Dropdown.Item key={key++}>
                    <Link to="/Historial">
                        <Button>Historial de Reservaciones</Button>
                    </Link>
                </Dropdown.Item>,
                <Dropdown.Item key={key++}>
                    <Link to="/CrearChofer">
                        <Button> Crear Chofer</Button>
                    </Link>
                </Dropdown.Item>,
                <Dropdown.Item key={key++}>
                    <Link to="/CrearGerente">
                        <Button> Crear Gerente</Button>
                    </Link>
                </Dropdown.Item>,
                <Dropdown.Item key={key++}>
                    <Link to="/MostrarCliente">
                        <Button>Mostrar Cliente</Button>
                    </Link>
                </Dropdown.Item>,
                <Dropdown.Item key={key++}>
                    <Link to="/MostrarChofer">
                        <Button>Mostrar Chofer</Button>
                    </Link>
                </Dropdown.Item>,
                <Dropdown.Item key={key++}>
                    <Link to="/MostrarGerente">
                        <Button>Mostrar Gerente</Button>
                    </Link>
                </Dropdown.Item>,
                <Dropdown.Item key={key++}>
                    <Link to="/listarfeedback">
                        <Button>Feedback Recibido</Button>
                    </Link>
                </Dropdown.Item>,
                <Dropdown.Item key={key++}>
                    <Link to="/ModificarGerente">
                        <Button>Modificar mi cuenta</Button>
                    </Link>
                </Dropdown.Item>,
                <Dropdown.Item key={key++}>
                    <Link to="/EliminarCuentaGerente">
                        <Button>Eliminar mi cuenta</Button>
                    </Link>
                </Dropdown.Item>,
            );
        } else {

        }

        if (isChofer) {
            menu.push(
                <Dropdown.Item key={key++}>
                    <Link to="/miperfil">
                        <Button>Mis Reservaciones</Button>
                    </Link>
                </Dropdown.Item>,
                <Dropdown.Item key={key++}>
                    <Link to="/ModificarChofer">
                        <Button>Modificar mi cuenta</Button>
                    </Link>
                </Dropdown.Item>,
                <Dropdown.Item key={key++}>
                    <Link to="/EliminarCuentaChofer">
                        <Button>Eliminar mi cuenta</Button>
                    </Link>
                </Dropdown.Item>,
            );
        }

        if (isCliente) {
            menu.push(
                <Dropdown.Item key={key++}>
                    <Link to="/EliminarCuentaCliente">
                        <Button>Eliminar mi cuenta</Button>
                    </Link>
                </Dropdown.Item>,
            );
            menu.push(
                <Dropdown.Item key={key++}>
                    <Link to="/ModificarCliente">
                        <Button>Modificar mi cuenta</Button>
                    </Link>
                </Dropdown.Item>,
            );
            menu.push(
                <Dropdown.Item key={key++}>
                    <Link to="/MisReservaciones">
                        <Button>Mis Reservaciones</Button>
                    </Link>
                </Dropdown.Item>,
            );
            menu.push(
                <Dropdown.Item key={key++}>
                    <Link to="/MostrarCarros">
                        <Button>Mis Carros</Button>
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
                    <Dropdown.Menu className="dropdown_menu scrollable-menu">
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

                        <Link to="/NuestraInfo">
                            <Button className="navbar-item"> Nuestra Info</Button>
                        </Link>
                        <Link to="/activarcuentas">
                            <Button className="navbar-item"> Activar Cuentas</Button>
                        </Link>
                        <Link to="/feedback">
                            <Button className="navbar-item"> Tu opinion </Button>
                        </Link>
                        <Link to="/PreguntasFrecuentes">
                            <Button className="navbar-item"> Preguntas Frecuentes </Button>
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

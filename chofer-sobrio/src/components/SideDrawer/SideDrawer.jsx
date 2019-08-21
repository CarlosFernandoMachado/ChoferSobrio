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

        if (isChofer || isGerente) {
            menu.push(
                <Link key={key++} to="/reservaciones">
                    <Button onClick={props.hide}>Reservaciones</Button>
                </Link>
            );
        }

        if (isGerente) {
            menu.push(
                <Link key={key++} to="/Historial">
                    <Button onClick={props.hide}>Historial de reservaciones</Button>
                </Link>,
                <Link key={key++} to="/GestionPreguntas">
                    <Button onClick={props.hide}>Gestion de preguntas frecuentes</Button>
                </Link>,
                <Link key={key++} to="/CrearChofer">
                    <Button onClick={props.hide}>Crear Chofer</Button>
                </Link>,
                <Link key={key++} to="/CrearGerente">
                    <Button onClick={props.hide}>Crear Gerente</Button>
                </Link>,
                <Link key={key++} to="/MostrarCliente">
                    <Button onClick={props.hide}>Listar Clientes</Button>
                </Link>,
                <Link key={key++} to="/MostrarChofer">
                    <Button onClick={props.hide}>Listar Choferes</Button>
                </Link>,
                <Link key={key++} to="/MostrarGerente">
                    <Button onClick={props.hide}>Listar Gerentes</Button>
                </Link>,
                <Link key={key++} to="/ModificarGerente">
                    <Button onClick={props.hide}>Modificar mi cuenta</Button>
                </Link>,
                <Link to="/listarfeedback">
                    <Button>Feedback Recibido</Button>
                </Link>,
                <Link to="/MostrarGerentesInactivos">
                    <Button>Mostrar Gerentes Inactivos</Button>
                </Link>,
                <Link to="/MostrarChoferesInactivos">
                    <Button>Mostrar Choferes Inactivos</Button>
                </Link>,
                <Link key={key++} to="/EliminarCuentaGerente">
                    <Button onClick={props.hide}>Desactivar mi cuenta</Button>
                </Link>,
               
                <Link to="/EliminarCuentaTotal_Gerente">
                    <Button>Eliminar mi cuenta Gerente</Button>
                </Link>
            );
        }

        if (isChofer) {
            menu.push(
                <Link to="/subirfoto">
                    <Button>Subir foto</Button>
                </Link>,
                <Link key={key++} to="/miperfil">
                    <Button onClick={props.hide}>Mis Reservaciones</Button>
                </Link>,

                <Link key={key++} to="/ModificarChofer">
                    <Button onClick={props.hide}>Modificar mi cuenta</Button>
                </Link>,
                <Link key={key++} to="/EliminarCuentaChofer">
                    <Button onClick={props.hide}>Desactivar mi cuenta Chofer</Button>
                </Link>,
                <Link to="/EliminarCuentaTotal_Chofer">
                    <Button>Eliminar mi cuenta chofer</Button>
                </Link>
            );
        }

        if (!isChofer && !isGerente) {
            menu.push(
                <Link to="/PedirChofer">
                    <Button onClick={props.hide}> Pedir Chofer</Button>
                </Link>
            );
        }

        if (isCliente) {
            menu.push(
                <Link key={key++} to="/Perfil_Chofer">
                    <Button onClick={props.hide}>Ver perfil del Chofer</Button>
                </Link>,
                <Link key={key++} to="/MisReservaciones">
                    <Button onClick={props.hide}>Mis Reservaciones</Button>
                </Link>,
                <Link to="/historial_pedidos_cliente">
                    <Button>Historial de reservaciones</Button>
                </Link>,

                <Link key={key++} to="/ModificarCliente">
                    <Button onClick={props.hide}>Modificar mi cuenta</Button>
                </Link>,
                <Link key={key++} to="/EliminarCuentaCliente">
                    <Button onClick={props.hide}>Desactivar mi cuenta cliente</Button>
                </Link>,
                <Link key={key++} to="/MostrarCarros">
                    <Button onClick={props.hide}>Mis Carros</Button>
                </Link>,
                <Link to="/EliminarCuentaTotal_Cliente">
                    <Button>Eliminar Mi Cuenta cliente</Button>
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
                    <Link to="/PreguntasFrecuentes">
                        <Button onClick={props.hide}> Preguntas Frecuentes</Button>
                    </Link>
                    {menu}
                </ul>
            </nav>
        );
    }
};

export default SideDrawer;

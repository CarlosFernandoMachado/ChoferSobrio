import React from 'react';
import './SideDrawer.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { CardImg, CardBody, Card, CardTitle, CardSubtitle, CardText } from 'reactstrap';

const sideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if(props.show){
        drawerClasses ='side-drawer open';
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
                <Link to="/">
                    <Button bsStyle="primary" onClick={props.hide} > Home</Button>
                </Link>
                <Link to="/precios">
                    <Button bsStyle="primary" onClick={props.hide}> Precios</Button>
                </Link>
                <Link to="/seguridad">
                    <Button bsStyle="primary" onClick={props.hide}> Seguridad</Button>
                </Link>
                <Link to="/CrearGerente">
                    <Button bsStyle="primary" onClick={props.hide}> Crear Gerente</Button>
                </Link>
                <Link to="/pedidos">
                    <Button bsStyle="primary" onClick={props.hide}> Pedidos</Button>
                </Link>
                <Link to="/iniciarSesion">
                    <Button bsStyle="primary">{mensaje}</Button>
                </Link>
            </ul>
        </nav>
    );
};

export default sideDrawer;
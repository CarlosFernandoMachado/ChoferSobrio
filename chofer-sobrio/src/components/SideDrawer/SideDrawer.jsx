import React from 'react';
import './SideDrawer.css';
import { Link } from 'react-router-dom';
import { Button,CardImg, Card } from 'react-bootstrap';

const sideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if(props.show){
        drawerClasses ='side-drawer open';
    }

    const user = JSON.parse(localStorage.getItem('user'));
    let mensaje;
    if (user) {
        mensaje = 'Cerrar sesion';
    } else {
        mensaje = 'Iniciar sesion';
    }

    return (
        <nav className={drawerClasses}>
            <ul>
                {user ? <img top width="60%" src={user.photoURL} alt="Foto de perfil" /> : null}
                {user ? user.displayName : null}
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
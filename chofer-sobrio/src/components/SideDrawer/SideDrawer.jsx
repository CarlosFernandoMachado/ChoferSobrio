import React from 'react';
import './SideDrawer.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const sideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if(props.show){
        drawerClasses ='side-drawer open';
    }
    return (
        <nav className={drawerClasses}>
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
            </ul>
        </nav>
    );
};

export default sideDrawer;
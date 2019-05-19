import React from 'react';
import './Toolbar.css';
import DrawerToggleButton from '../DrawerToggleButton/DrawerToggleButton';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar__navigation">
            <div className="toolbar__toggle-button" >
                <DrawerToggleButton click={props.drawerClickHandler} />
            </div>
            <div className="toolbar__logo"> <a href="/">The Logo</a> </div>
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
<<<<<<< HEAD
                    <Link to="/crear">
                    <Button bsStyle="primary"> Crear </Button>
                </Link>
=======
                    <Link to="/CrearGerente">
                        <Button bsStyle="primary"> Crear Gerente</Button>
                    </Link>
                    <Link to="/pedidos">
                        <Button bsStyle="primary"> Pedidos</Button>
                    </Link>
>>>>>>> e5a4de15ab78349cb28d5ef1300e0b54cd370e97
                </ul>
            </div>
        </nav>
    </header>
);

export default toolbar;
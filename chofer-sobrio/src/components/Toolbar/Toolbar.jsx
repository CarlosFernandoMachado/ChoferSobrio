import React from 'react';
import firebase from '../config/config';
import './Toolbar.css';
import DrawerToggleButton from '../DrawerToggleButton/DrawerToggleButton';
import { Link } from 'react-router-dom';
import { Button, Dropdown } from 'react-bootstrap';

const toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar__navigation">
            <div className="toolbar__toggle-button" >
                <DrawerToggleButton click={props.drawerClickHandler} />
            </div>
            <div className="toolbar__logo"> <Link to="/">The Logo</Link> </div>
            <div className="spacer" />
            <div className="toolbar_navigation-items">
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Opciones
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item><Link to="/"><Button >Home</Button> </Link></Dropdown.Item>
                        <Dropdown.Item><Link to="/precios"><Button>Precios</Button></Link></Dropdown.Item>
                        <Dropdown.Item><Link to="/seguridad"><Button>Seguridad </Button></Link></Dropdown.Item>
                        <Dropdown.Item><Link to="/crear"><Button>Crear</Button></Link></Dropdown.Item>
                        <Dropdown.Item><Link to="/CrearGerente"><Button>Crear Gerente</Button></Link></Dropdown.Item>
                        <Dropdown.Item><Link to="/pedidos"><Button>Pedidos </Button></Link></Dropdown.Item>
                        <Dropdown.Item><Link to="/iniciarSesion"><Button>Iniciar Sesión </Button></Link></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </nav>
    </header>
);

export default toolbar;

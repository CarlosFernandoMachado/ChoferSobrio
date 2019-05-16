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
                    <Button bsStyle="primary"> Home</Button>
                </Link>
                <Link to="/precios">
                    <Button bsStyle="primary"> Precios</Button>
                </Link>
                <Link to="/seguridad">
                    <Button bsStyle="primary"> Seguridad</Button>
                </Link>
            </ul>
        </nav>
    );
};

export default sideDrawer;
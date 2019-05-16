import React from 'react';
import './Toolbar.css';
import DrawerToggleButton from './DrawerToggleButton';
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
                    <li> <a href="/">Precios</a> </li>
                    <li> <a href="/">Seguridad</a> </li>
                </ul>
            </div>
        </nav>
    </header>
);

export default toolbar;
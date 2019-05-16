import React from 'react';
import './SideDrawer.css';
const sideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if(props.show){
        drawerClasses ='side-drawer open';
    }
    return (
        <nav className={drawerClasses}>
            <ul>
                <li> <a href="/"> Precios </a> </li>
                <li> <a href="/"> Seguridad </a> </li>
            </ul>
        </nav>
    );
};

export default sideDrawer;
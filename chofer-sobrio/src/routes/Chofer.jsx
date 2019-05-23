import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function Chofer({ component: Component, path, ...rest }) {
    const user = JSON.parse(localStorage.getItem('user'));
    
    return (
        <Route
            {...rest}
            path={path}
            render={(props) => {
                // si no esta autenticado
                if (!user) {
                    return (
                        <Redirect to="/iniciarSesion" />
                    );
                }

                // esta autenticado, pero no es gerente ni chofer
                return (
                    <Component {...props} />
                );
            }}
        />
    );
}

export default Chofer;
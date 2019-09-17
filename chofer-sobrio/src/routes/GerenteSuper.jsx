import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function gerenteSuper({ component: Component, path, permisos, ...rest }) {
    return (
        <Route
            {...rest}
            path={path}
            render={(props) => {
                // si no esta autenticado
                if (!permisos) {
                    return (
                        <Redirect to="/iniciarSesion" />
                    );
                }

                // esta autenticado, pero no es gerenteSuper
                if (!permisos.gerenteSuper) {
                    return (
                        <Redirect to="/" />
                    );
                }

                // tiene permisos
                return (
                    <Component {...props} />
                );
            }}
        />
    );
}

export default gerenteSuper;

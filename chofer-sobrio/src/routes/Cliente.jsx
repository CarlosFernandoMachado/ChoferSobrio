import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function Cliente({ component: Component, path, permisos, ...rest }) {
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

                // esta autenticado, pero no es cliente
                if (!permisos.cliente) {
                    return (
                        <Redirect to="/" />
                        // <Redirect exact to="/" />
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

export default Cliente;

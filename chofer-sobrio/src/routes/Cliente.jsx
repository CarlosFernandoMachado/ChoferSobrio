import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function Cliente({ component: Component, path, permisos, ...rest }) {
    return (
        <Route
            {...rest}
            path={path}
            render={(props) => {
                // esta autenticado, pero no es cliente
                if (permisos && !permisos.cliente) {
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

export default Cliente;

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function Gerente({ component: Component, path, permisos, ...rest }) {
    return (
        <Route
            {...rest}
            path={path}
            render={(props) => {
                // si no esta autenticado
                if (!permisos) {
                    return (
                        <Redirect to="/" />
                    );
                }

                // esta autenticado, pero no es gerente
                if (!permisos.gerente) {
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

export default Gerente;

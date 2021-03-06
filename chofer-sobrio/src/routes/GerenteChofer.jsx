import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function GerenteChofer({ component: Component, path, permisos, ...rest }) {
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

                // esta autenticado, pero no es chofer ni gerente ni gerente super
                if (!permisos.chofer && !permisos.gerente && !permisos.gerenteSuper) {
                    return (
                        <Redirect to="/" />
                    );
                }

                // tiene permisos
                return (
                    <Component {...props} permisos={permisos} />
                );
            }}
        />
    );
}

export default GerenteChofer;

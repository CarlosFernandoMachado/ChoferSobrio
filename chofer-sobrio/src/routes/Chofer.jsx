import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function Chofer({ component: Component, path, permisos, ...rest }) {
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

                // esta autenticado, pero no es gerente ni chofer
                if (permisos !== 'gerente' && permisos !== 'chofer') {
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

export default Chofer;

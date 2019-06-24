import React from 'react';
import { Route } from 'react-router-dom';

function Cualquiera({ component: Component, path, permisos, ...rest }) {
    return (
        <Route
            {...rest}
            path={path}
            render={(props) => {
                // tiene permisos
                return (
                    <Component permisos={permisos} {...props} />
                );
            }}
        />
    );
}

export default Cualquiera;

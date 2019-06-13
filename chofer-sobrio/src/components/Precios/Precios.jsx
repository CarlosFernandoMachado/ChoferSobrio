import React, { Component } from 'react'
import { Jumbotron, Container, Alert } from 'react-bootstrap';
import './Precios.css'

export default class Precios extends Component {
    render() {
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Conoce nuestros precios</h5>
                </Jumbotron>
                    <Alert variant="dark">
                        <p>L. 180 lempiras a cualquier parte de Tegucigalpa, del punto de recogida al punto de destino.</p>
                        <p>L. 40 extra por paradas en el camino (Ejemplo: Pararse a comprar comida)</p>
                        <p>L. 90 extra por desvíos a otros destinos fuera del trayecto principal. (Ejemplo: Ir a dejar a un amigo a otro lugar)</p>
                        <p>Aceptamos pagos en efectivo y todas las tarjetas de crédito.</p>
                    </Alert>
            </Container>
        )
    }
}
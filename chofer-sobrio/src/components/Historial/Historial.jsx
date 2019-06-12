import React, { Component } from 'react'
import { Jumbotron, Container, Table, Card, Alert, Button } from 'react-bootstrap';
import './Historial.css'
import firebase from '../config/config';

export default class Precios extends Component {
    render() {
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Historial de Reservaciones</h5>
                </Jumbotron>
                <Card border="light">
                    <Alert variant="secondary">
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Chofer</th>
                                    <th>Cliente</th>
                                    <th>Ubicación</th>
                                    <th>Destino</th>
                                    <th>Marca</th>
                                    <th>Color</th>
                                    <th>Placa</th>
                                    <th>Hora</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                        </Table>
                    </Alert>
                </Card>
            </Container>
        )
    }
}
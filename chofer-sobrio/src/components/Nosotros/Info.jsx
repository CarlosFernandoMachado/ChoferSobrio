import React, { Component } from 'react'
import { Jumbotron, Container, Alert } from 'react-bootstrap';
import './Info.css'

export default class Info extends Component {
    render() {
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Conocenos</h5>
                </Jumbotron>
                <div className="outer-div">
                    <div className="inner-div">
                        <Alert variant="dark">
                            <Alert.Heading>Mision</Alert.Heading>
                            <p>Proteger a todo aquel individuo responsables que
                                desea divertirse y festejar con sus amigos en la
                                noche, ofreciendo un servicio de choferes
                                privados que lo llevan hasta la puerta de sus
                            hogares.</p>
                        </Alert>
                        <Alert variant="dark">
                            <Alert.Heading>Vision</Alert.Heading>
                            <p>Para el año 2022 posicionarnos como la empresa
                                con mayor demanda de servicio de transporte
                                privado en Tegucigalpa, logrando mayor
                                reconocimiento en la zona con el apoyo de los
                                colaboradores..</p>
                        </Alert>
                        <Alert variant="dark">
                            <Alert.Heading>Valores</Alert.Heading>
                            <p>Ética</p>
                            <p>Respeto</p>
                            <p>Prudencia</p>
                            <p>Puntualidad</p>
                            <p>Responsabilidad</p>
                            <p>Honestidad</p>
                        </Alert>
                    </div>
                </div>
            </Container>
        )
    }
}
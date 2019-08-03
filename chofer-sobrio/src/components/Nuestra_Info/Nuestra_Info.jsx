import React, { Component } from 'react'
import { Jumbotron, Container, Alert, Card, CardDeck } from 'react-bootstrap';
import './Nuestra_Info.css'

export default class Precios extends Component {
    render() {
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Conoce nuestros precios</h5>
                </Jumbotron>
                <CardDeck>
                    <Card>
                        <Card.Body>
                            <Card.Title>Mision</Card.Title>
                            <Card.Text>
                                Proteger a todo aquel individuo responsables que
                                desea divertirse y festejar con sus amigos en la
                                noche, ofreciendo un servicio de choferes
                                privados que lo llevan hasta la puerta de sus
                            hogares.
      </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>

                        <Card.Body>
                            <Card.Title>Vision</Card.Title>
                            <Card.Text>
                                Para el año 2022 posicionarnos como la empresa
                                con mayor demanda de servicio de transporte
                                privado en Tegucigalpa, logrando mayor
                                reconocimiento en la zona con el apoyo de los
                                colaboradores.
        content.{' '}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>

                        <Card.Body>
                            <Card.Title>Valores</Card.Title>
                            <Card.Text>
                                <p>Ética</p>
                                <p>Respeto</p>
                                <p>Prudencia</p>
                                <p>Puntualidad</p>
                                <p>Responsabilidad</p>
                                <p>Honestidad</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </CardDeck>
                <p></p>
                <Card>
                    <Card.Header as="h5">Conoce nuestros precio</Card.Header>
                    <Card.Body>

                        <Card.Text>

                            <p>L. 40 extra por paradas en el camino (Ejemplo: Pararse a comprar comida)</p>
                            <p>L. 90 extra por desvíos a otros destinos fuera del trayecto principal. (Ejemplo: Ir a dejar a un amigo a otro lugar)</p>
                            <p>L. 180 lempiras a cualquier parte de Tegucigalpa, del punto de recogida al punto de destino.</p>
                            <p>Aceptamos pagos en efectivo y todas las tarjetas de crédito.</p>
                        </Card.Text>

                    </Card.Body>
                </Card>
                <p></p>
                <Card>
                    <Card.Header as="h5">Conoce nuestra seguridad</Card.Header>
                    <Card.Body>

                        <Card.Text>

                            <p>Una vez solicites tu chofer se te enviara a tu WhatsApp la fotografía y licencia de conducir del chofer que atenderá tu trayecto.</p>
                            <p>La empresa se hace responsable por cualquier daño a su vehículo y para ofrecer esta garantía el chofer instala una cámara de seguridad en el vidrio frontal del vehículo que graba todo el trayecto, Si no está conforme con el servicio usted puede solicitar este video dentro de las 24 horas siguientes a la prestación del servicio, para hacer sus reclamos por daños causados por nuestro chofer a su vehículo.</p>
                        </Card.Text>

                    </Card.Body>
                </Card>
            </Container>
        )
    }
}
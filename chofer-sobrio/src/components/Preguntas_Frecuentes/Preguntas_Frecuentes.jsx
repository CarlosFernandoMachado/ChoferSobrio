import React, { Component } from 'react'
import { Jumbotron, Container, Alert, Accordion, Card } from 'react-bootstrap';
import './Preguntas_Frecuentes.css'

export default class PreguntasFrecuentes extends Component {
    render() {
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Conoce nuestras Preguntas Frecuentes</h5>
                </Jumbotron>
                <Alert variant="dark">
                    <p>-Preguntas Frecuentes</p>


                    <Accordion>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                               • ¿Como saber quién usar mi carro?
    </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>Nosotros le enviaremos la información acerca de quien es que se dirige hacia usted para poder tener toda la información de su chofer</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="1">
                               • ¿Como sabre si están esperándome?
    </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>Nosotros le estaremos informando por medio de un mensaje si, esta en camino, esta cerca o si ya llego a su ubicación</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="2">
                                • ¿Qué pasa si quiero hacer paradas en medio del camino?
    </Accordion.Toggle>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body>En caso de que quiera hacer paradas en medio del camino podría agregarla en nuestra pagina en la parte de Pedido actual, Agregar parada y describe la parada que tendrá así el chofer estará notificado y hará las respectivas paradas en el trayecto</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="3">
                                • ¿Como saben mi localización?
    </Accordion.Toggle>
                            <Accordion.Collapse eventKey="3">
                                <Card.Body>Nosotros tomamos la geolocalización del dispositivo que este usando cada vez que realiza un pedido así sabremos su ubicación exacta para nosotros poder llegar hasta usted</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Alert>
            </Container>
        )
    }
}
import React , {Component} from 'react'
import { Jumbotron, Container, Alert  } from 'react-bootstrap';
import './Seguridad.css'

export default class Seguridad extends Component{
    render(){
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Conoce nuestras medidas de seguridad</h5>
                </Jumbotron>
                    <Alert variant="dark">
                        <p>-Una vez solicites tu chofer se te enviara a tu WhatsApp la fotografía
                             y licencia de conducir del chofer que atenderá tu trayecto.</p>
                             
                        <p>-La empresa se hace responsable por cualquier daño a su vehículo y 
                            para ofrecer esta garantía el chofer instala una cámara de seguridad 
                            en el vidrio frontal del vehículo que graba todo el trayecto, Si no 
                            está conforme con el servicio usted puede solicitar este video 
                            dentro de las 24 horas siguientes a la prestación del servicio, 
                            para hacer sus reclamos por daños causados por nuestro chofer a 
                            su vehículo.</p>
                    </Alert>
            </Container>
        )
    }
}
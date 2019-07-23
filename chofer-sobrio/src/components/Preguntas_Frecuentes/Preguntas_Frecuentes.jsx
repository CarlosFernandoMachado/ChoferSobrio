import React , {Component} from 'react'
import { Jumbotron, Container, Alert  } from 'react-bootstrap';
import './Preguntas_Frecuentes.css'

export default class PreguntasFrecuentes extends Component{
    render(){
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Conoce nuestras Preguntas Frecuentes</h5>
                </Jumbotron>
                    <Alert variant="dark">
                        <p>-Preguntas Frecuentes</p>
                             
                        <p>-Respuestas a Preguntas deberian ir aqui</p>
                    </Alert>
            </Container>
        )
    }
}
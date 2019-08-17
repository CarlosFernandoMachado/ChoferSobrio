import React, { Component } from 'react'
import { Jumbotron, Container,Card } from 'react-bootstrap';
import firebase from '../config/config';
import './Preguntas_Frecuentes.css';

export default class PreguntasFrecuentes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            preguntas: [],
        };


    }

    
    async componentDidMount() {
        this.dbRefPreguntas = firebase.database().ref('/preguntafrecuente');
        this.dbCallbackPreguntas = this.dbRefPreguntas.on('value', snap => this.setState({ preguntas: snap.val() }));
    
    }

    mostrarPreguntas(){
        const { preguntas } = this.state;
        const questions = [];

        Object.keys(preguntas).forEach((key, index) => {
            const pregunta = preguntas[key];
            const card = <Card className="text-center" bg="dark" text="white" border="warning" style={{ margin:'16px' }}>
                    <Card.Body>
                    <Card.Title>{pregunta.pregunta}</Card.Title>
                     <Card.Text>
                         {pregunta.respuesta}
                     </Card.Text>
                 </Card.Body>
            </Card>

                questions.push(card);
        })

        return questions;
    }
    
    componentWillUnmount() {
            this.dbRefPreguntas.off('value', this.dbCallbackPreguntas);
    }

    
    render() {        
        return (
            
            
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Conoce nuestras Preguntas Frecuentes</h5>
                </Jumbotron>
         
                  {this.mostrarPreguntas()}
            
            </Container>
        )
    }
}
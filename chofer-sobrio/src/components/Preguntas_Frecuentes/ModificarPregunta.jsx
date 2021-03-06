import React, { Component } from 'react'
import firebase from '../config/config';
import "react-datepicker/dist/react-datepicker.css";
import Crear from '../Crear_C_G_C/Crear';
import { Jumbotron, Container, Col, Button, Form, Card, Alert} from 'react-bootstrap';

export default class ModificarPregunta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pregunta: '',
            respuesta: '',
            keyQ:'',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {

            const info = await firebase.database().ref('/preguntafrecuente').once('value').then((snap) => {
                const preguntas = snap.val();
                let infoPregunta;
                Object.keys(preguntas).forEach(key => {
                    const pregunta = preguntas[key];
                    if (pregunta.cambio==="1") {
                        infoPregunta = pregunta;
                        this.modificarCambio(key);
                        this.setState({keyQ: key});
                    }
                });
                return infoPregunta;
            });

            this.setState({
                pregunta: info.pregunta,
                respuesta: info.respuesta,
            });
    
    }

    modificarCambio(key){
        const database = firebase.database();

        database.ref('preguntafrecuente/' + key).update({
            cambio: "0",
         });
    }



    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }


    handleSubmit(event) {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();

        } else {
            this.setState({ validated: 'true' });
            event.preventDefault();
            this.setState({ listo: 'true' });
        }
        event.preventDefault();
        this.setState({ validated: 'false' });
    }

    render() {
        const { validated } = this.state;
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Modifica una pregunta</h5>
                </Jumbotron>

                <Card border="ligth">
                    <Alert variant="secondary">
                        <Form 
                            noValidate
                            validated={validated}
                            onSubmit={e => this.handleSubmit(e)}>
                            <Form.Row>
                                <Form.Group as={Col} md="8">
                                    <Form.Label>Ingrese la pregunta</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        type="text"
                                        rows="2"
                                        required
                                        name="pregunta"
                                        value={this.state.pregunta}
                                        onChange={this.handleChange}
                                        id="pregunta"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Por favor, ingrese una pregunta.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                                <Form.Row>

                                <Form.Group as={Col} md="8">
                                    <Form.Label>Ingrese la respuesta</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        type="text"
                                        rows="2"
                                        required
                                        name="respuesta"
                                        value={this.state.respuesta}
                                        onChange={this.handleChange}
                                        id="respesta"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Por favor, ingrese una respuesta.
                                    </Form.Control.Feedback>
                                </Form.Group>
                              
                            </Form.Row>
                            <div className="text-center">
                                <Button type="submit" variant="warning" >Modificar
                                    <Crear validado = {this.state.listo} datos={[this.state.keyQ,this.state.pregunta,this.state.respuesta]} funcion={"modificar_pregunta"}/>
                                </Button>
                            </div>

                        </Form>
                    </Alert>
                </Card>

            </Container>
        )

    }
}
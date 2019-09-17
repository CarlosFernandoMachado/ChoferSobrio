import React, { Component } from 'react'
import firebase from '../config/config';
import "react-datepicker/dist/react-datepicker.css";
import Crear from '../Crear_C_G_C/Crear';
import { Jumbotron, Container, Col, Button, Form, Card, Alert} from 'react-bootstrap';

export default class ModificarInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titulo: '',
            contenido: '',
            keyI:'',
            permisos: props.permisos,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {

            const info = await firebase.database().ref('/informacion').once('value').then((snap) => {
                const info = snap.val();
                let information;
                Object.keys(info).forEach(key => {
                    const inf = info[key];
                    if (inf.cambio==="1") {
                        information = inf;
                        this.modificarCambio(key);
                        this.setState({keyI: key});
                    }
                });
                return information;
            });

            this.setState({
                titulo: info.titulo,
                contenido: info.contenido,
            });
    
    }

    modificarCambio(key){
        const database = firebase.database();

        database.ref('informacion/' + key).update({
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
                    <h5>Modifica información</h5>
                </Jumbotron>

                <Card border="ligth">
                    <Alert variant="secondary">
                    <Form 
                            noValidate
                            validated={validated}
                            onSubmit={e => this.handleSubmit(e)}>
                            <Form.Row>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Ingrese el titulo</Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        name="titulo"
                                        value={this.state.titulo}
                                        onChange={this.handleChange}
                                        id="titulo"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Por favor, ingrese el titulo de su información.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                                <Form.Row>

                                <Form.Group as={Col} md="8">
                                    <Form.Label>Ingrese el contenido:</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        type="text"
                                        rows="3"
                                        required
                                        name="contenido"
                                        value={this.state.contenido}
                                        onChange={this.handleChange}
                                        id="contenido"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Por favor, ingrese el contenido de su información.
                                    </Form.Control.Feedback>
                                </Form.Group>
                              
                            </Form.Row>
                            <div className="text-center">
                                <Button type="submit" variant="warning" >Modificar
                                    <Crear validado = {this.state.listo} datos={[this.state.keyI,this.state.titulo,this.state.contenido]} funcion={"modificar_info"}/>
                                </Button>
                            </div>

                        </Form>
                    </Alert>
                </Card>

            </Container>
        )

    }
}
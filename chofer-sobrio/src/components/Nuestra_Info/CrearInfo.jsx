import React, { Component } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import Crear from '../Crear_C_G_C/Crear';
import { Jumbotron, Container, Col, Button, Form, Card, Alert} from 'react-bootstrap';

export default class CrearInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titulo: '',
            contenido: '',
            permisos: props.permisos,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                    <h5>Crea información.</h5>
                </Jumbotron>

                <Card className="text-center" bg="dark" text="white" border="warning" style={{ margin:'16px' }}>
                    <Card.Body>
                        <Card.Title>Titulo</Card.Title>
                            <Card.Text>
                                Asi se mostrara el titulo y contenido que crees, puedes verificar la informaicón que creaste en la página de "nuestra información".
                            </Card.Text>
                        </Card.Body>
                 </Card>

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
                                <Button type="submit" variant="warning" >Agregar Información
                                    <Crear validado = {this.state.listo} datos={[this.state.titulo,this.state.contenido]} funcion={"crear_informacion"}/>
                                </Button>
                            </div>

                        </Form>
                    </Alert>
                </Card>

            </Container>
        )

    }
}
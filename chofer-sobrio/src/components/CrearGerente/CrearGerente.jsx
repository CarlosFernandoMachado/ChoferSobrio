import React, { Component } from 'react'
import { Jumbotron, Container, Col, Button, Form, InputGroup, Card, Alert } from 'react-bootstrap';
import './CrearGerente.css'

export default class Precios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            telefono: '',
            identidad: '',
            validated: ''
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
            alert('Nombre: ' + this.state.nombre + 'Telefono: ' + this.state.telefono + 'ID: ' + this.state.identidad);
            event.preventDefault();
        }
        this.setState({ validated: 'false' });
        event.preventDefault();
    }
    render() {
        const { validated } = this.state;
        return (
            <Container>
                <Jumbotron>
                    <h2>Bienvidos a Chofer Sobrio</h2>
                    <p>Esta es la pagina para crear gerente?</p>
                </Jumbotron>
                <Card border="ligth">
                <Alert variant="secondary">
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={e => this.handleSubmit(e)}
                >
                    <Form.Row>
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="nombre"
                                value={this.state.value}
                                onChange={this.handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Ingrese su Nombre
                                </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                name="telefono"
                                placeholder="31762140"
                                value={this.state.value}
                                onChange={this.handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Ingrese su Telefono
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustomID">
                            <Form.Label>Identidad</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type = "number"
                                    /*minLength = "13"
                                    maxLength = "13"*/
                                    /*min={9999999999999}
                                    max={9999999999999}*/
                                    placeholder="0801199004231"
                                    required
                                    name="identidad"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Ingrese su Identidad
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>
                    <div class="text-center"> 
                        <Button type="submit" variant="warning" >Crear</Button>
                    </div>
                </Form>
                </Alert>
                </Card>
            </Container>
        )
    }
}
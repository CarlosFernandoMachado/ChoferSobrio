import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Row, Col, Image, Button, Form, InputGroup } from 'react-bootstrap';
import './PedirChofer.css'

export default class Precios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            telefono: '',
            marca: '',
            color: '',
            placa: '',
            ubicacion_actual: '',
            destino: '',
            fecha: '',
            hora: '',
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
            alert('Nombre: ' + this.state.nombre + 'Telefono: ' + this.state.telefono);
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
                    <p>Esta es la pagina para pedir chofer!</p>
                </Jumbotron>
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
                                Ingrese su nombre
                                </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                name="telefono"
                                value={this.state.value}
                                onChange={this.handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Ingrese su telefono
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                            <Form.Label>Marca</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    required
                                    name="marca"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Ingrese la marca de su vehiculo
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="4" controlId="validationCustom03">
                            <Form.Label>Color</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                name="color"
                                value={this.state.value}
                                onChange={this.handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Ingrese el color de su vehiculo
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom04">
                            <Form.Label>Placa</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                name="placa"
                                value={this.state.value}
                                onChange={this.handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Ingrese la placa de su vehiculo
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom05">
                            <Form.Label>Destino</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                name="destino"
                                value={this.state.value}
                                onChange={this.handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Ingrese su destino
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="4" controlId="validationCustom06">
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                name="fecha"
                                value={this.state.value}
                                onChange={this.handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Ingrese la fecha
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom07">
                            <Form.Label>Hora</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                name="hora"
                                value={this.state.value}
                                onChange={this.handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Ingrese la hora
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Button type="submit" variant="dark" >Submit form</Button>
                </Form>
            </Container>
        )
    }
}
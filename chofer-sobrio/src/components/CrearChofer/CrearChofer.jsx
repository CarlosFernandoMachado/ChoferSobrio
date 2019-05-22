import React, { Component } from 'react'
import { Jumbotron, Container, Col, Button, Form, InputGroup, Card, Alert } from 'react-bootstrap';
import './CrearChofer.css'
import Crear from '../Crear_C_G_C/Crear';

export default class Precios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            telefono: '',
            identidad: '',
            validated: '',
            listo: 0,
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
            var length = Math.log(this.state.telefono) * Math.LOG10E + 1 | 0;
            var lengthID = Math.log(this.state.identidad) * Math.LOG10E + 1 | 0;

            /*VALIDACIONES*/


            if (!/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(this.state.nombre)) {
                /*Caracteres especiales*/
                this.setState({ nombre: '' });
                document.getElementById("nombre").value = "";

            }

            if (this.state.telefono.length == 8) {
                this.setState({ validated: 'true' });
                event.preventDefault();
                this.setState({ listo: 'true' });
            } else {
                this.setState({ telefono: '' });
                document.getElementById("telefono").value = "";
            }

            if (this.state.identidad.length == 13) {
                this.setState({ validated: 'true' });
                event.preventDefault();
                this.setState({ listo: 'true' });
            } else {
                this.setState({ identidad: '' });
                document.getElementById("identidad").value = "";

            }
        }
        this.setState({ validated: 'false' });
        event.preventDefault();
    }
    render() {
        const { validated } = this.state;
        return (
            <Container>
                <Jumbotron>
                    <h2>Bienvidos a chofer Sobrio</h2>
                    <p>Esta es la pagina para crear chofer?</p>
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
                                        id="nombre"
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
                                        id="telefono"
                                        name="telefono"
                                        placeholder="_ _ _ _ _ _ _ _"
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
                                            type="number"
                                            id="identidad"
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
                                <Crear validado={this.state.listo} datos={[this.state.identidad, this.state.nombre, this.state.telefono]} funcion={"crear_chofer"} />
                            </div>
                        </Form>
                    </Alert>
                </Card>
            </Container>
        )
    }
}
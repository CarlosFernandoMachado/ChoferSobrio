import React, { Component } from 'react'
import { Jumbotron, Container, Col, Button, Form, InputGroup, Card, Alert } from 'react-bootstrap';
import './CrearGerente.css'
import Crear from '../Crear_C_G_C/Crear';

export default class CrearGerente extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            telefono: '',
            identidad: '',
            correo: '',
            validated: 0,
            listo: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        const form = event.currentTarget;
        var length = Math.log(this.state.telefono) * Math.LOG10E + 1 | 0;
        var lengthID = this.state.identidad.length

        if (!/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(this.state.nombre)) {
            /*Caracteres especiales*/
            this.setState({ nombre: '' });
            document.getElementById("nombre").value = "";

        }
        if (length !== 8) {

            this.setState({ telefono: '' });
            document.getElementById("telefono").value = "";

        }
        if (lengthID !== 13) {
            alert(lengthID)
            alert(length)
            this.setState({ identidad: '' });
            document.getElementById("identidad").value = "";

        }
        if (form.checkValidity() === false) {
            this.setState({ validated: 'false' });

            event.preventDefault();
            event.stopPropagation();

        } else {

            this.setState({ validated: 'true' });
            event.preventDefault();
            this.setState({ listo: 'true' });

            event.preventDefault();
        }
        event.preventDefault()


    }
    render() {
        const { validated } = this.state;
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Registra a un nuevo Gerente</h5>
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
                                        id="nombre"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese su nombre Correctamente (A-Z)
                                </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationCustom02">
                                    <Form.Label>Telefono</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        name="telefono"
                                        id="telefono"
                                        placeholder="31762140"
                                        value={this.state.value}
                                        onChange={this.handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese su Telefono Correctamente 8 digitos (0-9)
                            </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationCustomID">
                                    <Form.Label>Identidad</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="number"
                                            placeholder=""
                                            required
                                            name="identidad"
                                            id="identidad"
                                            value={this.state.value}
                                            onChange={this.handleChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Ingrese su Identidad Correctamente 13 digitos (0-9) sin espacios ni guiones
                                </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationCustomID">
                                    <Form.Label>Correo</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="email"
                                            placeholder="Solo correo de gmail"
                                            required
                                            name="correo"
                                            pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[gmail]+(?:\.[a-zA-Z0-9-]+)*$"
                                            id="correo"
                                            value={this.state.value}
                                            onChange={this.handleChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Ingrese su Correo Correctamente (correo@gmail.com)
                                </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <div class="text-center">
                                <Button type="submit" variant="warning" >Crear gerente</Button>
                                <Crear validado={this.state.listo} datos={[this.state.identidad, this.state.nombre, this.state.telefono, this.state.correo]} funcion={"crear_gerente"} />
                            </div>
                        </Form>
                    </Alert>
                </Card>
            </Container>
        )
    }
}
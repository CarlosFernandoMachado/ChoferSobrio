import React, { Component } from 'react'
import { Jumbotron, Container, Col, Button, Form, Card, Alert } from 'react-bootstrap';
import './ModificarContrasena.css'
import Crear from '../Crear_C_G_C/Crear';

export default class ModificarContrasena extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contrasena_actual: '',
            contrasena_nueva: '',
            contrasena_check: '',
            validated: '',
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


        if (!/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(this.state.contrasena_actual)) {
            /*Caracteres especiales*/
            this.setState({ contrasena_actual: '' });
            document.getElementById("actual").value = "";

        }
        if (!/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(this.state.contrasena_nueva)) {
            /*Caracteres especiales*/
            this.setState({ contrasena_nueva: '' });
            document.getElementById("nueva").value = "";

        }
        if (!/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(this.state.contrasena_check)) {
            /*Caracteres especiales*/
            this.setState({ contrasena_check: '' });
            document.getElementById("check").value = "";

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


        event.preventDefault();
    }
    limpiar(event) {
        this.setState({ contrasena_actual: '' });
        document.getElementById("actual").value = "";
        this.setState({ contrasena_nueva: '' });
        document.getElementById("nueva").value = "";
        this.setState({ contrasena_check: '' });
        document.getElementById("check").value = "";
    }
    render() {
        const { validated } = this.state;
        return (
            <Container>
                <Jumbotron>
                    <h2>Bienvenidos a chofer Sobrio</h2>
                    <p>Esta es la pagina para Modificar contrasena Gerente</p>
                </Jumbotron>
                <Card border="ligth">
                    <Alert variant="secondary">
                        <Form
                            noValidate
                            validated={ validated }
                            onSubmit={ e => this.handleSubmit(e) }
                             
                            

                        >
                            <Form.Row>
                                <Form.Group as={ Col } md="4" controlId="validationCustom01">
                                    <Form.Label>Contrasena Actual</Form.Label>
                                    <Form.Control
                                        required
                                        type="password"
                                        name="actual"
                                        value={ this.state.value }
                                        onChange={ this.handleChange }
                                        id="actual"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese la contrasena actual (A-Z) sin caracteres especiales
                                </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={ Col } md="4" controlId="validationCustom01">
                                    <Form.Label>Contrasena Nueva</Form.Label>
                                    <Form.Control
                                        required
                                        type="password"
                                        name="nueva"
                                        value={ this.state.value }
                                        onChange={ this.handleChange }
                                        id="nueva"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese la nueva contrasena (A-Z) sin caracteres especiales
                                </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={ Col } md="4" controlId="validationCustom01">
                                    <Form.Label>Confirmar Contrasena</Form.Label>
                                    <Form.Control
                                        required
                                        type="password"
                                        name="check"
                                        value={ this.state.value }
                                        onChange={ this.handleChange }
                                        id="check"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese la nueva contrasena (A-Z) sin caracteres especiales
                                </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <div class="text-center">
                            <Button type="submit" variant="warning" > Modificar Contrasena</Button>
                                <Crear validado={this.state.listo} datos={[this.state.password]} funcion={ "modificarcontraseñagerente" }  />
                            
                           
                            </div>


                        </Form>
                    </Alert>
                </Card>
            </Container>
        )
    }
}
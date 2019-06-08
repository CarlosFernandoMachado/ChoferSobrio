import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { FormGroup, Label, Input } from 'reactstrap';
import './Eliminar_Cuenta.css';
import Crear from '../Crear_C_G_C/Crear';
import { Jumbotron, Col, InputGroup, Card, Alert, Dropdown } from 'react-bootstrap';
import firebase from 'firebase';


export default class Eliminar_Cuenta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        var password = this.state.password;
    }

    render() {
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Eliminacion de Cuenta</h5>
                </Jumbotron>

                <Card border="ligth">
                    <Alert variant="secondary">
                        <Form
                            onSubmit={ e => this.handleSubmit(e) }>
                            <Form.Row>
                                <Form.Group as={ Col } md="4">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        required
                                        type="password"
                                        placeholder="Ingrese contraseña"
                                        name="password"
                                        value={ this.state.password }
                                        onChange={ this.handleChange }
                                        id="password"
                                    />
                                    <Form.Text className="text-muted">
                                        Se eliminara su cuenta, lamentamos mucho que tengas que irte, esperamos que sea un nos vemos y regreses 😢
                        </Form.Text>
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese su password
                                </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <div className="text-center">
                                <Button type="submit" variant="warning" >Eliminar Cuenta
                                <Crear validado={ this.state.listo } datos={ [this.state.id] } funcion={ "eliminar_chofer" } />
                                </Button>

                            </div>

                        </Form>
                    </Alert>
                </Card>

            </Container>
        )
    }
}

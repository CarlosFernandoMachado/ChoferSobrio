import React, { Component } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import './Eliminar_Cuenta.css';
import Crear from '../Crear_C_G_C/Crear';
import { Jumbotron, Card, Alert } from 'react-bootstrap';
import firebase from 'firebase';


export default class EliminarCuentaTotal_Chofer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            numId: '',
            correo: '',
            password: '',
            listo: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ password: event.target.value });
    }


    handleSubmit(event) {

        const user = JSON.parse(localStorage.getItem('user'));
        var rootRef = firebase.database().ref().child("chofer");
        rootRef.on("child_added", snap => {
            var id = 0

            const numId = snap.val().identidad;
            var correo = snap.child("correo").val();


            if (correo === user.email) {
                firebase.database().ref().child('chofer').orderByChild('correo').equalTo(user.email).on("value", function (snapshot) {
                    console.log(snapshot.val());
                    snapshot.forEach(function (data) {
                        id = data.key;

                    });
                });

                this.setState({
                    id: id,
                    numId,
                });
                event.preventDefault();

            }

        });
        if (window.confirm(' Se eliminara su cuenta, lamentamos mucho que tengas que irte, esperamos que sea un nos vemos y regreses 😢'))
            this.setState({ listo: "true" });
            


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
                            onSubmit={e => this.handleSubmit(e)}>
                            <Form.Row>

                            </Form.Row>
                            <div className="text-center">
                                <Button type="submit" variant="warning" >Eliminar Cuenta
                                <Crear validado={this.state.listo} datos={[this.state.id, this.state.numId]} funcion={"eliminar_chofer_t"} />
                                </Button>

                            </div>

                        </Form>
                    </Alert>
                </Card>

            </Container>
        )
    }
}

import React, { Component } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Form, Button, Container } from 'react-bootstrap';
import './Eliminar_Cuenta.css';
import Crear from '../Crear_C_G_C/Crear';
import { Jumbotron, Card, Alert } from 'react-bootstrap';
import firebase from 'firebase';
import swal from 'sweetalert';


export default class Eliminar_Cuenta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:"",
            password: '',
            placa: '',
            listo:0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
       
        const user = JSON.parse(localStorage.getItem('user')); 
        
        var rootRef = firebase.database().ref().child("cliente");
            rootRef.on("child_added", snap => {
                var id = 0
              
                const placa = snap.val().placa;
                var correo = snap.child("correo").val();
                
               

                if (correo === user.email) {
                    firebase.database().ref().child('cliente').orderByChild('correo').equalTo(user.email).on("value", function(snapshot) {
                        console.log(snapshot.val());
                        snapshot.forEach(function(data) {
                            id = data.key;

                        });
                    });
                   
                    this.setState({
                        id: id,
                        placa,
                      
                    });
                    event.preventDefault();
                  
                }

            });
            swal({
                title: "Esta seguro?",
                text: " Se desactivara su cuenta, lamentamos mucho que tengas que irte, esperamos que sea un nos vemos y regreses 😢",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                  swal("Se desactivo la cuenta exitosamente", {
                    icon: "success",
                  });
                  this.setState({ listo: "true" });
                } else {
                 
                }
              });
            
       
    }

    render() {
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Desactivacion de Cuentas</h5>
                </Jumbotron>

                <Card border="ligth">
                    <Alert variant="secondary">
                        <Form
                            onSubmit={e => this.handleSubmit(e)}>
                            <Form.Row>
                                
                            </Form.Row>
                            <div className="text-center">
                                <Button type="submit" variant="warning" >Desactivar Mi Cuenta
                                <Crear validado={this.state.listo} datos={[this.state.id, this.state.placa] } funcion={ "eliminar_cliente" } />
                                </Button>

                            </div>

                        </Form>
                    </Alert>
                </Card>

            </Container>
        )
    }
}

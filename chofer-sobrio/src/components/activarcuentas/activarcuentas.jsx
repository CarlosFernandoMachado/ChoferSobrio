import React, { Component } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Form, Button, Container } from 'react-bootstrap';
import './activarcuentas.css';
import Crear from '../Crear_C_G_C/Crear';
import { Jumbotron, Card, Alert, Image } from 'react-bootstrap';
import firebase from 'firebase';
import { logout } from '../config/auth';


export default class Password_olvidada extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isGerente: false,
            isChofer: false,
            isCliente: false,
            id: "",
            password: '',
            listo: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ password: event.target.value });
    }

    activarchofer() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (window.confirm('desea activar su cuenta de chofer de nuevo?')) {
            firebase.database().ref().child('chofer').orderByChild('correo').equalTo(user.email).on("value", function (snapshot) {
                console.log(snapshot.val());
                snapshot.forEach(function (data) {
                    var id = data.key;
                    var database = firebase.database();

                    database.ref('chofer/' + id).update({
                        estado: "activo"
                    });


                });
            });

            this.setState({ isChofer: true })
        }
    }
    activarcliente() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (window.confirm('desea activar su cuenta de cliente de nuevo?')) {
            firebase.database().ref().child('cliente').orderByChild('correo').equalTo(user.email).on("value", function (snapshot) {
                console.log(snapshot.val());
                snapshot.forEach(function (data) {
                    var id = data.key;
                    var database = firebase.database();

                    database.ref('cliente/' + id).update({
                        estado: "activo"
                    });


                });
            });

            this.setState({ isCliente: true })
        }
    }
    activargerente() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (window.confirm('desea activar su cuenta de Gerente nuevo?')) {
            firebase.database().ref().child('gerente').orderByChild('correo').equalTo(user.email).on("value", function (snapshot) {
                console.log(snapshot.val());
                snapshot.forEach(function (data) {
                    var id = data.key;
                    var database = firebase.database();

                    database.ref('gerente/' + id).update({
                        estado: "activo"
                    });


                });
            });

            this.setState({ isGerente: true })
        } else {
            this.setState({ isGerente: false })
        }

    }

    
    


    handleSubmit(event) {
       
        
      
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            this.setState({ user });

            // clientes
            this.dbRefClientes = firebase.database().ref('/cliente');
            this.dbCallbackClientes = this.dbRefClientes.on('value', (snap) => {
                const clientes = snap.val();
                let isCliente = false;
                Object.keys(clientes).forEach(key => {
                    if (isCliente = isCliente || (clientes[key].correo === user.email && clientes[key].estado === "activo")) {
                        this.setState({ isCliente });
                    } else if ((clientes[key].correo === user.email && clientes[key].estado === "inactivo")) {
                        this.activarcliente()
                    };
                });



            });
        }



    }

    render() {
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Activar tus cuentas</h5>
                </Jumbotron>

                <Card border="ligth">
                        <Form
                            onSubmit={e => this.handleSubmit(e)}>
                            <Form.Row>
                                <Image src="/welcome.png" />
                            </Form.Row>
                            <div className="text-center">
                                <Button type="submit" variant="warning" >Activar Cuentas

                                </Button>

                            </div>

                        </Form>
                </Card>

            </Container>
        )
    }
}

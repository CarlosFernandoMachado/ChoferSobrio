import React, { Component } from 'react'
import { Jumbotron, Container, Card, Alert, Button } from 'react-bootstrap';
import ReactTable from 'react-table';
import firebase from '../config/config';
import { Link } from 'react-router-dom';

export default class SeleccionarCarro extends Component {

    constructor(props) {
        super(props);

        this.columnas = [{
            Header: 'Teléfono',
            accessor: 'telefono',
            maxWidth: 150,
        }, {
            Header: 'Accion',
            accessor: 'accion',
            maxWidth: 150,
            filterable: false,
        }
        ];

        this.state = {
            clientes: [],
            id_cliente: '',
            telefono : "",
            telefono2: "",
            telefono3: "",
        };


    }

    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));

    var rootRef = firebase.database().ref().child("cliente");
        rootRef.on("child_added", snap => {
            var id = "1"
            var correo = snap.child("correo").val();

            if (correo == user.email) {
                firebase.database().ref().child('cliente').orderByChild('correo').equalTo(user.email).on("value", function(snapshot) {
                    console.log(snapshot.val());
                    snapshot.forEach(function(data) {
                        id = data.key;

                    });
                });
               
                this.setState({
                    id_cliente: id,
                });
            }

        });
        if (user) {
            // clientes
            const info = await firebase.database().ref('/cliente').once('value').then((snap) => {
                const clientes = snap.val();
                Object.keys(clientes).forEach(key => {
                    const cliente = clientes[key];
                    if (cliente.correo === user.email) {
                        this.setState({
                            telefono : cliente.telefono,
                            telefono2 : cliente.telefono2,
                            telefono3 : cliente.telefono3,   
                        });
                    }
                });
 
            });

        }    
    
    }
    

    seleccionar(keyCliente,phone, n) {
        const database = firebase.database();

        var id= this.state.id_cliente;
        if(n==2){
            database.ref('cliente/' + keyCliente).update({
                telefono:phone,
                telefono2:this.state.telefono
             });
        } else{
            database.ref('cliente/' + keyCliente).update({
                telefono:phone,
                telefono3:this.state.telefono
             });
        }

    }

    mostrartelefonos() {
        var phone = [];

        if(this.state.telefono2!=="" && this.state.telefono3!==""){
            phone = [{
                telefono : this.state.telefono,
                accion : <Button variant="success" disabled = "true">Seleccionado</Button>
              }, {
                telefono : this.state.telefono2,
                accion :  <Link to="/PedirChofer">
                            <Button variant="warning" onClick={() => this.seleccionar(this.state.id_cliente, this.state.telefono2,2)}>Seleccionar
                            </Button>
                         </Link>
              }, {
                telefono : this.state.telefono3,
                accion :  <Link to="/PedirChofer">
                            <Button variant="warning" onClick={() => this.seleccionar(this.state.id_cliente, this.state.telefono3,3)}>Seleccionar
                            </Button>
                         </Link>
              }]
        }else if(this.state.telefono2!==""){
            phone = [{
                telefono : this.state.telefono,
                accion : <Button variant="success" disabled = "true">Seleccionado</Button>
              }, {
                telefono : this.state.telefono2,
                accion :  <Link to="/PedirChofer">
                            <Button variant="warning" onClick={() => this.seleccionar(this.state.id_cliente, this.state.telefono2,2)}>Seleccionar
                            </Button>
                         </Link>
              }]
        }else if(this.state.telefono3!==""){
            phone = [{
                telefono : this.state.telefono,
                accion : <Button variant="success" disabled = "true">Seleccionado</Button>
              },{
                telefono : this.state.telefono3,
                accion :  <Link to="/PedirChofer">
                            <Button variant="warning" onClick={() => this.seleccionar(this.state.id_cliente, this.state.telefono3,3)}>Seleccionar
                            </Button>
                         </Link>
              }]
        }else{
            phone = [{
                telefono : this.state.telefono,
                accion : <Button variant="success" disabled = "true">Seleccionado</Button>
              }]
        }

        return phone;
    }
    





    render() {
        const data = this.mostrartelefonos();
        
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Teléfonos Registrados</h5>
                </Jumbotron>
                <Card border="light">
                    <Alert variant="secondary">
                    <h3>Teléfonos</h3>
                        <br />
                        <ReactTable
                            data={data}
                            columns={this.columnas}
                            showPageJump = {false}
                            showPaginationBottom = {false}
                            showPageSizeOptions = {false}
                            filterable = {false}
                        />
                    </Alert>
                </Card>
            </Container>
        )
    }
}
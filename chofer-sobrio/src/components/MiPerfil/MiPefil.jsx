import React, { Component } from 'react'
import { Jumbotron, Container, Table, Card, Alert, Button } from 'react-bootstrap';
import './MiPerfil.css'
import firebase from '../config/config';

export default class Precios extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idChofer: ''
        };
    }

    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const info = await firebase.database().ref('/chofer').once('value').then((snap) => {
                const choferlist = snap.val();
                let infoChofer;
                choferlist.forEach(chofer => {
                    if (chofer.correo === user.email) {
                        infoChofer = chofer;
                    }
                });
                return infoChofer;
            });

            this.setState({
                idChofer: info.identidad
            });
        }

        this.loaddata();
    }

    loaddata = () => {
        var rootRef = firebase.database().ref().child("pedido");
       
        rootRef.on("child_added", snap => {
            var idchofer = snap.child("idchofer").val();
            
            if (this.state.idChofer==idchofer) {
                var nombre = snap.child("nombre").val();
                var telefono = snap.child("telefono").val();
                var ubicacion = snap.child("ubicacion").val();
                var destino = snap.child("destino").val();
                var hora = snap.child("hora").val();
                var placa = snap.child("placa").val();
                var marca = snap.child("marca").val();
                var color = snap.child("color").val();
                var estado = snap.child("estado").val();
                var fecha = snap.child("fecha").val();
                var data = [];
                data.push(nombre);
                data.push(telefono);
                data.push(ubicacion);
                data.push(destino);
                data.push(fecha);
                data.push(hora);
                data.push(placa);
                data.push(marca);
                data.push(color);
                data.push(estado);
                var tr = document.createElement("tr");
                for (var i = 0; i < data.length; i++) {
                    var td = document.createElement("td");
                    if(i===(data.length - 1)){
                            td.textContent = data[i];
                    }else{
                        td.textContent = data[i];
                    }
                    tr.appendChild(td);
                }
                var tabla = document.getElementById("table_body");
                tabla.appendChild(tr);
            }
        });
    };

    
    render() {
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Reservaciones Seleccionadas</h5>
                </Jumbotron>
                <Card border="light">
                    <Alert variant="secondary">
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Nombe</th>
                                    <th>Telefono</th>
                                    <th>Ubicacion</th>
                                    <th>Destino</th>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                    <th>Placa</th>
                                    <th>Marca</th>
                                    <th>Color</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody id="table_body">
                            </tbody>
                        </Table>
                    </Alert>
                </Card>
            </Container>
        )
    }
}
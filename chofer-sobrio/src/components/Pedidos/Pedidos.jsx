import React, { Component } from 'react'
import { Jumbotron, Container, Table, Card, Alert } from 'react-bootstrap';
import './Pedidos.css'
import firebase from '../Crear_C_G_C/Fire';

export default class Precios extends Component {

    constructor(props) {
        super(props);
        this.state = {
            informacion: []
        };
    }

    componentDidMount() {
        this.loaddata();
    }

    loaddata = () => {
        var rootRef = firebase.database().ref().child("pedido");
        rootRef.on("child_added", snap => {
            var nombre = snap.child("nombre").val();
            var telefono = snap.child("telefono").val();
            var ubicacion = snap.child("ubicacion").val();
            var destino = snap.child("destino").val();
            var fecha = snap.child("fecha").val();
            var hora = snap.child("hora").val();
            var placa = snap.child("placa").val();
            var marca = snap.child("marca").val();
            var color = snap.child("color").val();
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
            var tr = document.createElement("tr");
            for (var i = 0; i < data.length; i++) {
                var td = document.createElement("td");

                td.textContent = data[i];
                tr.appendChild(td);
            }
            var tabla = document.getElementById("table_body");
            tabla.appendChild(tr);
        });
    };
    render() {
        return (
            <Container>
                <Jumbotron>
                    <h2>Bienvenidos a Chofer Sobrio</h2>
                    <p>Esta es la pagina de Pedidos!</p>
                </Jumbotron>
                <Card border="light">
                    <Alert variant="secondary">
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Telefono</th>
                                    <th>Ubicacion</th>
                                    <th>Destino</th>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                    <th>Placa</th>
                                    <th>Marca</th>
                                    <th>Color</th>
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
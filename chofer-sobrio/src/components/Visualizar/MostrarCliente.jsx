import React, { Component } from 'react'
import { Jumbotron, Container, Table, Card, Alert } from 'react-bootstrap';
import './Visualizar.css'
import firebase from '../config/config';

export default class VisualizarCliente extends Component {

    constructor(props) {
        super(props);
        this.state = {
            informacion: []
        };
    }

    componentDidMount() {
        this.loaddata();
    }
    componentWillUnmount() {
        document.getElementById('table_body').innerHTML = '';
    }

    loaddata = () => {
        var rootRef = firebase.database().ref().child("cliente");
        rootRef.on("child_added", snap => {

            var nombre = snap.child("nombre").val();
            var telefono = snap.child("telefono").val();
            var correo = snap.child("correo").val();
            var placa = snap.child("placa").val();
            var marca = snap.child("marca").val();
            var color = snap.child("color").val();
            //en var eliminar @Jean agregara el nodo superior para poder eliminar al usuario
            var eliminar;
            //
            var data = [];
            data.push(nombre);
            data.push(telefono);
            data.push(correo);
            data.push(placa);
            data.push(marca);
            data.push(color);
            var tr = document.createElement("tr");
            /* just in case lo arruine todo
            for (var i = 0; i < data.length; i++) {
                var td = document.createElement("td");

                td.textContent = data[i];
                tr.appendChild(td);
            }*/
            for (var i = 0; i < data.length; i++) {
                var td = document.createElement("td");
                if (i === (data.length - 1)) {
                        var button = document.createElement("p");
                        button.innerHTML = "<input class='btn btn-primary' type='submit' value='Reservar'></input>";
                        td.appendChild(button);
                } else {
                    td.textContent = data[i];
                }
                tr.appendChild(td);
            }
            var tabla = document.getElementById("table_body");
            tabla.appendChild(tr);

        });
    };
    render() {
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Datos de los Clientes</h5>
                </Jumbotron>
                <Card border="light">
                    <Alert variant="secondary">
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Telefono</th>
                                    <th>Correo</th>
                                    <th>Placa</th>
                                    <th>Marca</th>
                                    <th>Color</th>
                                    <th>Eliminar</th>
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
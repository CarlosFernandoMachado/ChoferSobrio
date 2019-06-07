import React, { Component } from 'react'
import { Jumbotron, Container, Table, Card, Alert } from 'react-bootstrap';
import './Visualizar.css'
import firebase from '../config/config';

export default class VisualizarGerente extends Component {

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
        var rootRef = firebase.database().ref().child("gerente");
        rootRef.on("child_added", snap => {

            var nombre = snap.child("nombre").val();
            var identidad = snap.child("identidad").val();
            var telefono = snap.child("telefono").val();
            var correo = snap.child("correo").val();
            //en var eliminar @Jean agregara el nodo superior para poder eliminar al usuario
            var eliminar;
            //
            var data = [];
            data.push(nombre);
            data.push(identidad);
            data.push(telefono);
            data.push(correo);


            var tr = document.createElement("tr");

            /*
            for (var i = 0; i < data.length; i++) {
                var td = document.createElement("td");

                td.textContent = data[i];
                tr.appendChild(td);
            }*/

            for (var i = 0; i < data.length; i++) {
                var td = document.createElement("td");
                var button = document.createElement("p");
                button.innerHTML = "<input class='btn btn-primary' type='submit' value='Eliminar'></input>";
                td.appendChild(button);
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
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Datos de los Gerentes</h5>
                </Jumbotron>
                <Card border="light">
                    <Alert variant="secondary">
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Identidad</th>
                                    <th>Telefono</th>
                                    <th>Correo</th>
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
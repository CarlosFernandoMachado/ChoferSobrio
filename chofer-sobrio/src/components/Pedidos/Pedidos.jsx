import React, { Component } from 'react'
import { Jumbotron, Container, Table, Card, Alert, Button } from 'react-bootstrap';
import './Pedidos.css'
// quitar
import firebase from '../config/config';

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
    componentWillUnmount() {
        document.getElementById('table_body').innerHTML = '';
    }

    loaddata = () => {
        var rootRef = firebase.database().ref().child("pedido");
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        var tommorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        var day = tommorrow.getDate()
        var month = tommorrow.getMonth() + 1
        var year = tommorrow.getFullYear()
        var today2 = dd + '/' + mm + '/' + yyyy;
        tommorrow = day + '/' + month + '/' + year;
        rootRef.on("child_added", snap => {
            var fecha = snap.child("fecha").val();
            
            if (fecha === today2 || fecha === tommorrow) {
                var nombre = snap.child("nombre").val();
                var telefono = snap.child("telefono").val();
                var ubicacion = snap.child("ubicacion").val();
                var destino = snap.child("destino").val();
                var hora = snap.child("hora").val();
                var placa = snap.child("placa").val();
                var marca = snap.child("marca").val();
                var color = snap.child("color").val();
                var estado = snap.child("estado").val();
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
                        if(estado==="Disponible"){
                            //var button=<input class="btn btn-primary" type="submit" value="Submit"></input>
                            var button = document.createElement("p");
                            button.innerHTML = "<input class='btn btn-primary' type='submit' value='Reservar'></input>";
                            td.appendChild(button);
                        }else{
                            td.textContent = data[i];
                        }
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
                    <h5>Reservaciones de hoy y mañana</h5>
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
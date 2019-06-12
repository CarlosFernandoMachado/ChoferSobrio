import React, { Component } from 'react'
import { Jumbotron, Container, Table, Card, Alert } from 'react-bootstrap';
import './ListarFeedback.css'
import firebase from '../config/config';

export default class ListarFeedback extends Component {

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
        var rootRef = firebase.database().ref().child("comentarios");
        rootRef.on("child_added", snap => {
            var comentario = snap.child("contenido").val();
            var tr = document.createElement("tr");

                var td = document.createElement("td");
                td.textContent = comentario;
                tr.appendChild(td);
            
            var tabla = document.getElementById("table_body");
            tabla.appendChild(tr);
        });
    };
    render() {
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Mira lo que dicen los clientes</h5>
                </Jumbotron>
                <Card border="light">
                    <Alert variant="secondary">
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Comentario</th>
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
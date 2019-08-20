import React, { Component } from 'react'
import { Jumbotron, Container, Card, Alert, Button } from 'react-bootstrap';
import ReactTable from 'react-table';
import './ComentariosChofer.css'
import firebase from '../config/config';

export default class ComentariosChofer extends Component {

    constructor(props) {
        super(props);

        this.columnas = [{
            Header: 'Correo',
            accessor: 'correo_cliente',
            minWidth: 230,
        }, {
            Header: 'Fecha',
            accessor: 'fecha',
            minWidth: 100,
        }, {
            Header: 'IdChofer',
            accessor: 'id_chofer',
            minWidth: 150,
        }, {
            Header: 'Comentario',
            accessor: 'comentario',
            minWidth: 500,
        }, {
            Header: 'Puntaje',
            accessor: 'puntaje',
            minWidth: 80,
        }];

        this.state = {
            feedbacks: {},
        };

        this.mostrarFeedback = this.mostrarFeedback.bind(this);
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            // feedbacks
            this.dbRefFeedback = firebase.database().ref('/Feedback');
            this.dbCallbackFeedback = this.dbRefFeedback.on('value', snap => {
                this.setState({ feedbacks: snap.val() })
            } );
        }
    }

    componentWillUnmount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.dbRefFeedback.off('value', this.dbCallbackFeedback);
        }
    }

    mostrarFeedback() {
        const { feedbacks } = this.state;
        const fbRes = [];

        Object.keys(feedbacks).forEach((key, index) => {
            const feedback = feedbacks[key];
            if (key !== 0) {
                fbRes.push(feedback);
            }
        });

        return fbRes;
    }

    render() {
        const res = this.mostrarFeedback();

        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Feedback</h5>
                </Jumbotron>
                <Card border="light">
                    <Alert variant="secondary">
                    <h3>Feedback de los Clientes</h3>
                        <br />
                        <ReactTable
                            data={res}
                            columns={this.columnas}
                            filterable
                        />
                    </Alert>
                </Card>
            </Container>
        )
    }
}
import React, { Component } from 'react'
import { Jumbotron, Container, Card, Alert, Button } from 'react-bootstrap';
import ReactTable from 'react-table';
import './Visualizar.css'
import firebase from '../config/config';

export default class VisualizarCarros extends Component {

    constructor(props) {
        super(props);

        this.columnas = [{
            Header: 'Color',
            accessor: 'color',
            maxWidth: 300,
        }, {
            Header: 'Marca',
            accessor: 'marca',
            maxWidth: 150,
        }, {
            Header: 'Placa',
            accessor: 'placa',
            maxWidth: 150,
        }];

        this.state = {
            carros: []
        };

        this.mostrarcarros = this.mostrarcarros.bind(this);


    }

    async componentDidMount() {
            this.dbRefCarros = firebase.database().ref('/carro');
            this.dbCallbackCarros = this.dbRefCarros.on('value', snap => this.setState({ carros: snap.val() }));    
    }

    componentWillUnmount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.dbRefCarros.off('value', this.dbCallbackCarros);
        }
    }

    mostrarcarros() {
        const { carros } = this.state;
        const user = JSON.parse(localStorage.getItem('user'));
        const car = [];

        Object.keys(carros).forEach((key, index) => {
            if (index !== 0 &&  carros[key].correo==user.email) {
                car.push(carros[key]);
            }
        })

        return car;
    }


    render() {
        const carros = this.mostrarcarros();
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Carros Registrados</h5>
                </Jumbotron>
                <Card border="light">
                    <Alert variant="secondary">
                    <h3>Carros</h3>
                        <br />
                        <ReactTable
                            data={carros}
                            columns={this.columnas}
                            filterable
                        />
                    </Alert>
                </Card>
            </Container>
        )
    }
}
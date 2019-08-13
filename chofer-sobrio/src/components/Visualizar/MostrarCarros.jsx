import React, { Component } from 'react'
import { Jumbotron, Container, Card, Alert, Button } from 'react-bootstrap';
import ReactTable from 'react-table';
import './Visualizar.css'
import firebase from '../config/config';
import { Link } from 'react-router-dom';
import { FiTrash2 } from "react-icons/fi";
import { MdCreate } from "react-icons/md";

export default class VisualizarCarros extends Component {

    constructor(props) {
        super(props);

        this.columnas = [{
            Header: 'Color',
            accessor: 'color',
            maxWidth: 150,
        }, {
            Header: 'Marca',
            accessor: 'marca',
            maxWidth: 150,
        }, {
            Header: 'Placa',
            accessor: 'placa',
            maxWidth: 150,
        }, {
            Header: '',
            accessor: 'remove',
            maxWidth: 70,
            filterable: false,
        }, {
            Header: '',
            accessor: 'change',
            maxWidth: 70,
            filterable: false,
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

    eliminarcarro(key){
        if (window.confirm('Se eliminara el carro de su cuenta.')) {
            const database = firebase.database();
            database.ref(`carro/${key}/`).remove();
            
        }
    }

    modificarcarro(key){
        const database = firebase.database();

        database.ref('carro/' + key).update({
            cambio: "si",
         });
    }

    mostrarcarros() {
        const { carros } = this.state;
        const user = JSON.parse(localStorage.getItem('user'));
        const car = [];

        Object.keys(carros).forEach((key, index) => {
            const carro = carros[key];
            if (index !== 0 &&  carros[key].correo==user.email) {
                carro.remove =  <Button variant="danger" onClick={() => this.eliminarcarro(key)}  ><FiTrash2/>
                                </Button>
                carro.change =  <Link to="/ModificarCarro">
                                    <Button variant="success" onClick={() => this.modificarcarro(key)}><MdCreate/>
                                    </Button>
                                 </Link>
                car.push(carro);
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
                        <div className="text-center">
                        <Link to="/AgregarCarro">
                                <Button type="submit" variant="warning">Agregar</Button>
                        </Link>
                            </div>
                       
                    </Alert>
                </Card>
            </Container>
        )
    }
}
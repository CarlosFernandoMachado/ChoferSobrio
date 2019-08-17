import React, { Component } from 'react'
import { Jumbotron, Container, Card, Alert, Button } from 'react-bootstrap';
import ReactTable from 'react-table';
import firebase from '../config/config';
import { Link } from 'react-router-dom';
import { FiTrash2 } from "react-icons/fi";
import { MdCreate } from "react-icons/md";

export default class MostrarPreguntas extends Component {

    constructor(props) {
        super(props);

        this.columnas = [{
            Header: 'Pregunta',
            accessor: 'pregunta',
            maxWidth: 350,
        }, {
            Header: 'Respuesta',
            accessor: 'respuesta',
            maxWidth: 350,
        },{
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
            preguntas: []
        };

        this.mostrarpreguntas = this.mostrarpreguntas.bind(this);


    }

    async componentDidMount() {
            this.dbRefPreguntas = firebase.database().ref('/preguntafrecuente');
            this.dbCallbackPreguntas = this.dbRefPreguntas.on('value', snap => this.setState({ preguntas: snap.val() }));

        
    }

    componentWillUnmount() {

        this.dbRefPreguntas.off('value', this.dbCallbackPreguntas);
    }

    eliminarpregunta(key){
        if (window.confirm('La pregunta ya no estará disponible en la página de preguntas frecuente. ¿Desea continuar?')) {
            const database = firebase.database();
            database.ref(`preguntafrecuente/${key}/`).remove();
            
        }
    }

    modificarpregunta(key){
        const database = firebase.database();

        database.ref('preguntafrecuente/' + key).update({
            cambio: "1",
         });
    }

    mostrarpreguntas() {
        const { preguntas } = this.state;
        const question = [];

        Object.keys(preguntas).forEach((key, index) => {
            const pregunta = preguntas[key];
           
                pregunta.remove =  <Button variant="danger" onClick={() => this.eliminarpregunta(key)}  ><FiTrash2/>
                                </Button>
                pregunta.change =  <Link to="/ModificarPregunta">
                                    <Button variant="success" onClick={() => this.modificarpregunta(key)}><MdCreate/>
                                    </Button>
                                 </Link>
                question.push(pregunta);
            
        })

        return question;
    }


    render() {
        
        const questions = this.mostrarpreguntas();
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
                            data={questions}
                            columns={this.columnas}
                            filterable
                        />
                        <div className="text-center">
                        <Link to="/GestionPreguntas">
                                <Button type="submit" variant="warning">Regresar</Button>
                        </Link>
                            </div>
                       
                    </Alert>
                </Card>
            </Container>
        )
    }
}
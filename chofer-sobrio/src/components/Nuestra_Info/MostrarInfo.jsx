import React, { Component } from 'react'
import { Jumbotron, Container, Card, Alert, Button } from 'react-bootstrap';
import ReactTable from 'react-table';
import firebase from '../config/config';
import { Link } from 'react-router-dom';
import { FiTrash2 } from "react-icons/fi";
import { MdCreate } from "react-icons/md";

export default class MostrarInfo extends Component {

    constructor(props) {
        super(props);

        this.columnas = [{
            Header: 'Titulo',
            accessor: 'titulo',
            maxWidth: 250,
        }, {
            Header: 'Contenido',
            accessor: 'contenido',
            maxWidth: 450,
        },{
            Header: 'Eliminar',
            accessor: 'remove',
            maxWidth: 70,
            filterable: false,
        }, {
            Header: 'Modificar',
            accessor: 'change',
            maxWidth: 70,
            filterable: false,
        }];

        this.state = {
            informacion: []
        };

        this.mostrarinformacion = this.mostrarinformacion.bind(this);


    }

    async componentDidMount() {
            this.dbRefInformacion = firebase.database().ref('/informacion');
            this.dbCallbackInformacion = this.dbRefInformacion.on('value', snap => this.setState({ informacion: snap.val() }));

        
    }

    componentWillUnmount() {

        this.dbRefInformacion.off('value', this.dbCallbackInformacion);
    }

    eliminarInformacion(key){
        if (window.confirm('La información ya no estará disponible en la página de Nuestra Info. ¿Desea continuar?')) {
            const database = firebase.database();
            database.ref(`informacion/${key}/`).remove();
            
        }
    }

    modificarInformacion(key){
        const database = firebase.database();

        database.ref('informacion/' + key).update({
            cambio: "1",
         });
    }

    mostrarinformacion() {
        const { informacion } = this.state;
        const info = [];

        Object.keys(informacion).forEach((key, index) => {
            const inf = informacion[key];
           
                inf.remove =  <Button variant="danger" onClick={() => this.eliminarInformacion(key)}  ><FiTrash2/>
                                </Button>
                inf.change =  <Link to="/ModificarInfo">
                                    <Button variant="success" onClick={() => this.modificarInformacion(key)}><MdCreate/>
                                    </Button>
                                 </Link>
                info.push(inf);
            
        })

        return info;
    }


    render() {
        
        const info = this.mostrarinformacion();
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Información</h5>
                </Jumbotron>
                <Card border="light">
                    <Alert variant="secondary">
                    <h3>Información Disponible</h3>
                        <br />
                        <ReactTable
                            data={info}
                            columns={this.columnas}
                            filterable
                        />
                        <div className="text-center">
                        <Link to="/GestionInfo">
                                <Button type="submit" variant="warning">Regresar</Button>
                        </Link>
                            </div>
                       
                    </Alert>
                </Card>
            </Container>
        )
    }
}
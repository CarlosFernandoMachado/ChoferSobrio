import React, { Component } from 'react'
import { Jumbotron, Container, Card, Alert, Button } from 'react-bootstrap';
import ReactTable from 'react-table';
import './Visualizar.css'
import firebase from '../config/config';

export default class VisualizarChoferesInactivos extends Component {

    constructor(props) {
        super(props);

        this.columnas = [{
            Header: 'Nombre',
            accessor: 'nombre',
            maxWidth: 300,
        }, {
            Header: 'Identidad',
            accessor: 'identidad',
            maxWidth: 150,
        }, {
            Header: 'Telefono',
            accessor: 'telefono',
            maxWidth: 150,
        }, {
            Header: 'Telefono 2',
            accessor: 'telefono2',
            maxWidth: 300,
        }, {
            Header: 'Telefono 3 ',
            accessor: 'telefono3',
            maxWidth: 300,
        }, {
            Header: 'Correo',
            accessor: 'correo',
            maxWidth: 300,
        }, {
            Header: 'Accion',
            accessor: 'accion',
            maxWidth: 100,
            filterable: false,
        }];

        this.state = {
            infochofer: {},
            choferes: [],
            permisos: props.permisos,
        };

        this.mostrarchoferes = this.mostrarchoferes.bind(this);
        this.activar = this.activar.bind(this);
    }
    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const info = await firebase.database().ref('/chofer').once('value').then((snap) => {
                const choferlist = snap.val();
                let infochofer;
                Object.keys(choferlist).forEach((key, index) => {
                    const chofer = choferlist[key];
                    if (chofer.correo === user.email) {
                        chofer.index = index;
                        infochofer = chofer;
                    }
                });
                return infochofer;
            });

            // gerentes
            this.dbRefchofer = firebase.database().ref('/chofer');
            this.dbCallbackchofer = this.dbRefchofer.on('value', snap => this.setState({ choferes: snap.val() }));

            this.setState({
                infochofer: info,
            });
        }
    }

    componentWillUnmount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.dbRefchofer.off('value', this.dbCallbackchofer);
        }
    }

    mostrarchoferes() {
        const { choferes } = this.state;

        const conductores = [];

        Object.keys(choferes).forEach((key, index) => {
            const pedido = choferes[key];
            if (index !== 0 && choferes[key].estado =="inactivo") {
                pedido.accion = <Button variant="success" onClick={() => this.activar(key)}>Activar</Button>;
                conductores.push(pedido);
            }
        })

        return conductores;
    }


    async activar(keyChofer) {
        const database = firebase.database();

        const idChofer = await database.ref(`/chofer/${keyChofer}`).once('value').then(snap => snap.val().identidad);

        // ver si tiene reservaciones
        const tieneP = await database.ref('/pedido').once('value').then((snap) => {
            const pedidos = snap.val();
            let tiene = false;
            Object.keys(pedidos).forEach((key) => {
                const pedido = pedidos[key];
                if (pedido.estado === 'Ocupado' && pedido.idchofer === idChofer) {
                    tiene = true;
                }
            });
            return tiene;
        });

        if (tieneP) {
            window.alert('No se puede eliminar, el chofer tiene pedidos!');
        } else if (window.confirm('Seguro que desa activar esta cuenta?')) {
            database.ref('chofer/' + keyChofer).update({
                estado: 'activo'
            });
        }
    }


    render() {
        const pedidos = this.mostrarchoferes();
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Datos de los Choferes</h5>
                </Jumbotron>
                <Card border="light">
                    <Alert variant="secondary">
                    <h3>Choferes Inactivos</h3>
                        <br />
                        <ReactTable
                            data={pedidos}
                            columns={this.columnas}
                            filterable
                        />
                    </Alert>
                </Card>
            </Container>
        )
    }
}
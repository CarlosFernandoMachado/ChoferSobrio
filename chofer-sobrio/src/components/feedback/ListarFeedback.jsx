import React, { Component } from 'react'
import { Jumbotron, Container, Table, Card, Alert } from 'react-bootstrap';
import './ListarFeedback.css'
import firebase from '../config/config';

export default class ListarFeedback extends Component {

    constructor(props) {
        super(props);
        this.state = {
            infoGerente: {},
            comentarios: [],
        };

        this.mostrarComentarios = this.mostrarComentarios.bind(this);
    }

    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const info = await firebase.database().ref('/gerente').once('value').then((snap) => {
                const gerentelist = snap.val();
                let infoGerente;
                Object.keys(gerentelist).forEach((key, index) => {
                    const gerente = gerentelist[key];
                    if (gerente.correo === user.email) {
                        gerente.index = index;
                        infoGerente = gerente;
                    }
                });
                return infoGerente;
            });

            this.dbRefcomentario = firebase.database().ref('/comentarios');
            this.dbCallbackcomentario = this.dbRefcomentario.on('value', snap => this.setState({ comentarios: snap.val() }));

            this.setState({
                infoGerente: info,
            });
        }
    }

    componentWillUnmount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.dbRefcomentario.off('value', this.dbCallbackcomentario);
        }
    }

    mostrarComentarios() {
        const { comentarios, infoGerente } = this.state;
        const comentarioJSX = [];
        Object.keys(comentarios).forEach((key, index) => {
            const pedido = comentarios[key];
            if (index !== 0) {
                const { contenido } = pedido;
                comentarioJSX.push(
                    <tr key={index}>
                        <td>{contenido}</td>
                    </tr>
                );
            }
        })
        return comentarioJSX;
    }

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
                                    <th>comentario</th>
                                </tr>
                            </thead>
                            <tbody id="table_body">
                                {this.mostrarComentarios()}
                            </tbody>
                        </Table>
                    </Alert>
                </Card>
            </Container>
        )
    }
}
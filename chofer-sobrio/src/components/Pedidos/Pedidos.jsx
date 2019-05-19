import React, { Component } from 'react'
import { Jumbotron, Container, Table } from 'react-bootstrap';
import './Pedidos.css'

export default class Precios extends Component {
    render() {
        return (
            <Container>
                <Jumbotron>
                    <h2>Bienvidos a Chofer Sobrio</h2>
                    <p>Esta es la pagina de Pedidos!</p>
                </Jumbotron>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Table heading</th>
                            <th>Table heading</th>
                            <th>Table heading</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        )
    }
}
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Button, Card, Alert } from 'react-bootstrap';
import './Home.css'
import Map from '../Map/MapContainer'

export default class Home extends Component {
    render() {
        return (
            <Container>
                <Jumbotron>
                    <h2>Bienvenidos a Chofer Sobrio</h2>
                    <p>Esta es la pagina Home!</p>
                </Jumbotron>
                        <div id="mapa">
                            <Map/>
                        </div>
                <Link to="/pedirchofer">
                    <div class="text-center" id="button">
                        <Button variant="warning" >Pedir Chofer</Button>
                    </div>
                </Link>
            </Container>
        )
    }
}
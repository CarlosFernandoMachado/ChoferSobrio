import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Button, Card, Alert } from 'react-bootstrap';
import './Home.css'
import Map from '../Map/MapContainer'

export default class Home extends Component {
    render() {
        return (

            <Container>

                <div style={{ height: '330px', width: '82.5%', position: 'absolute', justifyContent: 'center', display: 'inline-block' }}>
                    <div class="text-center">
                        <Jumbotron fluid>
                            <h2>Bienvenidos a Chofer Sobrio</h2>
                            <p>Esta es la pagina Home!</p>
                        </Jumbotron>
                    </div>
                    <Map />
                    <div class="text-center">
                        <Alert variant="warning">
                            ¡Selecciona tu ubicación!
                        </Alert>
                    </div>
                </div>
                
                    <Link to="/pedirchofer">
                        <div class="text-center" id="button" style={{ paddingTop: 590 }}>
                            <Button variant="warning" >Pedir Chofer</Button>
                        </div>
                    </Link>
            </Container>
        )
    }
}
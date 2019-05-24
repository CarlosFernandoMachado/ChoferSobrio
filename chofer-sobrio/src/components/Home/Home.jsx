import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Button, Card, Alert } from 'react-bootstrap';
import './Home.css'
import Map from '../Map/MapContainer'

export default class Home extends Component {
    render() {
        return (
            <Container>
                <div className="outer-div">
                    <div className="jumbotron-div">
                        <Jumbotron fluid>
                            <h2>Bienvenidos a Chofer Sobrio</h2>
                            <p>Esta es la pagina Home!</p>
                        </Jumbotron>
                    </div>
                    <div className="map-div">
                        <Map />
                    </div>

                    <div className="button-div">
                        <Link to="/pedirchofer">
                            <div id="button">
                                <Button variant="warning" >Pedir Chofer</Button>
                            </div>
                        </Link>
                    </div>
                </div>
            </Container>
        )
    }
}
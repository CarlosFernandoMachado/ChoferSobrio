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
                        <Jumbotron fluid className="jumbo-boy">
                            <h1>Chofer Sobrio</h1>
                            <h5>Vuelve sin esquelas y sin accidentes a casa</h5>
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
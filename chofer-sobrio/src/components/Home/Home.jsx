import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Button } from 'react-bootstrap';
import './Home.css'

export default class Home extends Component {
    render() {
        return (
            <Container>
                <Jumbotron fluid>
                    <h2>Bienvenidos a Chofer Sobrio</h2>
                    <p>Esta es la pagina Home!</p>
                </Jumbotron>
                <Link to="/pedirchofer">
                <div class="text-center"> 
                        <Button type="submit" variant="warning" >Pedir Chofer</Button>
                </div>
                </Link>
            </Container>
        )
    }
}
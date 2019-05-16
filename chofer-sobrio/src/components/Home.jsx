import React , {Component} from 'react'
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Row, Col, Image, Button } from 'react-bootstrap';
import './Home.css'

export default class Home extends Component{
    render(){
        return (
            <Container>
                <Jumbotron>
                    <h2>Bienvidos a Chofer Sobrio</h2>
                    <p>Esta es la pagina Home!</p>
                </Jumbotron>
                <Link to="/precios">
                    <Button bsStyle="primary"Precios> Precios! </Button>
                </Link>
                <Link to="/seguridad">
                    <Button bsStyle="primary"Seguridad> Seguridad! </Button>
                </Link>
            </Container>
        )
    }
}
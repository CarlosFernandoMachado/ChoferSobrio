import React , {Component} from 'react'
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Row, Col, Image, Button } from 'react-bootstrap';
import './Seguridad.css'

export default class Seguridad extends Component{
    render(){
        return (
            <Container>
                <Jumbotron>
                    <h2>Bienvidos a Chofer Sobrio</h2>
                    <p>Esta es la pagina de Seguridad!</p>
                </Jumbotron>
            </Container>
        )
    }
}
import React , {Component} from 'react'
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Row, Col, Image, Button } from 'react-bootstrap';
import './Precios.css'

export default class Precios extends Component{
    render(){
        return (
            <Container>
                <Jumbotron>
                    <h2>Bienvidos a Chofer Sobrio</h2>
                    <p>Esta es la pagina precios!</p>
                </Jumbotron>
            </Container>
        )
    }
}
import React, { Component } from 'react'
import { Jumbotron, Container, Card, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class GestionPreguntas extends Component {

    


    render() {
        
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Gestionar Preguntas Frecuentes</h5>
                </Jumbotron>
                <Card className="text-center" bg="dark" text="white" border="warning" style={{ margin:'16px' }}>
                    <Card.Body>
                    <Card.Title>Crea una pregunta.</Card.Title>
                     <Card.Text>
                         Crea una nueva pregunta frecuente para que tus clientes no tengan más dudas.
                     </Card.Text>
                     <Link to="/CrearPregunta">
                                <Button type="submit" variant="warning">Agregar</Button>
                        </Link>
                 </Card.Body>
            </Card>
            <Card className="text-center" bg="dark" text="white" border="warning" style={{ margin:'16px' }}>
                    <Card.Body>
                    <Card.Title>Modifica o elimina una pregunta.</Card.Title>
                     <Card.Text>
                         Puedes corregir o eliminar cualquier pregunta con esta opción.
                     </Card.Text>
                     <Link to="/MostrarPreguntas">
                                <Button type="submit" variant="warning">Ver opción</Button>
                        </Link>
                 </Card.Body>
            </Card>
            </Container>
            
        )
    }
}
import React, { Component } from 'react'
import { Jumbotron, Container, Card, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class GestionInfo extends Component {

    


    render() {
        
        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Gestionar Información</h5>
                </Jumbotron>
                <Card className="text-center" bg="dark" text="white" border="warning" style={{ margin:'16px' }}>
                    <Card.Body>
                    <Card.Title>Agregar información.</Card.Title>
                     <Card.Text>
                         Agregar información a tu página.
                     </Card.Text>
                     <Link to="/CrearInfo">
                                <Button type="submit" variant="warning">Agregar</Button>
                        </Link>
                 </Card.Body>
            </Card>
            <Card className="text-center" bg="dark" text="white" border="warning" style={{ margin:'16px' }}>
                    <Card.Body>
                    <Card.Title>Modifica o elimina información.</Card.Title>
                     <Card.Text>
                         Puedes corregir o eliminar cualquier información con esta opción.
                     </Card.Text>
                     <Link to="/MostrarInfo">
                                <Button type="submit" variant="warning">Ver opción</Button>
                        </Link>
                 </Card.Body>
            </Card>
            </Container>
            
        )
    }
}
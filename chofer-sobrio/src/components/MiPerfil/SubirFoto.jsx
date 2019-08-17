import React, { Component } from 'react'
import FileBase64 from 'react-file-base64';
import { Jumbotron, Container, Button, Card, Alert } from 'react-bootstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import firebase from '../config/config';
import './SubirFoto.css';

export default class SubirFoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoChofer: {},
            file: {},
            mostrar: false,
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            const chofer = await firebase.database().ref('/chofer').once('value').then((snap) => {
                const choferes = snap.val();
                let chofer;
                Object.keys(choferes).forEach((key) => {
                    const tChofer = choferes[key];
                    if (tChofer.correo === user.email) {
                        tChofer.index = key;
                        chofer = tChofer;
                    }
                });
                return chofer;
            });

            this.setState({
                infoChofer: chofer,
            });
        }
    }

    getFiles(file) {
        const { infoChofer } = this.state;
        const infoChoferRes = { ...infoChofer };

        infoChoferRes.imagen = file.base64;
        firebase.database().ref(`/chofer/${infoChofer.index}`).set(infoChoferRes);

        this.setState({
            file: file,
            infoChofer: infoChoferRes,
            mostrar: true,

        });
    }

    toggleModal() {
        const { mostrar } = this.state;
        this.setState({ mostrar: !mostrar });
    }

    render() {
        const { mostrar } = this.state;

        return (
            <Container>
                <Jumbotron className="jumbo-boy" fluid>
                    <h1>Chofer Sobrio</h1>
                    <h5>Subir foto de Chofer</h5>
                </Jumbotron>
                <Card border="light">
                    <Alert variant="secondary">
                        <h3>Subir foto</h3>
                        <br />
                        <FileBase64
                            multiple={false}
                            onDone={this.getFiles.bind(this)}
                        />
                    </Alert>
                </Card>
                <Modal isOpen={mostrar} toggle={this.toggleModal} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Enhorabuena!</ModalHeader>
                    <ModalBody>Se guardo la foto!</ModalBody>
                    <ModalFooter>
                        <Button color="secondary" block onClick={this.toggleModal}>Vale</Button>
                    </ModalFooter>
                </Modal>
            </Container>
        );
    }
}

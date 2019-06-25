import React, { Component } from 'react'
import { Jumbotron, Container } from 'react-bootstrap';

export default class mapa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: this.props.latitud,
            lon: this.props.longitud,
        };
    }

    componentDidMount() {
        this.renderMap();
    }

    renderMap = () => {
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyArotdf5MfhV5c3VmS_KrgosKN4fZgwnrE&callback=initMap")
        window.initMap = this.initMap
    }

    initMap = () => {
        var lat = Number(parseFloat(this.state.lat).toFixed(4));
        var lon = Number(parseFloat(this.state.lon).toFixed(4));
        var tegucigalpa = { lat: lat, lng: lon };
        var map = new window.google.maps.Map(
            document.getElementById('map'), { zoom: 18, center: tegucigalpa });
        var marker = new window.google.maps.Marker({ position: tegucigalpa, map: map });
    }

    render() {
        return (
            <Container>
                <div className="outer-div">
                    <div className="jumbotron-div">
                        <Jumbotron className="jumbo-boy" fluid>
                            <h1>Chofer Sobrio</h1>
                            <h5>Mira la ubicacion del cliente</h5>
                        </Jumbotron>
                    </div>
                    <div className="map-div" id="map">
                    </div>
                </div>
            </Container>
        );
    }

}

function loadScript(url) {
    var index = window.document.getElementsByTagName("script")[0]
    var script = window.document.createElement("script")
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
}
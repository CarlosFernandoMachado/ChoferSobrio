import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Row, Col, Image, Button } from 'react-bootstrap';
import './Crear.css'
import Fire from './Fire';




export default class Crear extends Component {
    Crearchofer(id, identidad, name, number) {
        var database = Fire.database();
        database.ref('chofer/' + id).set({
            identidad: identidad,
            nombre: name,
            telefono: number
        });
    }
    Leerchofer(userId) {
        var database = Fire.database();
        var n = database.ref('/chofer/' + userId).once('value').then(function(snapshot) {
            var username = (snapshot.val() && snapshot.val().nombre) || 'Anonymous';

        })
        alert(n);

        return n;
    }
    modificarchofer(id, name, number) {
        var database = Fire.database();
        database.ref('chofer/' + id).update({

            nombre: name,
            telefono: number
        });
    }
    Eliminarchofer(id) {
        var database = Fire.database();
        database.ref('chofer/' + id).remove();
    }
    Creargerente(id, identidad, name, number) {
        var database = Fire.database();
        database.ref('gerente/' + id).set({
            identidad: identidad,
            nombre: name,
            telefono: number
        });
    }
    Leergerente(userId) {
        var database = Fire.database();
        var n = database.ref('/gerente/' + userId).once('value').then(function(snapshot) {
            var username = (snapshot.val() && snapshot.val().nombre) || 'Anonymous';

        })
        alert(n);

        return n;
    }
    modificargerente(id, name, number) {
        var database = Fire.database();
        database.ref('gerente/' + id).update({

            nombre: name,
            telefono: number
        });
    }
    EliminarGerente(id) {
        var database = Fire.database();
        database.ref('gerente/' + id).remove();
    }
    Crearcliente(id, color_vehiculo, marca, nombre, placa, telefono) {
        var database = Fire.database();
        database.ref('cliente/' + id).set({
            color_vehiculo: color_vehiculo,
            marca: marca,
            nombre: nombre,
            placa: placa,
            telefono: telefono
        });
    }
    Leercliente(userId) {
        var database = Fire.database();
        var n = database.ref('/cliente/' + userId).once('value').then(function(snapshot) {
            var username = (snapshot.val() && snapshot.val().nombre) || 'Anonymous';

        })
        alert(n);

        return n;
    }
    modificarcliente(id, color_vehiculo, marca, nombre, placa, telefono) {
        var database = Fire.database();
        database.ref('cliente/' + id).update({
            color_vehiculo: color_vehiculo,
            marca: marca,
            nombre: nombre,
            placa: placa,
            telefono: telefono

        });
    }
    Eliminarcliente(id) {
        var database = Fire.database();
        database.ref('cliente/' + id).remove();
    }
    render() {
        return (
            <div>Hello></div>



        )

    }

}

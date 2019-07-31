import React, { Component } from 'react'
import './Crear.css'
import Fire from '../config/config';
//import firebaseAuth from '../config/config';

function redirigir() {
    window.location = "/";
}
function redirigircrearcliente() {
    window.location = "/CrearCliente";
}
function redirigircrearchofer() {
    window.location = "/CrearChofer";
}
function redirigircreargerente() {
    window.location = "/CrearGerente";
}

export default class Crear extends Component {
    Crearchofer(id, identidad, name, number, email) {
        var database = Fire.database();
        database.ref('chofer/' + id).set({
            identidad: identidad,
            nombre: name,
            telefono: number,
            correo: email
        });
        Fire.auth().createUserWithEmailAndPassword(email, '123456').then(
            Fire.auth().sendPasswordResetEmail(email).then(
                alert("Se te ha enviado un correo de confirmación."))
        ).catch(alert("Usuario registrado, no se pudo enviar mensaje de confirmación"));
    }

    Leerchofer(userId) {
        var database = Fire.database();
        var n = database.ref('/chofer/' + userId).once('value').then(function (snapshot) {
            var username = (snapshot.val() && snapshot.val().nombre) || 'Anonymous';

        })

        return n;
    }
    modificarchofer(id, id2, name, number, email) {
        var database = Fire.database();
        database.ref('chofer/' + id).update({
            identidad: id2,
            nombre: name,
            telefono: number,
            correo: email,

        });
    }
    modificarvalidacionchofer(id, validado) {
        var database = Fire.database();
        database.ref('chofer/' + id).update({

            validado: validado

        });
    }
    modificarvalidacioncliente(id, validado) {
        var database = Fire.database();
        database.ref('cliente/' + id).update({

            validado: validado

        });
    }
    modificarvalidaciongerente(id, validado) {
        var database = Fire.database();
        database.ref('gerente/' + id).update({

            validado: validado

        });
    }
    modificarcontraseñachofer(id, contraseña) {
        var database = Fire.database();
        database.ref('chofer/' + id).update({
            contraseña: ""
        });
    }
    modificarcontraseñacliente(id, contraseña) {
        var database = Fire.database();
        database.ref('cliente/' + id).update({
            contraseña: ""
        });
    }
    update_password_cliente= () => {
        const email = Fire.auth().currentUser.email;
     
        Fire.auth().sendPasswordResetEmail(email)
        .then(function() {
            alert('Se ha enviado un link de cambio de contrasena a '+ email);
        });
      }
    modificarcontraseñagerente(id, contraseña) {
        var database = Fire.database();
        database.ref('gerente/' + id).update({
            contraseña: ""
        });
    }
    Eliminarchofer(id) {
        var database = Fire.database();
        database.ref('chofer/' + id).remove();
    }
    Creargerente(id, identidad, name, number, email) {
        var database = Fire.database();
        database.ref('gerente/' + id).set({
            identidad: identidad,
            nombre: name,
            telefono: number,
            correo: email

        });
        Fire.auth().createUserWithEmailAndPassword(email, '123456').then(
            Fire.auth().sendPasswordResetEmail(email).the(
                alert("Se te ha enviado un correo de confirmación."))
        );
    }
    Leergerente(userId) {
        var database = Fire.database();
        var n = database.ref('/gerente/' + userId).once('value').then(function (snapshot) {
            var username = (snapshot.val() && snapshot.val().nombre) || 'Anonymous';

        })

        return n;
    }
    modificargerente(id, id2, name, number, email) {
        var database = Fire.database();
        database.ref('gerente/' + id).update({
            identidad: id2,
            nombre: name,
            telefono: number,
            correo: email
        });
    }
    EliminarGerente(id) {
        var database = Fire.database();
        database.ref('gerente/' + id).remove();
    }
    Crearcliente(id, color_vehiculo, marca, nombre, placa, telefono, email) {
        var database = Fire.database();
        //window.alert("se registrara usuario");
        Fire.auth().createUserWithEmailAndPassword(email, '123456');
        database.ref('cliente/' + id).set({
            color_vehiculo: color_vehiculo,
            marca: marca,
            nombre: nombre,
            placa: placa,
            telefono: telefono,
            correo: email
        });





    }
    Leercliente(userId) {
        var database = Fire.database();
        var n = database.ref('/cliente/' + userId).once('value').then(function (snapshot) {
            var id = (snapshot.val() && snapshot.val().nombre) || 'Anonymous';

        })


        return n;
    }

    modificarcliente(id, color_vehiculo, marca, nombre, placa, telefono, email) {
        var database = Fire.database();
        database.ref('cliente/' + id).update({
            color_vehiculo: color_vehiculo,
            marca: marca,
            nombre: nombre,
            placa: placa,
            telefono: telefono,
            correo: email

        });
    }
    Eliminarcliente(id) {
        var database = Fire.database();
        database.ref('cliente/' + id).remove();
    }

    Crearpedido(id, color_vehiculo, destino, fecha, hora, marca, nombre, placa, telefono, ubicacion) {
        var database = Fire.database();
        database.ref('pedido/' + id).set({
            color: color_vehiculo,
            destino: destino,
            fecha: fecha,
            hora: hora,
            marca: marca,
            nombre: nombre,
            placa: placa,
            telefono: telefono,
            ubicacion: ubicacion,
            estado: "Disponible",
            idchofer: 0,
            mensaje: 'ninguno',
        });
    }
    Leerpedido(userId) {
        var database = Fire.database();
        var n = database.ref('/pedido/' + userId).once('value').then(function (snapshot) {
            var username = (snapshot.val() && snapshot.val().nombre) || 'Anonymous';

        })
        return n;
    }
    modificarpedido(id, color_vehiculo, destino, fecha, hora, marca, nombre, placa, telefono, ubicacion) {
        var database = Fire.database();
        database.ref('pedido/' + id).set({
            color: color_vehiculo,
            destino: destino,
            fecha: fecha,
            hora: hora,
            marca: marca,
            nombre: nombre,
            placa: placa,
            telefono: telefono,
            ubicacion: ubicacion
        });
    }
    Eliminarpedido(id) {
        var database = Fire.database();
        database.ref('pedido/' + id).remove();
    }

    async tienePedido(numId, database) {
        // ver si tiene reservaciones
        const tieneP = await database.ref('/pedido').once('value').then((snap) => {
            const pedidos = snap.val();
            let tiene = false;
            Object.keys(pedidos).forEach((key) => {
                const pedido = pedidos[key];
                if (pedido.estado === 'Ocupado' && pedido.idchofer === numId) {
                    tiene = true;
                }
            });
            return tiene;
        });
        return tieneP;
    }
    
    render() {
        var databse = null;
        var n = null;
        var identity;
        var name;
        var telephone;
        var email;
        var id = 0;
        var colour;
        var destination;
        var date;
        var hour;
        var brand;
        var plate;
        var location;
        if (this.props.validado && this.props.funcion === "crear_gerente") {
            database = Fire.database();
            identity = this.props.datos[0];
            name = this.props.datos[1];
            telephone = this.props.datos[2];
            email = this.props.datos[3];
            var estadocuenta = "activo"
            id = 0;
            var estado = 0;
            var estado2 = 0;
            id = 0;
            Fire.database().ref('gerente').orderByChild('identidad').equalTo(identity).once('value').then(function (snapshot) {
                estado = snapshot.exists()
                Fire.database().ref('gerente').orderByChild('correo').equalTo(email).once('value').then(function (snapshot) {
                    estado2 = snapshot.exists()
                    if (estado === true) {
                        alert("identidad invalida ya existe")
                        setTimeout(redirigircreargerente, 1000)
                    } else if (estado2 === true) {
                        alert("correo invalido ya existe")
                        setTimeout(redirigircreargerente, 1000)
                    } else {
                        n = database.ref('/referencias/').once('value').then(function (snapshot) {
                            id = (snapshot.val() && snapshot.val().id_gerente) || 'Anonymous';
                            id++;
                            database.ref('gerente/' + id).set({
                                correo: email,
                                estado: estadocuenta,
                                identidad: identity,
                                nombre: name,
                                telefono: telephone

                            });
                            database.ref('referencias/').update({
                                id_gerente: id
                            });
                        })

                        setTimeout(redirigir, 1000);
                    }
                });

            });


        }
        if (this.props.validado && this.props.funcion === "Crearpedido") {
            var database = Fire.database();
            colour = this.props.datos[0];
            destination = this.props.datos[1];
            date = this.props.datos[2];
            hour = this.props.datos[3];
            brand = this.props.datos[4];
            name = this.props.datos[5];
            plate = this.props.datos[6];
            telephone = this.props.datos[7];
            location = this.props.datos[8];

            id = 0;
            n = database.ref('/referencias/').once('value').then(function (snapshot) {
                id = (snapshot.val() && snapshot.val().id_pedido) || 'Anonymous';
                id++;
                database.ref('pedido/' + id).set({
                    color: colour,
                    destino: destination,
                    fecha: date,
                    hora: hour,
                    marca: brand,
                    nombre: name,
                    placa: plate,
                    telefono: telephone,
                    ubicacion: location,
                    estado: 'Disponible',
                    idchofer: 0,
                    mensaje: 'ninguno',

                });
                database.ref('referencias/').update({
                    id_pedido: id
                });
            })
            setTimeout(redirigir, 1000);
        }
        if (this.props.validado && this.props.funcion === "crear_cliente") {
            database = Fire.database();
            colour = this.props.datos[0];
            brand = this.props.datos[1];
            name = this.props.datos[2];
            plate = this.props.datos[3];
            telephone = this.props.datos[4];
            email = this.props.datos[5];
            var estadocuenta = "activo"
            var estado = 0;
            var estado2 = 0;
            id = 0;
            Fire.database().ref('cliente').orderByChild('placa').equalTo(plate).once('value').then(function (snapshot) {
                estado = snapshot.exists()
                Fire.database().ref('cliente').orderByChild('correo').equalTo(email).once('value').then(function (snapshot) {
                    estado2 = snapshot.exists()
                    if (estado === true) {
                        alert("placa invalida ya existe")
                        setTimeout(redirigircrearcliente, 1000)
                    } else if (estado2 === true) {
                        alert("correo invalido ya existe")
                        setTimeout(redirigircrearcliente, 1000)
                    } else {
                        n = database.ref('/referencias/').once('value').then(function (snapshot) {
                            id = (snapshot.val() && snapshot.val().id_cliente) || 'Anonymous';
                            id++;
                            database.ref('cliente/' + id).set({
                                color_vehiculo: colour,
                                correo: email,
                                estado: estadocuenta,
                                marca: brand,
                                nombre: name,
                                placa: plate,
                                telefono: telephone
                            });
                            database.ref('referencias/').update({
                                id_cliente: id
                            });
                        });
                        Fire.auth().createUserWithEmailAndPassword(email, '123456').then(
                            Fire.auth().sendPasswordResetEmail(email).then(
                            ).catch()
                        ).catch();
                        alert("¡Usuario registrado exitosamente!");

                        setTimeout(redirigir, 1000);
                    }
                });

            });

        }
        if (this.props.validado && this.props.funcion === "crear_chofer") {
            database = Fire.database();
            identity = this.props.datos[0];
            name = this.props.datos[1];
            telephone = this.props.datos[2];
            email = this.props.datos[3];
            id = 0;

            var estadocuenta = "activo"

            var estado = 0;
            var estado2 = 0;

            Fire.database().ref('chofer').orderByChild('identidad').equalTo(identity).once('value').then(function (snapshot) {
                estado = snapshot.exists()
                Fire.database().ref('chofer').orderByChild('correo').equalTo(email).once('value').then(function (snapshot) {
                    estado2 = snapshot.exists()
                    if (estado === true) {
                        alert("identidad invalida ya existe")
                        setTimeout(redirigircrearchofer, 1000)
                    } else if (estado2 === true) {
                        alert("correo invalido ya existe")
                        setTimeout(redirigircrearchofer, 1000)
                    } else {
                        n = database.ref('/referencias/').once('value').then(function (snapshot) {
                            id = (snapshot.val() && snapshot.val().id_chofer) || 'Anonymous';
                            id++;
                            database.ref('chofer/' + id).set({
                                correo: email,
                                estado: "activo",
                                identidad: identity,
                                nombre: name,
                                telefono: telephone

                            });
                            database.ref('referencias/').update({
                                id_chofer: id
                            });
                        });
                        Fire.auth().createUserWithEmailAndPassword(email, '123456').then(function (_userRecord) {
                            Fire.auth().sendPasswordResetEmail(email);
                        });
                        setTimeout(redirigir, 1000);
                    }
                });

            });





        }
        if (this.props.validado && this.props.funcion === "CrearComentario") {
            database = Fire.database();
            var comentario = this.props.datos;
            id = 0;
            n = database.ref('/referencias/').once('value').then(function (snapshot) {
                id = (snapshot.val() && snapshot.val().id_comentarios) || 'Anonymous';
                id++;
                database.ref('comentarios/' + id).set({
                    contenido: comentario

                });
                database.ref('referencias/').update({
                    id_comentarios: id
                });
            });
            setTimeout(redirigir, 1000);
        }
        if (this.props.validado && this.props.funcion === "crearhistorial") {
            database = Fire.database();
            var driver = this.props.datos[0];
            var driverid = this.props.datos[1];
            var customer = this.props.datos[2];
            colour = this.props.datos[3];
            destination = this.props.datos[4];
            date = this.props.datos[5];
            var hour_appointed = this.props.datos[6];
            var hour_delivered = this.props.datos[7];
            brand = this.props.datos[8];
            plate = this.props.datos[9];
            location = this.props.datos[10];
            id = 0;
            n = database.ref('/referencias/').once('value').then(function (snapshot) {
                id = (snapshot.val() && snapshot.val().id_historial) || 'Anonymous';
                id++;
                database.ref('Historial/' + id).set({
                    chofer: driver,
                    id_chofer: driverid,
                    cliente: customer,
                    color: colour,
                    destino: destination,
                    fecha: date,
                    hora_pedido: hour_appointed,
                    hora_final: hour_delivered,
                    marca: brand,
                    placa: plate,
                    ubicacion: location,
                });
                database.ref('referencias/').update({
                    id_historial: id
                });
            })
        }
        if (this.props.validado && this.props.funcion === "modificar_cliente") {
            database = Fire.database();
            colour = this.props.datos[0];
            brand = this.props.datos[1];
            name = this.props.datos[2];
            plate = this.props.datos[3];
            telephone = this.props.datos[4];
            email = this.props.datos[5];
            id = this.props.datos[6];
            this.modificarcliente(id, colour, brand, name, plate, telephone, email)
            setTimeout(redirigir, 1000);
        }
        if(this.props.validado && this.props.funcion === "password_cliente"){
            alert("Entroooo wey");
            this.update_password_cliente();
        }

        if (this.props.validado && this.props.funcion === "modificar_gerente") {
            database = Fire.database();
            identity = this.props.datos[0];
            name = this.props.datos[1];
            telephone = this.props.datos[2];
            email = this.props.datos[3];
            id = this.props.datos[4]
            this.modificargerente(id, identity, name, telephone, email);
            setTimeout(redirigir, 1000);
        }
        if(this.props.validado && this.props.funcion === "password_gerente"){
            alert("Entroooo wey");
            this.update_password_cliente();
        }
        if (this.props.validado && this.props.funcion === "modificar_chofer") {
            database = Fire.database();
            identity = this.props.datos[0];
            name = this.props.datos[1];
            telephone = this.props.datos[2];
            email = this.props.datos[3];
            id = this.props.datos[4]
            this.modificarchofer(id, identity, name, telephone, email);
            setTimeout(redirigir, 1000);
        }
        if(this.props.validado && this.props.funcion === "password_chofer"){
            alert("Entroooo wey");
            this.update_password_cliente();
        }
        if (this.props.validado && this.props.funcion === "eliminar_chofer") {

            var estadocuenta = "inactivo"
            const [ id, numId ] = this.props.datos;
            database = Fire.database();

            this.tienePedido(numId, database).then((tieneP) => {
                if (!tieneP) {
                    database.ref('chofer/' + id).update({
                        estado: estadocuenta,
                    });
                    setTimeout(redirigir, 1000);
                }
            });
        }
        if (this.props.validado && this.props.funcion === "eliminar_cliente") {

            var estadocuenta = "inactivo"
            id = this.props.datos[0]
            database = Fire.database();

            database.ref('cliente/' + id).update({
               estado:estadocuenta
            });


         
            setTimeout(redirigir, 1000);
        }
        if (this.props.validado && this.props.funcion === "eliminar_gerente") {
            var estadocuenta = "inactivo"
            id = this.props.datos[4]
            database = Fire.database();

            database.ref('gerente/' + id).update({
               estado:estadocuenta
            });


         
            setTimeout(redirigir, 1000);
        }



        return (
            <div>
            </div>
        )

    }

}

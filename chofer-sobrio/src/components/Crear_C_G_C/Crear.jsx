import React, { Component } from 'react'
import './Crear.css'
import Fire from '../config/config';
import firebase from '../config/config';
import swal from 'sweetalert';
import {messaging} from '../config/config';
//import firebaseAuth from '../config/config';

function redirigir() {
    window.location = "/";
}
function redirigirsesion() {
    window.location = "/iniciarSesion";
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

function redirigirPagoTarjeta(producto) {
    var urlPago;
    switch (producto) {
        case '0':
            urlPago = 'https://checkout.baccredomatic.com/ODQyMDQwMWQwNGU3M2Y2OTU5My42ODAxNTY1NDU1OTY4';
            break;
        case '1':
            urlPago = 'https://checkout.baccredomatic.com/M2E3MzcyYmE1ZDE0ZjU2NDQzNC4wNTgxNTY2MTgzMzAx';
            break;
        case '2':
            urlPago = 'https://checkout.baccredomatic.com/NTg3ZDBmNzUzNDVhNWU1M2EzODI4LjAxNTY2MTgzMTU2';
            break;
        case '3':
            urlPago = 'https://checkout.baccredomatic.com/MTczLjhhMTFmNDQwOTU0ZDM1MzY3MjAxNTY2MTgzOTYx';
            break;
        case 'Servicio por noche':
            urlPago = 'https://checkout.baccredomatic.com/MTU4NTkzN2EuYTg2ZDk4MzU0MTkwMDExNTY2MTg0NTc5';
            break;
        default:
            urlPago = 'https://checkout.baccredomatic.com/ODQyMDQwMWQwNGU3M2Y2OTU5My42ODAxNTY1NDU1OTY4';
        // code block
    }
    window.open(urlPago, '_blank');
    redirigir();

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
                swal("Exito!", "Se te ha enviado un correo de confirmación.", "success")

            ).catch(
                swal("Error!", "Usuario registrado, no se pudo enviar mensaje de confirmación", "warning")
            ));
    }

    Leerchofer(userId) {
        var database = Fire.database();
        var n = database.ref('/chofer/' + userId).once('value').then(function (snapshot) {
            var username = (snapshot.val() && snapshot.val().nombre) || 'Anonymous';
        })
        return n;
    }

    modificarchofer(id, id2, name, number, email, telefono2, telefono3) {
        var database = Fire.database();
        database.ref('chofer/' + id).update({
            identidad: id2,
            nombre: name,
            telefono: number,
            correo: email,
            telefono2: telefono2,
            telefono3: telefono3
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

    /* update_password_cliente = () => {
         const email = Fire.auth().currentUser.email;
         Fire.auth().sendPasswordResetEmail(email)
             .then(function () {
                 alert('Se ha enviado un link de cambio de contrasena a ' + email);
             });
     }*/

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
                swal("Exito!", "Se te ha enviado un correo de confirmación.", "success"))
        );
    }

    Leergerente(userId) {
        var database = Fire.database();
        var n = database.ref('/gerente/' + userId).once('value').then(function (snapshot) {
            var username = (snapshot.val() && snapshot.val().nombre) || 'Anonymous';
        })
        return n;
    }

    modificargerente(id, id2, name, number, email, telefono2, telefono3) {
        var database = Fire.database();
        database.ref('gerente/' + id).update({
            identidad: id2,
            nombre: name,
            telefono: number,
            correo: email,
            telefono2: telefono2,
            telefono3: telefono3
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

    modificarcliente(id, color_vehiculo, marca, nombre, placa, telefono, email, telefono2, telefono3) {
        var database = Fire.database();
        database.ref('cliente/' + id).update({
            color_vehiculo: color_vehiculo,
            marca: marca,
            nombre: nombre,
            placa: placa,
            telefono: telefono,
            correo: email,
            telefono2: telefono2,
            telefono3: telefono3

        });

    }


    Eliminarcliente(id) {
        var database = Fire.database();
        database.ref('cliente/' + id).remove();


    }

    Crearpedido(id, color_vehiculo, destino, fecha, hora, marca, nombre, placa, telefono, ubicacion, pago, paradas) {
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
            pago: pago,
            paradas: paradas,
            pago: pago,
        });
    }

    Crearcarro(id, color, correo, marca, placa) {
        var database = Fire.database();
        database.ref('carro/' + id).set({
            color: color,
            marca: marca,
            placa: placa,
            correo: correo,
        });
    }


    Leerpedido(userId) {
        var database = Fire.database();
        var n = database.ref('/pedido/' + userId).once('value').then(function (snapshot) {
            var username = (snapshot.val() && snapshot.val().nombre) || 'Anonymous';

        })
        return n;
    }

    modificarpedido(id, color_vehiculo, destino, fecha, hora, marca, nombre, placa, telefono, ubicacion, pago) {
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
            pago: pago,
        });
    }

    modificarCarro(key, colour, brand, plate) {
        var database = Fire.database();
        database.ref('carro/' + key).update({
            color: colour,
            marca: brand,
            placa: plate,
        });
    }

    modificarPregunta(key, question, answer) {
        var database = Fire.database();
        database.ref('preguntafrecuente/' + key).update({
            pregunta: question,
            respuesta: answer,
        });
        swal("Exito!", "La pregunta ha sido modificada, por favor accede a preguntas frecuentes para verificar el cambio.", "success")


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

    async tienePedidoCli(placa, database) {
        // ver si tiene reservaciones
        const tienePCli = await database.ref('/pedido').once('value').then((snap) => {
            const pedidosCli = snap.val();
            let tieneCli = false;
            Object.keys(pedidosCli).forEach((key) => {
                const pedidoCli = pedidosCli[key];
                if ((pedidoCli.estado === 'Ocupado' || pedidoCli.estado === 'Disponible') && pedidoCli.placa === placa) {
                    tieneCli = true;
                }
            });
            return tieneCli;
        });
        return tienePCli;
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
        var pago;
        var paradasAdicionales;
        var question;
        var answer;

        if (this.props.validado && this.props.funcion === "crear_gerente") {
            database = Fire.database();
            identity = this.props.datos[0];
            name = this.props.datos[1];
            telephone = this.props.datos[2];
            email = this.props.datos[3];
            var telefono2 = this.props.datos[4];
            var telefono3 = this.props.datos[5];
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
                        /*setTimeout(redirigircreargerente, 1000)*/
                        document.getElementById("identidad").value = "";
                    } else if (estado2 === true) {
                        alert("correo invalido ya existe")
                        /*setTimeout(redirigircreargerente, 1000)*/
                        document.getElementById("correo").value = "";
                    } else {
                        n = database.ref('/referencias/').once('value').then(function (snapshot) {
                            id = (snapshot.val() && snapshot.val().id_gerente) || 'Anonymous';
                            id++;
                            database.ref('gerente/' + id).set({
                                correo: email,
                                estado: estadocuenta,
                                identidad: identity,
                                nombre: name,
                                telefono: telephone,
                                telefono2: telefono2,
                                telefono3: telefono3
                            });
                            database.ref('referencias/').update({
                                id_gerente: id
                            });
                        })
                        swal("Exito!", "Gerente registrado exitosamente!", "success")
                            .then((value) => {
                                setTimeout(redirigir, 1000);

                            });

                    }
                });
            });
        }

        if (this.props.validado && this.props.funcion === "Crearpedido") {
            console.log(this.props.datos);
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
            pago = this.props.datos[9];
            paradasAdicionales = this.props.datos[10];
            var email12 = this.props.datos[11];

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
                    pago: pago,
                    paradas: paradasAdicionales,
                    correo: email12,
                });
                database.ref('referencias/').update({
                    id_pedido: id
                });
            })
            if (pago === "tarjeta") {
                redirigirPagoTarjeta(paradasAdicionales);
            }
            else {
                swal("Exito!", "Pedido realizado exitosamente!", "success")
                    .then((value) => {
                        setTimeout(redirigir, 1000);

                    });


            }
            //-------------------AQUI NOTIFICACION A TODOS LOS CHOFERES---------------------------
            Fire.database().ref('/Tokens_chofer').once('value').then((snap) => {
                const tokenlist = snap.val();
                Object.keys(tokenlist).forEach(key => {
                    const token = tokenlist[key];
                    console.log("Pue sse pa la puta",token.correo);
                    const tokenid = token.registro;
                    console.log(tokenid);
                    var registrationToken = tokenid;
                    var key2 = 'AAAA7m7eTR0:APA91bFcpYn7eaTNDEfvD8qKYWQAATFQyyKooYf_B_QuFJ6oALUUSpnjKu3OFysrX8q9I1UvjkL2ZSSLfzqzxDODWGyT1aZxtL3_9PbgwmgGucjr8K6TCwilu-iQmrUMsi2pIcMls2q8';
                    var to = registrationToken;
                    var notification = {
                        'title': 'PEDIDO NUEVO',
                        'body': 'Cliente: '+ email12,
                        'icon': 'firebase-logo.png',
                        'click_action': 'http://localhost:3000/reservaciones'
                    };

                    fetch('https://fcm.googleapis.com/fcm/send', {
                    'method': 'POST',
                    'headers': {
                        'Authorization': 'key=' + key2,
                        'Content-Type': 'application/json'
                    },
                    'body': JSON.stringify({
                        'notification': notification,
                        'to': to
                    })
                    }).then(function(response) {
                    console.log(response);
                    }).catch(function(error) {
                    console.error(error);
                    })
                    
                });
               
            });
            //-------------------FIN DE LAS NOTIFICACIONES PARA CHOFER----------------------------
        }

        if (this.props.validado && this.props.funcion === "Crearcarro") {
            var database = Fire.database();
            colour = this.props.datos[0];
            email = this.props.datos[1];
            brand = this.props.datos[2];
            plate = this.props.datos[3];
            id = 0;

            n = database.ref('/referencias/').once('value').then(function (snapshot) {
                id = (snapshot.val() && snapshot.val().id_carro) || 'Anonymous';
                id++;
                database.ref('carro/' + id).set({
                    color: colour,
                    marca: brand,
                    placa: plate,
                    correo: email,
                    cambio: "no",
                });
                database.ref('referencias/').update({
                    id_carro: id
                });
            });
            swal("Exito!", "Carro agregado exitosamente!", "success")
                .then((value) => {
                    setTimeout(redirigir, 1000);

                });

        }

        if (this.props.validado && this.props.funcion === "crear_cliente") {
            database = Fire.database();
            colour = this.props.datos[0];
            brand = this.props.datos[1];
            name = this.props.datos[2];
            plate = this.props.datos[3];
            telephone = this.props.datos[4];
            email = this.props.datos[5];
            var my_contraseña = this.props.datos[8];
            var telefono2 = this.props.datos[6]
            var telefono3 = this.props.datos[7]
            var estadocuenta = "activo"
            var estado = 0;
            var estado2 = 0;
            id = 0;
            Fire.database().ref('/referencias').once('value').then((snap) => {
                const referencia = snap.val();
               
                Object.keys(referencia).forEach(key => {
                    const cliente = referencia[key];
                    if (cliente.key === 'id_cliente') {
                        alert("Encontrado", cliente.key);
                        id = cliente;
                    }
                });
                
            });
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
                    telefono: telephone,
                    telefono2: telefono2,
                    telefono3: telefono3
                });
                database.ref('referencias/').update({
                    id_cliente: id
                });
            });

            /* Fire.auth().createUserWithEmailAndPassword(email, my_contraseña).then(
               Fire.auth().signInWithEmailAndPassword(email, my_contraseña).then(
               
               ).catch(),
           ).catch();*/
            Fire.auth().createUserWithEmailAndPassword(email, my_contraseña).then(function (user) {
                firebase.auth().signInWithEmailAndPassword(email, my_contraseña).catch(function (error) {
                    console.log(error.code);
                    console.log(error.message);
                });
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log('User did not sign up correctly');
                console.log(errorCode);
                console.console.log(errorMessage);
            });
            Fire.auth().onAuthStateChanged(function (user) {
                if (user) {
                    user.sendEmailVerification().then(
                        swal("Exito!", "Usuario registrado exitosamente! Se envio correo de verificacion", "success")
                            .then((value) => {
                                setTimeout(redirigir, 1000);

                            })



                    ).catch();
                } else {
                    // No user is signed in.
                }
            });


          
        }

        if (this.props.validado && this.props.funcion === "crear_chofer") {
            database = Fire.database();
            identity = this.props.datos[0];
            name = this.props.datos[1];
            telephone = this.props.datos[2];
            email = this.props.datos[3];
            var telefono2 = this.props.datos[4];
            var telefono3 = this.props.datos[5];
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
                        /*setTimeout(redirigircrearchofer, 1000)*/
                        document.getElementById("identidad").value = "";
                    } else if (estado2 === true) {
                        alert("correo invalido ya existe")
                        /*setTimeout(redirigircrearchofer, 1000)*/
                        document.getElementById("correo").value = "";
                    } else {
                        n = database.ref('/referencias/').once('value').then(function (snapshot) {
                            id = (snapshot.val() && snapshot.val().id_chofer) || 'Anonymous';
                            id++;
                            database.ref('chofer/' + id).set({
                                correo: email,
                                estado: "activo",
                                identidad: identity,
                                nombre: name,
                                telefono: telephone,
                                telefono2: telefono2,
                                telefono3: telefono3
                            });
                            database.ref('referencias/').update({
                                id_chofer: id
                            });
                        });
                        Fire.auth().createUserWithEmailAndPassword(email, '123456').then(function (_userRecord) {
                            Fire.auth().sendPasswordResetEmail(email);
                        });
                        swal("Exito!", "Chofer registrado exitosamente!", "success")
                        .then((value) => {
                            setTimeout(redirigir, 1000);
        
                        });
                        
                        
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

        if (this.props.validado && this.props.funcion === "crear_pregunta") {
            database = Fire.database();
            var pregunta = this.props.datos[0];
            var respuesta = this.props.datos[1];
            id = 0;
            n = database.ref('/referencias/').once('value').then(function (snapshot) {
                id = (snapshot.val() && snapshot.val().id_pregunta) || 'Anonymous';
                id++;
                database.ref('preguntafrecuente/' + id).set({
                    pregunta: pregunta,
                    respuesta: respuesta,
                    cambio: "0",
                });
                database.ref('referencias/').update({
                    id_pregunta: id
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
            var telefono2 = this.props.datos[7];
            var telefono3 = this.props.datos[8];
            this.modificarcliente(id, colour, brand, name, plate, telephone, email, telefono2, telefono3)
            swal("Exito!", "Modificado exitosamente!", "success")
            .then((value) => {
                setTimeout(redirigir, 1000);

            })
           
          
        }

        if (this.props.validado && this.props.funcion === "modificar_carro") {
            database = Fire.database();
            id = this.props.datos[0];
            brand = this.props.datos[1];
            plate = this.props.datos[2];
            colour = this.props.datos[3];
            this.modificarCarro(id, colour, brand, plate)


            swal("Exito!", "Modificado exitosamente!", "success")
            .then((value) => {
                setTimeout(redirigir, 1000);

            })
           
        }

        if (this.props.validado && this.props.funcion === "modificar_pregunta") {
            database = Fire.database();
            id = this.props.datos[0];
            question = this.props.datos[1];
            answer = this.props.datos[2];
            this.modificarPregunta(id, question, answer)
            swal("Exito!", "Modificado exitosamente!", "success")
            .then((value) => {
                setTimeout(redirigir, 1000);

            })
           
        }



        /*if (this.props.validado && this.props.funcion === "password_cliente") {
        
            this.update_password_cliente();
        }*/

        if (this.props.validado && this.props.funcion === "modificar_gerente") {
            database = Fire.database();
            identity = this.props.datos[0];
            name = this.props.datos[1];
            telephone = this.props.datos[2];
            email = this.props.datos[3];
            id = this.props.datos[4];
            var telefono2 = this.props.datos[5];
            var telefono3 = this.props.datos[6];
            this.modificargerente(id, identity, name, telephone, email, telefono2, telefono3);
            swal("Exito!", "Modificado exitosamente!", "success")
            .then((value) => {
                setTimeout(redirigir, 1000);

            })
           
        }

        /*if (this.props.validado && this.props.funcion === "password_gerente") {
            this.update_password_cliente();
        }*/

        if (this.props.validado && this.props.funcion === "modificar_chofer") {
            database = Fire.database();
            identity = this.props.datos[0];
            name = this.props.datos[1];
            telephone = this.props.datos[2];
            email = this.props.datos[3];
            id = this.props.datos[4];
            var telefono2 = this.props.datos[5];
            var telefono3 = this.props.datos[6]
            this.modificarchofer(id, identity, name, telephone, email, telefono2, telefono3);
            swal("Exito!", "Modificado exitosamente!", "success")
            .then((value) => {
                setTimeout(redirigir, 1000);

            })
           
        }

        /*if (this.props.validado && this.props.funcion === "password_chofer") {
            this.update_password_cliente();
        }*/

        if (this.props.validado && this.props.funcion === "eliminar_chofer") {
            var estadocuenta = "inactivo"
            const [id, numId] = this.props.datos;
            database = Fire.database();

            this.tienePedido(numId, database).then((tieneP) => {
                if (!tieneP) {
                    database.ref('chofer/' + id).update({
                        estado: estadocuenta,
                    });
                    setTimeout(redirigir, 1000);
                } else {
                    swal("Error!", "No puede desactivar la cuenta porque tiene pedido pendiente", "error")

                }
            });
        }
        if (this.props.validado && this.props.funcion === "eliminar_chofer_t") {
            var estadocuenta = "inactivo"
            const [id, numId] = this.props.datos;
            database = Fire.database();

            this.tienePedido(numId, database).then((tieneP) => {
                if (!tieneP) {
                    var database = Fire.database();
                    database.ref('chofer/' + id).remove();
                    setTimeout(redirigir, 1000);
                } else {
                    swal("Error!", "No puede Eliminar la cuenta porque tiene pedido pendiente", "error")
                }
            });
        }

        if (this.props.validado && this.props.funcion === "eliminar_cliente") {
            var estadocuenta = "inactivo"
            const [id, placa] = this.props.datos;
            //id = this.props.datos[0]
            database = Fire.database();

            this.tienePedidoCli(placa, database).then((tienePCli) => {
                if (!tienePCli) {
                    database.ref('cliente/' + id).update({
                        estado: estadocuenta
                    });
                    setTimeout(redirigir, 1000);
                } else {
                    swal("Error!", "No puede desactivar la cuenta porque tiene pedido pendiente, si desea desactivar la cuenta debera cancelar la reservacion o contactar al chofer en perfil de chofer", "error")

                }
            });

            /*
            database.ref('cliente/' + id).update({
                estado: estadocuenta
            });
            setTimeout(redirigir, 1000);
            */
        }
        if (this.props.validado && this.props.funcion === "eliminar_cliente_t") {


            var estadocuenta = "inactivo"
            const [id, placa] = this.props.datos;
            const user = JSON.parse(localStorage.getItem('user'));
            //id = this.props.datos[0]
            database = Fire.database();

            this.tienePedidoCli(placa, database).then((tienePCli) => {
                if (!tienePCli) {
                    var cont = 0;
                    if (user) {

                        var rootRef = firebase.database().ref().child("carro");
                        rootRef.on("child_added", snap => {
                            firebase.database().ref().child('carro').orderByChild('correo').equalTo(user.email).on("value", function (snapshot) {
                                console.log(snapshot.val());
                                snapshot.forEach(function (data) {
                                    var id2 = data.key;
                                    var database = Fire.database();
                                    database.ref('carro/' + id2).remove();
                                });
                            });
                        });
                    }
                    //id = this.props.datos[0]
                    database = Fire.database();
                    this.Eliminarcliente(id);
                    setTimeout(redirigirsesion, 1000);
                } else {
                    swal("Error!", "No puede eliminar la cuenta porque tiene pedido pendiente, si desea desactivar la cuenta debera cancelar la reservacion o contactar al chofer en perfil de chofer", "error")
                }
            });

            /*const user = JSON.parse(localStorage.getItem('user'));

            var cont = 0;
            if (user) {

                var rootRef = firebase.database().ref().child("carro");
                rootRef.on("child_added", snap => {
                    firebase.database().ref().child('carro').orderByChild('correo').equalTo(user.email).on("value", function (snapshot) {
                        console.log(snapshot.val());
                        snapshot.forEach(function (data) {
                            var id2 = data.key;
                            var database = Fire.database();
                            database.ref('carro/' + id2).remove();
                        });
                    });
                });
            }
            id = this.props.datos[0]
            database = Fire.database();
            this.Eliminarcliente(id);
            setTimeout(redirigirsesion, 1000);*/
        }

        if (this.props.validado && this.props.funcion === "eliminar_gerente") {
            var estadocuenta = "inactivo"
            id = this.props.datos[0]
            database = Fire.database();

            database.ref('gerente/' + id).update({
                estado: estadocuenta
            });
            setTimeout(redirigir, 1000);
        }
        if (this.props.validado && this.props.funcion === "eliminar_gerente_t") {

            id = this.props.datos[0]
            database = Fire.database();

            this.EliminarGerente(id);
            setTimeout(redirigir, 1000);
        }


        return (
            <div>
            </div>
        )

    }

}

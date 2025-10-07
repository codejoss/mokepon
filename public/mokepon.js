// Variables globales ---------

// Elementos HTML
const botonMascotaJugador = document.getElementById('boton-mascota') //Inicializa boton

const botonReiniciar = document.getElementById('boton-reiniciar')
const seccionAtaque = document.getElementById("seleccionar-ataque")

const seccionMascota = document.getElementById("seleccionar-mascota")

const spanMascotaJugador = document.getElementById("mascota-jugador")
const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

const spanPuntosJugador = document.getElementById("puntos-jugador")
const spanPuntosEnemigo = document.getElementById("puntos-enemigo")

const seccionMensajes = document.getElementById('resultado');

const ataquesDelJugador = document.getElementById('ataques-Jugador');
const ataquesDelEnemigo = document.getElementById('ataques-Enemigo');

const botonSeleccionarMascota = document.getElementById("boton-mascota");

const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const contenedorAtaques = document.getElementById('contenedor-ataques');

const sectionVerMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa");
// Termina elementos HTML

let jugadorSeleccionado = 0

let resultadoCombate;
let puntosJugador = 0;
let puntosEnemigo = 0;

let mokepones = []
let mokeponesEnemigo = []
let opcionDeMokepones;
let opcionAtaques;

let jugadorId = null;
let enemigoId = null;

let inputHipodoge;
let inputCapipepo;
let inputRatigueya;

let botonFuego;
let botonAgua;
let botonhierva;

let mascotaJugador;
let ataques;

let mascotaJugadorObjeto;

let botones = []
let arrayAtaqueJugador = [];

let ataquesMokeponEnemigo;
let arrayAtaqueEnemigo = []

let indexAtaqueJugador = [];
let indexAtaqueEnemigo = [];

let lienzo = mapa.getContext('2d');

let intervalo;
let mapaBackground = new Image();
<<<<<<< HEAD:js/mokepon.js
mapaBackground.src = "../assets/img/mokemap.png"
=======
mapaBackground.src = "assets/img/mokemap.png"
>>>>>>> 0a0a70bd8087dad6f75b86066fdca103ef173b49:public/mokepon.js

let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth - 50;
const anchoMinimoDelMapa = 300;
const anchoMaximoDelMapa = 500;

if (anchoDelMapa < anchoMinimoDelMapa) {
    anchoDelMapa = anchoMinimoDelMapa - 20;
} else if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20;
}


alturaQueBuscamos = anchoDelMapa * 600 / 800;
mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos;





<<<<<<< HEAD:js/mokepon.js
const capipepoimg = '../assets/img/capipepo.png';
const hipodogeimg = '../assets/img/hipodoge.png';
const ratigueyaimg = '../assets/img/ratigueya.png';

const ashFoto = "../assets/img/ash.png";
const garyOakFoto = "../assets/img/Gary_Oak.png";
=======
const capipepoimg = 'assets/img/capipepo.png';
const hipodogeimg = 'assets/img/hipodoge.png';
const ratigueyaimg = 'assets/img/ratigueya.png';

const ashFoto = "assets/img/ash.png";
const garyOakFoto = "sassets/img/Gary_Oak.png";
>>>>>>> 0a0a70bd8087dad6f75b86066fdca103ef173b49:public/mokepon.js

// ---------------------------

// CLASES ---------------------------

class Mokepon {
    
    constructor(nombre, foto, mapaFoto, x, y, id = null) {
        this.id = this.id
        this.nombre = nombre
        this.foto = foto
        this.ataques = []
        this.width = anchoDelMapa / 10
        this.height = alturaQueBuscamos / 10
        this.x = aleatorio((anchoDelMapa / 30), (anchoDelMapa - 80))
        this.y = aleatorio(0, alturaQueBuscamos - 80)
        this.mapaFoto = new Image()
        this.mapaFoto.src = mapaFoto
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.width,
            this.height
        )
}

}

// Creando objetos mokepones
// let hipodoge = new Mokepon('hipodoge', hipodogeimg, hipodogeimg, 10, 200)
// let capipepo = new Mokepon('capipepo', capipepoimg, capipepoimg,10, 200)
// let ratigueya = new Mokepon('ratigueya', ratigueyaimg, ratigueyaimg, 10, 200)
let hipodoge = new Mokepon('hipodoge', hipodogeimg, hipodogeimg)
let capipepo = new Mokepon('capipepo', capipepoimg, capipepoimg)
let ratigueya = new Mokepon('ratigueya', ratigueyaimg, ratigueyaimg)




// LISTA ATAQUES MOKEPONES
const HIPODOGE_ATAQUES = [
    {nombre: 'agua', id: 'boton-agua'},
    {nombre: 'agua', id: 'boton-agua'},
    {nombre: 'agua', id: 'boton-agua'},
    {nombre: 'hierva', id: 'boton-hierva'},
    {nombre: 'fuego', id: 'boton-fuego'}
]

const CAPIPEPO_ATAQUES = [
    {nombre: 'hierva', id: 'boton-agua'},
    {nombre: 'hierva', id: 'boton-agua'},
    {nombre: 'hierva', id: 'boton-hierva'},
    {nombre: 'agua', id: 'boton-agua'},
    {nombre: 'fuego', id: 'boton-fuego'}
]

const RATIGUEYA_ATAQUES = [
    {nombre: 'fuego', id: 'boton-agua'},
    {nombre: 'fuego', id: 'boton-agua'},
    {nombre: 'fuego', id: 'boton-fuego'},
    {nombre: 'agua', id: 'boton-agua'},
    {nombre: 'hierva', id: 'boton-hierva'}
]

// Insertando ataques de cada mascota
hipodoge.ataques.push(...HIPODOGE_ATAQUES)
// hipodogeEnemigo.ataques.push(...HIPODOGE_ATAQUES)

capipepo.ataques.push(...CAPIPEPO_ATAQUES)
// capipepoEnemigo.ataques.push(...CAPIPEPO_ATAQUES)

ratigueya.ataques.push(...RATIGUEYA_ATAQUES)
// ratigueyaEnemigo.ataques.push(...RATIGUEYA_ATAQUES)


mokepones.push(hipodoge, capipepo, ratigueya)

// -------------------------

// La funcion iniciar Juego permite comenzar el evento de escucha del clic del boton seleccionar mascota y éste ejecuta la función seleccionarMascotaJugador
function iniciarJuego() {

    // Deshabilita elementos del dom
    seccionAtaque.style.display = 'none';
    botonReiniciar.style.display = 'none';
    sectionVerMapa.style.display = 'none';



    // Genera las tarjetas de los mokepon de manera dinámica
    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="pet-cards" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones;

        inputHipodoge = document.getElementById("hipodoge")
        inputCapipepo = document.getElementById("capipepo")
        inputRatigueya = document.getElementById("ratigueya")
    })



    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)// Inicializa evento clic del boton

    // Boton reiniciar
    botonReiniciar.addEventListener("click", reiniciarJuego)

    unirseAlJuego()


} // --------------------------


function unirseAlJuego() {
    fetch("http://MacBook-Air-de-Josue.local:8080/unirse").then(function (res) {
            console.log(res)
            if (res.ok) {
                res.text().then(function(respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}


// Funcion que genera un número aleatorio
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}// --------------------------

// Permite selecciona marcota del jugador y del enemigo
function seleccionarMascotaJugador() {

    // seccionAtaque.style.display = 'flex'
    
    
    //Determinamos usando IF que mascota se encuentra seleccioanda usando la función .checked
    if (inputHipodoge.checked == true) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked == true) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked == true) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else {
        alert("No seleccionaste ninguna mascota")
        jugadorSeleccionado = 0
        return
        // reiniciarJuego();
    }
    
    sectionVerMapa.style.display = 'flex'
    seccionMascota.style.display = 'none'
    seleccionarMokepon(mascotaJugador)

    jugadorSeleccionado = 1
    desactivarBotonMascota();
    
    // Condicion: Si el jugador no elige mascota, no se le asigna mascota aleatoria a la PC
    if (jugadorSeleccionado == 1) {
        
        extraerAtaques(mascotaJugador)
    }
    iniciarMapa()
} // --------------------------

// FUNCION QUE PERMITE ENVIAR AL BACKEND EL ID DEL MOKEPON SELECCIONADO
function seleccionarMokepon(mascotaJugador) {
    fetch(`http://MacBook-Air-de-Josue.local:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}


function extraerAtaques(mascotaJugador) {
    
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques;
        }
    }
    console.log(ataques);
    mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        opcionAtaques = `
            <button class="button BAtaque"  id=${ataque.id}>${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += opcionAtaques;

    })

    botonFuego = document.getElementById('boton-fuego');
    botonAgua = document.getElementById('boton-agua');
    botonhierva = document.getElementById('boton-hierva');
    botones = document.querySelectorAll('.BAtaque');

    console.log(botones);
}

// ATAQUE JUGADOR
function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) =>{
            if (e.target.textContent === 'fuego'){
                arrayAtaqueJugador.push('fuego');
                console.log("JUGADOR: " + arrayAtaqueJugador);
                boton.disabled = true;
            }else if (e.target.textContent === 'agua') {
                arrayAtaqueJugador.push('agua');
                console.log("JUGADOR: " + arrayAtaqueJugador);
                boton.disabled = true;
            }else {
                arrayAtaqueJugador.push('hierva');
                console.log("JUGADOR: " + arrayAtaqueJugador);
                boton.disabled = true;
            }
            if (arrayAtaqueJugador.length === 5){
                enviarAtaques()
            }
        } )
    })
}


function enviarAtaques(){
    fetch(`http://MacBook-Air-de-Josue.local:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: arrayAtaqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://MacBook-Air-de-Josue.local:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if (res.ok){
                res.json()
                    .then(function ({ ataques }){
                        if (ataques.length === 5){
                            arrayAtaqueEnemigo = ataques
                            combat()
                        }
                    })
            }
        })
}

// Seleccion aleatoria de mascota de la PC
function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
    
} // --------------------------


// Ataque Enemigo Random
// function ataqueEnemigoRand() {
    
//     let ataqueEnemigoRand = aleatorio(0, ataquesMokeponEnemigo.length -1);
//     if (ataqueEnemigoRand == 0 || ataqueEnemigoRand == 1) {
//         arrayAtaqueEnemigo.push("fuego");
//     } else if (ataqueEnemigoRand == 3) {
//         arrayAtaqueEnemigo.push("hierva");
//     } else {
//         arrayAtaqueEnemigo.push("agua");
//     }
//     console.log("ENEMIGO: " + arrayAtaqueEnemigo)

//     if (arrayAtaqueJugador.length === 5) {
//         iniciarPelea();
//     }
    // crearMensajeAtaque(); }
    
    // --------------------------

function iniciarPelea() {
    console.log("Pelea INICIADA")
    combat();
    verificarPuntos();
    puntosJugadores()
}

function puntosJugadores() {
    
    spanPuntosJugador.innerHTML = puntosJugador;
    spanPuntosEnemigo.innerHTML = puntosEnemigo;

}

// Muestra mensajes de ataque de jugadores
function crearMensajeAtaque() {

    let nuevoAtaquedelJugador = document.createElement('p');
    let nuevoAtaquedelEnemigo = document.createElement('p');
    
    seccionMensajes.innerHTML = resultadoCombate;
    nuevoAtaquedelJugador.innerHTML = indexAtaqueJugador;
    nuevoAtaquedelEnemigo.innerHTML = indexAtaqueEnemigo;

    ataquesDelJugador.appendChild(nuevoAtaquedelJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaquedelEnemigo);

}

function mensajeFinal(resultadoFinal) {
    seccionMensajes.innerHTML = resultadoFinal

    activarBotonReiniciar();
    alert(resultadoFinal)
}

function verificarPuntos() {
    if (puntosJugador > puntosEnemigo) {
        mensajeFinal("GANASTE EL JUEGO 🎉");
    }if (puntosJugador < puntosEnemigo) {
        mensajeFinal("PERDISTE EL JUEGO 😢");
    }if (puntosJugador === puntosEnemigo){
        mensajeFinal("JUEGO EMPATADO ⛔️")
    }
}

function combat() {
    clearInterval(intervalo)
    
    for (let i = 0; i < arrayAtaqueJugador.length; i++) {
        
        if (arrayAtaqueJugador[i] === arrayAtaqueEnemigo[i]) {
            indexAmbosOponentes(i, i);
        }else if (
            (arrayAtaqueJugador[i] == 'fuego' && arrayAtaqueEnemigo[i] == 'hierva') ||
            (arrayAtaqueJugador[i] === 'agua' && arrayAtaqueEnemigo[i] === 'fuego') ||
            (arrayAtaqueJugador[i] === 'hierva' && arrayAtaqueEnemigo[i] === 'agua')) {
                indexAmbosOponentes(i, i);
                puntosJugador++
            }else {
                indexAmbosOponentes(i, i);
                puntosEnemigo++
            }

            crearMensajeAtaque();
    }
}

function indexAmbosOponentes (jugador, enemigo) {
    indexAtaqueJugador = arrayAtaqueJugador[jugador]
    indexAtaqueEnemigo = arrayAtaqueEnemigo[enemigo];
}

function activarBotonReiniciar(){
    botonReiniciar.disabled = false;
    botonReiniciar.style.display = "block"
}

function desactivarBotonMascota() {
    botonSeleccionarMascota.disabled = true;
}

function reiniciarJuego() {
    location.reload(); // Reincia el navegador
}


// MAPA
function iniciarMapa() {

    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador);

    intervalo = setInterval(pintarCanvas, 30)

    window.addEventListener('keydown', sePresionoUnaTecla);
    window.addEventListener('keyup', detenerMovimiento);
}

function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX;
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;
    lienzo.clearRect(0, 0, mapa.width, mapa.height);
    // Dibuja fondo
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    // Dibuja mascota jugador
    mascotaJugadorObjeto.pintarMokepon();
    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)
    mokeponesEnemigo.forEach(function(mokepon){
        mokepon.pintarMokepon()
        revisarcolision(mokepon)
    })

}

function enviarPosicion(x, y) {
    fetch(`http://MacBook-Air-de-Josue.local:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-type": "application/json"},
            body: JSON.stringify({
                x,
                y
            })
    })

    .then(function (res) {
        if (res.ok) {
            res.json()
            .then(function ({enemigos}){
                console.log(enemigos)

                
                mokeponesEnemigo = enemigos.map(function (enemigo){
                    let mokeponEnemigo = null
                    if (enemigo.mokepon != undefined) {

                    const mokeponNombre = enemigo.mokepon.nombre || ""

                    if (mokeponNombre === "hipodoge"){
                        mokeponEnemigo = new Mokepon('hipodoge', hipodogeimg, hipodogeimg, enemigo.id)
                    } else if (mokeponNombre === "capipepo") {
                        mokeponEnemigo = new Mokepon('capipepo', capipepoimg , capipepoimg, enemigo.id)
                    } else if (mokeponNombre === "ratigueya") {
                        mokeponEnemigo = new Mokepon('ratigueya', ratigueyaimg, ratigueyaimg, enemigo.id)
                    }                    
                    mokeponEnemigo.x = enemigo.x
                    mokeponEnemigo.y = enemigo.y
                    
                    return mokeponEnemigo
                }
                })

            })
        }
    })
}

// MOVIMIENTO DE PERSONAJES
function moverCapipepoArriba() {
    mascotaJugadorObjeto.velocidadY = -5;
    pintarCanvas();
}

function moverCapipepoAbajo() {
    mascotaJugadorObjeto.velocidadY = 5;
    pintarCanvas();
}

function moverCapipepoDerecha() {
    mascotaJugadorObjeto.velocidadX = 5;
    pintarCanvas();
}

function moverCapipepoIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5;
    pintarCanvas();
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0;
    mascotaJugadorObjeto.velocidadY = 0;

}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverCapipepoArriba();
            break;

        case 'ArrowDown':
            moverCapipepoAbajo();
            break;

        case 'ArrowRight':
            moverCapipepoDerecha();
            break;

        case 'ArrowLeft':
            moverCapipepoIzquierda();
            break;
    
        default:
            break;
    }
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i];
        }
    }
}

function revisarcolision(enemigo) {
    const arribaEnemigo = enemigo.y;
    const abajoEnemigo = enemigo.y + (enemigo.height - 25);
    const izquierdaEnemigo = enemigo.x;
    const derechaEnemigo = enemigo.x + (enemigo.width - 25);
   
    const arribaMascota = mascotaJugadorObjeto.y;
    const abajoMascota = mascotaJugadorObjeto.y + (mascotaJugadorObjeto.height - 25);
    const izquierdaMascota = mascotaJugadorObjeto.x;
    const derechaMascota = mascotaJugadorObjeto.x + (enemigo.width - 25);

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return;
    }
    
    clearInterval(intervalo);
    detenerMovimiento();
    sectionVerMapa.style.display = 'none'
    seccionAtaque.style.display = 'flex'
    console.log("Se detecto una colision")
    enemigoId = enemigo.id



    seleccionarMascotaEnemigo(enemigo)



}


// Indicamos al navegador que la función inicarJuego se inicie una vez que la ventana del navegador haya cargado todo el HTML
window.addEventListener("load", iniciarJuego);
// Variables globales ---------

// Server configuration - automatically detect environment
const getServerUrl = () => {
    // For development, use localhost
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:8080';
    }
    // For production, use the current host
    return `${window.location.protocol}//${window.location.hostname}:8080`;
};

const SERVER_URL = getServerUrl();

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
mapaBackground.src = "assets/img/mokemap.png"

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





const capipepoimg = 'assets/img/capipepo.png';
const hipodogeimg = 'assets/img/hipodoge.png';
const ratigueyaimg = 'assets/img/ratigueya.png';

const ashFoto = "assets/img/ash.png";
const garyOakFoto = "assets/img/Gary_Oak.png";

// ---------------------------

// CLASES ---------------------------

class Mokepon {
    
    constructor(nombre, foto, mapaFoto, x, y, id = null) {
        this.id = id
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
    {nombre: 'hierva', id: 'boton-hierva'},
    {nombre: 'hierva', id: 'boton-hierva'},
    {nombre: 'hierva', id: 'boton-hierva'},
    {nombre: 'agua', id: 'boton-agua'},
    {nombre: 'fuego', id: 'boton-fuego'}
]

const RATIGUEYA_ATAQUES = [
    {nombre: 'fuego', id: 'boton-fuego'},
    {nombre: 'fuego', id: 'boton-fuego'},
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
    seccionMascota.style.display = 'flex';



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
    // Generate a local player ID for offline play
    jugadorId = `offline_${Math.random().toString(36).substr(2, 9)}`;
    console.log('Playing in offline mode. Player ID:', jugadorId);
    // Note: Multiplayer features require a separate backend server
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
    console.log('Selected Mokepon (offline mode):', mascotaJugador);
    // Note: Server communication disabled for offline play
    // Uncomment the fetch code below when backend server is available
    /*
    fetch(`${SERVER_URL}/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
    */
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
    // This function is now handled by secuenciaAtaque
    // Just store the attacks for reference
    console.log('Attacks for', mascotaJugador, ':', ataques);
}

// ATAQUE JUGADOR
function secuenciaAtaque() {
    console.log('Setting up attack sequence');
    
    // Clear the container and rebuild buttons to avoid multiple listeners
    contenedorAtaques.innerHTML = '';
    
    // Get the current pet's attacks
    let ataquesMascota;
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataquesMascota = mokepones[i].ataques;
            break;
        }
    }
    
    // Rebuild attack buttons
    if (ataquesMascota) {
        ataquesMascota.forEach((ataque) => {
            const botonAtaque = document.createElement('button');
            botonAtaque.className = 'button BAtaque';
            botonAtaque.id = ataque.id;
            botonAtaque.textContent = ataque.nombre;
            
            // Add event listener directly
            botonAtaque.addEventListener('click', function(e) {
                if (!this.disabled && arrayAtaqueJugador.length < 5) {
                    const tipoAtaque = this.textContent;
                    
                    arrayAtaqueJugador.push(tipoAtaque);
                    console.log("JUGADOR: " + arrayAtaqueJugador);
                    this.disabled = true;
                    
                    if (arrayAtaqueJugador.length === 5) {
                        enviarAtaques();
                    }
                }
            });
            
            contenedorAtaques.appendChild(botonAtaque);
        });
    }
    
    // Update button references
    botones = document.querySelectorAll('.BAtaque');
    console.log('Attack buttons created:', botones.length);
}


function enviarAtaques(){
    console.log('Player attacks selected (offline mode):', arrayAtaqueJugador);
    
    // Validate that we have exactly 5 attacks
    if (arrayAtaqueJugador.length !== 5) {
        console.error('Error: arrayAtaqueJugador should have exactly 5 attacks, but has:', arrayAtaqueJugador.length);
        console.log('Current attacks:', arrayAtaqueJugador);
        // Reset and return to prevent invalid battle
        arrayAtaqueJugador = [];
        // Re-enable all buttons
        botones.forEach(boton => boton.disabled = false);
        return;
    }
    
    // Generate random enemy attacks for offline play
    generarAtaquesEnemigo();
    // Start combat immediately in offline mode - only call iniciarPelea which calls combat
    iniciarPelea();
}

function generarAtaquesEnemigo() {
    // Generate 5 random attacks for the enemy
    const tiposAtaque = ['fuego', 'agua', 'hierva'];
    arrayAtaqueEnemigo = [];
    for (let i = 0; i < 5; i++) {
        const ataqueAleatorio = tiposAtaque[aleatorio(0, tiposAtaque.length - 1)];
        arrayAtaqueEnemigo.push(ataqueAleatorio);
    }
    console.log('Enemy attacks generated (offline mode):', arrayAtaqueEnemigo);
}

// Legacy function - kept for compatibility but not used in offline mode
function obtenerAtaques() {
    console.log('obtenerAtaques called but not needed in offline mode');
}

// Seleccion aleatoria de mascota de la PC
function seleccionarMascotaEnemigo(enemigo) {
    console.log('Starting new battle - clearing previous state');
    console.log('Previous arrayAtaqueJugador:', arrayAtaqueJugador);
    console.log('Previous arrayAtaqueEnemigo:', arrayAtaqueEnemigo);
    
    // Clear previous battle data
    arrayAtaqueJugador = [];
    arrayAtaqueEnemigo = [];
    puntosJugador = 0;
    puntosEnemigo = 0;
    
    console.log('After reset - arrayAtaqueJugador:', arrayAtaqueJugador);
    console.log('After reset - arrayAtaqueEnemigo:', arrayAtaqueEnemigo);
    
    // Use the provided enemy object or generate a random one for offline play
    if (enemigo && enemigo.nombre && enemigo.ataques) {
        spanMascotaEnemigo.innerHTML = enemigo.nombre;
        ataquesMokeponEnemigo = enemigo.ataques;
    } else {
        // Generate random enemy for offline combat
        const tiposMokepon = ['hipodoge', 'capipepo', 'ratigueya'];
        const enemigoAleatorio = tiposMokepon[aleatorio(0, tiposMokepon.length - 1)];
        spanMascotaEnemigo.innerHTML = enemigoAleatorio;
        
        // Set enemy attacks based on type
        if (enemigoAleatorio === 'hipodoge') {
            ataquesMokeponEnemigo = HIPODOGE_ATAQUES;
        } else if (enemigoAleatorio === 'capipepo') {
            ataquesMokeponEnemigo = CAPIPEPO_ATAQUES;
        } else if (enemigoAleatorio === 'ratigueya') {
            ataquesMokeponEnemigo = RATIGUEYA_ATAQUES;
        }
    }
    
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
    // Clear previous attack displays
    ataquesDelJugador.innerHTML = '';
    ataquesDelEnemigo.innerHTML = '';
    
    combat();
    verificarPuntos();
    puntosJugadores()
}

function puntosJugadores() {
    
    spanPuntosJugador.innerHTML = `${puntosJugador} PTS`;
    spanPuntosEnemigo.innerHTML = `${puntosEnemigo} PTS`;

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
    } else if (puntosJugador < puntosEnemigo) {
        mensajeFinal("PERDISTE EL JUEGO 😢");
    } else if (puntosJugador === puntosEnemigo){
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

    // Make canvas focusable and focus it for keyboard controls
    mapa.setAttribute('tabindex', '0');
    mapa.focus();
    
    // Add game-active class to prevent page scrolling
    document.body.classList.add('game-active');

    intervalo = setInterval(pintarCanvas, 30)

    window.addEventListener('keydown', sePresionoUnaTecla);
    window.addEventListener('keyup', detenerMovimiento);
    
    // Add click event to canvas for easy battle trigger in offline mode
    /* mapa.addEventListener('click', function() {
        if (mokeponesEnemigo.length > 0) {
            console.log('Canvas clicked - starting battle!');
            iniciarBatallaOffline();
        }
    }); */
}

// Function to start battle in offline mode
function iniciarBatallaOffline() {
    clearInterval(intervalo);
    detenerMovimiento();
    // Remove game-active class to restore normal page scrolling
    document.body.classList.remove('game-active');
    sectionVerMapa.style.display = 'none'
    seccionAtaque.style.display = 'flex'
    console.log("Iniciando batalla offline");
    
    // Generate a random enemy for battle
    seleccionarMascotaEnemigo(null); // Pass null to trigger random enemy generation
}

function pintarCanvas() {
    // Update position
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX;
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;
    
    // Boundary collision detection - keep player within map bounds
    if (mascotaJugadorObjeto.x < 0) {
        mascotaJugadorObjeto.x = 0;
    }
    if (mascotaJugadorObjeto.y < 0) {
        mascotaJugadorObjeto.y = 0;
    }
    if (mascotaJugadorObjeto.x > mapa.width - mascotaJugadorObjeto.width) {
        mascotaJugadorObjeto.x = mapa.width - mascotaJugadorObjeto.width;
    }
    if (mascotaJugadorObjeto.y > mapa.height - mascotaJugadorObjeto.height) {
        mascotaJugadorObjeto.y = mapa.height - mascotaJugadorObjeto.height;
    }
    
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
    // Offline mode - generate local enemies if not already created
    if (mokeponesEnemigo.length === 0) {
        generarEnemigosLocales();
    }
    // Note: Position sync disabled for offline play
    console.log('Player position (offline mode):', {x, y});
}

function generarEnemigosLocales() {
    // Generate 2-3 random enemies for single-player mode
    const numEnemigos = aleatorio(2, 3);
    const tiposMokepon = ['hipodoge', 'capipepo', 'ratigueya'];
    const imagenesMap = {
        'hipodoge': hipodogeimg,
        'capipepo': capipepoimg, 
        'ratigueya': ratigueyaimg
    };
    
    mokeponesEnemigo = [];
    for (let i = 0; i < numEnemigos; i++) {
        const tipoAleatorio = tiposMokepon[aleatorio(0, tiposMokepon.length - 1)];
        const enemigo = new Mokepon(
            tipoAleatorio, 
            imagenesMap[tipoAleatorio], 
            imagenesMap[tipoAleatorio],
            0, 0, // x, y will be set by constructor randomly
            `enemy_${i + 1}`
        );
        
        // Assign attacks based on type
        if (tipoAleatorio === 'hipodoge') {
            enemigo.ataques = [...HIPODOGE_ATAQUES];
        } else if (tipoAleatorio === 'capipepo') {
            enemigo.ataques = [...CAPIPEPO_ATAQUES];
        } else if (tipoAleatorio === 'ratigueya') {
            enemigo.ataques = [...RATIGUEYA_ATAQUES];
        }
        
        mokeponesEnemigo.push(enemigo);
    }
    
    console.log('Generated local enemies:', mokeponesEnemigo);
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
            event.preventDefault(); // Prevent page scrolling
            moverCapipepoArriba();
            break;

        case 'ArrowDown':
            event.preventDefault(); // Prevent page scrolling
            moverCapipepoAbajo();
            break;

        case 'ArrowRight':
            event.preventDefault(); // Prevent page scrolling
            moverCapipepoDerecha();
            break;

        case 'ArrowLeft':
            event.preventDefault(); // Prevent page scrolling
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
    const derechaMascota = mascotaJugadorObjeto.x + (mascotaJugadorObjeto.width - 25);

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
    // Remove game-active class to restore normal page scrolling
    document.body.classList.remove('game-active');
    sectionVerMapa.style.display = 'none'
    seccionAtaque.style.display = 'flex'
    console.log("Se detecto una colision")
    enemigoId = enemigo.id



    seleccionarMascotaEnemigo(enemigo)



}


// Indicamos al navegador que la función inicarJuego se inicie una vez que la ventana del navegador haya cargado todo el HTML
window.addEventListener("load", iniciarJuego);
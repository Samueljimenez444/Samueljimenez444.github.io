class Jugador {
    constructor(id, nombre, equipoId) {
        this.id = id;
        this.nombre = nombre;
        this.equipoId = equipoId; // ID del equipo al que pertenece
    }
}

class Equipo {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
        this.jugadores = []; // Array para almacenar los jugadores del equipo
    }

    agregarJugador(jugador) {
        if (!this.jugadores.some(j => j.id === jugador.id)) {
            this.jugadores.push(jugador);
            jugador.equipoId = this.id; // Asignar el ID del equipo al jugador
        } else {
            console.error('El jugador ya está en este equipo.');
        }
    }

    eliminarJugador(jugadorId) {
        this.jugadores = this.jugadores.filter(j => j.id !== jugadorId);
    }

    obtenerEstadisticas() {
        return {
            nombre: this.nombre,
            numeroDeJugadores: this.jugadores.length
        };
    }
}

class Modelo {
    constructor() {
        this.equipos = this.cargarEquipos();
        this.jugadores = this.cargarJugadores();
    }

    // Métodos para gestionar equipos
    agregarEquipo(nombre) {
        const nuevoEquipo = new Equipo(Date.now(), nombre);
        this.equipos.push(nuevoEquipo);
        this.guardarEquipos();
    }

    eliminarEquipo(equipoId) {
        this.equipos = this.equipos.filter(e => e.id !== equipoId);
        this.guardarEquipos();
    }

    // Métodos para gestionar jugadores
    agregarJugador(nombre, equipoId) {
        const nuevoJugador = new Jugador(Date.now(), nombre, equipoId);
        const equipo = this.equipos.find(e => e.id === equipoId);
        if (equipo) {
            equipo.agregarJugador(nuevoJugador);
            this.jugadores.push(nuevoJugador);
            this.guardarEquipos();
            this.guardarJugadores();
        } else {
            console.error('El equipo no existe.');
        }
    }

    eliminarJugador(jugadorId) {
        this.jugadores = this.jugadores.filter(j => j.id !== jugadorId);
        this.equipos.forEach(equipo => equipo.eliminarJugador(jugadorId));
        this.guardarEquipos();
        this.guardarJugadores();
    }

    // Métodos para cargar y guardar datos en localStorage
    cargarEquipos() {
        const equipos = localStorage.getItem('equipos');
        return equipos ? JSON.parse(equipos).map(e => Object.assign(new Equipo(), e)) : [];
    }

    cargarJugadores() {
        const jugadores = localStorage.getItem('jugadores');
        return jugadores ? JSON.parse(jugadores).map(j => Object.assign(new Jugador(), j)) : [];
    }

    guardarEquipos() {
        localStorage.setItem('equipos', JSON.stringify(this.equipos));
    }

    guardarJugadores() {
        localStorage.setItem('jugadores', JSON.stringify(this.jugadores));
    }

    // Método para obtener estadísticas de un equipo
    obtenerEstadisticasEquipo(equipoId) {
        const equipo = this.equipos.find(e => e.id === equipoId);
        return equipo ? equipo.obtenerEstadisticas() : null;
    }
}

const modelo = new Modelo();

// Agregar equipos
modelo.agregarEquipo('Equipo A');
modelo.agregarEquipo('Equipo B');

// Agregar jugadores
modelo.agregarJugador('Juan', modelo.equipos[0].id);
modelo.agregarJugador('Pedro', modelo.equipos[0].id);
modelo.agregarJugador('Maria', modelo.equipos[1].id);

// Obtener estadísticas de un equipo
console.log(modelo.obtenerEstadisticasEquipo(modelo.equipos[0].id)); // { nombre: 'Equipo A', numeroDeJugadores: 2 }

// Eliminar un jugador
modelo.eliminarJugador(modelo.jugadores[0].id); // Eliminar a Juan

const { createApp } = Vue;

createApp({
    data() {
        return {
            personajes: [],
            textoBusqueda: '',
            casaElegida: 'Todas',
            personajeSeleccionado: null
        }
    },
    computed: {
        personajesFiltrados() {
            return this.personajes.filter(p => {
                const nombreOk = p.name.toLowerCase().includes(this.textoBusqueda.toLowerCase());
                const casaOk = this.casaElegida === 'Todas' || p.house === this.casaElegida;
                return nombreOk && casaOk;
            });
        },
        totalHechizosPosibles() {
            let totalPuntos = this.personajesFiltrados.length * 100;
            return totalPuntos / 10; 
        }
    },
    methods: {
        async cargarDatos() {
            const res = await axios.get('https://hp-api.onrender.com/api/characters');
            this.personajes = res.data.slice(0, 20);
        },
        mostrarModal(p) {
            this.personajeSeleccionado = p;
            const miModal = new bootstrap.Modal(document.getElementById('ventanaDetalles'));
            miModal.show();
        }
    },
    created() {
        this.cargarDatos();
    }
}).mount('#contenedor');
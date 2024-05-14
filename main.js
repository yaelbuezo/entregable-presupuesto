// pedir presupuesto
let presupuesto
function pedirPresupuesto() {
  presupuesto = prompt('¿Cuál es su presupuesto esta semana?')
  while (isNaN(presupuesto) || presupuesto <= 0) {
    alert('El monto ingresado es inválido. Por favor, ingresar un valor numérico.')
    presupuesto = prompt('¿Cuál es su presupuesto esta semana?')
  }
  presupuestoHTML()
}

// imprimir presupuesto
function presupuestoHTML() {
  const presupuestoInicial = document.getElementById('presupuesto')
  presupuestoInicial.textContent = presupuesto;
}
pedirPresupuesto()

// agregar gasto
const form = document.querySelector('#agregar-gasto')
form.addEventListener('submit', e => {
  e.preventDefault();
  
  const nombre = document.querySelector('#nombre').value;
  const monto = Number(document.querySelector('#monto').value);
  
  if(nombre === '' || monto === '') {
    alert('Ambos campos son obligatorios');
    return;
  } else if(monto <= 0 || isNaN(monto)) {
    alert('El monto ingresado es inválido. Por favor, ingresar un valor numérico.');
    return;
  }
  
  // genera objeto gasto
  const gasto = {nombre, monto}
});

// definir array gastado
const gastado = []
let total = 0

// ciclo - do while
const ingresarGastos = () => {
  do {
    gasto = nuevoGasto()
    gastado.push(gasto.monto)
    total += gasto.monto
    
    // if gastado>presupuesto, 'presupuesto excedido'
    if (total > presupuesto) {
      alert('Presupuesto excedido')
    }
  } while (total <= presupuesto);
}

// lista de gastos
// listaGastos(gastado) {
//   gastado.forEach(gasto => {
//     const {monto, nombre} = gasto;

//     const nuevoGasto = document.createElement('li');
//     nuevoGasto.className = 'list-group-item d-flex align-items-center';
//     nuevoGasto.innerHTML = `${nombre} <span>$ ${monto}</span>`;
//   });
// }

// calcular presupuesto restante
function calculaRestante(presupuesto) {
  const restante = presupuesto - total;
  return restante;
}

ingresarGastos();

restante = calculaRestante(presupuesto)
console.log('Su presupuesto restante es ' + restante)
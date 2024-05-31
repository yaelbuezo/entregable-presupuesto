// pedir presupuesto
let presupuesto
function pedirPresupuesto() {
  presupuesto = prompt('¿Cuál es su presupuesto esta semana?')
  while (isNaN(presupuesto) || presupuesto <= 0) {
    alert('El monto ingresado es inválido. Por favor, ingresar un valor numérico.')
    presupuesto = prompt('¿Cuál es su presupuesto esta semana?')
  }
}

// imprimir presupuesto
document.addEventListener("DOMContentLoaded", function() { 
  pedirPresupuesto()
  const presupuestoInicial = document.getElementById('inicial');
  presupuestoInicial.innerHTML = `${presupuesto}`;
});


// agregar gasto
let total = 0;
const form = document.querySelector('#agregar-gasto')

function limpiarForm() {
  form.reset();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  
  const nombre = document.querySelector('#nombre').value;
  const monto = Number(document.querySelector('#monto').value);
  
  if(nombre === '' || monto === '') {
    alert('Ambos campos son obligatorios');
    return;
  } else if(monto <= 0 || isNaN(monto)) {
    alert('El monto ingresado es inválido. Por favor, ingrese un valor numérico.');
    return;
  }
  
  const nuevoGasto = () => {
    return { nombre, monto }
  }
  
  const gastado = []

  const ingresarGastos = () => {
    let gasto
    do {
      gasto = nuevoGasto()
      gastado.push(gasto)
      total += monto
      
      if (total > presupuesto) {
        alert('Presupuesto excedido')
        gastado.pop() // elimina último gasto (si se excede)
        total -= monto;
        return; // exit the loop
      }
    } while (gastado <= presupuesto);
  }

  ingresarGastos()

  // imprimir gastos
  function listaGastos() {
    const lista = document.getElementById('lista-gastos')

    gastado.forEach(gasto => {
      const nuevoGasto = document.createElement('li');
      nuevoGasto.className = 'list-group-item d-flex align-items-center';
      nuevoGasto.innerHTML = `${gasto.nombre} - $${gasto.monto}`;
      lista.appendChild(nuevoGasto)
    });
  }

  limpiarForm()
  listaGastos()
  const totalGastado = document.getElementById('total')
  totalGastado.innerHTML = `${total}`;

  // calcular presupuesto restante
  function calculaRestante(presupuesto, total) {
    const restante = presupuesto - total;
    return restante;
  }
  const restante = calculaRestante(presupuesto, total)

  // imprimir restante
  calculaRestante()
  const presupuestoRestante = document.getElementById('restante');
  presupuestoRestante.innerHTML = `${restante}`;
});
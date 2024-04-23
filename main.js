// pedir presupuesto inicial 
let presupuesto = Number(prompt('De cuánto es su presupuesto esta semana?'))
console.log('Su presupuesto es ' + presupuesto);

if(isNaN(presupuesto)) {
  alert('El monto ingresado es inválido. Por favor, ingresar un valor numérico.')
  // volver a preguntar presupuesto
  presupuesto = Number(prompt('De cuánto es su presupuesto esta semana?'))
  console.log('Su presupuesto es ' + presupuesto);
}

// definir gasto: nombre y monto
let gasto = {}
function nuevoGasto() {
  gasto.nombre = prompt('Ingresa el nombre del gasto')
  gasto.monto = Number(prompt('Ingresa el monto gastado'))
  
  if(isNaN(gasto.monto)) {
    alert('El monto ingresado es inválido. Por favor, ingresar un valor numérico.')
    gasto.monto = Number(prompt('Ingresa el monto gastado'))
  }
  return gasto
}
console.log(gasto)

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

// calcular presupuesto restante
function calculaRestante(presupuesto) {
  const restante = presupuesto - total;
  return restante;
}

ingresarGastos();

restante = calculaRestante(presupuesto)
console.log('Su presupuesto restante es ' + restante)
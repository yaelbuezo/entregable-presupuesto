// pedir presupuesto
let presupuesto
function pedirPresupuesto() {
  Swal.fire({
    title: "¿Cuál es su presupuesto esta semana?",
    icon: "question",
    html: `
      <input
        type="number"
        placeholder="Presupuesto"
        class="swal2-input">
    `,
    showCancelButton: false,
    confirmButtonText: "Aceptar",
    preConfirm: () => {
      const inputValue = Swal.getPopup().querySelector('input').value;
      if (!inputValue || inputValue <= 0) {
        Swal.showValidationMessage("Por favor, ingrese un valor numérico válido.");
      }
      return inputValue;
    }
  }).then(result => {
    if (result.isConfirmed) {
      presupuesto = parseFloat(result.value);
      Swal.fire("Presupuesto ingresado", `Su presupuesto esta semana es: $${presupuesto}`, "success")
      .then(() => {
        mostrarPresupuesto();
      });
    }
  });
}

// imprimir presupuesto
function mostrarPresupuesto() {
  const presupuestoInicial = document.getElementById('inicial');
  presupuestoInicial.innerHTML = `${presupuesto}`;
}
document.addEventListener("DOMContentLoaded", function() { 
  pedirPresupuesto()
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
    msgAlerta('Ambos campos son obligatorios.');
    return;
  } else if(monto <= 0 || isNaN(monto)) {
    msgAlerta('El monto ingresado es inválido. Por favor, ingrese un valor numérico.');
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
        msgAlerta('Presupuesto excedido.')
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
      nuevoGasto.innerHTML = `Nombre: ${gasto.nombre} <br> Cantidad: $${gasto.monto}`;
      lista.appendChild(nuevoGasto)
    });

    // limpiar html
    const reset = document.querySelector('.btn-reset')
    reset.addEventListener('click', e => {
      e.preventDefault()
      lista.innerHTML = '';
      total = 0;
      totalGastado.innerHTML = `${total}`;
      presupuestoRestante.innerHTML = `${presupuesto}`;
      localStorage.clear()
    });
  }

  localStorage.setItem(nombre, monto);

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

// mensaje de alerta
function msgAlerta(mensaje) {
  const msg = document.createElement('p')
  msg.classList.add('text-end', 'text-danger')
  msg.textContent = mensaje;

  document.querySelector('.btn').insertAdjacentElement("beforebegin", msg)

  setTimeout(() => {
    msg.remove()
  }, 3000);
}

localStorage.clear()
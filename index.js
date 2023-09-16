// Obtener elementos del DOM
const botones = document.getElementsByClassName("boton");
const btn = document.getElementById("btn");
const pantallaActual = document.getElementById("actuales");
const pantallaAnterior = document.getElementById("anteriores");
const pantallaOperacionesAnteriores = document.getElementById(
  "anteriores-operacion"
);

let operaciones = "";
let resultado = "";
let cantidadRepiticiones = 0;
let terminado = false;
let cambioSigno = false;

const agregarNumero = (number) => {
  const dataAnterior = pantallaActual.innerHTML;

  if (dataAnterior.charAt(0) === "0") {
    pantallaActual.innerHTML = "";
    pantallaActual.innerHTML = `${number}`;
  } else {
    pantallaActual.innerHTML = `${dataAnterior}${number}`;
  }
};

const detectarSigno = (cadena) => {
  const cadenaSeparada = cadena.split("");

  for (let i = 0; i < cadenaSeparada.length; i++) {
    if (cadenaSeparada[i] === "+") {
      cantidadRepiticiones++;
    }
  }

  const pasable = cantidadRepiticiones >= 1 ? true : false;
  cantidadRepiticiones = cantidadRepiticiones > 1 && 0;

  return pasable;
};

const borrar = () => {
  const dataAnterior = pantallaActual.innerHTML;

  if (dataAnterior.charAt(0) === "0") {
    return;
  }
  const oldOperaciones = pantallaActual.innerText;
  pantallaActual.innerHTML = oldOperaciones.slice(0, oldOperaciones.length - 1);
};

const borrarSigno = () => {
  const dataAnterior = pantallaActual.innerHTML;
  const signo = dataAnterior.charAt(dataAnterior.length - 1);

  for (let i = 0; i <= dataAnterior.length; i++) {
    if (signo === "+" || signo === "-" || signo === "X" || signo === "÷") {
      const oldOperaciones = dataAnterior;
      pantallaActual.innerHTML = oldOperaciones.slice(
        0,
        oldOperaciones.length - 1
      );
    }
  }
};

const limpiar = () => {
  pantallaActual.innerHTML = "0";
};

const limpiarCompleto = () => {
  pantallaActual.innerHTML = "0";
  pantallaAnterior.innerHTML = "0";
  pantallaOperacionesAnteriores.innerHTML = "0";
  pantallaAnterior.classList.add("oculto");
  pantallaOperacionesAnteriores.classList.add("oculto");
  operaciones = "";
};

const efectuarOperacion = (operacion) => {
  const dataAnterior = pantallaActual.innerHTML;

  // Detectar si es necesario mostrar los label
  if (dataAnterior.endsWith(`${operacion}`)) {
    return;
  } else if (dataAnterior.endsWith(`${operacion}`) !== operacion) {
    console.log("entro");
    borrarSigno();
    pantallaActual.innerText = `${pantallaActual.innerText}${operacion}`;
  } else if (!dataAnterior.endsWith("+") || !dataAnterior.endsWith("-")) {
    // Que pendejo coñoooooo
    // pantallaOperacionesAnteriores.classList.add("oculto");

    cambioSigno = true;
    operaciones =
      operaciones === "" ? `${operaciones}${dataAnterior}` : dataAnterior;

    resultado = eval(operaciones);

    pantallaAnterior.innerText = resultado;
    pantallaActual.innerText = `${pantallaActual.innerText}${operacion}`;
  }

  if (dataAnterior.charAt(0) === "0" || dataAnterior.length === 0) {
    pantallaAnterior.classList.add("oculto");
    pantallaOperacionesAnteriores.classList.add("oculto");
    return;
  }

  if (terminado) {
    pantallaOperacionesAnteriores.innerText = pantallaAnterior.innerText;
    pantallaAnterior.innerText = pantallaActual.innerText;
    pantallaAnterior.classList.remove("oculto");
    pantallaOperacionesAnteriores.classList.remove("oculto");

    console.log("Hola");

    terminado = false;
  } else {
    pantallaAnterior.classList.remove("oculto");
  }

  if (cambioSigno === false) {
    cambioSigno === false;
    operaciones =
      operaciones === "" ? `${operaciones}${dataAnterior}` : dataAnterior;

    resultado = eval(operaciones);

    pantallaAnterior.innerText = resultado;
    pantallaActual.innerText = `${pantallaActual.innerText}${operacion}`;
  }
};

const igual = () => {
  if (pantallaActual.innerText === "0") {
    pantallaAnterior.classList.add("oculto");
    pantallaOperacionesAnteriores.classList.add("oculto");
    return;
  } else if (pantallaActual.innerText.endsWith("+") === true) {
    pantallaOperacionesAnteriores.classList.add("oculto");
    resultado = eval(resultado);
    pantallaAnterior.innerText = pantallaActual.innerText;
    pantallaActual.innerText = resultado.toString();
  } else if (detectarSigno(pantallaActual.innerText) && terminado === false) {
    pantallaOperacionesAnteriores.classList.add("oculto");
    resultado = eval(pantallaActual.innerText);
    operaciones = pantallaActual.innerText;
    pantallaActual.innerText = resultado.toString();
    pantallaAnterior.innerText = operaciones;
    terminado = true;
  } else {
    pantallaAnterior.classList.add("oculto");
  }
};

const agregarMetodos = () => {
  for (let i = 0; i < 20; i++) {
    if (Number(botones[i].innerHTML) <= 9) {
      botones[i].addEventListener("click", function () {
        agregarNumero(Number(botones[i].innerHTML));
      });
    }
    if (
      botones[i].innerHTML.toString() === "+" ||
      botones[i].innerHTML.toString() === "-" ||
      botones[i].innerHTML.toString() === "X" ||
      botones[i].innerHTML.toString() === "÷"
    ) {
      botones[i].addEventListener("click", function () {
        efectuarOperacion(botones[i].innerHTML.toString());
      });
    }
    if (botones[i].innerHTML.toString() === "Delete") {
      botones[i].addEventListener("click", borrar);
    }
    if (botones[i].innerHTML.toString() === "C") {
      botones[i].addEventListener("click", limpiar);
    }
    if (botones[i].innerHTML.toString() === "CE") {
      botones[i].addEventListener("click", limpiarCompleto);
    }
    if (botones[i].innerHTML.toString() === "=") {
      botones[i].addEventListener("click", igual);
    }
  }
};

agregarMetodos();

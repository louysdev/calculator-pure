// Obtener elementos del DOM
const botones = document.getElementsByClassName("boton");
const btn = document.getElementById("btn");
const pantallaActual = document.getElementById("actuales");
const pantallaAnterior = document.getElementById("anteriores");

let operaciones = "";
let resultado = "";
let cantidadRepiticiones = 0;

const agregarNumero = (number) => {
  const dataAnterior = pantallaActual.innerHTML;

  if (dataAnterior.charAt(0) === "0") {
    pantallaActual.innerHTML = "";
    pantallaActual.innerHTML = `${number}`;
  } else {
    pantallaActual.innerHTML = `${dataAnterior}${number}`;
  }
};

const detectarSignoRepetido = (cadena) => {
  console.log(cadena);
  const cadenaSeparada = cadena.split("");

  for (let i = 0; i < cadenaSeparada.length; i++) {
    if (cadenaSeparada[i] === "+") {
      cantidadRepiticiones++;
    }
  }

  const noPasable = cantidadRepiticiones > 1 ? true : false;
  cantidadRepiticiones = cantidadRepiticiones >= 2 && 0;

  return noPasable;
};

const limpiar = () => {
  pantallaActual.innerHTML = "0";
};

const limpiarCompleto = () => {
  pantallaActual.innerHTML = "0";
  pantallaAnterior.innerHTML = "0";
  operaciones = "";
};

const sumar = () => {
  const dataAnterior = pantallaActual.innerHTML;
  if (dataAnterior.charAt(0) === "0") return;

  operaciones =
    operaciones === ""
      ? `${operaciones}${dataAnterior}`
      : `${operaciones}+${dataAnterior}`;

  resultado = eval(operaciones);

  if (operaciones.includes("+")) {
    if (detectarSignoRepetido(operaciones)) {
      console.log("1 signos");
      pantallaAnterior.innerText = `${resultado}+${operaciones}`;
    } else {
      console.log("2 signos");
      pantallaAnterior.innerText = operaciones;
      pantallaActual.innerText = resultado;
      operaciones = resultado;
    }
  } else {
    pantallaAnterior.innerText = operaciones;
    pantallaActual.innerText = "0";
  }

  // if (valores[0] === undefined) {
  //   valores[0] = valoresActuales;
  //   pantalla.innerHTML = "";
  // } else if (valores[1] === undefined) {
  //   valores[1] = valoresActuales;
  //   pantalla.innerHTML = "";
  // } else {
  //   valores[2] = valores[0] + valores[1];
  //   pantalla.innerHTML = valores[2];
  // }

  // console.log(valores[0], valores[1], valores[2]);
};

detectarSignoRepetido("");

const agregarMetodos = () => {
  for (let i = 0; i < 20; i++) {
    if (Number(botones[i].innerHTML) <= 9) {
      botones[i].addEventListener("click", function () {
        agregarNumero(Number(botones[i].innerHTML));
      });
    }
    if (botones[i].innerHTML.toString() === "+") {
      botones[i].addEventListener("click", sumar);
    }
    if (botones[i].innerHTML.toString() === "C") {
      botones[i].addEventListener("click", limpiar);
    }
    if (botones[i].innerHTML.toString() === "CE") {
      botones[i].addEventListener("click", limpiarCompleto);
    }
  }
};

agregarMetodos();

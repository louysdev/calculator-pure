// Obtener elementos del DOM
const botones = document.getElementsByClassName("boton");
const btn = document.getElementById("btn");
const pantalla = document.getElementById("pantalla");

const valores = new Array(3);

const agregarNumero = (number) => {
  const dataAnterior = pantalla.innerHTML;

  if (dataAnterior.charAt(0) === "0") {
    pantalla.innerHTML = "";
    pantalla.innerHTML = `${number}`;
  } else {
    pantalla.innerHTML = `${dataAnterior}${number}`;
  }
};

const sumar = () => {
  console.log("ENTRO");
  const dataAnterior = pantalla.innerHTML;
  if (dataAnterior.charAt(0) === "0") return;

  const valoresActuales =
    pantalla.innerHTML.length != 0 && Number(pantalla.innerHTML);

  console.log(valoresActuales);

  if (valores[0] === undefined) {
    valores[0] = valoresActuales;
    pantalla.innerHTML = "";
  } else if (valores[1] === undefined) {
    valores[1] = valoresActuales;
    pantalla.innerHTML = "";
  } else {
    valores[2] = valores[0] + valores[1];
    pantalla.innerHTML = valores[2];
  }

  console.log(valores[0], valores[1], valores[2]);
};

const resultado = () => {};

const agregarMetodos = () => {
  for (let i = 0; i < 20; i++) {
    if (Number(botones[i].innerHTML) <= 9) {
      botones[i].addEventListener("click", function () {
        agregarNumero(Number(botones[i].innerHTML));
      });
    }
    if (botones[i].innerHTML.toString() == "+") {
      botones[i].addEventListener("click", sumar);
    }
  }
};

agregarMetodos();

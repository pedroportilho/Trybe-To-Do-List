const addButton = document.getElementById('criar-tarefa');
const rmvAllbutton = document.getElementById('apaga-tudo');
const rmvCompleted = document.getElementById('remover-finalizados');
const rmvSelected = document.getElementById('remover-selecionado');
const moveUp = document.getElementById('mover-cima');
const moveDown = document.getElementById('mover-baixo');
const salvar = document.getElementById('salvar-tarefas');
const tarefa = document.getElementById('texto-tarefa');
const lista = document.getElementById('lista-tarefas');
let elementos = [];

function clickElementoLista(event) {
  const remover = document.getElementsByClassName('selecionado');
  if (remover.length > 0) {
    remover[0].classList.remove('selecionado');
  }

  const clicado = event.target;
  clicado.classList.add('selecionado');
}

function checkElementoLista(event) {
  const clicado = event.target;

  if (clicado.classList.contains('completed')) {
    clicado.classList.remove('completed');
  } else {
    clicado.classList.add('completed');
  }
}

function criarTarefa() {
  const novaTarefa = document.createElement('li');
  novaTarefa.innerHTML = tarefa.value;

  novaTarefa.addEventListener('click', clickElementoLista);
  novaTarefa.addEventListener('dblclick', checkElementoLista);
  lista.appendChild(novaTarefa);
  elementos.push(novaTarefa);

  tarefa.value = '';
}

function apagarTudo() {
  for (let i = 0; i < elementos.length; i += 1) {
    lista.removeChild(elementos[i]);
  }
}

function apagarFinalizados() {
  for (let i = elementos.length; i > 0; i -= 1) {
    if (elementos[i - 1].classList.contains('completed')) {
      lista.removeChild(elementos[i - 1]);
      elementos.splice(i - 1, 1);
    }
  }
}

function apagarSelecionado() {
  for (let i = elementos.length; i > 0; i -= 1) {
    if (elementos[i - 1].classList.contains('selecionado')) {
      lista.removeChild(elementos[i - 1]);
      elementos.splice(i - 1, 1);
      break;
    }
  }
}

function salvarLista() {
  const listaStr = [];
  //  const listaClasses = [];

  for (let i = 0; i < elementos.length; i += 1) {
    listaStr[i] = elementos[i].outerHTML;
    //    listaClasses[i] = elementos[i].classList;
  }

  //  localStorage.setItem('classes', JSON.stringify(listaClasses));
  localStorage.setItem('lista', JSON.stringify(listaStr));
}

function recuperarLista() {
  const listaStr = JSON.parse(localStorage.getItem('lista'));

  for (let i = 0; i < listaStr.length; i += 1) {
    lista.innerHTML += listaStr[i];
  }

  elementos = document.getElementsByTagName('li');
  for (let i = 0; i < elementos.length; i += 1) {
    elementos[i].addEventListener('click', clickElementoLista);
    elementos[i].addEventListener('dblclick', checkElementoLista);
  }
}

function moverCima() {
  let aux;
  for (let i = 0; i < elementos.length; i += 1) {
    if (elementos[i].classList.contains('selecionado') && elementos[i].previousElementSibling) {
      lista.insertBefore(elementos[i], elementos[i].previousElementSibling);
      aux = elementos[i];
      elementos[i] = elementos[i - 1];
      elementos[i - 1] = aux;
      break;
    }
  }
}

function moverBaixo() {
  let aux;
  for (let i = 0; i < elementos.length; i += 1) {
    if (elementos[i].classList.contains('selecionado') && elementos[i].nextElementSibling) {
      lista.insertBefore(elementos[i].nextElementSibling, elementos[i]);
      aux = elementos[i];
      elementos[i] = elementos[i + 1];
      elementos[i + 1] = aux;
      break;
    }
  }
}

function start() {
  if (localStorage.getItem('lista') !== null) {
    recuperarLista();
  }
}

window.onload = start;
addButton.addEventListener('click', criarTarefa);
salvar.addEventListener('click', salvarLista);
moveUp.addEventListener('click', moverCima);
moveDown.addEventListener('click', moverBaixo);
rmvAllbutton.addEventListener('click', apagarTudo);
rmvCompleted.addEventListener('click', apagarFinalizados);
rmvSelected.addEventListener('click', apagarSelecionado);

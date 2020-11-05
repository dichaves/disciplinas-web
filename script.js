
document.addEventListener("DOMContentLoaded", function () {
  // const menu = document.getElementById('menu');
  // const landingPage = document.getElementById('landing-page');
  // content.style.display = 'none';
  // menu.style.display = 'none';
});

const menu = document.getElementById('menu');
const landingPage = document.getElementById('landing-page');
const landingPageButton = document.getElementById('landing-page-button');
const menuBackground = document.getElementById('menu-background');
const content = document.getElementById('content');

landingPageButton.onclick = hideLandingPage;

function hideLandingPage() {
  landingPageButton.style.visibility = "hidden";
  content.style.display = 'block';
  menu.style.display = 'block';
  landingPage.style.opacity = "0";
  menuBackground.style.width = "25vw";
  setTimeout(() => {
    landingPage.style.display = 'none';
    menu.style.opacity = "1";
  }, 2000);
  setTimeout(() => {
    menuBackground.style.display = 'none';
  }, 3000);
}



const anoAtual = 2020;
const semestreAtual = 1;
var anoEntrada = anoAtual;
var semestreEntrada = semestreAtual;
var semestresTrancados = 0;
var periodosEntreAnos = 0;
var correcaoSemestre = 0;
var meuPeriodo = 1;


const selectAno = document.getElementById('ano-entrada');
selectAno.onchange = function() {
  anoEntrada = selectAno.value;
  periodosEntreAnos = (anoAtual - anoEntrada) * 2;
  meuPeriodo = periodosEntreAnos + correcaoSemestre - semestresTrancados;
};

const radioUm = document.getElementById('ponto 1');
const radioDois = document.getElementById('ponto 2');
radioUm.onchange = atualizaSemestre;
radioDois.onchange = atualizaSemestre;


function atualizaSemestre() {
  if (this.checked) {
    semestreEntrada = this.value;
    correcaoSemestre = ((semestreEntrada == semestreAtual) ? 1 : 0);
    meuPeriodo = periodosEntreAnos + correcaoSemestre - semestresTrancados;
  }
}


const disciplinasNaoSelecionadas = document.getElementById('disciplinas-nao-selecionadas');
const disciplinasSelecionadas = document.getElementById('disciplinas-selecionadas');


var nomesDisciplinas = ['Todas do 1o período', 'Anatomia 1', 'Bioquímica 1', 'Citologia', 'Embriologia', 'Física e Biofísica',
  'Histologia', 'História da Fisioterapia'];

const thead1p = document.getElementById('tbody 1o periodo');
const thead2p = document.getElementById('tbody 2o periodo');


for (var i = 0; i < nomesDisciplinas.length; i++) {
  // adiciona disciplinas no menu
  var novaDisciplina = document.createElement('div');
  novaDisciplina.className = 'disciplina deselecionada';
  novaDisciplina.id = nomesDisciplinas[i];
  novaDisciplina.appendChild(document.createTextNode(nomesDisciplinas[i]));
  disciplinasNaoSelecionadas.appendChild(novaDisciplina);
  novaDisciplina.addEventListener('click', selecionaDisciplina);
  // adiciona disciplinas nas tabelas
  var tr = document.createElement('tr');
  tr.insertCell(0).innerHTML = 'FT024';
  tr.insertCell(1).innerHTML = nomesDisciplinas[i];
  tr.insertCell(2).innerHTML = '60h';
  tr.insertCell(3);
  tr.id = 'tr '.concat(nomesDisciplinas[i]);
  tr.style.display = 'table-row';
  thead1p.appendChild(tr);
}


atualizaPlaceholderText();

function selecionaDisciplina() {
  var disciplina = this.cloneNode(true);
  disciplina.className = "disciplina selecionada";
  disciplina.addEventListener('click', deselecionaDisciplina);
  disciplinasSelecionadas.appendChild(disciplina);
  // if (this.id.includes('o período') { removeTodasPeriodo(disciplina) };
  this.remove();
  atualizaContent(this.id);
  atualizaPlaceholderText();
}

// function removeTodasPeriodo(disciplina) {

// }

function deselecionaDisciplina() {
  var disciplina = this.cloneNode(true);
  disciplina.className = "disciplina deselecionada";
  disciplina.addEventListener('click', selecionaDisciplina);
  disciplinasNaoSelecionadas.appendChild(disciplina);
  this.remove();
  atualizaContent(this.id);
  atualizaPlaceholderText();
}

function atualizaPlaceholderText() {
  var placeText = 'As disciplinas selecionadas aparecerão aqui :-)';
  var placeholder = document.getElementById('placeholder-text');
  var text = disciplinasSelecionadas.textContent;
  var children = disciplinasSelecionadas.children;

  if (children.length > 0) {
    placeholder.remove();
  } else if (!text.includes(placeText)) {
      var placeholderSemSelecionadas = document.createElement('span');
      placeholderSemSelecionadas.appendChild(document.createTextNode(placeText));
      placeholderSemSelecionadas.id = 'placeholder-text';
      disciplinasSelecionadas.appendChild(placeholderSemSelecionadas);
  }
}


function atualizaContent(id) {
  tableRow = document.getElementById('tr '.concat(id));
  if (tableRow.style.display == 'table-row') {
    tableRow.style.display = 'none';
  } else {
    tableRow.style.display = 'table-row';
  }
}
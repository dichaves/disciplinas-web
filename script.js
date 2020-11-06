
document.addEventListener("DOMContentLoaded", function () {
  // const menu = document.getElementById('menu');
  // const landingPage = document.getElementById('landing-page');
  // content.style.display = 'none';
  // menu.style.display = 'none';
});

// ------------------     TRANSLADA LANDING PAGE     -------------------- 

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

// ----------     LIDA COM INPUTS RELATIVOS À ENTRADA E DETERMINA PERÍODO DO ALUNO     -------------------- 

// Do backend
const anoAtual = 2020;
const semestreAtual = 1;
const numeroMaximoSemestres = 18; // TODO: inativar radio para semestres impossíveis (ex: 2020.2 e ? 2011.1 ?)

// Valores iniciais dos inputs (ano e semestre atuais)
var anoEntrada = anoAtual;
var semestreEntrada = semestreAtual;
var semestresTrancados = 0; // TODO: adicionar opção p/ selecionar se trancou algum semestre

// NÃO MUDAR NENHUM VALOR A PARTIR DAQUI:
const selectAno = document.getElementById('ano-entrada');
const radiosSemestre = document.getElementsByName('semestre-entrada');

// Adiciona as tags <option> para ano ao Select
for (var ano = anoAtual; ano >= (anoAtual - parseInt(numeroMaximoSemestres / 2)); ano--) {
  var option = document.createElement('option');
  option.value = ano;
  option.innerHTML = ano;
  selectAno.append(option);
}

// Define o estado inicial de select e radios
selectAno.selectedIndex = 0;
radiosSemestre[semestreAtual - 1].checked = true;

// Cálculos do período atual em eventos 'onchange' (inputs selecionados)
//    Valores de acordo com os valores iniciais dos imputs  (ano e semestre atuais)
var periodosEntreAnos = (anoAtual - anoEntrada) * 2;
var correcaoSemestre = ((semestreEntrada == semestreAtual) ? 1 : 0);
var meuPeriodo = semestreAtual;

//    Quando 'onchange' é ativado
selectAno.onchange = function () {
  anoEntrada = selectAno.value;
  periodosEntreAnos = (anoAtual - anoEntrada) * 2;
  meuPeriodo = periodosEntreAnos + correcaoSemestre - semestresTrancados;
  console.log('Período do aluno: '.concat(meuPeriodo.toString()));
  console.log(radiosSemestre[semestreAtual - 1].checked);
};

radiosSemestre[0].onchange = atualizaSemestre;
radiosSemestre[1].onchange = atualizaSemestre;

function atualizaSemestre() {
  semestreEntrada = this.value;
  correcaoSemestre = ((semestreEntrada == semestreAtual) ? 1 : 0);
  meuPeriodo = periodosEntreAnos + correcaoSemestre - semestresTrancados;
  console.log('Período do aluno: '.concat(meuPeriodo.toString()));
}

// ------------------     "BANCO DE DADOS" - substituto do backend     --------------------

function Disciplina(periodo, codigo, nome, cargaHoraria) {
  this.periodo = periodo;
  this.codigo = codigo;
  this.nome = nome;
  this.cargaHoraria = cargaHoraria;
}

// 1o periodo
const nomesDisciplinas1 = ['Anatomia 1', 'Bioquímica 1', 'Citologia', 'Embriologia', 'Física e Biofísica',
  'Histologia', 'História da Fisioterapia'];
const codigosDisciplinas1 = ['AN001', 'BQ001', 'HE017', 'HE019', 'BR011', 'HE011', 'FT036'];
const cargasHorarias1 = ['90h', '60h', '30h', '30h', '60h', '60h', '30h'];
const periodosDisciplinas1 = [...nomesDisciplinas1].fill(1, 0, 7);

// 2o periodo
const nomesDisciplinas2 = ['Administração em Fisioterapia', 'Anatomia VI', 'Física e Biofísica 2', 'Fisiologia', 'Genética Humana 1',
  'Socio-antropologia'];
const codigosDisciplinas2 = ['FT007', 'AN214', 'BR012', 'FF001', 'GN215', 'CS006'];
const cargasHorarias2 = ['30h', '90h', '60h', '90h', '60h', '60h'];
const periodosDisciplinas2 = [...nomesDisciplinas2].fill(2, 0, 6);

// todos os periodos juntos
const nomesDisciplinas = nomesDisciplinas1.concat(nomesDisciplinas2);
const codigosDisciplinas = codigosDisciplinas1.concat(codigosDisciplinas2);
const cargasHorarias = cargasHorarias1.concat(cargasHorarias2);
const periodosDisciplinas = periodosDisciplinas1.concat(periodosDisciplinas2);

// cria array com todas os objetos tipo Disciplina
var disciplinasObjs = [];
for (var i = 0; i < nomesDisciplinas.length; i++) {
  var disciplinaObj = new Disciplina(periodosDisciplinas[i], codigosDisciplinas[i], nomesDisciplinas[i], cargasHorarias[i]);
  disciplinasObjs.push(disciplinaObj);
}

// ------------------     INICIALIZA DIVs P/ CADA PERÍODO E MENU     -------------------- 

// Do backend
const numeroPeriodos = 10;

// divPeriodo é o modelo da div que contém <h1> e <table>
const divPeriodo = document.getElementById('div-periodo');

const disciplinasNaoSelecionadas = document.getElementById('disciplinas-nao-selecionadas');
const disciplinasSelecionadas = document.getElementById('disciplinas-selecionadas');

// Iteração por cada período, adicionando sua <div> e disciplinas na tabela
for (var periodo = 1; periodo <= numeroPeriodos; periodo++) {
  adicionaDivPeriodo(periodo);
  adicionaDisciplinasNaTabelaNoMenu(periodo);
}
divPeriodo.remove();

function adicionaDivPeriodo(periodo) {
  var novaDivPeriodo = divPeriodo.cloneNode(true);
  var periodoStr = periodo.toString();
  novaDivPeriodo.id = 'div-periodo-'.concat(periodoStr);
  novaDivPeriodo.children[0].innerHTML = periodoStr.concat('o Período');
  novaDivPeriodo.children[1].children[1].id = 'tbody-periodo-'.concat(periodoStr);
  content.appendChild(novaDivPeriodo);
}

function adicionaDisciplinasNaTabelaNoMenu(periodo) {
  let disciplinasPeriodo = disciplinasObjs.filter(disciplina => disciplina.periodo == periodo);
  let tbodyPeriodo = document.getElementById('tbody-periodo-'.concat(periodo.toString()));

  let todasPeriodoStr = 'Todas do ' + periodo + 'o período'
  adicionaDisciplinaMenu(todasPeriodoStr, true);
  adicionaDisciplinaMenu(todasPeriodoStr, false);

  for (const disciplina of disciplinasPeriodo) {
    var tr = document.createElement('tr');
    tr.insertCell(0).innerHTML = disciplina.codigo;
    tr.insertCell(1).innerHTML = disciplina.nome;
    tr.insertCell(2).innerHTML = disciplina.cargaHoraria;
    tr.insertCell(3);
    tr.id = 'tr-'.concat(disciplina.nome);
    tr.style.display = 'table-row';
    tbodyPeriodo.appendChild(tr);

    adicionaDisciplinaMenu(disciplina.nome, true);
    adicionaDisciplinaMenu(disciplina.nome, false);
  }
}

function adicionaDisciplinaMenu(nome, selecionada) {
  var disciplina = document.createElement('div');
  disciplina.appendChild(document.createTextNode(nome));

  if (selecionada) {
    disciplina.className = 'selecionada disciplina';
    disciplina.id = 'selecionada-'.concat(nome);
    disciplina.style.display = 'none';
    disciplinasSelecionadas.appendChild(disciplina);
  } else {
    disciplina.className = 'deselecionada disciplina';
    disciplina.id = 'deselecionada-'.concat(nome);
    disciplinasNaoSelecionadas.appendChild(disciplina);
  }

  disciplina.addEventListener('click', atualizaDisciplinasMenu);
}

atualizaPlaceholderText();


// ------------------     EVENTOS ONCLICK     -------------------- 

function atualizaDisciplinasMenu() {
  var nomeDisciplina;

  if (this.id.startsWith('de')) {
    this.style.display = 'none';
    document.getElementById(this.id.substring(2)).style.display = 'block';
    nomeDisciplina = this.id.replace('deselecionada-', '');
  } else {
    this.style.display = 'none';
    document.getElementById('de'.concat(this.id)).style.display = 'block';
    nomeDisciplina = this.id.replace('selecionada-', '');
  } 

  if (this.id.endsWith('o período')) {
    let periodoStr = this.id.slice(-10, -9);
    let periodo = parseInt(periodoStr);
    let disciplinasPeriodo = disciplinasObjs.filter(disciplina => disciplina.periodo == periodo);
    for (const disciplina of disciplinasPeriodo) {
      disciplinaDeselecionadaMenu = document.getElementById('deselecionada-'.concat(disciplina.nome));
      disciplinaSelecionadaMenu = document.getElementById('selecionada-'.concat(disciplina.nome));
      if (this.id.startsWith('deselecionada-')) {
        disciplinaDeselecionadaMenu.style.display = 'none';
        if (disciplinaSelecionadaMenu.style.display == 'block') {
          disciplinaSelecionadaMenu.style.display = 'none';
        } else {
          atualizaContent(disciplina.nome);
        }
      } else {
        disciplinaDeselecionadaMenu.style.display = 'block';
        disciplinaSelecionadaMenu.style.display = 'none';
        atualizaContent(disciplina.nome);
      }
    }
  } else {
    atualizaContent(nomeDisciplina);
  }

  atualizaPlaceholderText();
}

function atualizaContent(nomeDisciplina) {
  var tableRow = document.getElementById('tr-'.concat(nomeDisciplina));
  if (tableRow.style.display == 'table-row') {
    tableRow.style.display = 'none';
  } else {
    tableRow.style.display = 'table-row';
  }
}

function atualizaPlaceholderText() {
  let placeholderStr = 'As disciplinas selecionadas aparecerão aqui :-)';
  let children = disciplinasSelecionadas.children;
  let placeholderSpan = document.getElementById('placeholder-span');
  
  let needsPlaceholder = true;
  let i = 1;
  while (needsPlaceholder && i < children.length) {
    needsPlaceholder = ((children[i].style.display == 'block') ? false : true);
    i += 1;
  }

  if (needsPlaceholder) {
    placeholderSpan.innerText = placeholderStr;
  } else {
    placeholderSpan.innerText = '';
  }
}
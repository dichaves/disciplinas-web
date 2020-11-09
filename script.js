document.addEventListener("DOMContentLoaded", function () {
  // const menu = document.getElementById('menu');
  // const landingPage = document.getElementById('landing-page');
  // perfil.style.display = 'none';
  // menu.style.display = 'none';
});

// ------------------     TRANSLADA LANDING PAGE     -------------------- 

const menu = document.getElementById('menu');
const landingPage = document.getElementById('landing-page');
const landingPageButton = document.getElementById('landing-page-button');
const menuBackground = document.getElementById('menu-background');
const perfil = document.getElementById('perfil');

landingPageButton.onclick = hideLandingPage;

function hideLandingPage() {
  landingPageButton.style.visibility = "hidden";
  perfil.style.display = 'block';
  menu.style.display = 'block';
  landingPage.style.opacity = "0";
  menuBackground.style.width = "24vw";
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
selectAno.onchange = function atualizaAno() {
  anoEntrada = selectAno.value;
  periodosEntreAnos = (anoAtual - anoEntrada) * 2;
  meuPeriodo = periodosEntreAnos + correcaoSemestre - semestresTrancados;
  console.log('Período do aluno: '.concat(meuPeriodo.toString()));
  marcaDisciplinasAtrasadas(meuPeriodo);
};

radiosSemestre[0].onchange = atualizaSemestre;
radiosSemestre[1].onchange = atualizaSemestre;

function atualizaSemestre() {
  semestreEntrada = this.value;
  correcaoSemestre = ((semestreEntrada == semestreAtual) ? 1 : 0);
  meuPeriodo = periodosEntreAnos + correcaoSemestre - semestresTrancados;
  console.log('Período do aluno: '.concat(meuPeriodo.toString()));
  marcaDisciplinasAtrasadas(meuPeriodo);
}

function marcaDisciplinasAtrasadas(meuPeriodo) {
  for (let i = 1; i < meuPeriodo; i++) {
    let tbody = document.getElementById('tbody-' + i);
    tbody.style.backgroundColor = 'rgba(255, 0, 0, 0.6)';
  }
  for (let j = numeroPeriodos; j >= meuPeriodo; j--) {
    let tbody = document.getElementById('tbody-' + j);
    tbody.style.backgroundColor = 'rgba(0, 0, 0, .1)'; // TODO: PEGAR VARIÁVEL CSS
  }
}

// ------------------     "BANCO DE DADOS" - substituto do backend     --------------------

function Disciplina(periodo, codigo, nome, cargaHoraria) {
  this.periodo = periodo;
  this.codigo = codigo;
  this.nome = nome;
  this.cargaHoraria = cargaHoraria;
  this.concluida = false;
  this.obrigatoria = true;
  this.temPreReq = ((this.periodo == 1) ? false : true);
  this.ehPreReq = true;
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

// Cria objetos tipo Disciplina e os coloca num array
var todosObjetosDisciplina = [];
for (var i = 0; i < nomesDisciplinas.length; i++) {
  var disciplinaObj = new Disciplina(periodosDisciplinas[i], codigosDisciplinas[i], nomesDisciplinas[i], cargasHorarias[i]);
  todosObjetosDisciplina.push(disciplinaObj);
}

// --------  INICIALIZA VALORES DE PERÍODOS E CADEIRAS EM <SECTION> NO PERFIL E <UL> DO MENU  -------- 

// Do backend
const numeroPeriodos = 10;

// Do HTML
const modeloPeriodoSection = document.getElementById('modelo-periodo'); // contém <h2> e <table>
const mainULMenu = document.getElementById('main-ul-menu');

// Iteração por cada período, adicionando sua <section> no perfil e <li> no menu
for (var periodo = 1; periodo <= numeroPeriodos; periodo++) {
  adicionaPeriodoSection(periodo);
  adicionaPeriodoLI(periodo);
}
modeloPeriodoSection.remove();

// Iteração por cada disciplina, adicionando sua <tr> no perfil e sua <li> no menu
for (const disciplina of todosObjetosDisciplina) {
  adicionaDisciplinaTR(disciplina);
  adicionaDisciplinaLI(disciplina);
}

function adicionaPeriodoSection(periodo) {
  var novoPeriodo = modeloPeriodoSection.cloneNode(true);
  novoPeriodo.id = 'section-' + periodo;
  novoPeriodo.children[0].innerHTML = periodo + 'o Período';
  novoPeriodo.children[1].children[1].id = 'tbody-' + periodo;

  perfil.appendChild(novoPeriodo);
}

function adicionaDisciplinaTR(disciplina) {
  var divEtiquetaEh = document.createElement('div');
  divEtiquetaEh.className = 'eh-pre-req';
  divEtiquetaEh.innerText = "é";
  divEtiquetaEh.style.visibility = ((disciplina.ehPreReq) ? 'visible' : 'hidden');
  var divEtiquetaTem = document.createElement('div');
  divEtiquetaTem.className = 'tem-pre-req';
  divEtiquetaTem.innerText = "tem";
  divEtiquetaTem.style.visibility = ((disciplina.temPreReq) ? 'visible' : 'hidden');
  
  var tr = document.createElement('tr');
  tr.insertCell(0).innerText = disciplina.codigo;
  tr.insertCell(1).innerText = disciplina.nome;
  tr.insertCell(2).innerText = disciplina.cargaHoraria;
  tr.insertCell(3).innerHTML = divEtiquetaEh.outerHTML + divEtiquetaTem.outerHTML;
  tr.id = 'tr-' + disciplina.nome;
  tr.className = 'tr-disciplina';
  tr.style.display = 'table-row';

  var tbodyPeriodo = document.getElementById('tbody-' + disciplina.periodo);
  tbodyPeriodo.appendChild(tr);
}

function adicionaPeriodoLI(periodo) {
  var periodoLI = document.createElement('li');
  periodoLI.className = "periodo-li";
  periodoLI.id = 'li-periodo-' + periodo;
  
  var todasPeriodoStr = 'Todas do ' + periodo + 'o período';
  adicionaLabelCheckbox(periodoLI, todasPeriodoStr);
  
  var periodoUL = document.createElement('ul');
  periodoUL.className = 'periodo-ul';
  periodoUL.id = 'ul-periodo-' + periodo;
  
  periodoLI.appendChild(periodoUL);
  mainULMenu.appendChild(periodoLI);
}

function adicionaDisciplinaLI(disciplina) {
  var disciplinaLI = document.createElement('li');
  disciplinaLI.className = "disciplina-li"
  disciplinaLI.id = 'li-disciplina-' + disciplina.nome;
  adicionaLabelCheckbox(disciplinaLI, disciplina.nome);

  var periodoUL = document.getElementById('ul-periodo-' + disciplina.periodo);
  periodoUL.appendChild(disciplinaLI);
}

function adicionaLabelCheckbox(liElement, nome) {
  var label = document.createElement('label');
  label.id = 'label-' + nome;
  liElement.appendChild(label)
  
  var input = document.createElement('input');
  input.type = 'checkbox';
  input.name = 'disciplinas-concluidas';
  input.value = nome;
  input.id = 'checkbox-' + nome;
  label.addEventListener('change', onChangeLICheckbox);
  
  var span = document.createElement('span');
  span.id = 'input-' + nome;
  span.innerText = nome;
  
  labelChildren = input.outerHTML + span.outerHTML;
  label.innerHTML = labelChildren;
}

// ------------------     EVENTOS ONCHANGE     -------------------- 
// TODO: fazer com o "backend" substituto

function onChangeLICheckbox() {
  const nome = this.id.slice('label-'.length);
  const concluida = document.getElementById('checkbox-' + nome).checked;

  if (nome.startsWith('Todas do ')) {
    var periodo = nome[9];
    atualizaPeriodoUL(periodo, concluida);
    atualizaPeriodoSection(periodo, concluida);
  } else {
    var periodo = getDisciplinas(todosObjetosDisciplina, 'nome', nome).periodo;
    atualizaDisciplinaTR(nome, concluida);
    atualizaPeriodoSection(periodo, checaSePeriodoConcluido(periodo));
  }
}

function atualizaPeriodoUL(periodo, concluida) {
  var periodoUL = document.getElementById('ul-periodo-' + periodo);
  periodoUL.style.display = (concluida ? 'none' : 'block');

  var checkboxElements = periodoUL.getElementsByTagName('input');
  for (checkbox of checkboxElements) {
    checkbox.checked = (concluida ? true : false);
    atualizaDisciplinaTR(checkbox.id.slice(9), concluida);
  }
}

function atualizaPeriodoSection(periodo, concluido) {
  var sectionPeriodo = document.getElementById('section-' + periodo);
  sectionPeriodo.style.display = (concluido ? 'none' : 'block');
}

function atualizaDisciplinaTR(nomeDisciplina, concluida) {
  var trDisciplina = document.getElementById('tr-' + nomeDisciplina);
  trDisciplina.style.display = (concluida ? 'none' : 'table-row');

  getDisciplinas(todosObjetosDisciplina, 'nome', nomeDisciplina).concluida = (concluida ? true : false);
}

function getDisciplinas(objetosDisciplina, atributo, valor) {
  var disciplinas = objetosDisciplina.filter(disciplina => disciplina[atributo] == valor);
  if (atributo == 'nome' || atributo == 'codigo') { disciplinas = disciplinas[0]; }
  return disciplinas;
}

function checaSePeriodoConcluido(periodo) {
  var disciplinasPeriodo = getDisciplinas(todosObjetosDisciplina, 'periodo', periodo);
  var disciplinasRestantesPeriodo = getDisciplinas(disciplinasPeriodo, 'concluida', false);
  var concluido = ((disciplinasRestantesPeriodo.length == 0) ? true : false);
  return concluido;
}

// ------------------     --------------------     -------------------- 
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
const conteudo = document.getElementById('conteudo');
const perfil = document.getElementById('perfil');

landingPageButton.onclick = hideLandingPage;

function hideLandingPage() {
  landingPageButton.style.visibility = "hidden";
  conteudo.style.display = 'block';
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

function Disciplina(periodo, codigo, nome, cargaHoraria, chPratica, preRequisitos) {
  this.periodo = periodo;
  this.codigo = codigo;
  this.nome = nome;
  this.cargaHoraria = cargaHoraria;
  this.chPratica = chPratica;
  this.preRequisitos = preRequisitos;
  this.prende = [];
  this.concluida = false;
  this.obrigatoria = true;
}

var nomesDisciplinas = [];
var codigosDisciplinas = [];
var cargasHorarias = [];
var chsPraticas = [];
var periodosDisciplinas = [];
var codigosPreReq = [];

// 1o periodo - 7 disciplinas
nomesDisciplinas = nomesDisciplinas.concat(['Anatomia 1', 'Bioquímica 1', 'Citologia', 'Embriologia', 'Física e Biofísica', 'Histologia', 'História da Fisioterapia']);
codigosDisciplinas = codigosDisciplinas.concat(['AN001', 'BQ001', 'HE017', 'HE019', 'BR011', 'HE011', 'FT036']);
cargasHorarias = cargasHorarias.concat([90, 60, 30, 30, 60, 60, 30]);
chsPraticas = chsPraticas.concat([60, 30, 15, 15, 30, 30, 0]);
periodosDisciplinas = periodosDisciplinas.concat([1, 1, 1, 1, 1, 1, 1]);
codigosPreReq = codigosPreReq.concat([null, null, null, null, null, null, null]);

// 2o periodo - 6 disciplinas
nomesDisciplinas = nomesDisciplinas.concat(['Administração em Fisioterapia', 'Anatomia VI', 'Física e Biofísica 2', 'Fisiologia', 'Genética Humana 1', 'Socio-antropologia']);
codigosDisciplinas = codigosDisciplinas.concat(['FT007', 'AN214', 'BR012', 'FF001', 'GN215', 'CS006']);
cargasHorarias = cargasHorarias.concat([30, 90, 60, 90, 60, 60]);
chsPraticas = chsPraticas.concat([0, 60, 30, 60, 30, 0]);
periodosDisciplinas = periodosDisciplinas.concat([2, 2, 2, 2, 2, 2]);
codigosPreReq = codigosPreReq.concat([null, ['AN001'], ['BR011'], ['AN001', 'HE011'], ['BQ001', 'HE017'], null]);

// 3o periodo - 6 disciplinas
nomesDisciplinas = nomesDisciplinas.concat(['Cinesiologia', 'Ética e Deontologia', 'Introdução à Saúde Pública', 'Metodol Do Trab Científico 1', 'Processos Patológicos Gerais 3', 'Psicologia 1']);
codigosDisciplinas = codigosDisciplinas.concat(['FT024', 'MS330', 'MS200', 'BI236', 'PA213', 'PS001']);
cargasHorarias = cargasHorarias.concat([90, 30, 60, 30, 45, 60]);
chsPraticas = chsPraticas.concat([30, 0, 30, 0, 30, 0]);
periodosDisciplinas = periodosDisciplinas.concat([3, 3, 3, 3, 3, 3]);
codigosPreReq = codigosPreReq.concat([['AN001', 'AN214', 'FF001'], null, null, null, ['AN001', 'FF001'], null]);

// 4o periodo - 7 disciplinas
nomesDisciplinas = nomesDisciplinas.concat(['Avaliação em Fisioterapia', 'Bioestatística', 'Eletroterapia', 'Fundamentos de Farmacologia', 'Hidroterapia', 'Patologia dos Órgãos e Sistemas 1', 'Termofototerapia']);
codigosDisciplinas = codigosDisciplinas.concat(['FT012', 'ET624', 'FT004', 'FF243', 'FT037', 'PA315', 'FT003']);
cargasHorarias = cargasHorarias.concat([75, 45, 75, 60, 45, 45, 60]);
chsPraticas = chsPraticas.concat([60, 0, 30, 30, 30, 15, 30]);
periodosDisciplinas = periodosDisciplinas.concat([4, 4, 4, 4, 4, 4, 4]);
codigosPreReq = codigosPreReq.concat([['FT024', 'PA213'], ['BI236'], ['BR012', 'FT024', 'PA213'], ['FF001'], ['FT024', 'PA213'], ['PA213'], ['BR012', 'FT024', 'PA213']]);

//5o periodo - 8 disciplinas
nomesDisciplinas = nomesDisciplinas.concat(['Angiologia', 'Cardiologia 1', 'Ginecologia e Obstetricia', 'Pediatria 1', 'Pneumologia 1', 'Recursos Cinesioterapêuticos', 'Reumatologia 1', 'Traumato-Ortopedia 1']);
codigosDisciplinas = codigosDisciplinas.concat(['CR203', 'MC204', 'MF305', 'MF301', 'MC206', 'FT028', 'MC205', 'CR206']);
cargasHorarias = cargasHorarias.concat([30, 30, 30, 30, 30, 150, 30, 45]);
chsPraticas = chsPraticas.concat([0, 0, 0, 0, 0, 90, 0, 0]);
periodosDisciplinas = periodosDisciplinas.concat([5, 5, 5, 5, 5, 5, 5, 5]);
codigosPreReq = codigosPreReq.concat([['PA315'], ['PA315'], ['PA315'], ['PA315'], ['PA315'], ['FT012'], ['PA315'], ['PA315']]);

// 6o periodo - 5 disciplinas
nomesDisciplinas = nomesDisciplinas.concat(['Fisioterapia Aplicada à Angiologia', 'Fisioterapia Aplicada à Saúde Coletiva', 'Neurologia', 'Psiquiatria', 'Recursos Terapêuticos Manuais']);
codigosDisciplinas = codigosDisciplinas.concat(['FT026', 'FT027', 'NP300', 'NP310', 'FT025']);
cargasHorarias = cargasHorarias.concat([60, 75, 45, 45, 75]);
chsPraticas = chsPraticas.concat([30, 60, 0, 0, 45]);
periodosDisciplinas = periodosDisciplinas.concat([6, 6, 6, 6, 6]);
codigosPreReq = codigosPreReq.concat([['CR203', 'FT012', 'FT028'], ['FT012', 'MS200'], ['PA315'], ['PA315', 'PS001'], ['FT024', 'PA315']]);

// 7o periodo - 4 disciplinas
nomesDisciplinas = nomesDisciplinas.concat(['Fisioterapia Aplicada à Neurologia', 'Fisioterapia Aplicada à Pneumologia', 'Fisioterapia Aplicada à Reumatologia', 'Fisioterapia Aplicada à Traumato-Ortopedia']);
codigosDisciplinas = codigosDisciplinas.concat(['FT039', 'FT040', 'FT041', 'FT042']);
cargasHorarias = cargasHorarias.concat([120, 90, 90, 120]);
chsPraticas = chsPraticas.concat([90, 60, 60, 90]);
periodosDisciplinas = periodosDisciplinas.concat([7, 7, 7, 7]);
codigosPreReq = codigosPreReq.concat([['FT012', 'FT025', 'FT028', 'NP300'], ['FT012', 'FT025', 'FT028', 'MC206'], ['FT003', 'FT004', 'FT012', 'FT025', 'FT028', 'MC205'], ['CR206', 'FT003', 'FT004', 'FT012', 'FT025', 'FT028']]);

// 8o periodo - 6 disciplinas
nomesDisciplinas = nomesDisciplinas.concat(['Fisioterapia Aplicada à Cardiologia', 'Fisioterapia Aplicada à Dermatofuncional', 'Fisioterapia Aplicada à Pacientes em UTI', 'Fisioterapia Aplicada à Pediatria', 'Fisioterapia Aplicada à Saúde da Mulher', 'Trabalho de Conclusão de Curso I']);
codigosDisciplinas = codigosDisciplinas.concat(['FT029', 'FT031', 'FT030', 'FT043', 'FT044', 'FT032']);
cargasHorarias = cargasHorarias.concat([60, 60, 90, 120, 90, 30]);
chsPraticas = chsPraticas.concat([30, 30, 60, 90, 60, 0]);
periodosDisciplinas = periodosDisciplinas.concat([8, 8, 8, 8, 8, 8]);
codigosPreReq = codigosPreReq.concat([['FT012', 'FT025', 'FT028', 'MC204'], ['FT003', 'FT004', 'FT012', 'FT025', 'FT028'], ['FT012', 'FT040', 'MC204'], ['FT012', 'FT025', 'FT028', 'MF301'], ['FT012', 'FT040', 'FT042', 'MF305'], ['ET624']]);

// 9o periodo - 1 disciplina
nomesDisciplinas = nomesDisciplinas.concat(['Prática Supervisionada I']);
codigosDisciplinas = codigosDisciplinas.concat(['FT034']);
cargasHorarias = cargasHorarias.concat([480]);
chsPraticas = chsPraticas.concat([480]);
periodosDisciplinas = periodosDisciplinas.concat([9]);
codigosPreReq = codigosPreReq.concat([['FT029', 'FT030', 'FT031', 'FT039', 'FT041', 'FT043', 'FT044']]);

// 10o periodo - 2 disciplinas
nomesDisciplinas = nomesDisciplinas.concat(['Prática Supervisionada II', 'Trabalho de Conclusão de Curso II']);
codigosDisciplinas = codigosDisciplinas.concat(['FT035', 'FT033']);
cargasHorarias = cargasHorarias.concat([480, 30]);
chsPraticas = chsPraticas.concat([480, 0]);
periodosDisciplinas = periodosDisciplinas.concat([10, 10]);
codigosPreReq = codigosPreReq.concat([['FT034'], ['FT032']]);


var todosObjetosDisciplina = [];
for (var i = 0; i < nomesDisciplinas.length; i++) {
  // Adiciona os pré-requisitos já como objetos Disciplina
  var preRequisitos = [];
  if (codigosPreReq[i]) {
    for (codigo of codigosPreReq[i]) {
      var disciplina = getDisciplinas(todosObjetosDisciplina, 'codigo', codigo);
      preRequisitos.push(disciplina);
    }
  }
  // Cria objetos tipo Disciplina e os coloca num array
  var novaDisciplina = new Disciplina(periodosDisciplinas[i], codigosDisciplinas[i], nomesDisciplinas[i], cargasHorarias[i], chsPraticas[i], preRequisitos);
  todosObjetosDisciplina.push(novaDisciplina);
}

// Adiciona em cada objeto Disciplina as disciplinas que ela prende
for (disciplina of todosObjetosDisciplina) {
  for (disciplinaPreReq of disciplina.preRequisitos) {
    disciplinaPreReq.prende.push(disciplina);
  }
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
  var divEtiquetaTem = document.createElement('div');
  divEtiquetaTem.className = 'tem-pre-req';
  divEtiquetaTem.id = "tem-" + disciplina.nome;
  divEtiquetaTem.innerText = "tem";
  divEtiquetaTem.style.visibility = ((disciplina.preRequisitos.length > 0) ? 'visible' : 'hidden');
  var divEtiquetaEh = document.createElement('div');
  divEtiquetaEh.className = 'eh-pre-req';
  divEtiquetaEh.id = "eh-" + disciplina.nome;
  divEtiquetaEh.innerText = "é";
  divEtiquetaEh.style.visibility = ((disciplina.prende.length > 0) ? 'visible' : 'hidden');

  var spanTooltip = document.createElement('span');
  for (preReq of disciplina.preRequisitos) { spanTooltip.innerHTML += preReq.nome + ' (' + preReq.periodo + 'o) <br />';}
  divEtiquetaTem.appendChild(spanTooltip);

  spanTooltip = document.createElement('span');
  for (prende of disciplina.prende) { spanTooltip.innerHTML += prende.nome + ' (' + prende.periodo + 'o) <br />';}
  divEtiquetaEh.appendChild(spanTooltip);
  
  var tr = document.createElement('tr');
  tr.insertCell(0).innerText = disciplina.codigo;
  tr.insertCell(1).innerText = disciplina.nome;
  tr.insertCell(2).innerText = disciplina.cargaHoraria + 'h';
  tr.insertCell(3).innerHTML = divEtiquetaTem.outerHTML + divEtiquetaEh.outerHTML;
  tr.id = 'tr-' + disciplina.nome;
  tr.className = 'tr-disciplina';
  tr.style.display = 'table-row';

  // TODO: cell2 de disc. práticas com tooltip e text-decoration: underline; e text-decoration-style: dashed; 

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

  const disciplina = getDisciplinas(todosObjetosDisciplina, 'nome', nomeDisciplina);
  disciplina.concluida = (concluida ? true : false);
  atualizaEtiquetaTemPreRequisitos(disciplina);
}

function atualizaEtiquetaTemPreRequisitos(disciplina) {
  for (disciplinaQuePrende of disciplina.prende) {
    const divEtiquetaTem = document.getElementById('tem-' + disciplinaQuePrende.nome);
    if (getDisciplinas(disciplinaQuePrende.preRequisitos, 'concluida', false).length == 0) {
      divEtiquetaTem.style.backgroundColor = 'transparent';
    } else {
      divEtiquetaTem.style.backgroundColor = 'cyan';
    }
  }
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
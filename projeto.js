// INICIALIZAÇÃO DA PÁGINA
document.addEventListener("DOMContentLoaded", function () {
  // Carrega a tabela ao abrir a página
  listarProjetos();

  // Quando clicar em Salvar, executa salvarProjeto()
  document
    .getElementById("formProjeto")
    .addEventListener("submit", salvarProjeto);
});

// LISTAR PROJETOS (READ)
async function listarProjetos() {
  const resposta = await fetch("ProjetoController.php?acao=listar", {
    method: "GET",
  });
  const resultado = await resposta.json();

  //TODO: dar console.table

  const tabela = document.getElementById("tabelaProjetos");
  tabela.innerHTML = "";

  resultado.dados.forEach(function (projeto) {
    tabela.innerHTML += `
        <tr>
          <td>${projeto.id}</td>
          <td>${projeto.nome}</td>
          <td>${projeto.duracao} mês(es)</td>
          <td>${projeto.responsavel}</td>
  
          <td>
            <button  class="btn btn-warning btn-sm" onclick="editarProjeto(${projeto.id})">
              Editar
            </button>
  
            <button class="btn btn-danger btn-sm"onclick="excluirProjeto(${projeto.id})">
              Excluir
            </button>
          </td>
        </tr>
      `;
  });

}

// Salvar projeto
// Cadastrar ou editar CREATE/UPDATE
async function salvarProjeto(event){


  //Impede o recarregamento da página
  event.preventDefault();

  // Captura os dados do formulário
  const formulario = document.getElementById("formProjeto");
  const dados = new FormData(formulario);

  // Envia os dados para o Controller
  const resposta = await fetch("ProjetoController.php?acao=cadastrar", {
    method: "POST",
    body: dados,
  });

  // Recebe a resposta do PHP
  const resultado = await resposta.json();

  // Exibe a mensagem
  alert(resultado.mensagem);

  // Se salvou com sucesso...
  if (resultado.sucesso == true) {

    //Reseta o formulário para novo cadastro
    limparFormProjeto();

    //Atualiza a tabela
    listarProjetos();
  }
}

// Novo projeto (limpa formulário e prepara para cadastro)
function limparFormProjeto() {
  document.getElementById("formProjeto").reset();
  document.getElementById("id").value = "";
  document.getElementById("acao").value = "cadastrar";
  document.getElementById("tituloFormulario").textContent = "Novo Projeto";
}

// Editar projeto (Update)
async function editarProjeto(id) {
  //Busca o projeto pelo ID
  const resposta = await fetch (`ProjetoController.php?acao=buscar&id=${id}`);
  const resultado = await resposta.json();
  const projeto = resultado.dados;

  // Preenche o formulário
  document.getElementById("id").value = projeto.id;
  document.getElementById("nome").value = projeto.nome;
  document.getElementById("duracao").value = projeto.duracao;
  document.getElementById("responsavel").value = projeto.responsavel;

  //Altera a ação para editar
  document.getElementById("acao").value = "editar";

  //Muda o título
  document.getElementById("tituloFormulario").textContent = "Editar Projeto";

 // Posiciona o cursor no nome
 document.getElementById("nome").focus();
}

// Excluir projeto (Delete)
async function excluirProjeto(id) {
  //Confirmar a exclusão 
  if (!confirm("Deseja excluir esse projeto?")){
    return;
  }

  // Cria os dados da requisição
  const dados = new FormData();
  dados.append("acao","excluir");
  dados.append("id", id);

  // Envia para o Controller
  const resposta = await fetch ("ProjetoController.php", {
    method: "POST",
    body: dados,
  });

  // Recebe a reposta
  const resultado = await resposta.json();

  // Exibe mensagem 
  alert(resultado.mensagem);

  // Atualizar a tabela
  listarProjetos();
}
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

    //Atualiza a tabela
    listarProjetos();
  }
}
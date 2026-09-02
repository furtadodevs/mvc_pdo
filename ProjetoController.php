<?php
// Define que a resposta será em JSON
header ("Content-Type: application/json; charset=utf-8");

// Importa a conexão e o Model
require __DIR__ . "/database.php";
require __DIR__ . "/ProjetoModel.php";

// Conecta ao banco
$pdo = conectarBanco();

// Recebe a ação enviada pelo JavaScript
$acao = $_REQUEST["acao"] ?? "listar";

// Decide qual operação executar 
switch ($acao) {
    // Listar
    case "listar":
        $projetos = listarProjetos($pdo);

        echo json_encode([
            "sucesso" => true,
            "mensagem" => "Projetos listados.",
            "dados" => $projetos
        ]);
        break;
    
    // Buscar
    case "buscar":
        break;

    // Cadastrar
    case "cadastrar":
        cadastrarProjeto($pdo, $_POST);

        echo json_encode([
            "sucesso" => true,
            "mensagem" => "Projeto cadastrado com sucesso.",
            "dados" => null
        ]);

        break;

    // Editar 
    case "editar":
        break;

    // Excluir
    case "excluir":
        break;

    // Ação não encontrada
    default:
        break;
}
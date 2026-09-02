<?php

// Listar
function listarProjetos($pdo)
{
    $stmt = $pdo->prepare(
        "SELECT * FROM projetos ORDER BY id ASC"
    );

    $stmt->execute();
    return $stmt->fetchAll();
}

// Cadastrar
function cadastrarProjeto($pdo, $dados){
    $stmt = $pdo->prepare("
    INSERT INTO projetos (nome, duracao, responsavel)
    VALUES (?, ?, ?)");

    $stmt->execute([
        $dados["nome"],
        $dados["duracao"],
        $dados["responsavel"]
    ]);
}

?>
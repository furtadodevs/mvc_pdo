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
function cadastrarProjeto($pdo, $dados)
{
    $stmt = $pdo->prepare("
    INSERT INTO projetos (nome, duracao, responsavel)
    VALUES (?, ?, ?)");

    $stmt->execute([
        $dados["nome"],
        $dados["duracao"],
        $dados["responsavel"]
    ]);
}

// Buscar
function buscarProjeto($pdo, $id)
{
    $stmt = $pdo->prepare("SELECT * FROM projetos WHERE id = ?");
    $stmt->execute([$id]);
    return $stmt->fetch();
}

// Editar
function editarProjeto($pdo, $dados)
{ 
    $stmt = $pdo->prepare("
    UPDATE projetos SET nome = ?,
    duracao = ?,
    responsavel = ?
    WHERE id = ?
    ");

    $stmt->execute(
        [
            $dados["nome"],
            $dados["duracao"],
            $dados["responsavel"],
            $dados ["id"]
        ]
        );
}

// Excluir 
function excluirProjeto ($pdo, $id)
{
    $stmt = $pdo->prepare("DELETE FROM projetos WHERE id = ?");
    $stmt->execute([$id]);
}

?>
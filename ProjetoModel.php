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



?>
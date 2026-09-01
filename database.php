<?php
//ARQUIVO DE CONEXÃO COM BANCO DE DADOS 

//essas variáveis dizem como acessar o banco
$host = "localhost"; // Servidor do banco
$banco = "aula_pdo"; // Nome do banco de dados
$usuario = "root"; // Usuário do MySQL
$senha = ""; // Senha do MySQL

// Função responsável por conectar ao banco
// Usada todas as vezes que precisar do banco
function conectarBanco()
{
    // Permite usar as variáveis criadas acima
    global $host,$banco,$usuario,$senha;
    try{
        //Cria a conexão com o banco usando PDO
        // PDO significa PHP Data Objects.
        // É o recurso do PHP para conversar com o banco.
        $pdo = new PDO("mysql:host=$host;dbname=$banco;", $usuario, $senha);

        // Faz o PHP mostrar um erro caso algo dê errado no banco
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Retorna a conexão para ser usada em outros arquivos
        return $pdo;

    } catch (PDOException $erro) {
        //Mostra uma mensagem caso não consiga conectar
        die("Erro ao conectar: " . $erro->getMessage());
    }
}
?>
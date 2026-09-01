CREATE DATABASE aula_pdo;
USE aula_pdo;

CREATE TABLE projetos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    duracao INT NOT NULL,
    responsavel VARCHAR(100) NOT NULL
);
-- 3 inserts
INSERT INTO projetos (nome,duracao,responsavel) 
	VALUES ('Projeto 01', '3', 'Maria');

INSERT INTO projetos (nome,duracao,responsavel) 
	VALUES ('Projeto 2', '9', 'Lucas');
    
INSERT INTO projetos (nome,duracao,responsavel) 
	VALUES ('Projeto 01', '10', 'Fernando');
    
-- 1 select 
SELECT * FROM projetos;
SELECT * FROM projetos 
WHERE id = 2;

-- 1 update 
UPDATE projetos 
	SET responsavel = 'Joaquim'
WHERE id = 1;

-- 1 delete 
DELETE FROM projetos WHERE id = '3'
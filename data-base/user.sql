CREATE TABLE Usuarios (
    user_id INT NOT NULL,
    user_nome VARCHAR(200),
    user_cpfcnpj VARCHAR(14),
    user_telefone VARCHAR(11),
    user_email VARCHAR(200),
    user_senha VARCHAR(100),
    user_dtcriacao DATE,
    user_tipo TIPO_USUARIO,
    PRIMARY KEY (user_id)
);
CREATE TABLE Usuarios (
    user_id VARCHAR(11) NOT NULL, /*CPF*/
    user_nome VARCHAR(200),
    user_telefone VARCHAR(15),
    user_email VARCHAR(200),
    user_senha VARCHAR(100),
    user_token VARCHAR(62),
    user_dtcriacao TIMESTAMP,
    user_img_url TEXT CHECK (user_img_url ~ '^https?://'),
    user_tipo INT,
    FOREIGN KEY (user_tipo) REFERENCES Tipo(tipo_id),
    PRIMARY KEY (user_id)
);
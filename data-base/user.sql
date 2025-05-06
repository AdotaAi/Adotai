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

CREATE TABLE Usuarios (
    user_id VARCHAR(11) NOT NULL, /*CPF*/
    user_nome VARCHAR(200),
    user_telefone VARCHAR(15),
    user_email VARCHAR(200),
    user_senha VARCHAR(100),
    user_token VARCHAR(62)
    user_dtcriacao TIMESTAMP,
    PRIMARY KEY (user_id);
);

CREATE TABLE Endereco (
    end_id INT SERIAL,
    user_id INT NOT NULL,
    end_cep VARCHAR(8),
    end_estado VARCHAR(200),
    end_cidade VARCHAR(200),
    end_bairro VARCHAR(200),
    end_rua VARCHAR(200),
    end_numero INT,
    end_complemento VARCHAR(100),
    PRIMARY KEY (end_id),
    FOREIGN KEY (user_id) REFERENCES Usuarios(user_id)
);

CREATE TABLE Tipo (
    tipo_id INT SERIAL,
    tipo_nome VARCHAR(200),
    tipo_desc TEXT,
    PRIMARY KEY (tipo_id)
);
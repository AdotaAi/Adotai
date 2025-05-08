CREATE TABLE Endereco (
    end_id SERIAL,
    user_id VARCHAR(11) NOT NULL,
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
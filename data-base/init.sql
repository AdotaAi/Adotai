CREATE TABLE Tipo (
    tipo_id SERIAL,
    tipo_nome VARCHAR(200),
    tipo_desc TEXT,
    PRIMARY KEY (tipo_id)
);

INSERT INTO Tipo (tipo_nome, tipo_desc)
VALUES ('Adotante', 'Permissão para adotar os pets');

INSERT INTO Tipo (tipo_nome, tipo_desc)
VALUES ('ONG', 'Permissão para colocar pets para adoção');

INSERT INTO Tipo (tipo_nome, tipo_desc)
VALUES ('Administrador', 'Permissão total do sistema');

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

CREATE TABLE Adotante (
    adt_id SERIAL,
    user_id VARCHAR(11) NOT NULL,
    adt_pontuacao INT,
    PRIMARY KEY (adt_id),
    FOREIGN KEY (user_id) REFERENCES Usuarios(user_id)
);

CREATE TABLE Pesquisa (
    pesq_id SERIAL,
    adt_id INT NOT NULL,
    pesq_espaco_para_pet BOOLEAN,
    pesq_trab_fora BOOLEAN,
    pesq_tem_outros_pets BOOLEAN,
    pesq_aceita_visitas BOOLEAN,
    pesq_tempo_pet_sozinho NUMERIC(5,2),
    pesq_experiencia_com_pets TEXT,
    PRIMARY KEY (pesq_id),
    FOREIGN KEY (adt_id) REFERENCES Adotante(adt_id)
);

CREATE TABLE Preferencia (
    pref_id SERIAL,
    adt_id INT NOT NULL,
    pref_especie VARCHAR(100),
    pref_porte VARCHAR(100),
    pref_idade VARCHAR(100),
    pref_sexo VARCHAR(100),
    pref_temperamento VARCHAR(100),
    pref_aceita_pets_pcd BOOLEAN,
    PRIMARY KEY (pref_id),
    FOREIGN KEY (adt_id) REFERENCES Adotante(adt_id)
);

CREATE TABLE Ong (
    ong_id SERIAL,
    user_id VARCHAR(11),
    ong_nome VARCHAR(100),
    ong_cnpj VARCHAR(14),
    ong_validado BOOLEAN,
    ong_site VARCHAR(500),
    PRIMARY KEY (ong_id),
    FOREIGN KEY (user_id) REFERENCES Usuarios(user_id)
);

CREATE TABLE Pet (
	pet_id SERIAL,
    ong_id INT NOT NULL,
    pet_nome VARCHAR(200),
    pet_idade INT,
    pet_especie VARCHAR(100),
    pet_raca VARCHAR(200),
    pet_sexo CHAR(1),
    pet_temperamento VARCHAR(200),
    pet_pcd BOOLEAN,
    pet_descricao TEXT,
    pet_img_url TEXT,
    PRIMARY KEY (pet_id),
    FOREIGN KEY (ong_id) REFERENCES Ong(ong_id)
);
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
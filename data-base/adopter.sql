CREATE TABLE Adotante (
    adt_id INT NOT NULL,
    adt_cpf VARCHAR(11),
    adt_nome VARCHAR(200),
    adt_dtnascimento DATE,
    adt_preferencia TEXT,
    adt_pontuacao INT,
    user_id INT,
    PRIMARY KEY (adt_id),
    FOREIGN KEY (user_id) REFERENCES Usuarios(user_id)
);
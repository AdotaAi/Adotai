CREATE TABLE Adotante (
    adt_id SERIAL,
    user_id VARCHAR(11) NOT NULL,
    adt_pontuacao INT,
    PRIMARY KEY (adt_id),
    FOREIGN KEY (user_id) REFERENCES Usuarios(user_id)
);
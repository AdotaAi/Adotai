CREATE TABLE Adotante (
    adt_id INT SERIAL,
    user_id INT,
    adt_preferencia TEXT,
    adt_pontuacao INT,
    PRIMARY KEY (adt_id),
    FOREIGN KEY (user_id) REFERENCES Usuarios(user_id)
);
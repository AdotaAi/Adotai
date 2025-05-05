CREATE TABLE Ong (
    INT NOT NULL ong_id,
    VARCHAR(100) ong_nome,
    VARCHAR(14) ong_cnpj,
    VARCHAR(200) ong_email,
    TEXT ong_endereco,
    TEXT ong_avaliacao,
    INT user_id,
    PRIMARY KEY (ong_id),
    FOREIGN KEY (user_id) REFERENCES Usuarios(user_id)
);
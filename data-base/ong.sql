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
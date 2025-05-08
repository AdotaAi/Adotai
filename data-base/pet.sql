CREATE TABLE Pet (
    pet_id SERIAL INT,
    ong_id INT NOT NULL,
    pet_nome VARCHAR(200),
    pet_idade INT,
    pet_especie VARCHAR(100),
    pet_raca VARCHAR(200),
    pet_sexo CHAR(1),
    pet_temperamento VARCHAR(200),
    pet_pcd BOOLEAN,
    pet_descricao TEXT,
    pet_imgurl VARCHAR(400),
    PRIMARY KEY (pet_id),
    FOREIGN KEY (ong_id) REFERENCES Ong(ong_id)
);
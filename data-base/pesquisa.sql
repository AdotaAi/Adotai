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
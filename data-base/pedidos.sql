CREATE TABLE Pedidos (
    ped_id SERIAL,
    adt_id INT NOT NULL,
    ong_id INT NOT NULL,
    pet_id INT NOT NULL,
    ped_status VARCHAR(20) NOT NULL CHECK (ped_status IN ('PENDENTE', 'APROVADO', 'RECUSADO', 'FINALIZADO')),
    ped_data_solicitacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ped_data_resposta TIMESTAMP,
    ped_observacoes TEXT,
    PRIMARY KEY (ped_id),
    FOREIGN KEY (adt_id) REFERENCES Adotante(adt_id),
    FOREIGN KEY (ong_id) REFERENCES Ong(ong_id),
    FOREIGN KEY (pet_id) REFERENCES Pet(pet_id)
);
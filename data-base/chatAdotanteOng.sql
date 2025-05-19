CREATE TABLE ChatAdotanteOng (
    chat_id SERIAL,
    ped_id INT NOT NULL,
    ong_id INT NOT NULL,
    adt_id INT NOT NULL,
    chat_mensagem TEXT NOT NULL,
    chat_data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (chat_id),
    FOREIGN KEY (ped_id) REFERENCES PedidosPet(ped_id),
    FOREIGN KEY (ong_id) REFERENCES Ong(ong_id),
    FOREIGN KEY (adt_id) REFERENCES Adotante(adt_id)
);

CREATE TABLE Mensagem (
    msg_id SERIAL,
    chat_id INT NOT NULL,
    msg_conteudo TEXT NOT NULL,
    msg_data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    msg_visualizado BOOLEAN,
    PRIMARY KEY (msg_id),
    FOREIGN KEY (chat_id) REFERENCES ChatAdotanteOng (chat_id)
);
CREATE TABLE ChatAdotanteOng (
    chat_id SERIAL,
    ped_id INT NOT NULL,
    user_id_remetente VARCHAR(11) NOT NULL,
    chat_mensagem TEXT NOT NULL,
    chat_data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    chat_lida BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (chat_id),
    FOREIGN KEY (ped_id) REFERENCES PedidosPet(ped_id),
    FOREIGN KEY (user_id_remetente) REFERENCES Usuarios(user_id)
);

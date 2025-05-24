import styles from "./styles.module.css";
import { ArrowLeft, PaperPlaneTilt } from "@phosphor-icons/react";
import { Message } from "../../components/Message";
import { useNavigate } from "react-router-dom";
import placeholderImage from "../../assets/placeholder.gif";
import { useState, useEffect } from "react";
import { getMessages, sendMessages } from "../../api";
import { getData } from "../../core/lStorage";

export function Chat() {
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await getMessages();
                setMessages(response);
            } catch (error) {
                console.error('Erro ao buscar mensagens:', error);
            }
        };
        fetchMessages();
    }, []);

    const handleSendMessage = async (e: any) => {
        e.preventDefault();
        try {
            await sendMessages({ message: message, email: getData('email'), pedId: getData('request') });
            setMessage('');
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
        }
    }

    return (
        <main className={styles.container}>
            <header>
                <ArrowLeft size={32} 
                    onClick={() => navigate(-1)}
                />
                <div>
                    <strong>Nome</strong>
                    <img src={placeholderImage} alt="avatar"/>
                </div>
            </header>
            <section className={styles.chat}>
                {messages.map((message: any) => (
                    <Message key={message.msg_id} variant={message.user_email === getData('email') ? 'self' : 'other'}>
                        {message.msg_conteudo}
                    </Message>
                ))}
            </section>
            <form onSubmit={(e) => handleSendMessage(e)}>
                <div>
                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Digite sua mensagem"/>
                </div>
                <button type="submit">
                    <PaperPlaneTilt size={32} weight="fill" />
                </button>
            </form>
        </main>
    )
}
import styles from "./styles.module.css";
import { ArrowLeft, PaperPlaneTilt } from "@phosphor-icons/react";
import { Message } from "../../components/Message";
import { useNavigate } from "react-router-dom";

export function Chat() {
    const navigate = useNavigate();
    return (
        <main className={styles.container}>
            <header>
                <ArrowLeft size={32} 
                    onClick={() => navigate(-1)}
                />
                <div>
                    <strong>Nome</strong>
                    <img src=""/>
                </div>
            </header>
            <section className={styles.chat}>
                <Message variant="self">
                    E aí, tudo certo?
                </Message>
                <Message variant="other">
                    Oi! Tudo sim, e contigo?
                </Message>
                <Message variant="self">
                    Tranquilo 😊
                </Message>
                <Message variant="other">
                    Tava pensando naquele projeto que a gente comentou ontem...
                    Será que rola de começar essa semana já?
                </Message>
                <Message variant="self">
                    Acho que sim!
                    Mas a gente precisa alinhar umas coisas antes.
                </Message>
                <Message variant="other">
                    Tipo?
                </Message>
                <Message variant="self">
                    Então, eu dei uma olhada nas ideias que a gente anotou e acho que seria bom a gente definir primeiro quem vai cuidar de qual parte, sabe?
                    Pra não acabar tudo embolado depois.
                    Aí a gente já começa com cada um sabendo o que fazer e evita retrabalho.
                    Posso até montar um doc com as divisões e te mando pra revisar, o que acha?
                </Message>
            </section>
            <form>
                <div>
                    <input type="text" placeholder="Digite sua mensagem"/>
                </div>
                <button>
                    <PaperPlaneTilt size={32} weight="fill" />
                </button>
            </form>
        </main>
    )
}
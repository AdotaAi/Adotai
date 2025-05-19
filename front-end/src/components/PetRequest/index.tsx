import styles from "./styles.module.css";
import { ChatCircle } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

interface petRequestProps {
    name: string;
    status: string;
}

export function PetRequest({ name, status }: petRequestProps) {
    const navigate = useNavigate();
    return (
        <article className={styles.container}>
            <img src="https://placehold.co/400" alt="pet" />
            <div>
                <h3>{name}</h3>
                <span>{status}</span>
            </div>
            <ChatCircle 
                onClick={() => navigate(`/chat/`)}
                size={24} 
            />
        </article>
    );
}
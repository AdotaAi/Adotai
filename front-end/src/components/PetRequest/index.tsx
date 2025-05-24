import styles from "./styles.module.css";
import { ChatCircle } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { setData } from "../../core/lStorage";

interface petRequestProps {
    name: string;
    status: string;
    img: string;
    id: number;
}

export function PetRequest({ name, status, img, id }: petRequestProps) {
    const navigate = useNavigate();
    return (
        <article className={styles.container}>
            <img src={img} alt="pet" />
            <div>
                <h3>{name}</h3>
                <span>{status}</span>
            </div>
            <ChatCircle 
                onClick={() => {
                    setData('request', id);
                    navigate(`/chat/`);
                }}
                size={24} 
            />
        </article>
    );
}
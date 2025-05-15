import styles from "./styles.module.css";
import { Trash } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { setData } from "../../core/lStorage";

interface petSavedProps {
    name: string;
    ongName: string;
    img: string;
    id: number
}

export function PetSaved({ name, ongName, img, id }: petSavedProps) {
    const navigate = useNavigate();
    return (
        <article 
            className={styles.container}
            onClick={() => {
                setData('pet', id);
                navigate(`/about-the-pet/`);
            }}
        >
            <img src={img} alt="pet" />
            <div>
                <h3>{name}</h3>
                <span>{ongName}</span>
            </div>
            <Trash size={24} />
        </article>
    );
}
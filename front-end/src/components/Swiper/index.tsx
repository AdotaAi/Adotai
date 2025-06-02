import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./styles.module.css";
import { X, Heart, ShareFat, MapPin } from "@phosphor-icons/react";
import { setData, getData } from "../../core/lStorage";
import { setData, getData } from "../../core/lStorage";
import { useNavigate } from "react-router-dom";
import { getRecomendedPets } from "../../api";

type Info = {
    pet_id: number;
    pet_nome: string;
    pet_img_url: string;
    ong_nome: string;
    end_bairro: string;
}

export function Swiper() {
    const navigate = useNavigate();

    const [dados, setDados] = useState<Info[]>([]);
    const [index, setIndex] = useState(0);
    const [direcao, setDirecao] = useState<"esquerda" | "direita">("direita");


    useEffect(() => {
        getRecomendedPets().then((response) => {
            setDados(response);
        });
    }, []);

    const handleSave = (id: number) => {
        let pets: number[] = getData('savedPets') || [];
        pets.push(id);
        setData('savedPets', pets);
        setIndex((prev) => (prev < dados.length - 1 ? prev + 1 : 0));
    }

    const handleNext = () => {
        setIndex((prev) => (prev < dados.length - 1 ? prev + 1 : 0));
    };

    const currentInfo = dados[index];

    if (dados.length === 0) return <p>Carregando...</p>;

    return (
        <div style={{ width: "300px", height: "", overflow: "hidden", position: "relative" }}>


            <AnimatePresence mode="wait">
                <motion.div
                    key={currentInfo.pet_id}
                    initial={{ x: direcao === "direita" ? 300 : -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: direcao === "direita" ? -300 : 300, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className={styles.container}
                >
                    <div
                        className={styles.card}
                        style={{
                            backgroundImage: `url(${currentInfo.pet_img_url})`
                        }}
                        onClick={() => {
                            setData('pet', currentInfo.pet_id);
                            navigate(`/about-the-pet/`);
                        }}
                    >
                        

                        <div>
                            <strong>{currentInfo.pet_nome}</strong>
                            <span>
                                <MapPin
                                    size={24}
                                />
                                <span>{currentInfo.end_bairro}</span>
                            </span>
                        </div>

                    </div>
                    <div className={styles.buttons}>
                        <button><ShareFat size={32} weight="fill"/></button>
                        <button onClick={() => handleSave(currentInfo.pet_id)}><Heart size={32} weight="fill"/></button>
                        <button onClick={handleNext}><X size={32}/></button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
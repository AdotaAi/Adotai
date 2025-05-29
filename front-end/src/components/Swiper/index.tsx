import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./styles.module.css";
import { X, Heart, ShareFat, MapPin } from "@phosphor-icons/react";
import { setData, getData } from "../../core/lStorage";
import { useNavigate } from "react-router-dom";

type Info = {
    id: number;
    name: string;
    image: string;
    ongName: string;
    address: string;
}

const dados: Info[] = [
    {
        id: 9,
        name: "Kittie",
        image: "http://192.168.0.105:3000/img/1748029037112_9f4ccad09136b75b3c04139467bf610f.jpg",
        ongName: "ONG Teste",
        address: "Bairro Teste"
    },
    {
        id: 10,
        name: "Garfield",
        image: "http://192.168.0.105:3000/img/1748029393140_download.jpeg",
        ongName: "ONG Teste",
        address: "Bairro Teste"
    },
    {
        id: 11,
        name: "Leslie",
        image: "http://192.168.0.105:3000/img/1748054718256_cat-selfie-v0-vik1m2dpa98a1.webp",
        ongName: "ONG Teste",
        address: "Bairro Teste"
    },
    {
        id: 12,
        name: "Fred",
        image: "http://192.168.0.105:3000/img/1748055056150_images.jpeg",
        ongName: "ONG Teste",
        address: "Bairro Teste"
    },
];

export function Swiper() {
    const navigate = useNavigate();

    const [index, setIndex] = useState(0);
    const [direcao, setDirecao] = useState<"esquerda" | "direita">("direita");

    const handleNext = () => {
        setIndex((prev) => (prev < dados.length - 1 ? prev + 1 : 0));
    };

    const handleSave = (id : number) => {
        let petsSalvos = getData('pets-salvos') || [];
        petsSalvos.push(id);
        setData('pets-salvos', petsSalvos);
    }

    const currentInfo = dados[index];

    return (
        <div style={{ width: "300px", height: "", overflow: "hidden", position: "relative" }}>


            <AnimatePresence mode="wait">
                <motion.div
                    key={currentInfo.id}
                    initial={{ x: direcao === "direita" ? 300 : -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: direcao === "direita" ? -300 : 300, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className={styles.container}
                >
                    <div
                        className={styles.card}
                        style={{
                            backgroundImage: `url(${currentInfo.image})`
                        }}
                        onClick={() => {
                            setData('pet', currentInfo.id);
                            navigate(`/about-the-pet/`);
                        }}
                    >
                        

                        <div>
                            <strong>{currentInfo.name}</strong>
                            <span>
                                <MapPin
                                    size={24}
                                />
                                <span>{currentInfo.address}</span>
                            </span>
                        </div>

                    </div>
                    <div className={styles.buttons}>
                        <button><ShareFat size={32} weight="fill"/></button>
                        <button onClick={() => {handleSave(currentInfo.id)}}><Heart size={32} weight="fill"/></button>
                        <button onClick={handleNext}><X size={32}/></button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
import styles from "./styles.module.css";
import { BottomTabBar } from "../../components/BottomTabBar";
import { GearSix, Dog, FileMagnifyingGlass, SignOut } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { getProfile } from "../../api";
import { getSessionData } from "../../core/sStorage";

export function Ong() {
    const [username, setUsername] = useState('');
        const [email, setEmail] = useState('');
        const [userImg, setUserImg] = useState('');
    
        useEffect(() => {
            const fetchProfile = async () => {
                try {
                    const response = await getProfile({ token: getSessionData('token') });
                    setUsername(response.ong_nome);
                    setEmail(response.user_email);
                    setUserImg(response.user_img_url);
                } catch (error) {
                    console.error('Erro ao buscar usuario:', error);
                }
            };
    
            fetchProfile();
        }, []);

    return (
        <main className={styles.container}>
            <div className={styles.profile}>
                <img src={userImg} alt="" />
                <div>
                    <h2>{username}</h2>
                    <span>{email}</span>
                </div>
            </div>
            <ul>
                <li>
                    <GearSix size={32} weight="fill"/>
                    <span>Configurações</span>
                </li>
                <li>
                    <Dog size={32} weight="fill"/>
                    <span>Preferências</span>
                </li>
                <li>
                    <FileMagnifyingGlass size={32} weight="fill"/>
                    <span>Pesquisa de Adoção</span>
                </li>
                <li>
                    <SignOut size={32} weight="fill"/>
                    <span>Sair</span>
                </li>
            </ul>
            <BottomTabBar 
                currentPage="profile" 
                variant="ong"
            />
        </main>
    )
}
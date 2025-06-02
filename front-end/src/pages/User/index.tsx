import styles from "./styles.module.css";
import { BottomTabBar } from "../../components/BottomTabBar";
import { GearSix, Dog, FileMagnifyingGlass, SignOut, Sun, Moon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { getProfile } from "../../api";
import { getSessionData } from "../../core/sStorage";
import placeholderImage from "../../assets/placeholder.gif";

export function User() {

    const temaAtual = () => {
        const html = document.documentElement;
        if (html.classList.contains('dark')) {
            return 'Escuro';
        } else {
            return 'Claro';
        }
    }

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [userImg, setUserImg] = useState(placeholderImage);
    const [tema, setTema] = useState(temaAtual());

    

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfile({ token: getSessionData('token') });
                setUsername(response.user_nome);
                setEmail(response.user_email);
                setUserImg(response.user_img_url);
            } catch (error) {
                console.error('Erro ao buscar usuario:', error);
            }
        };

        fetchProfile();
    }, []);

    const mudarTema = () => {
        const html = document.documentElement;

        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
        } else {
            html.classList.add('dark');
        }
    }

    

    return (
        <main className={styles.container}>
            <div className={styles.profile}>
                <img src={userImg} alt="profile image" />
                <div>
                    <h2>{username}</h2>
                    <span>{email}</span>
                </div>
            </div>
            <ul>
                <li
                    onClick={()=> {
                        mudarTema();
                        setTema(temaAtual());
                    }}
                >
                    {tema == 'Claro'? (<Sun size={32} weight="fill" />) : (<Moon size={32} weight="fill" />)}
                    <span>Tema {tema}</span>
                </li>
                <li>
                    <Dog size={32} weight="fill" />
                    <span>Preferências</span>
                </li>
                <li>
                    <FileMagnifyingGlass size={32} weight="fill" />
                    <span>Pesquisa de Adoção</span>
                </li>
                <li>
                    <SignOut size={32} weight="fill" />
                    <span>Sair</span>
                </li>
            </ul>
            <BottomTabBar currentPage="profile" />
        </main>
    )
}
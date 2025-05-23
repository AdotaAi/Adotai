import styles from "./styles.module.css";
import { BottomTabBar } from "../../components/BottomTabBar";
import { Plus } from "@phosphor-icons/react";
import { PetSaved } from "../../components/PetSaved";
import { useNavigate } from "react-router-dom";
import { getPets } from "../../api";
import { useEffect, useState } from "react";
import { getSessionData } from "../../core/sStorage";


export function Pets() {
    const navigate = useNavigate();

    const [pets, setPets] = useState([]);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await getPets({ token: getSessionData('token') });
                setPets(response);
            } catch (error) {
                console.error('Erro ao buscar pets:', error);
            }
        };

        fetchPets();
    }, []);


    return (
        <main className={styles.container}>
            <header>
                <strong>Pets Cadastrados</strong>
                <Plus size={32}
                    onClick={() => navigate('/new-pet')}
                />
            </header>


            {
                pets.map((pet: any) => (
                    <PetSaved
                        key={pet.pet_id}
                        name={pet.pet_nome}
                        ongName={pet.ong_nome}
                        img={pet.pet_img_url}
                        id={pet.pet_id}
                    />
                ))
            }

            <BottomTabBar
                currentPage="pets"
                variant="ong"
            />
        </main>
    );
}
import styles from "./styles.module.css";
import { BottomTabBar } from "../../components/BottomTabBar";
import { PetSaved } from "../../components/PetSaved";
import { useEffect, useState } from "react";
import { getSavedPets } from "../../api";
import { getData } from "../../core/lStorage";

export function Saved() {

    const [saved, setSaved] = useState([]);
    
    useEffect(() => {
            const fetchPets = async () => {
                try {
                    const response = await getSavedPets(getData('savedPets'));
                    setSaved(response);
                } catch (error) {
                    console.error('Erro ao buscar pets:', error);
                }
            };
    
            fetchPets();
        }, []);

    return (
        <main className={styles.container}>
            
            {
                saved.map((pet: any) => (
                    <PetSaved
                        key={pet.petId}
                        id={pet.petId}
                        img={pet.petPhoto}
                        name={pet.petName}
                        ongName={pet.ongName}
                    />
                ))
            }

            <BottomTabBar currentPage="favorites" />
        </main>
    )
}
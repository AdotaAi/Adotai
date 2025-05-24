import styles from "./styles.module.css";
import { BottomTabBar } from "../../components/BottomTabBar";
import { PetRequest } from "../../components/PetRequest";
import { SectionHeader } from "../../components/SectionHeader";
import { useState, useEffect } from "react";
import { getRequests } from "../../api";

export function OngRequests() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await getRequests();
                setRequests(response);
            } catch (error) {
                console.error('Erro ao buscar pets:', error);
            }
        };

        fetchPets();
    }, []);

    return (
        <main className={styles.container}>
            <SectionHeader title="Pedidos de adoção" />

            {requests.map((request: any) => (
                <PetRequest
                    key={request.ped_id}
                    id={request.ped_id}
                    img={request.pet_img_url}
                    name={request.pet_nome}
                    status={request.ped_status}
                />
            ))}

            <BottomTabBar currentPage="chat" variant="ong" />
        </main>
    )
}
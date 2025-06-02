import styles from "./styles.module.css";
import { StackHeader } from "../../components/StackHeader";
import { Button } from "../../components/Button";
import { getPet } from "../../api";
import { useEffect, useState } from "react";
import placeholderImage from "../../assets/placeholder.gif";
import { newRequest } from "../../api";
import { getSessionData } from "../../core/sStorage";
import { getData } from "../../core/lStorage";
import { useNavigate } from "react-router-dom";

export function Request() {
    const navigate = useNavigate();

    const [pet, setPet] = useState({
        pet_nome: '',
        ong_nome: '',
        endereco: '',
        ped_id: 0,
        ped_status: '',
        ped_adotante_email: '',
        pet_img_url: placeholderImage
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getPet({ petId: getData('pet') });
                setPet({
                    pet_nome: response.pet_nome,
                    ong_nome: response.ong_nome,
                    endereco: response.endereco,
                    ped_id: response.ped_id,
                    ped_status: response.ped_status,
                    ped_adotante_email: response.ped_adotante_email,
                    pet_img_url: response.pet_img_url
                });
            } catch (error) {
                console.error('Erro ao buscar usuario:', error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <main className={styles.container}>
            <StackHeader />
            <img src={pet.pet_img_url} alt="" />
            <section>
                <div>
                    <h3>Nome: {pet.pet_nome}</h3>
                    <span> 
                        <strong>Ong: </strong>
                        {pet.ong_nome}
                    </span>
                    <span> 
                        <strong>Endereço: </strong>
                        {pet.endereco}
                    </span>
                    <span>
                        <strong>Id do Pedido: </strong>
                        PED-0{pet.ped_id}
                    </span>
                    <span>
                        <strong>Status do pedido: </strong>
                        {pet.ped_status}
                    </span>
                    <span>
                        <strong>Status do pedido: </strong>
                        {pet.ped_status}
                    </span>
                    
                    <span className={styles.description}>
                        <strong>Descrição: </strong>
                        <p>{pet.ped_adotante_email}</p>
                    </span>
                </div>
                <Button onClick={() => {
                    const token = getSessionData('token');
                    const petId = getData('pet');
                    const data = { token, petId };
                    try {
                        newRequest(data);
                    } catch (error) {
                        console.error(error);
                    } finally {
                        navigate('/requests');
                    }
                }}>
                    Cancelar Pedido
                </Button>
            </section>

        </main>
    )
}
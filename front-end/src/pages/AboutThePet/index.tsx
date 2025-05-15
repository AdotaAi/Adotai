import styles from "./styles.module.css";
import { StackHeader } from "../../components/StackHeader";
import { Button } from "../../components/Button";
import { getData } from "../../core/lStorage";
import { getPet } from "../../api";
import { useEffect, useState } from "react";

export function AboutThePet() {

    const [pet, setPet] = useState({
        pet_nome: '',
        ong_nome: '',
        endereco: '',
        pet_idade: '',
        pet_sexo: '',
        pet_peso: '',
        pet_raca: '',
        pet_cor: '',
        pet_descricao: '',
        pet_img_url: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getPet({ petId: getData('pet') });
                setPet({
                    pet_nome: response.pet_nome,
                    ong_nome: response.ong_nome,
                    endereco: response.endereco,
                    pet_idade: response.pet_idade,
                    pet_sexo: response.pet_sexo,
                    pet_peso: response.pet_peso,
                    pet_raca: response.pet_raca,
                    pet_cor: response.pet_cor,
                    pet_descricao: response.pet_descricao,
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
                        <strong>Idade: </strong>
                        {pet.pet_idade} anos
                    </span>
                    <span>
                        <strong>Sexo: </strong>
                        {pet.pet_sexo}
                    </span>
                    <span>
                        <strong>Porte: </strong>
                        {pet.pet_peso} Kg
                    </span>
                    <span>
                        <strong>Raça: </strong>
                        {pet.pet_raca}
                    </span>
                    <span>
                        <strong>Cor: </strong>
                        {pet.pet_cor} 
                    </span>
                    <span className={styles.description}>
                        <strong>Descrição: </strong>
                        <p>{pet.pet_descricao}</p>
                    </span>
                </div>
                <Button>
                    Adotar este pet
                </Button>
            </section>

        </main>
    )
}
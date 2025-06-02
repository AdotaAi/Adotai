import styles from "./styles.module.css";
import { FileMagnifyingGlass, ArrowLeft } from '@phosphor-icons/react';
import { getData, updateData } from "../../../core/lStorage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Button } from "../../../components/Button";
import { List } from "../../../components/List";



export function Preference() {

    const [species, setSpecies] = useState('');
    const [size, setSize] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [temperament, setTemperament] = useState('');



    const navigate = useNavigate();

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        updateData('register', 'preference', {
            species: species,
            size: size,
            age: age,
            gender: gender,
            temperament: temperament
        });
        navigate('/register/credentials');
    }


    return (
        <main className={styles.container}>
            <header>
                <ArrowLeft size={32}
                    onClick={() => {
                        navigate(-1);
                    }}
                />
            </header>
            <section>
                <div className={styles.question}>
                    <FileMagnifyingGlass size={32} className={styles.icon} />
                    <h2>Preferências de Pet</h2>
                    <span>Responda o questionário para uma melhor análize dos pedidos de adoção.</span>
                </div>

                <form onSubmit={submit}>
                    <div className={styles.inputs}>

                        <List
                            label="Escolha uma especie"
                            id="species"
                            name="species"
                            options={['Cachorro', 'Gato', 'Ambos']}
                            onChange={(event) => setSpecies(event.target.value)}
                        />

                        <List
                            label="Escolha o porte"
                            id="size"
                            name="size"
                            options={['Pequeno', 'Medio', 'Grande', 'Sem preferência']}
                            onChange={(event) => setSize(event.target.value)}
                        />

                        <List
                            label="Escolha a idade"
                            id="age"
                            name="age"
                            options={['Filhote (Até 1 ano)', 'Adulto (1 até 7 anos)', 'Idoso (Apartir de 7 a 8 anos)', 'Sem preferência']}
                            onChange={(event) => setAge(event.target.value)}
                        />

                        <List
                            label="Escolha o sexo"
                            id="gender"
                            name="gender"
                            options={['Macho', 'Femea', 'Ambos']}
                            onChange={(event) => setGender(event.target.value)}
                        />

                        <List
                            label="Escolha o temperamento"
                            id="temperament"
                            name="temperament"
                            options={['Agressivo', 'Calmo', 'Sem preferência']}
                            onChange={(event) => setTemperament(event.target.value)}
                        />


                    </div>

                    <Button type="submit">
                        Prosseguir
                    </Button>
                </form>


            </section>

        </main >
    );
}
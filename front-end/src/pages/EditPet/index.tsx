import styles from "./styles.module.css";
import { StackHeader } from "../../components/StackHeader";
import { Input } from "../../components/Input";
import { List } from "../../components/List";
import { Button } from "../../components/Button";
import { TextArea } from "../../components/TextArea";
import { CheckBox } from "../../components/CheckBox";
import { useState, ChangeEvent } from "react";
import { postPet } from "../../api";
import { useNavigate } from "react-router-dom";
import { getSessionData } from "../../core/sStorage";

export function EditPet() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState('Macho');
    const [size, setSize] = useState('');
    const [specie, setSpecie] = useState('Gato');
    const [race, setRace] = useState('');
    const [color, setColor] = useState('Preto');
    const [temperament, setTemperament] = useState('Calmo');
    const [description, setDescription] = useState('');
    const [petPcd, setPetPcd] = useState(false);

    const [imagePreview, setImagePreview] = useState("https://placehold.co/400");
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file); // Save the real File
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Validate the age
        if (isNaN(age) || age <= 0) {
            alert('Por favor, insira uma idade válida.');
            return;
        }

        const data = new FormData();
        data.append('token', getSessionData('token'));
        data.append('name', name);
        data.append('age', age.toString()); // Ensure the age is sent as a string
        data.append('gender', gender);
        data.append('size', size);
        data.append('specie', specie);
        data.append('race', race);
        data.append('color', color);
        data.append('temperament', temperament);
        data.append('description', description);
        data.append('petPcd', petPcd.toString());

        if (imageFile) {
            data.append('image', imageFile);
        }


        postPet(data)
            .then(() => {
                navigate('/pets');
            })
            .catch((error) => {
                console.error("Erro ao salvar o pet: ", error);
                alert('Erro ao cadastrar o pet. Tente novamente.');
            });
    };

    return (
        <main className={styles.container}>
            <StackHeader />
            <img src={imagePreview} alt="petImage" />

            <form onSubmit={submit} encType="multipart/form-data">
                <input type="file" accept="image/*" onChange={handleImageChange} required />

                <Input
                    label="Nome do Pet"
                    placeholder="Nome do Pet"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                />
                <Input
                    label="Idade"
                    placeholder="Idade"
                    type="number"
                    onChange={(e) => setAge(Number(e.target.value))}
                    required
                />
                <List
                    label="Sexo"
                    id="gender"
                    name="gender"
                    options={['Macho', 'Fêmea']}
                    onChange={(e) => setGender(e.target.value)}
                />
                <List
                    label="Especie"
                    id="specie"
                    name="specie"
                    options={['Gato', 'Cachorro']}
                    onChange={(e) => setSpecie(e.target.value)}
                />
                <Input
                    label="Raça"
                    placeholder="Caso não tenha raça, coloque 'sem raça'"
                    onChange={(e) => setRace(e.target.value)}
                    value={race}
                    required
                />
                <List
                    label="Cor"
                    id="color"
                    name="color"
                    options={['Preto', 'Branco', 'Marrom', 'Cinza', 'Laranja', 'Rajado', 'Tricolor', 'Bicolor', 'Dourado', 'Manchado', 'Outro']}
                    onChange={(e) => setColor(e.target.value)}
                />
                <Input
                    label="Peso"
                    placeholder="kg"
                    type="number"
                    onChange={(e) => setSize(e.target.value)}
                    value={size}
                    required
                />
                <CheckBox
                    label="Tem alguma deficiência"
                    id="pcd"
                    name="pcd"
                    onChange={(e) => setPetPcd(e.target.checked)}
                />
                <List
                    label="Temperamento"
                    id="temperament"
                    name="temperament"
                    options={['Calmo', 'Agitado', 'Agressivo', 'Amigável', 'Reservado', 'Desconfiado']}
                    onChange={(e) => setTemperament(e.target.value)}
                />
                <TextArea
                    label="Descrição"
                    placeholder="Descrição do pet"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    required
                />

                <Button type="submit">Salvar Alterações</Button>
            </form>
        </main>
    );
}

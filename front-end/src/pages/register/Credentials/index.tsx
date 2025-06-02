import styles from "./styles.module.css";
import { Lock, ArrowLeft, X, Check } from '@phosphor-icons/react';
import { getData, updateData } from "../../../core/lStorage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postRegister } from "../../../api";
import { setSessionData } from "../../../core/sStorage";

import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";

export function Credentials() {

    const [ email , setEmail ] = useState('');
    const [ password , setPassword ] = useState('');
    const [ confirmPassword , setConfirmPassword ] = useState('');

    const navigate = useNavigate();

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('As senhas devem ser iguais');
            return;
        }
        if (password.length < 8 ) {
            alert('A senha deve ter no mínimo 8 caracteres');
            return;
        } else if (password.length > 16) {
            alert('A senha deve ter no máximo 16 caracteres');
            return;
        } else if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/)) {
            alert('A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.');
            return;
        }
        
        updateData('register', 'login', {
            email: email,
            password: password
        });

        
        try {
            const response = await postRegister(getData('register').howAreYou ,getData('register'));
            console.log(response);
            setSessionData('token', response.user_token);
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            navigate('/register/finish');
        }


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
                    <Lock size={32} className={styles.icon} />
                    <h2>Informações de Acesso</h2>
                    <span>Registre suas credenciais de acesso.</span>
                </div>

                <form onSubmit={submit}>
                    <div className={styles.inputs}>
                        <Input
                            label="Email"
                            placeholder="exemplo@email.com"
                            id="email"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setEmail(event.target.value);
                            }}
                            type="email"
                            required={true}
                        />

                        <Input
                            label="Senha"
                            placeholder="Digite sua senha"
                            id="password"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setPassword(event.target.value);
                            }}
                            type="password"
                            required={true}
                        />

                        <ul>
                            <li
                                style={{
                                    color: password.length >= 8 ? 'green' : 'red',
                                }}
                            >
                                {
                                    password.length >= 8 ? (
                                        <Check size={24} />
                                    ) : (
                                        <X size={24} />
                                    )
                                }
                                <span>
                                    Mínimo de 8 caracteres
                                </span>
                            </li>
                            <li
                                style={{
                                    color: password.match(/[A-Z]/) ? 'green' : 'red'
                                }}
                            >
                                {
                                    password.match(/[A-Z]/) ? (
                                        <Check size={24} />
                                    ) : (
                                        <X size={24} />
                                    )
                                }
                                <span>
                                    1 letra maiúscula
                                </span>
                            </li>
                            <li
                                style={{
                                    color: password.match(/[a-z]/) ? 'green' : 'red'
                                }}
                            >
                                {
                                    password.match(/[a-z]/) ? (
                                        <Check size={24} />
                                    ) : (
                                        <X size={24} />
                                    )
                                }
                                <span>
                                1 letra minúscula
                                </span>
                            </li>
                            <li
                                style={{
                                    color: password.match(/\d/) ? 'green' : 'red'
                                }}
                            >
                                {
                                    password.match(/\d/) ? (
                                        <Check size={24} />
                                    ) : (
                                        <X size={24} />
                                    )
                                }
                                <span>
                                1 número
                                </span>
                            </li>
                            <li
                                style={{
                                    color: password.match(/[!@#$%&*]/) ? 'green' : 'red'
                                }}
                            >
                                {
                                    password.match(/[!@#$%&*]/) ? (
                                        <Check size={24} />
                                    ) : (
                                        <X size={24} />
                                    )
                                }
                                <span>
                                1 caractere especial
                                </span>
                            </li>
                        </ul>

                        <Input
                            label="Confirmar Senha"
                            placeholder="Digite sua senha"
                            id="confirmPassword"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setConfirmPassword(event.target.value);
                            }}
                            type="password"
                            required={true}
                        />
                        <span style={{ color: password === confirmPassword ? 'green' : 'red' }}>
                            {
                                password !== confirmPassword ? 'As senhas devem ser iguais': ''
                            }
                        </span>
                    </div>
                    

                    <Button type="submit">
                        Realizar Cadastro
                    </Button>
                </form>

            </section>

        </main >
    );
}
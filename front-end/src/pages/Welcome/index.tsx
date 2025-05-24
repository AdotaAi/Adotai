import logo from "../../assets/logo1.png";
import background from "../../assets/background.png";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { setData } from "../../core/lStorage";
import styles from "./styles.module.css";
import { postLogin } from "../../api";

import { useState } from "react";
import { useNavigate } from "react-router-dom";


export function Welcome() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginActive, setLoginActive] = useState(false);

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        postLogin({ email, password }).then((data) => {
            setData('email', email);
            if (data === 1) {
                navigate('/match');
            } if (data === 2) {
                navigate('/pets');
            }
        });
    }

    return (
        <main
            className={styles.container}
            style={{ backgroundImage: `url(${background})` }}

        >

            <section>
                <div className={styles.slogan}>
                    <img src={logo} alt="" />
                    <span>Seu pet, a um match!</span>
                </div>
                <form
                    className={styles.login}
                    style={{ display: loginActive ? 'flex' : 'none' }}
                    onSubmit={submit}
                >
                    <Input
                        label="Email"
                        placeholder="Digite seu email"
                        type="email"
                        id="email"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setEmail(event.target.value);
                        }}
                    />

                    <Input
                        label="Senha"
                        placeholder="Digite sua senha"
                        type="password"
                        id="password"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setPassword(event.target.value);
                        }}
                    />

                    <Button>Entrar</Button>

                    <strong
                        onClick={() => {
                            setLoginActive(false);
                        }}
                    >
                        Não tenho uma conta
                    </strong>
                </form>
                <div
                    className={styles.options}
                    style={{ display: loginActive ? 'none' : 'flex' }}
                >
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setLoginActive(true);
                        }}
                    >
                        Entrar
                    </Button>

                    <Button
                        onClick={() => navigate('/register/howareyou')}
                    >
                        Realizar Cadastro
                    </Button>
                </div>
            </section>
        </main>
    );
}
import React, { useState } from "react";
import { Redirect } from "react-router";
import "../CSS/form-sign.css"

export default function Register(props) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [validEmail, setValidEmail] = useState(false)
    const [validPassword, setValidPassword] = useState(false)

    const [redirect, setRedirect] = useState(false)

    const validateEmail = (email) => {
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (!email || emailRegex.test(email) === false) {
            setValidEmail(false)
        }
        else {
            setValidEmail(true)
            setEmail(email)
        }
    }

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*\W)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,}$/

        if (!password || passwordRegex.test(password) === false) {
            setValidPassword(false)
        }
        else {
            setValidPassword(true)
            setPassword(password)
        }
    }

    const submit = async (event) => {
        event.preventDefault()

        if (validEmail && validPassword) {
            const response = await fetch(
                'api/user/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(
                        {
                            name,
                            email,
                            password
                        }
                    )
                }
            )

            if (response.ok) {

                const content = await response.json()
                setRedirect(true)
                props.setUser(content)
            }
            else {
                console.log("invalid creds")
                alert("Ge??ersiz e-posta veya ??ifre!")
            }
        }
        else {
            if (!validPassword) {
                alert("Parola en az 8 karakterden olu??mal?? ve en az birer adet b??y??k harf, k??????k harf, rakam ve sembol i??ermelidir.")
            }
            if (!validEmail) {
                alert("Ge??erli bir e-posta adresi giriniz.")
            }
        }
    }

    if (redirect) {
        return <Redirect to="/login" />;
    }

    return (
        <div>
            <form className="form-signin" onSubmit={submit}>
                <h1 className="h3 mb-3 font-weight-normal">L??tfen kaydolunuz.</h1>

                <input type="text" id="inputName" className="form-control"
                    placeholder="??sim" required
                    value={name}
                    onChange={e => setName(e.target.value)} />

                <input type="email" id="inputEmail" className="form-control"
                    placeholder="E-posta" required
                    onChange={e => validateEmail(e.target.value)} />

                <input type="password" id="inputPassword" className="form-control"
                    placeholder="??ifre" required
                    onChange={e => validatePassword(e.target.value)} />

                <button
                    className="btn btn-lg btn-primary btn-block"
                    type="submit">
                    Giri?? Yap
                </button>
            </form>
        </div>
    );
}
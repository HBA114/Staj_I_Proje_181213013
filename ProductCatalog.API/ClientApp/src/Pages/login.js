import React, { useState } from "react";
import { Redirect } from "react-router";
import "../CSS/form-sign.css"

export default function LoginPage(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [validEmail, setValidEmail] = useState(false)
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

    let login = async (email, password) => {
        await loginRequest(email, password)
    }

    const submit = async (event) => {
        event.preventDefault()

        if (validEmail) {
            const response = await fetch(
                'api/user/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(
                        {
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
                console.log("invalid credentials")
                alert("Geçersiz e-posta veya şifre!")
            }
        }
        else {
            if (!validEmail) {
                alert("Geçerli bir e-posta adresi giriniz.")
            }
        }
    }

    if (redirect) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <form className="form-signin" onSubmit={submit}>
                <h1 className="h3 mb-3 font-weight-normal">Lütfen giriş yapınız.</h1>

                <input type="email" id="inputEmail" className="form-control"
                    placeholder="E-posta" required
                    onChange={e => validateEmail(e.target.value)} />

                <input type="password" id="inputPassword" className="form-control"
                    placeholder="Şifre" required
                    value={password}
                    onChange={e => setPassword(e.target.value)} />

                <button
                    className="btn btn-lg btn-primary btn-block"
                    type="submit">
                    Giriş Yap
                </button>
            </form>
        </div>
    );
}
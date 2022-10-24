import React, {Component, useContext, useState} from "react";
import {Navigate} from 'react-router';
import "../CSS/form-signin.css"
import {UserContext} from "../Contexts/UserContext";
import toast from "bootstrap/js/src/toast";
import EmailNotValidModal from "../Modals/ErrorModals/EmailNotValidModal";

const LoginPage = () => {
    const {user, login} = useContext(UserContext)

    const [email, setEmail] = useState('')
    const [emailValid, setEmailValid] = useState(false)
    const [emailTextValue, setEmailTextValue] = useState('')
    const [emailErrorModalShow, setEmailErrorModalShow] = useState(false)

    const [password, setPassword] = useState('')

    const validateEmail = (email) => {
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        setEmailTextValue(email)
        if (!email || emailRegex.test(email) === false){
            setEmailValid(false)
        }
        else {
            setEmailValid(true)
            setEmail(email)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (emailValid){
            login({
                email: email,
                password: password
            })
        }else {
            setEmailErrorModalShow(true)
        }
    }

    if (user.id != undefined){
        return <Navigate to="/" />
    }

    return (
        <>
            <div>
                <form className="form-signin" onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal">Lütfen giriş yapınız.</h1>

                    <input type="email" id="inputEmail" className="form-control"
                           placeholder="E-posta" required
                           value={emailTextValue}
                           onChange={e => validateEmail(e.target.value)}/>

                    <input type="password" id="inputPassword" className="form-control"
                           placeholder="Şifre" required
                           value={password}
                           onChange={e => setPassword(e.target.value)}/>

                    <button
                        className="btn btn-lg btn-primary btn-block"
                        style={{width: '100%'}}
                        type="submit">
                        Giriş Yap
                    </button>
                </form>
            </div>
            {emailErrorModalShow && <EmailNotValidModal setEmailErrorModalShow={setEmailErrorModalShow} />}
        </>
    )
}

export default LoginPage
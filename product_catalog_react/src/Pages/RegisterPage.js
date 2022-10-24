import React, {Component, useState} from "react";
import {Navigate} from "react-router";
import BaseModal from "../Modals/BaseModal/BaseModal";
import PasswordNotValidModal from "../Modals/ErrorModals/PasswordNotValidModal";
import EmailNotValidModal from "../Modals/ErrorModals/EmailNotValidModal";
import NameNotValidModal from "../Modals/ErrorModals/NameNotValidModal";


const RegisterPage = () => {
    const [name, setName] = useState('')
    const [nameTextValue, setNameTextValue] = useState('')

    const [email, setEmail] = useState('')
    const [emailTextValue, setEmailTextValue] = useState('')

    const [password, setPassword] = useState('')
    const [passwordTextValue, setPasswordTextValue] = useState('')

    const [nameValid, setNameValid] = useState(false)
    const [emailValid, setEmailValid] = useState(false)
    const [passwordValid, setPasswordValid] = useState(false)

    const [redirect, setRedirect] = useState(false)

    const [nameErrorModalShow, setNameErrorModalShow] = useState(false)
    const [emailErrorModalShow, setEmailErrorModalShow] = useState(false)
    const [passwordErrorModalShow, setPasswordErrorModalShow] = useState(false)


    const validateName = (name) => {
        const nameRegex = /^.{2,}$/
        setNameTextValue(name)
        if (!name || nameRegex.test(name) === false) {
            setNameValid(false)
        } else {
            setNameValid(true)
            setName(name)
        }
    }

    const validateEmail = (email) => {
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        setEmailTextValue(email)
        if (!email || emailRegex.test(email) === false) {
            setEmailValid(false)
        } else {
            setEmailValid(true)
            setEmail(email)
        }
    }

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*\W)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,}$/;
        setPasswordTextValue(password)
        if (!password || passwordRegex.test(password) === false) {
            setPasswordValid(false)
        } else {
            setPasswordValid(true)
            setPassword(password)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (nameValid && emailValid && passwordValid) {
            fetch(
                process.env.REACT_APP_API_URL + "api/user/register",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password
                    })
                }
            ).then((data) => {
                if (data.ok) {
                    console.log("Successfully created user")
                    setRedirect(true)
                } else {
                    alert("Bu e-posta adresi zaten kullanılıyor. Lüfen giriş yapınız veya başka bir e-posta adresi ile kaydolunuz.")
                }
            }).catch((error) => {
                console.log(error)
            })

        } else {
            if (!nameValid) {
                setNameErrorModalShow(true)
                setNameTextValue('')
            }
            if (!passwordValid) {
                setPasswordErrorModalShow(true)
                setPasswordTextValue('')
            }
            if (!emailValid) {
                setEmailErrorModalShow(true)
                setEmailTextValue('')
            }
        }
    }

    return (
        <>
            <div>
                <form className="form-signin text-center" onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal">Lütfen kaydolunuz.</h1>

                    <input type="text" id="inputName" className="form-control"
                           placeholder="İsim" required
                           value={nameTextValue}
                           onChange={e => validateName(e.target.value)}/>

                    <input type="email" id="inputEmail" className="form-control"
                           placeholder="E-posta" required
                           value={emailTextValue}
                           onChange={e => validateEmail(e.target.value)}/>

                    <input type="password" id="inputPassword" className="form-control"
                           placeholder="Şifre" required
                           value={passwordTextValue}
                           onChange={e => validatePassword(e.target.value)}/>

                    <button
                        className="btn btn-lg btn-primary btn-block"
                        style={{width: "100%"}}
                        type="submit">
                        Kaydol
                    </button>
                </form>
            </div>
            {emailErrorModalShow && <EmailNotValidModal setEmailErrorModalShow={setEmailErrorModalShow}/>}
            {passwordErrorModalShow && <PasswordNotValidModal setPasswordErrorModalShow={setPasswordErrorModalShow}/>}
            {nameErrorModalShow && <NameNotValidModal setNameErrorModalShow={setNameErrorModalShow}/>}
        </>
    )
}


export default RegisterPage
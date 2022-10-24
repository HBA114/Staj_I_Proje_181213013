import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../Contexts/UserContext";
import {Navigate} from "react-router";
import Button from "bootstrap/js/src/button";

export default function ProfilePage() {
    const {user, logout} = useContext(UserContext)

    const [redirect, setRedirect] = useState('')

    useEffect(() => {

    }, [])

    const handleClick = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        if (name === "logout") {
            setRedirect("/login")
            logout()
        } else {
            setRedirect(`/${name}`)
        }
    }

    if (redirect != '') {
        return <Navigate to={redirect}/>
    }

    return (
        <>
            <h1>{"Profilim"}</h1>
            <div className="container" style={{marginTop: "50px"}}>
                <h3>{"Ad: " + user.name}</h3>
                <h3>{"E-posta: " + user.email}</h3>
                <button name="myProducts" type="submit" className="btn btn-primary"
                        style={{fontSize: "20px"}}
                        onClick={handleClick}>Ürünlerim
                </button>
                <button name="myOrders" type="submit" className="btn btn-primary"
                        style={{fontSize: "20px"}}
                        onClick={handleClick}> Siparişlerim
                </button>
                <button name="offers" type="submit" className="btn btn-primary"
                        style={{fontSize: "20px"}}
                        onClick={handleClick}> Teklifler
                </button>
                <button name="logout" type="submit" className="btn btn-primary"
                        style={{fontSize: "20px"}}
                        onClick={handleClick}> Çıkış Yap
                </button>
            </div>
        </>
    )
}
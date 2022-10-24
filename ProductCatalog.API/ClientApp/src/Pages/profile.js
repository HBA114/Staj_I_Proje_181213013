import React, { useState } from "react"
import { Redirect } from "react-router"

export default function Profile({ user }) {

    const [redirect, setRedirect] = useState('')

    if (redirect != '') {
        return <Redirect to={redirect} />
    }

    let menu

    if (user.id != undefined) {
        menu = (
            <div>
                <h2>Profil</h2>
                <div className="container">
                    <h5>{"Ad : " + user.name}</h5>
                    <h5>{"E-posta : " + user.email}</h5>
                    <div style={{ marginRight: "400px", paddingRight: "50px" }} >
                        <button type="submit" className="btn btn-lg btn-secondary btn-block" onClick={() => setRedirect("/myProducts")} >Ürünlerim</button>
                        <button type="submit" className="btn btn-lg btn-secondary btn-block" onClick={() => setRedirect("/")} >Ana Sayfa</button>
                    </div>
                </div>
            </div>
        )
    }
    else {
        menu = (
            <div>
                <h1>Lütfen giriş yapınız.</h1>
            </div>
        )
    }
    return (
        <div>
            {menu}
        </div>
    )
}
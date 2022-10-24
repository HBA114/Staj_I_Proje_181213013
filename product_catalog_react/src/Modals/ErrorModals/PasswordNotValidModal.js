import React from "react";
import BaseModal from "../BaseModal/BaseModal";

export default function PasswordNotValidModal({setPasswordErrorModalShow}) {

    let modalTitle = (
        <>
            <h3>Şifre Yeterince Güvenli Değil</h3>
        </>
    )

    let modalBody = (
        <>
            <p>Parola en az 8 karakterden oluşmalı ve en az birer adet büyük harf, küçük harf, rakam ve sembol içermelidir.</p>
            <button className="btn btn-primary"
                    onClick={() => setPasswordErrorModalShow(false)}
            >Tamam
            </button>
        </>
    )

    return (
        <>
            <BaseModal modalTitle={modalTitle} modalBody={modalBody}/>
        </>
    )
}
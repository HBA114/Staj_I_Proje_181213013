import React from "react";
import BaseModal from "../BaseModal/BaseModal";

export default function EmailNotValidModal({setEmailErrorModalShow}) {

    let modalTitle = (
        <>
            <h3>Geçersiz E-Posta Adresi</h3>
        </>
    )

    let modalBody = (
        <>
            <p>Lütfen geçerli bir e-posta adresi girdiğinize emin olunuz.</p>
            <button className="btn btn-primary"
                    onClick={() => setEmailErrorModalShow(false)}
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
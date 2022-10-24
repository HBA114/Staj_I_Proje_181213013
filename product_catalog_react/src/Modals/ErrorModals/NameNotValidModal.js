import React from "react";
import BaseModal from "../BaseModal/BaseModal";

export default function NameNotValidModal({setNameErrorModalShow}) {

    let modalTitle = (
        <>
            <h3>Geçersiz İsim</h3>
        </>
    )

    let modalBody = (
        <>
            <p>İsim en az 2 karakterden oluşmalıdır.</p>
            <button className="btn btn-primary"
                    onClick={() => setNameErrorModalShow(false)}
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
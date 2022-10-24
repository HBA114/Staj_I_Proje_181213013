import React, {useState} from "react";
import BaseModal from "../BaseModal/BaseModal";

export default function AddUsedStateModal({setAddUsedState}) {

    const [usedStateName, setUsedStateName] = useState('')

    const handleAddColor = async (e) => {
        e.preventDefault()
        if (usedStateName != '') {
            const response = await fetch(
                process.env.REACT_APP_API_URL + "api/usedstate/create",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                    },
                    body: JSON.stringify({
                        name: usedStateName
                    })
                }
            )

            if (response.ok) {
                const content = await response.json()
            } else {
                alert("Kullanım Durumu Eklenemedi")
            }
            setAddUsedState(false)
        }
    }

    let modalBody = (
        <>
            <div className="form-group">
                <input className="form-control" required placeholder="Renk İsmi"
                       value={usedStateName}
                       onChange={(e) => setUsedStateName(e.target.value)}/>
            </div>

            <button className="btn btn-primary"
                    onClick={handleAddColor}>
                Ekle
            </button>
            <button className="btn btn-primary" onClick={() => setAddUsedState(false)}>İptal
            </button>
        </>
    )

    let modalTitle = (
        <>
            <h1>
                Kullanım Durumu Ekle
            </h1>
        </>
    )


    return (
        <>
            <BaseModal modalTitle={modalTitle} modalBody={modalBody}/>
        </>
    )

}


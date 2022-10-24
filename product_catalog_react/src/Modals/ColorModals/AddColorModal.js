import React, {useState} from "react";
import BaseModal from "../BaseModal/BaseModal";

export default function AddColorModal({setAddColor}) {

    const [colorName, setColorName] = useState('')

    const handleAddColor = async (e) => {
        e.preventDefault()
        if (colorName != '') {
            const response = await fetch(
                process.env.REACT_APP_API_URL + "api/color/create",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                    },
                    body: JSON.stringify({
                        name: colorName
                    })
                }
            )

            if (response.ok) {
                const content = await response.json()
            } else {
                alert("Renk Eklenemedi")
            }
            setAddColor(false)
        }
    }

    let modalBody = (
        <>
            <div className="form-group">
                <input className="form-control" required placeholder="Renk İsmi"
                       value={colorName}
                       onChange={(e) => setColorName(e.target.value)}/>
            </div>

            <button className="btn btn-primary"
                    onClick={handleAddColor}>
                Ekle
            </button>
            <button className="btn btn-primary" onClick={() => setAddColor(false)}>İptal
            </button>
        </>
    )

    let modalTitle = (
        <>
            <h1>Renk Ekle</h1>
        </>
    )

    return (
        <>
            <BaseModal modalTitle={modalTitle} modalBody={modalBody}/>
        </>
    )

}


import React, {useState} from "react";
import BaseModal from "../BaseModal/BaseModal";

function AddCategoryModal({setAddCategory}) {

    const [categoryName, setCategoryName] = useState('')

    const handleAddCategory = async (e) => {
        e.preventDefault()
        const response = await fetch(
            process.env.REACT_APP_API_URL + "api/category/create",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                },
                body: JSON.stringify({
                    name: categoryName
                })
            }
        )

        if (response.ok) {
            const content = await response.json()
        } else {
            console.log("Category could not be added!")
        }
        setAddCategory(false)
    }

    let modalBody = (
        <>
            <div className="form-group">
                <input className="form-control" required placeholder="Kategori ismi"
                       value={categoryName}
                       onChange={(e) => setCategoryName(e.target.value)}/>
            </div>

            <button className="btn btn-primary"
                    onClick={handleAddCategory}>
                Ekle
            </button>
            <button className="btn btn-primary" onClick={() => setAddCategory(false)}>İptal
            </button>
        </>
    )

    let modalTitle = (
        <>
            <h1>
                Kategori Ekle
            </h1>
        </>
    )

    return (
        <>
            <BaseModal modalTitle={modalTitle} modalBody={modalBody}/>
        </>
    )
}

export default AddCategoryModal;
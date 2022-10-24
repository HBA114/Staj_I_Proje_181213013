import React, {useState} from "react";
import {getBrandsByFilteringRequest} from "../../API/BrandRequests";
import BaseModal from "../BaseModal/BaseModal";

export default function AddBrandModal({categoryId, setAddBrand}) {

    const [brandName, setBrandName] = useState('')

    const handleAddBrand = async (e) => {
        e.preventDefault()
        if (categoryId !== 0) {
            let res = await getBrandsByFilteringRequest({name: brandName})
            let brand_id = 0
            if (res.length > 0) {
                res.map(brand => {
                    if (brandName === brand.name) {
                        brand_id = brand.id
                    }
                })
            }
            if (brand_id !== 0) {
                const response = await fetch(
                    process.env.REACT_APP_API_URL + `api/brand/update/${brand_id}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                        },
                        body: JSON.stringify({
                            categoryId: categoryId
                        })
                    }
                )
                if (response.ok) {
                    const content = await response.json()
                } else {
                    console.log("Brand could not be updated!")
                }
            } else {
                const response = await fetch(
                    process.env.REACT_APP_API_URL + "api/brand/create",
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                        },
                        body: JSON.stringify({
                            categoryId: categoryId,
                            name: brandName
                        })
                    }
                )

                if (response.ok) {
                    const content = await response.json()
                } else {
                    console.log("Brand could not be added!")
                }
            }
        } else {
            const response = await fetch(
                process.env.REACT_APP_API_URL + "api/brand/create",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                    },
                    body: JSON.stringify({
                        name: brandName
                    })
                }
            )

            if (response.ok) {
                const content = await response.json()
            } else {
                console.log("Brand could not be added!")
            }
        }
        setAddBrand(false)
    }

    let modalBody = (
        <>
            <div className="form-group">
                <input className="form-control" required placeholder="Marka ismi"
                       value={brandName}
                       onChange={(e) => setBrandName(e.target.value)}/>
            </div>

            <button className="btn btn-primary"
                    onClick={handleAddBrand}>
                Ekle
            </button>
            <button className="btn btn-primary" onClick={() => setAddBrand(false)}>İptal</button>
        </>
    )

    let modalTitle = (
        <>
            <h1>
                Marka Ekle
            </h1>
        </>
    )


    return (
        <>
            <BaseModal modalTitle={modalTitle} modalBody={modalBody}/>
            {/*{bootstrapModal}*/}
        </>
    )
}

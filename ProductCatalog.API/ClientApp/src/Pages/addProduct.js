import React, { useEffect, useState } from "react"
import getBrandsRequest, { getBrandsByFilteringRequest } from "../API/BrandRequests"
import getCategoriesRequest from "../API/CategoryRequests"
import getColorsRequest from "../API/ColorRequests"
import { postProductRequest } from "../API/ProductRequests"
import getUsedStatesRequest from "../API/UsedStateRequests"
import cookies from 'js-cookie'

// require is required for show image
const defaultImageSrc = require("../assets/img/post_image.png")

const initialProductValues = {
    productName: '',
    productDescription: '',
    productPrice: 0.0,
    isOfferable: true,
    userId: 0,
    categoryId: 0,
    usedStateId: 0,
    colorId: 0,
    brandId: 0,
    imageBase64: '',
    imageSrc: defaultImageSrc,
    imageFile: null
}

export default function AddProduct({ user }) {

    const [values, setValues] = useState(initialProductValues)

    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [colors, setColors] = useState([])
    const [usedStates, setUsedStates] = useState([])

    const getCategories = async () => {
        let result = await getCategoriesRequest()
        setCategories(result)
    }

    const getBrands = async () => {
        let result
        if (values.categoryId !== 0) {
            result = await getBrandsByFilteringRequest(values.categoryId)
        }
        else {
            result = await getBrandsRequest()
        }
        setBrands(result)
    }

    const getColors = async () => {
        let result = await getColorsRequest()
        setColors(result)
    }

    const getUsedStates = async () => {
        let result = await getUsedStatesRequest()
        setUsedStates(result)
    }

    const postProduct = async () => {
        let result = await postProductRequest(values.productName, values.productDescription, values.productPrice, values.isOfferable, values.userId, values.categoryId, values.usedStateId, values.colorId, values.brandId, values.imageBase64)
        // let result = await postProductRequest(values)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target

        if (name.includes("Id")) {
            setValues({
                ...values,
                [name]: parseInt(value)
            })
        }
        else if (name.includes("Price")) {
            setValues({
                ...values,
                [name]: parseFloat(value)
            })
        }
        else if (name.includes("Offerable")) {
            setValues({
                ...values,
                [name]: value === 'true'
            })
        }
        else {
            setValues({
                ...values,
                [name]: value
            })
        }

    }

    const getBase64 = (file, func) => {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
            func(reader.result)
        }
        reader.onerror = function (error) {
            console.log("Error" + error)
        }
    }

    const showPreview = (e) => {
        if (e.target.files && e.target.files[0] && e.target.files[0].size < 409600) { // has to be under 400kb
            let imageFile = e.target.files[0]

            const reader = new FileReader()

            reader.onload = x => {
                setValues({
                    ...values,
                    imageFile,
                    // imageSrc: x.target.result
                })
            }

            reader.readAsDataURL(imageFile)
            getBase64(imageFile, (result) => {
                setValues({
                    ...values,
                    imageSrc: result,
                    imageBase64: result
                })
            })
        }
        else {
            console.log("please select a image that less than 400 kb.")
            alert("Lütfen boyutu 400 kb'tan daha küçük bir dosya seçiniz.")
            setValues({
                ...values,
                imageFile: null,
                imageSrc: defaultImageSrc,
                imageBase64: ''
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        values.userId = user.id

        if (values.userId != 0 || values.userId != undefined) {
            // send post request
            if (values.categoryId != 0 && values.productName != '' && values.productDescription != '' && values.imageBase64 != '' && values.productPrice != 0) {

                let jwt = `Bearer ${cookies.get('jwt')}`

                const response = await fetch(
                    'api/product/create',
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Authorization': jwt },
                        credentials: 'include',
                        body: JSON.stringify({
                            name: values.productName,
                            description: values.productDescription,
                            imageBase64: values.imageBase64,
                            userId: values.userId,
                            categoryId: values.categoryId,
                            price: values.productPrice,
                            isOfferable: values.isOfferable,
                            usedStateId: values.usedStateId,
                            colorId: values.colorId,
                            brandId: values.brandId
                        })
                    }
                )

                const result = await response.json()
            }
        }
    }

    return (
        <div className="container" style={{ paddingBottom: "20px" }}>
            <h2>Ürün Ekle</h2>
            <form autoComplete="off" noValidate className="text-center" onSubmit={handleSubmit}>
                <div className="card">
                    <div className="text-center">
                        <img className="card-image-top"
                            height="200px"
                            alt="Product Image"
                            src={values.imageBase64 == '' ? values.imageSrc : values.imageBase64} />
                    </div>
                    <div className="card-body">

                        {/* image selector */}
                        <div className="form-group">
                            <input type="file" className="form-control"
                                accept="image/*" id="image-uploader" onChange={showPreview} />
                        </div>

                        {/* Name textbox */}
                        <div className="form-group">
                            <input type="text" className="form-control"
                                placeholder="Ürün Adı"
                                name="productName"
                                onChange={handleInputChange} />
                        </div>

                        {/* Description textbox */}
                        <div className="form-group">
                            <input type="text" className="form-control"
                                placeholder="Ürün Açıklaması"
                                name="productDescription"
                                onChange={handleInputChange} />
                        </div>

                        {/* Price textbox */}
                        <div className="form-group">
                            <input type="number" className="form-control"
                                name="productPrice"
                                placeholder="Ürün Fiyatı"
                                onChange={handleInputChange} />
                        </div>

                        {/* Is offerable selector (switch(true/false)) */}
                        <div className="form-group row" style={{ marginRight: 'auto' }}>
                            <h5 className='col-md-2' style={{ textAlign: 'start', margin: 'auto', fontSize: '18px' }}>Teklife Açık : </h5>
                            <select name="isOfferable" className="form-control col text-center"
                                style={{ height: '100%', overflow: 'auto', width: '100%', margin: 'auto' }}
                                onChange={handleInputChange}>
                                <option value={true}>Evet</option>
                                <option value={false}>Hayır</option>
                            </select>
                        </div>

                        {/* Category Selector Dropdown */}
                        <div className="form-group row" style={{ marginRight: 'auto' }}>
                            <h5 className="col-md-2" style={{ textAlign: 'start', fontSize: '18px' }}>Kategori : </h5>
                            <select name="categoryId" className="form-control col text-center" onClick={getCategories} onFocus={getCategories}
                                onMouseEnter={getCategories}
                                style={{ height: '100%', overflow: 'auto', width: '100%' }}
                                onChange={handleInputChange}>
                                <option value={0}>Lütfen bir kategori seçiniz.</option>
                                {categories.map(cat => {
                                    return <option key={cat.id} value={cat.id}>{cat.name}</option>
                                })}
                            </select>
                        </div>

                        {/* Brand Selector Dropdown */}
                        {/* //! if category is selected get brands of that category */}
                        <div className="form-group row" style={{ marginRight: 'auto' }}>
                            <h5 className="col-md-2" style={{ textAlign: 'start', fontSize: '18px' }}>Marka : </h5>
                            <select name="brandId" className="form-control col text-center" onClick={getBrands} onFocus={getBrands}
                                onMouseEnter={getBrands}
                                style={{ height: '100%', overflow: 'auto', width: '100%' }}
                                onChange={handleInputChange}>
                                <option value={0}>Lütfen bir Marka seçiniz.</option>
                                {brands.map(brand => {
                                    return <option key={brand.id} value={brand.id}>{brand.name}</option>
                                })}
                            </select>
                        </div>

                        {/* Color Selector Dropdown */}
                        <div className="form-group row" style={{ marginRight: 'auto' }}>
                            <h5 className="col-md-2" style={{ textAlign: 'start', fontSize: '18px' }}>Renk : </h5>
                            <select name="colorId" className="form-control col text-center" onClick={getColors} onFocus={getColors}
                                onMouseEnter={getColors}
                                style={{ height: '100%', overflow: 'auto', width: '100%' }}
                                onChange={handleInputChange}>
                                <option value={0}>{"Lütfen bir renk seçiniz.(Bu alan zorunlu değildir)"}</option>
                                {colors.map(color => {
                                    return <option key={color.id} value={color.id}>{color.name}</option>
                                })}
                            </select>
                        </div>

                        {/* UsedState Selector Dropdown */}
                        <div className="form-group row" style={{ marginRight: 'auto' }}>
                            <h5 className="col-md-3" style={{ textAlign: 'start', fontSize: '18px' }}>Kullanım Durumu : </h5>
                            <select name="usedStateId" className="form-control col text-center" onClick={getUsedStates} onFocus={getUsedStates}
                                onMouseEnter={getUsedStates}
                                style={{ height: '100%', overflow: 'auto', width: '100%' }}
                                onChange={handleInputChange}>
                                <option value={0}>Lütfen bir kullanım durumu seçiniz.</option>
                                {usedStates.map(usedState => {
                                    return <option key={usedState.id} value={usedState.id}>{usedState.name}</option>
                                })}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Ürün Ekle</button>
                    </div>
                </div>
                {/* <button type="submit" className="btn btn-primary">Ürün Ekle</button> */}
            </form>
        </div>
    )
}
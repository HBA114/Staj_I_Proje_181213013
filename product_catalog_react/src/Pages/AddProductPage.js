import React, {useContext, useEffect, useState} from "react"
import {UserContext} from "../Contexts/UserContext";
import getCategoriesRequest from "../API/CategoryRequests";
import getBrandsRequest, {getBrandsByFilteringRequest} from "../API/BrandRequests";
import getColorsRequest from "../API/ColorRequests";
import getUsedStatesRequest from "../API/UsedStateRequests";
import {postProductRequest} from "../API/ProductRequests";
import "../CSS/form-signin.css"
import AddCategoryModal from "../Modals/CategoryModals/AddCategoryModal";
import AddBrandModal from "../Modals/BrandModals/AddBrandModal";
import AddColorModal from "../Modals/ColorModals/AddColorModal";
import AddUsedStateModal from "../Modals/UsedStateModals/AddUsedStateModal";
import {Navigate} from "react-router";

// require is required for show image
const defaultImageSrc = require("../Assets/img/post_image.png")

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

export default function AddProductPage() {

    const {user} = useContext(UserContext)

    const [values, setValues] = useState(initialProductValues)

    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [colors, setColors] = useState([])
    const [usedStates, setUsedStates] = useState([])

    const [addCategory, setAddCategory] = useState(false)
    const [addBrand, setAddBrand] = useState(false)
    const [addColor, setAddColor] = useState(false)
    const [addUsedState, setAddUsedState] = useState(false)

    const [redirect, setRedirect] = useState(false)

    const getCategories = async () => {
        let result = await getCategoriesRequest()
        setCategories(result)
    }

    const getBrands = async () => {
        let result
        if (values.categoryId !== 0) {
            result = await getBrandsByFilteringRequest({categoryId: values.categoryId})
        } else {
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
        let result = await postProductRequest({
            name: values
                .productName,
            description: values
                .productDescription,
            price: values
                .productPrice,
            isOfferable: values
                .isOfferable,
            userId: values
                .userId,
            categoryId: values
                .categoryId,
            usedStateId: values
                .usedStateId,
            colorId: values
                .colorId,
            brandId: values
                .brandId,
            imageBase64: values
                .imageBase64
        })
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target

        if (name.includes("Id")) {
            const my_value = parseInt(value);
            if (name.includes("category") && my_value === -1) {
                setAddCategory(true)
            }
            if (name.includes("brand") && my_value === -1) {
                setAddBrand(true)
            }
            if (name.includes("color") && my_value === -1) {
                setAddColor(true)
            }
            if (name.includes("usedState") && my_value === -1) {
                setAddUsedState(true)
            }

            setValues({
                ...values,
                [name]: parseInt(value)
            })
        } else if (name.includes("Price")) {
            setValues({
                ...values,
                [name]: parseFloat(value)
            })
        } else if (name.includes("Offerable")) {
            setValues({
                ...values,
                [name]: value === 'true'
            })
        } else {
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
        } else {
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

        if (values.userId !== 0 || values.userId !== undefined) {
            // send post request
            if (values.categoryId !== 0 && values.productName !== '' && values.productDescription !== '' && values.imageBase64 !== '' && values.productPrice !== 0) {
                // postProduct()

                // let jwt = `Bearer ${cookies.get('jwt')}`
                let jwt = `Bearer ${localStorage.getItem("jwt")}`

                const response = await fetch(
                    process.env.REACT_APP_API_URL + 'api/product/create',
                    {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json', 'Authorization': jwt},
                        credentials: 'include',
                        body: JSON.stringify({
                            name: values.productName,
                            description: values.productDescription,
                            imageBase64: values.imageBase64,
                            userId: values.userId,
                            categoryId: values.categoryId,
                            isSold: false,
                            price: values.productPrice,
                            isOfferable: values.isOfferable,
                            usedStateId: values.usedStateId === 0 ? null : values.usedStateId,
                            colorId: values.colorId === 0 ? null : values.colorId,
                            brandId: values.brandId === 0 ? null : values.brandId
                        })
                    }
                )

                const result = await response.json()

                if (response.ok){
                    setRedirect(true)
                }
            }
        }
    }

    if (redirect){
        return <Navigate to="/myProducts" />
    }

    return (
        <div className="container" style={{paddingBottom: "20px"}}>

            <h2>Ürün Ekle</h2>
            <form autoComplete="off" noValidate className="text-center" onSubmit={handleSubmit}>

                <div className="card">

                    <div className="text-center">
                        <img className="card-image-top"
                             height="200px"
                             src={values.imageBase64 == '' ? values.imageSrc : values.imageBase64}/>
                    </div>
                    <div className="card-body">

                        {/* image selector */}
                        <div className="form-group" style={{padding: "5px"}}>
                            <input type="file" className="form-control"
                                   accept="image/*" id="image-uploader" onChange={showPreview}/>
                        </div>

                        {/* Name textbox */}
                        <div className="form-group" style={{padding: "5px"}}>
                            <input type="text" className="form-control"
                                   placeholder="Ürün Adı"
                                   name="productName"
                                   onChange={handleInputChange}/>
                        </div>

                        {/* Description textbox */}
                        <div className="form-group" style={{padding: "5px"}}>
                            <input type="text" className="form-control"
                                   placeholder="Ürün Açıklaması"
                                   name="productDescription"
                                   onChange={handleInputChange}/>
                        </div>

                        {/* Price textbox */}
                        <div className="form-group" style={{padding: "5px"}}>
                            <input type="number" className="form-control"
                                   name="productPrice"
                                   placeholder="Ürün Fiyatı"
                                   onChange={handleInputChange}/>
                        </div>

                        {/* Is offerable selector (switch(true/false)) */}
                        <div className="form-group row" style={{marginRight: 'auto', padding: "5px"}}>
                            <h5 className='col-md-2'
                                style={{textAlign: 'start', margin: 'auto', fontSize: '18px'}}>Teklife Açık : </h5>
                            <select name="isOfferable" className="form-control col text-center"
                                    style={{height: '100%', overflow: 'auto', width: '100%', margin: 'auto'}}
                                    onChange={handleInputChange}>
                                <option value={true}>Evet</option>
                                <option value={false}>Hayır</option>
                            </select>
                        </div>

                        {/* Category Selector Dropdown */}
                        <div className="form-group row" style={{marginRight: 'auto', padding: "5px"}}>
                            <h5 className="col-md-2" style={{textAlign: 'start', fontSize: '18px'}}>Kategori : </h5>
                            <select name="categoryId" className="form-control col text-center"
                                    onClick={getCategories} onFocus={getCategories} onMouseEnter={getCategories}
                                    style={{height: '100%', overflow: 'auto', width: '100%'}}
                                    onChange={handleInputChange}>
                                <option value={0}>Lütfen bir Kategori seçiniz.</option>
                                {categories.map(cat => {
                                    return <option key={cat.id} value={cat.id}>{cat.name}</option>
                                })}
                                <option value={-1}>Yeni Kategori Ekle</option>
                            </select>
                        </div>

                        {/* Brand Selector Dropdown */}
                        {/* //! if category is selected get brands of that category */}
                        <div className="form-group row" style={{marginRight: 'auto', padding: "5px"}}>
                            <h5 className="col-md-2" style={{textAlign: 'start', fontSize: '18px'}}>Marka : </h5>
                            <select name="brandId" className="form-control col text-center"
                                    onClick={getBrands} onFocus={getBrands} onMouseEnter={getBrands}
                                    style={{height: '100%', overflow: 'auto', width: '100%'}}
                                    onChange={handleInputChange}>
                                <option value={0}>Lütfen bir Marka seçiniz.</option>
                                {brands.map(brand => {
                                    return <option key={brand.id} value={brand.id}>{brand.name}</option>
                                })}
                                <option value={-1}>Yeni Marka Ekle</option>
                            </select>
                        </div>

                        {/* Color Selector Dropdown */}
                        <div className="form-group row" style={{marginRight: 'auto', padding: "5px"}}>
                            <h5 className="col-md-2" style={{textAlign: 'start', fontSize: '18px'}}>Renk : </h5>
                            <select name="colorId" className="form-control col text-center"
                                    onClick={getColors} onFocus={getColors} onMouseEnter={getColors}
                                    style={{height: '100%', overflow: 'auto', width: '100%'}}
                                    onChange={handleInputChange}>
                                <option value={0}>{"Lütfen bir renk seçiniz.(Bu alan zorunlu değildir)"}</option>
                                {colors.map(color => {
                                    return <option key={color.id} value={color.id}>{color.name}</option>
                                })}
                                <option value={-1}>Yeni Renk Ekle</option>
                            </select>
                        </div>

                        {/* UsedState Selector Dropdown */}
                        <div className="form-group row" style={{marginRight: 'auto', padding: "5px"}}>
                            <h5 className="col-md-2" style={{textAlign: 'start', fontSize: '18px'}}>Kullanım Durumu
                                : </h5>
                            <select name="usedStateId" className="form-control col text-center"
                                    onClick={getUsedStates} onFocus={getUsedStates} onMouseEnter={getUsedStates}
                                    style={{height: '100%', overflow: 'auto', width: '100%'}}
                                    onChange={handleInputChange}>
                                <option value={0}>Lütfen bir kullanım durumu seçiniz.</option>
                                {usedStates.map(usedState => {
                                    return <option key={usedState.id} value={usedState.id}>{usedState.name}</option>
                                })}
                                <option value={-1}>Yeni Kullanım Durumu Ekle</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Ürün Ekle</button>
                    </div>
                </div>
                {/* <button type="submit" className="btn btn-primary">Ürün Ekle</button> */}
            </form>

            {addBrand && <AddBrandModal categoryId={values.categoryId} setAddBrand={setAddBrand}/>}
            {addCategory && <AddCategoryModal setAddCategory={setAddCategory}/>}
            {addColor && <AddColorModal setAddColor={setAddColor}/>}
            {addUsedState && <AddUsedStateModal setAddUsedState={setAddUsedState}/>}

        </div>
    )
}
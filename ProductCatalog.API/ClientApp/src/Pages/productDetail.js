import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import { getBrandByIdRequest } from "../API/BrandRequests"
import { getCategoryByIdRequest } from "../API/CategoryRequests"
import { getColorByIdRequest } from "../API/ColorRequests"
import { getProductByIdRequest } from "../API/ProductRequests"
import { getUsedStateByIdRequest } from "../API/UsedStateRequests"

const initialOfferData = {
    fromUserId: 0,
    toUserId: 0,
    productId: 0,
    offerPrice: 0.0
}

const ProductDetail = ({ user }) => {

    const [id, setId] = useState(0)
    const [product, setProduct] = useState({})


    const link = window.location.href

    const getProduct = async () => {
        let result = await getProductByIdRequest(id)
        setProduct(result)
    }


    useEffect(() => {

        if (link.includes("/id=")) {
            setId(link.split("/id=")[1])
        }

        if (id != 0) {
            getProduct()
        }

    }, [id])

    let pageData

    if (product.name == undefined) {
        pageData = (
            <div className="container">
                <h3>Ürün Bulunanamadı</h3>
            </div>
        )
    }
    else {
        pageData = (
            <ProductDetailComponent product={product} user={user} />
        )
    }

    return (
        <div>
            <h1>Ürün Detayları</h1>
            {pageData}
        </div>
    )
}

const ProductDetailComponent = ({ product, user }) => {
    const [category, setCategory] = useState({})
    const [brand, setBrand] = useState({})
    const [usedState, setUsedState] = useState({})
    const [color, setColor] = useState({})
    const [price_or_percentage, setPrice_Or_Percentage] = useState(false)

    const [offerValues, setOfferValues] = useState(initialOfferData)

    const getCategory = async () => {
        let result = await getCategoryByIdRequest(product.categoryId)
        setCategory(result)
    }

    const getBrand = async () => {
        let result = await getBrandByIdRequest(product.brandId)
        setBrand(result)
    }

    const getUsedState = async () => {
        let result = await getUsedStateByIdRequest(product.usedStateId)
        setUsedState(result)
    }

    const getColor = async () => {
        let result = await getColorByIdRequest(product.colorId)
        setColor(result)
    }

    useEffect(() => {
        getCategory()
        getBrand()
        getUsedState()
        getColor()
    }, [])

    let productDetails
    let screenDesign
    let offerMenu
    let buyProductMenu
    let offerChoice

    productDetails = (
        <div>
            <div className="container">
                <div className="text-center">
                    <img style={{ width: "250px", height: "250px", marginBottom: "30px" }} alt="product-image" src={product.imageBase64} />
                </div>
                <div className="container">
                    <h5>{"Ürün Adı : " + product.name}</h5>
                </div>
                <div className="container">
                    <h5>{"Ürün Açıklaması : " + product.description}</h5>
                </div>
                <div className="container">
                    <h5>{"Ürün Fiyatı : " + product.price + " ₺"}</h5>
                </div>
                <div className="container">
                    <h5>{"Ürün Kategorisi : " + category.name}</h5>
                </div>
                <div className="container">
                    <h5>{"Ürün Markası : " + brand.name}</h5>
                </div>
                <div className="container">
                    <h5>{"Ürün Rengi : " + color.name}</h5>
                </div>
                <div className="container">
                    <h5>{"Ürün Kullanım Durumu : " + usedState.name}</h5>
                </div>
                <div className="container">
                    <h5>{"Teklife Açık : " + (product.isOfferable ? "Evet" : "Hayır")}</h5>
                </div>
            </div>
        </div>
    )

    const handleOfferInput = (e) => {
        const { name, value } = e.target

        if (name.includes("Id")) {
            setOfferValues({
                ...offerValues,
                [name]: parseInt(value)
            })
        }
        else if (name.includes("Price")) {
            setOfferValues({
                ...offerValues,
                [name]: parseFloat(value)
            })
        }
    }

    const handlePercentageOffer = (e) => {
        const { name, value } = e.target
        setOfferValues({
            ...offerValues,
            [name]: (product.price / 100) * value
        })
    }

    const handleOfferSubmit = (e) => {
        e.preventDefault()
        // offerValues.fromUserId = user.id
        // offerValues.toUserId = product.userId
        // offerValues.productId = product.id
        setOfferValues({
            ...offerValues,
            fromUserId: user.id,
            toUserId: product.userId,
            productId: product.id
        })

        if (offerValues.fromUserId != 0) {  //! Eğer Teklif Kabul Edilirse isSold değerini güncellemeyi unutma

        }
    }

    const handleBuy = (e) => {
        e.preventDefault()
    }

    const offerPercentages = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

    const handlePriceSelect = (e) => {
        setPrice_Or_Percentage(!price_or_percentage)
    }

    if (!price_or_percentage) {
        offerChoice = (
            <div className="form-group">
                <h5>Teklif Fiyatı Giriniz</h5>
                <input type="number" className="form-control"
                    name="offerPrice"
                    placeholder="Teklif fiyatı giriniz."
                    onChange={handleOfferInput}
                />
            </div>
        )
    }
    else {
        offerChoice = (
            <div className="form-group">
                <h5>Yüzdelik Teklif</h5>
                <select name="offerPrice" className="text-center"
                    onChange={handlePercentageOffer} defaultValue={100} >
                    {offerPercentages.map(percentage => {
                        return <option key={percentage} value={percentage}>{"%" + percentage}</option>
                    })}
                </select>
            </div>
        )
    }

    if (product.isOfferable) {
        offerMenu = (
            <div style={{ marginRight: "50px", marginLeft: "0px" }}>
                <form autoComplete="off" noValidate className="text-center" onSubmit={handleOfferSubmit}>
                    <div className="card">
                        <div className="card-body">

                            <div className="form-group">
                                <select name="price_or_percentage" value={price_or_percentage}
                                    onChange={handlePriceSelect}>
                                    <option value={false}>{"Fiyat ile teklif Verin"}</option>
                                    <option value={true}>{"Yüzdelik Teklif Verin"}</option>
                                </select>
                            </div>

                            {offerChoice}

                            <button type="submit" className="btn btn-primary">Teklif ver</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
    else {  // teklif verilemez fakat satın alınabilir olduğu durumda birşey göstermemelidir
        offerMenu = (<></>)
    }

    buyProductMenu = (
        <div style={{ marginRight: "50px", marginLeft: "0px", paddingBottom: "10px" }}>
            <div className="card text-center">
                <div>
                    <h4>Ürünü Satın Alın</h4>
                </div>
                <div className="card-body">
                    <h5>{"Fiyat: " + product.price}</h5>
                    <button type="submit" className="btn btn-primary" onClick={handleBuy}>Satın Al</button>
                </div>
            </div>
        </div>
    )

    if (product.userId !== user.id && user.id !== undefined) { //!  && product.userId !== user.id
        if (offerValues.offerPrice === 0) {
            setOfferValues({
                ...offerValues,
                offerPrice: product.price
            })
        }
        screenDesign = (
            <>
                <div className="row" style={{ marginRight: "0px" }}>
                    <div className="col-md-6">
                        {productDetails}
                    </div>
                    <div className="col-md-6">
                        {buyProductMenu}
                        {offerMenu}
                    </div>
                </div>
            </>
        )
    }
    else {
        screenDesign = (
            <>
                {productDetails}
            </>
        )
    }

    return (
        <div>
            {screenDesign}
        </div>
    )
}

export default ProductDetail
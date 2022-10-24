import {useContext, useEffect, useState} from "react";
import {getProductByIdRequest} from "../API/ProductRequests";
import {UserContext} from "../Contexts/UserContext";
import {getBrandByIdRequest} from "../API/BrandRequests";
import {getCategoryByIdRequest} from "../API/CategoryRequests";
import {getColorByIdRequest} from "../API/ColorRequests";
import {getUsedStateByIdRequest} from "../API/UsedStateRequests";
import {Navigate} from "react-router";

const initialOfferData = {
    fromUserId: 0,
    toUserId: 0,
    productId: 0,
    offerPrice: 0.0
}

const ProductDetailPage = () => {

    const {user} = useContext(UserContext)

    const [id, setId] = useState(0)
    const [product, setProduct] = useState({})

    const link = window.location.href

    const getProduct = async () => {
        let result = await getProductByIdRequest(id)
        setProduct(result)
    }


    useEffect(() => {

        if (link.includes("/id=")) {
            setId(parseInt(link.split("/id=")[1]))
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
    } else {
        pageData = (
            <ProductDetailComponent product={product} user={user}/>
        )
    }

    return (
        <div>
            <h1>Ürün Detayları</h1>
            {pageData}
        </div>
    )
}

const ProductDetailComponent = ({product, user}) => {
    const [category, setCategory] = useState({})
    const [brand, setBrand] = useState({})
    const [usedState, setUsedState] = useState({})
    const [color, setColor] = useState({})
    const [price_or_percentage, setPrice_Or_Percentage] = useState(false)
    const [priceValid, setPriceValid] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [buyRedirect, setBuyRedirect] = useState(false)

    const [offerValues, setOfferValues] = useState(initialOfferData)

    const getBrand = async () => {
        let result = await getBrandByIdRequest(product.brandId)
        setBrand(result)
    }

    const getCategory = async () => {
        let result = await getCategoryByIdRequest(product.categoryId)
        setCategory(result)
    }

    const getColor = async () => {
        let result = await getColorByIdRequest(product.colorId)
        setColor(result)
    }

    const getUsedState = async () => {
        let result = await getUsedStateByIdRequest(product.usedStateId)
        setUsedState(result)
    }


    useEffect(() => {
        if (product.colorId !== null) {
            getColor()
        }
        if (product.brandId !== null) {
            getBrand()
        }
        if (product.usedStateId !== null) {
            getUsedState()
        }
        getCategory()
    }, [])

    let productDetails
    let screenDesign
    let offerMenu
    let buyProductMenu
    let offerChoice

    productDetails = (
        <div>
            <div className="container">
                <div className="row" style={{margin: 'auto'}}>
                    <div className="text-center col">
                        <img style={{width: "400px", height: "400px", marginTop: "10px"}} alt="product-image"
                             src={product.imageBase64}/>
                    </div>

                    {/*<div className={"container" + (product.userId === user.id ? " col" : product.isSold === true ? " col" : "")} style={{marginTop: '50px'}}>*/}
                    {/*    {product.isSold ? <h4 style={{color: 'red'}}>Satıldı</h4> : <></>}*/}
                    {/*    <h4>{"Ürün Adı : " + product.name}</h4>*/}
                    {/*    <h4>{"Ürün Açıklaması : " + product.description}</h4>*/}
                    {/*    <h4>{"Ürün Fiyatı : " + product.price + " ₺"}</h4>*/}
                    {/*    <h4>{"Ürün Kategorisi : " + category.name}</h4>*/}
                    {/*    {product.brandId !== null ? <h4>{"Ürün Markası : " + brand.name}</h4> : <></>}*/}
                    {/*    {product.colorId !== null ? <h4>{"Ürün Rengi : " + color.name}</h4> : <></>}*/}
                    {/*    {product.usedStateId !== null ? <h4>{"Ürün Kullanım Durumu : " + usedState.name}</h4> : <></>}*/}
                    {/*    <h4>{"Teklife Açık : " + (product.isOfferable ? "Evet" : "Hayır")}</h4>*/}
                    {/*</div>*/}
                    <div className="container col" style={{marginTop: '50px'}}>
                        {product.isSold ? <h4 style={{color: 'red'}}>Satıldı</h4> : <></>}
                        <h4>{"Ürün Adı : " + product.name}</h4>
                        <h4>{"Ürün Açıklaması : " + product.description}</h4>
                        <h4>{"Ürün Fiyatı : " + product.price + " ₺"}</h4>
                        <h4>{"Ürün Kategorisi : " + category.name}</h4>
                        {product.brandId !== null ? <h4>{"Ürün Markası : " + brand.name}</h4> : <></>}
                        {product.colorId !== null ? <h4>{"Ürün Rengi : " + color.name}</h4> : <></>}
                        {product.usedStateId !== null ? <h4>{"Ürün Kullanım Durumu : " + usedState.name}</h4> : <></>}
                        <h4>{"Teklife Açık : " + (product.isOfferable ? "Evet" : "Hayır")}</h4>
                        {offerMenu}
                        {buyProductMenu}
                    </div>
                </div>
            </div>
        </div>
    )

    // const ProductDetailView = ({offerMenu, buyProductMenu}) => {
    //     return (
    //         <>
    //                 <div className="">
    //                     <div className="row" style={{margin: 'auto'}}>
    //                         <div className="text-center col">
    //                             <img style={{width: "400px", height: "400px", marginTop: "10px"}} alt="product-image"
    //                                  src={product.imageBase64}/>
    //                         </div>
    //                         <div className="container col" style={{marginTop: '10px'}}>
    //                             {product.isSold ? <h4 style={{color: 'red'}}>Satıldı</h4> : <></>}
    //                             <h4>{"Ürün Adı : " + product.name}</h4>
    //                             <h4>{"Ürün Açıklaması : " + product.description}</h4>
    //                             <h4>{"Ürün Fiyatı : " + product.price + " ₺"}</h4>
    //                             <h4>{"Ürün Kategorisi : " + category.name}</h4>
    //                             {product.brandId !== null ? <h4>{"Ürün Markası : " + brand.name}</h4> : <></>}
    //                             {product.colorId !== null ? <h4>{"Ürün Rengi : " + color.name}</h4> : <></>}
    //                             {product.usedStateId !== null ? <h4>{"Ürün Kullanım Durumu : " + usedState.name}</h4> : <></>}
    //                             <h4>{"Teklife Açık : " + (product.isOfferable ? "Evet" : "Hayır")}</h4>
    //                             {buyProductMenu}
    //                             {offerMenu}
    //                         </div>
    //                     </div>
    //                 </div>
    //         </>
    //     )
    // }

    const handleOfferInput = (e) => {
        const {name, value} = e.target

        if (name.includes("Id")) {
            setOfferValues({
                ...offerValues,
                [name]: parseInt(value)
            })
        } else if (name.includes("Price")) {
            if (price_or_percentage) {
                const valueRegex = /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/
                if (valueRegex.test(value)) {
                    setPriceValid(true)
                    setOfferValues({
                        ...offerValues,
                        [name]: parseFloat(value)
                    })
                } else {
                    setPriceValid(false)
                }
            } else {
                setPriceValid(true)
                setOfferValues({
                    ...offerValues,
                    [name]: parseFloat(value)
                })
            }

        }
    }

    const handlePercentageOffer = (e) => {
        const {name, value} = e.target
        setPriceValid(true)
        setOfferValues({
            ...offerValues,
            [name]: (product.price / 100) * value
        })
    }

    const handleOfferSubmit = async (e) => {  // offer kabul edilirse ürünün satın alım fiyatını değiştir!
        // satın alan kişi kaç liraya aldığını, Satan kişi kaç liraya sattığını görsün
        e.preventDefault()

        if (priceValid && (user.id !== undefined)) {
            setOfferValues({
                ...offerValues,
                fromUserId: user.id,
                toUserId: product.userId,
                productId: product.id
            })

            const response = await fetch(
                `${process.env.REACT_APP_API_URL}api/offer/create`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                    },
                    body: JSON.stringify({
                        fromUserId: user.id,
                        toUserId: product.userId,
                        productId: product.id,
                        offerPrice: offerValues.offerPrice
                    })
                }
            )

            if (response.ok) {
                setRedirect(true)
                const content = await response.json()
            }
        } else {
            if (!priceValid) {
                alert("Lütfen geçerli bir fiyat girişi yapınız.")
            }
            if (offerValues.fromUserId === 0 || offerValues.fromUserId === undefined) {
                if (user.id === undefined) {
                    alert("Lütfen yeniden giriş yapınız.")
                }
            }
        }
    }

    const handleBuy = async (e) => {
        e.preventDefault()

        if (user.id !== undefined) {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}api/order/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
                    },
                    body: JSON.stringify({
                        productId: product.id,
                        buyerId: user.id
                    })
                }
            )

            if (response.status == 401) {
                alert("Lütfen giriş yapınız.")
            }

            if (response.ok) {
                const content = await response.json()
                setBuyRedirect(true)
            } else {
                console.log("Cannot create order")
            }
        }
    }


    const offerPercentages = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

    const handlePriceSelect = (e) => {
        setPrice_Or_Percentage(!price_or_percentage)
    }

    if (!price_or_percentage) {
        offerChoice = (
            <div className="form-group">
                <h5>Teklif Fiyatı Giriniz</h5>
                <input type="number" className="form-control-select"
                       name="offerPrice"
                       id="offerPriceFloat"
                       placeholder="Teklif fiyatı giriniz."
                       onChange={handleOfferInput}
                />
            </div>
        )
    } else {
        offerChoice = (
            <div className="form-group">
                <h5>Yüzdelik Teklif</h5>
                <select name="offerPrice" className="form-control-select"
                        onChange={handlePercentageOffer} defaultValue={100}>
                    {offerPercentages.map(percentage => {
                        return <option key={percentage} value={percentage}>{"%" + percentage}</option>
                    })}
                </select>
            </div>
        )
    }

    if (product.isOfferable) {
        offerMenu = (
            <div style={{marginRight: "50px", marginLeft: "0px"}}>
                <form autoComplete="off" noValidate className="text-center" onSubmit={handleOfferSubmit}>
                    <div className="card">
                        <div className="card-body">

                            <div className="form-group">
                                <select name="price_or_percentage" value={price_or_percentage}
                                        className="form-control-select"
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
    } else {  // teklif verilemez fakat satın alınabilir olduğu durumda birşey göstermemelidir
        offerMenu = (<></>)
    }

    buyProductMenu = (
        <div style={{marginRight: "50px", marginLeft: "0px", paddingBottom: "10px"}}>
            <div className="card text-center">
                <div>
                    <h4>Ürünü Satın Alın</h4>
                </div>
                <div className="card-body">
                    <h5>{"Fiyat: " + product.price + " ₺"}</h5>
                    <button type="submit" className="btn btn-primary" onClick={handleBuy}>Satın Al</button>
                </div>
            </div>
        </div>
    )

    if (product.userId !== user.id && user.id !== undefined && product.isSold === false) { //!  && product.userId !== user.id
        if (offerValues.offerPrice === 0) {
            setOfferValues({
                ...offerValues,
                offerPrice: product.price
            })
        }

        screenDesign = (
            <>
                <div className="row" style={{marginRight: "0px"}}>
                    <div className="">
                        {/*{productDetails}*/}
                        {/*<ProductDetailView buyProductMenu={buyProductMenu} offerMenu={offerMenu} />*/}
                        <div className="">
                            <div className="row" style={{margin: 'auto'}}>
                                <div className="text-center col">
                                    <img style={{width: "400px", height: "400px", marginTop: "10px"}}
                                         alt="product-image"
                                         src={product.imageBase64}/>
                                </div>
                                <div className="container col" style={{marginTop: '10px'}}>
                                    {product.isSold ? <h4 style={{color: 'red'}}>Satıldı</h4> : <></>}
                                    <h4>{"Ürün Adı : " + product.name}</h4>
                                    <h4>{"Ürün Açıklaması : " + product.description}</h4>
                                    <h4>{"Ürün Fiyatı : " + product.price + " ₺"}</h4>
                                    <h4>{"Ürün Kategorisi : " + category.name}</h4>
                                    {product.brandId !== null ? <h4>{"Ürün Markası : " + brand.name}</h4> : <></>}
                                    {product.colorId !== null ? <h4>{"Ürün Rengi : " + color.name}</h4> : <></>}
                                    {product.usedStateId !== null ?
                                        <h4>{"Ürün Kullanım Durumu : " + usedState.name}</h4> : <></>}
                                    <h4>{"Teklife Açık : " + (product.isOfferable ? "Evet" : "Hayır")}</h4>
                                    {buyProductMenu}
                                    {offerMenu}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<div className="col-md-6">*/}
                    {/*    {buyProductMenu}*/}
                    {/*    {offerMenu}*/}
                    {/*</div>*/}
                </div>
            </>
        )
    } else {
        screenDesign = (
            <>
                {productDetails}
            </>
        )
    }

    if (redirect){
        return <Navigate to="/offers" />
    }

    if (buyRedirect){
        return <Navigate to="/orders"/>
    }

    return (
        <div>
            {screenDesign}
        </div>
    )
}

export default ProductDetailPage
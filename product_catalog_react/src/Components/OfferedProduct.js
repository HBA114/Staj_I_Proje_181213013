import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../Contexts/UserContext";
import moment from "moment";
import {getProductByIdRequest} from "../API/ProductRequests";
import {Navigate} from "react-router";
import commafy from "./PriceFunction";

const OfferedProduct = ({offer}) => {
    const {user} = useContext(UserContext)
    const [product, setProduct] = useState({})
    const [redirect, setRedirect] = useState(false)
    const [redirectToOffersPage, setRedirectToOffersPage] = useState(false)
    const createDate = moment(`/Date(${Date.parse(offer.createDate)})/`).format("HH:mm DD/MM/YYYY");
    const updateDate = moment(`/Date(${Date.parse(offer.updateDate)})/`).format("HH:mm DD/MM/YYYY");

    const getProductData = async () => {
        let response = await getProductByIdRequest(offer.productId)
        setProduct(response)
    }

    useEffect(() => {
        getProductData()
    }, [])

    const handleAcceptOffer = async (e) => {

        const response = await fetch(
            `${process.env.REACT_APP_API_URL}api/offer/accept_offer/${offer.id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                }
            }
        )

        if (response.ok) {
            setRedirectToOffersPage(true)
        }
        const content = await response.json();
    }

    const handleRejectOffer = async (e) => {

        const response = await fetch(
            `${process.env.REACT_APP_API_URL}api/offer/decline_offer/${offer.id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                }
            }
        )

        if (response.ok) {
            setRedirectToOffersPage(true)
        }
    }

    const handleCancelOffer = async (e) => {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}api/offer/cancel_offer/${offer.id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            }
        )

        window.location.reload()
    }

    if (redirect) {
        return <Navigate to={`/product_detail/id=${product.id}`}/>
    }

    if (redirectToOffersPage) {
        window.location.reload()
    }

    let offerButtons = (
        <>
            <div className="row" style={{margin: '5px'}}>
                <div className="col">
                    <button className="btn" onClick={handleRejectOffer}
                            style={{backgroundColor: "red", color: "white"}}>Reddet
                    </button>
                </div>
                <div className="col">
                    <button className="btn btn-primary" onClick={handleAcceptOffer}>Kabul Et</button>
                </div>
            </div>
        </>
    )

    let offerCancelButton = (
        <div className="container" style={{paddingRight: '50px', paddingLeft: '50px', paddingBottom: '10px'}}>
            <button className="btn" style={{backgroundColor: 'red', color: 'white'}}
                    onClick={handleCancelOffer}>
                İptal Et
            </button>
        </div>
    )

    return (
        <>
            <div className="container-fluid">
                <div className="card" style={{marginBottom: '10px'}}>
                    <div className="card-body" onClick={() => setRedirect(true)}>
                        <div className="row">
                            <div style={{margin: "auto"}} className="col-auto">
                                <img style={{height: "200px", borderRadius: "10px"}} src={product.imageBase64}/>
                            </div>
                            <div style={{margin: "auto"}} className="col-auto">
                                <h3>{"Ürün Adı: " + (
                                    product.name !== undefined && product.name.length > 18
                                        ?
                                        product.name.substring(0, 18) + " ..."
                                        :
                                        product.name
                                )}</h3>
                                <h3>{"Teklif Tarihi: " + createDate}</h3>
                                <h3>{offer.isAccepted === true ? "Kabul Tarihi: " + updateDate : ""}</h3>
                                <h3>{"Teklif Fiyatı: " + commafy(offer.offerPrice) + " ₺"}</h3>
                                <h3>{"Ürün Fiyatı: " + commafy(product.price) + " ₺"}</h3>
                                <h3>{"Teklif Aktifliği: " + (offer.isActive ? 'Aktif' : 'Pasif')}</h3>
                                {
                                    !offer.isAccepted ?
                                        <h3>{"Teklif Kabul Edilmedi"}</h3> :
                                        <h3>{"Teklif Kabul Edildi"}</h3>
                                }
                            </div>
                        </div>
                    </div>
                    {product.userId === user.id && offer.isActive && offerButtons}{/* Ürün kullanıcıya ait ise teklifi kabul veya red edebilmelidir. */}
                    {offer.fromUserId === user.id && offer.isActive && offerCancelButton}
                </div>
            </div>
        </>
    )
}

export default OfferedProduct
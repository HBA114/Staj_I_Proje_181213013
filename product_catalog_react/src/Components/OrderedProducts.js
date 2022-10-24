import React, {useContext, useEffect, useState} from "react";
import moment from "moment/moment";
import {UserContext} from "../Contexts/UserContext";
import {getProductByIdRequest} from "../API/ProductRequests";
import {Navigate} from "react-router";
import commafy from "./PriceFunction";

const OrderedProducts = ({order}) => {
    const {user} = useContext(UserContext)
    const [product, setProduct] = useState({})
    const [redirect, setRedirect] = useState(false)
    const date = moment(`/Date(${Date.parse(order.orderDate)})/`).format("HH:mm DD/MM/YYYY");

    const getProductData = async () => {
        let response = await getProductByIdRequest(order.productId)
        setProduct(response)
    }

    useEffect(() => {
        getProductData()
    }, [])

    if (redirect){
        return <Navigate to={`/product_detail/id=${product.id}`} />
    }

    return (
        <>
            <div className="container">
                <div className="card" style={{marginTop: '5px', marginBottom: '5px'}}>
                    <div className="card-body" onClick={() => setRedirect(true)}>
                        <div className="row">
                            <div style={{margin: "auto"}} className="col-auto">
                                <img style={{height: "200px", borderRadius: "10px"}} src={product.imageBase64}/>
                            </div>
                            <div style={{margin: "auto"}} className="col-auto">
                                <h2>{"Ürün Adı: " + product.name}</h2>
                                <h2>{"Sipariş Tarihi : " + date}</h2>
                                <h2>{"Ürün Fiyatı: " + commafy(product.price) + " ₺"}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderedProducts
import React, {Component, useContext, useEffect, useState} from "react";
import {UserContext} from "../Contexts/UserContext";
import moment from "moment";
import OrderedProducts from "../Components/OrderedProducts";

export default function MyOrdersPage() {
    const {user} = useContext(UserContext)

    const [orders, setOrders] = useState([])    // the all orders that current user related
    const [orderViewOption, setOrderViewOption] = useState(0)

    // const [orderLength, setOrderLength] = useState(-1)
    const getAllOrders = async () => {
        const response1 = await fetch(
            `${process.env.REACT_APP_API_URL}api/order/getbyfiltering`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("jwt")}`
                },
                body: JSON.stringify({
                    buyerId: user.id,
                })
            }
        )

        const response2 = await fetch(
            `${process.env.REACT_APP_API_URL}api/order/getOrders/${user.id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            }
        )

        const content1 = await response1.json()
        const content2 = await response2.json()

        const content = content1.concat(content2)
        setOrders(content)
    }

    useEffect(() => {
        if (user.id != undefined) {
            getAllOrders()
        }
    }, [user.id])

    // const OrderDesign = ({order}) => {
    //     const date = moment(`/Date(${Date.parse(order.orderDate)})/`).format("HH:mm DD/MM/YYYY");
    //     return (
    //         <div className="container">
    //             <h2>{"Product Id : " + order.productId}</h2>
    //             <h2>{"Order Date : " + date}</h2>
    //             <h2>{"Buyer id : " + order.buyerId}</h2>
    //         </div>
    //     )
    // }

    let ordersView = (
        <>
        </>
    )

    if (orders.length == 0) {
        ordersView = (
            <div className="container">
                <h3>Siparişiniz yok.</h3>
            </div>
        )
    } else {
        ordersView = (
            <>
                {orders.map(order => {
                    return <OrderedProducts key={order.id} order={order}/>
                })}
            </>
        )
    }


    const OrdersView = ({orders, option}) => {
        return (
            <div>
                {orders.map(order => {
                    switch (option) {
                        case 0:
                            return <OrderedProducts key={order.id} order={order}/>
                        case 1:
                            if (order.buyerId !== user.id)
                                return <OrderedProducts key={order.id} order={order}/>
                            break
                        case 2:
                            if (order.buyerId === user.id)
                                return <OrderedProducts key={order.id} order={order}/>
                            break
                        default:
                            return <OrderedProducts key={order.id} order={order}/>
                    }
                })}
            </div>
        )
    }

    return (
        <>
            <div className="container-fluid">
                <h1>Siparişler</h1>
                <div className="row">
                    <div className="col-auto">
                        <div className="card">
                            <div className="card-body">
                                <h3>Filtreler</h3>
                                <div style={{marginTop: '5px'}}>
                                    <select name="orderView" className="form-control col text-center"
                                            style={{height: '100%', overflow: 'auto', width: '100%'}}
                                            value={orderViewOption}
                                            onChange={(e) => setOrderViewOption(parseInt(e.target.value))}>
                                        <option value={0}>Tüm Siparişler</option>
                                        <option value={1}>Bana Gelen Siparişler</option>
                                        <option value={2}>Benim Siparişlerim</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <OrdersView orders={orders} option={orderViewOption}/>
                    </div>
                </div>
            </div>
        </>
    )
}


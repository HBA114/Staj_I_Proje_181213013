import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../Contexts/UserContext";
import OfferedProduct from "../Components/OfferedProduct";
import {getOffersByFilteringRequest} from "../API/OfferRequests";

const initialOfferFilterValues = {
    userId: 0,
    fromUserId: 0,
    toUserId: 0,
    lowerThanPrice: null,
    isAccepted: null,
    isAcceptedIndex: 0,
    isActive: null,
    isActiveIndex: 0,
    offerPrice: 0,
    orderByPrice: null,
    orderByPriceIndex: 0,
    toWho: 0
}

export default function OffersPage() {
    const {user} = useContext(UserContext)

    const [offers, setOffers] = useState([])

    const [offerFilterValues, setOfferFilterValues] = useState(initialOfferFilterValues)

    let getOffers = async () => {
        setOffers(await getOffersByFilteringRequest({
            userId: user.id === undefined ? 0 : user.id,
            isAccepted: offerFilterValues.isAccepted === null ? null : offerFilterValues.isAccepted,
            isActive: offerFilterValues.isActive === null ? null : offerFilterValues.isActive,
            toUserId: offerFilterValues.toWho === 0 ? null : offerFilterValues.toWho === 2 ? user.id : null,
            fromUserId: offerFilterValues.toWho === 0 ? null : offerFilterValues.toWho === 1 ? user.id : null,
            offerPrice: offerFilterValues.offerPrice === 0 ? null : offerFilterValues.offerPrice,
            lowerThanPrice: offerFilterValues.lowerThanPrice === null ? null : offerFilterValues.lowerThanPrice,
            orderByPrice: offerFilterValues.orderByPrice === null ? null : offerFilterValues.orderByPrice
        }))
    }

    useEffect(() => {
        getOffers()
    }, [user.id, offerFilterValues])

    let pageContent

    pageContent = (
        <>
            <div className="container">
                {
                    offers.length > 0 ?
                        offers.map(offer => {
                            return <OfferedProduct key={offer.id} offer={offer}/>
                        })
                        :
                        <h2>Teklif Bulunamadı</h2>
                }
            </div>
        </>
    )

    const handleInputChange = async (e) => {
        const {name, value} = e.target

        if (name.includes("isAccepted")) {
            setOfferFilterValues({
                ...offerFilterValues,
                [name]: value === '1' ? true : value === '2' ? false : value === '3' ? false : null,
                isAcceptedIndex: parseInt(value),
                isActive: value === '3' ? true : false,
            })
        }
        if (name.includes("toWho")) {
            setOfferFilterValues({
                ...offerFilterValues,
                [name]: parseInt(value)
            })
        }
        if (name.includes("isActive")) {
            setOfferFilterValues({
                ...offerFilterValues,
                [name]: value === '1' ? true : value === '2' ? false : null,
                isActiveIndex: parseInt(value)
            })
        }
    }

    return (
        <div className="container-fluid">
            <h1>Teklifler</h1>
            <div className="row">
                <div className="col-auto">
                    <div className="card">
                        <h5 style={{textAlign: 'center', marginTop: '5px'}}> Filtreler </h5>

                        <div className="card-body">

                            <div style={{marginTop: '5px'}}>
                                <select name="toWho" className="form-control col text-center"
                                        value={offerFilterValues.toWho}
                                        style={{height: '100%', overflow: 'auto', width: '100%'}}
                                        onChange={handleInputChange}>
                                    <option value={0}>Tüm Teklifler</option>
                                    <option value={1}>Benim Yaptığım Teklifler</option>
                                    <option value={2}>Bana Gelen Teklifler</option>
                                </select>
                            </div>

                            <div style={{marginTop: '5px'}}>
                                <select name="isAccepted" className="form-control col text-center"
                                        value={offerFilterValues.isAcceptedIndex}
                                        style={{height: '100%', overflow: 'auto', width: '100%'}}
                                        onChange={handleInputChange}>
                                    <option value={0}>Teklif Durumu: Hepsi</option>
                                    <option value={1}>Kabul Edilen</option>
                                    <option value={2}>Reddedilen</option>
                                    <option value={3}>Cevap Bekleyen</option>
                                </select>
                            </div>

                            <div>
                                <button className="btn btn-outline-primary" type="submit"
                                        onClick={() => setOfferFilterValues(initialOfferFilterValues)}
                                >Filtreleri Temizle
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    {pageContent}
                </div>
            </div>
        </div>
    )
}
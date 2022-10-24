import React, {Component, useEffect, useState} from "react";
import {UserContext} from "../Contexts/UserContext";
import getProductsRequest, {getProductByFilteringRequest} from "../API/ProductRequests";
import Product from "../Components/Product";
import getCategoriesRequest from "../API/CategoryRequests";
import getBrandsRequest, {getBrandsByFilteringRequest} from "../API/BrandRequests";
import '../CSS/form-signin.css'

const initialProductFilterValues = {
    productName: '',
    categoryId: 0,
    brandId: 0,
    isOfferable: null,
    isOfferableIndex: 0,
    usedStateId: 0,
    colorId: 0,
    description: '',
    lowerThanPrice: null,
    lowerThanPriceIndex: 0,
    price: 0,
    orderByPrice: null,
    orderByPriceIndex: 0,
    isSoldId: 0
}

export default function HomePage() {

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [productFilterValues, setProductFilterValues] = useState(initialProductFilterValues)

    // let getProducts = async ({value, name}) => {
    //     if (value < 1) {
    //         setProducts(await getProductsRequest())
    //     } else {
    //         if (name === 'category') {
    //             setProducts(await getProductByFilteringRequest({categoryId: value}))
    //         }
    //         if (name === 'brand') {
    //             setProducts(await getProductByFilteringRequest({brandId: value}))
    //         }
    //     }
    // }

    let getProducts = async () => {
        if (productFilterValues === initialProductFilterValues) {
            setProducts(await getProductsRequest())
        } else {
            setProducts(await getProductByFilteringRequest({
                categoryId: productFilterValues.categoryId === 0 ? null : productFilterValues.categoryId,
                brandId: productFilterValues.brandId === 0 ? null : productFilterValues.brandId,
                name: productFilterValues.productName === 0 ? null : productFilterValues.productName,
                description: productFilterValues.productName === 0 ? null : productFilterValues.productName,
                isOfferable: productFilterValues.isOfferable === null ? null : productFilterValues.isOfferable,
                lowerThanPrice: productFilterValues.lowerThanPrice === null ? null : productFilterValues.lowerThanPrice,
                price: productFilterValues.price === 0 ? null : productFilterValues.price,
                orderByPrice: productFilterValues.orderByPrice === null ? null : productFilterValues.orderByPrice,
                isSold: productFilterValues.isSoldId === 0 ? null : productFilterValues.isSoldId === 1
            }))
        }
    }

    let getCategories = async () => {
        setCategories(await getCategoriesRequest())
    }

    let getBrands = async () => {
        if (productFilterValues.categoryId === 0) {
            setBrands(await getBrandsRequest());
        } else {
            setBrands(await getBrandsByFilteringRequest({categoryId: productFilterValues.categoryId}))
        }
    }

    useEffect(() => {
        getProducts()
        getCategories()
    }, [productFilterValues])

    const   handleInputChange = (e) => {
        const {name, value} = e.target;
        if (name.includes("Id")) {
            setProductFilterValues({
                    ...productFilterValues,
                    [name]: parseInt(value)
                }
            )
        } else if (name.includes("Offerable")) {
            setProductFilterValues({
                ...productFilterValues,
                [name]: value === '1' ? true : value === '2' ? false : null,
                isOfferableIndex: value === '1' ? 1 : value === '2' ? 2 : 0
            })
        } else if (name.includes("lowerThanPrice")) {
            setProductFilterValues({
                ...productFilterValues,
                [name]: value === '2' ? true : value === '1' ? false : null,
                lowerThanPriceIndex: value === '2' ? 2 : value === '1' ? 1 : 0
            })
        } else if (name.includes("orderBy")) {
            setProductFilterValues({
                ...productFilterValues,
                [name]: value === '2' ? true : value === '1' ? false : null,
                orderByPriceIndex: value === '2' ? 2 : value === '1' ? 1 : 0
            })
        } else {
            setProductFilterValues({
                ...productFilterValues,
                [name]: value
            })
        }
    }

    let priceMenu = (<></>)

    if (productFilterValues.lowerThanPrice === null) {
        priceMenu = (
            <>
                <select name="lowerThanPrice" className="form-control col text-center"
                        style={{height: '100%', overflow: 'auto', marginTop: '5px'}}
                        value={productFilterValues.lowerThanPriceIndex}
                        onChange={handleInputChange}>
                    <option value={0}>Fiyat Sınırı Yok</option>
                    <option value={1}>Fiyat Daha Yüksek</option>
                    <option value={2}>Fiyat Daha Düşük</option>
                </select>
            </>
        )
    } else {
        priceMenu = (
            <>
                <select name="lowerThanPrice" className="form-control col text-center"
                        style={{height: '100%', overflow: 'auto', marginTop: '5px'}}
                        value={productFilterValues.lowerThanPriceIndex}
                        onChange={handleInputChange}>
                    <option value={0}>Fiyat Sınırı Yok</option>
                    <option value={1}>Fiyat Daha Yüksek</option>
                    <option value={2}>Fiyat Daha Düşük</option>
                </select>
                <input className="col-md-4 form-control-select-filter" type="number" name="price"
                       style={{marginTop: '5px', marginLeft: '2.5px'}} value={productFilterValues.price}
                       onChange={handleInputChange}/>
            </>
        )
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2" style={{marginBottom: 'auto', marginLeft: '10px', width: "250px"}}>
                    <div className="card">
                        <h5 style={{textAlign: 'center', marginTop: '5px'}}> Filtreler </h5>
                        <div className="card-body" style={{marginBottom: 'auto'}}>
                            <div className="form-group" style={{padding: "5px"}}>
                                <input type="text" className="form-control"
                                       placeholder="Ürün Ara"
                                       name="productName"
                                       value={productFilterValues.productName}
                                       onChange={handleInputChange}/>
                            </div>

                            <div style={{marginTop: '5px'}}>
                                <select name="categoryId" className="form-control col text-center"
                                        onClick={getCategories} onFocus={getCategories} onMouseEnter={getCategories}
                                        value={productFilterValues.categoryId}
                                        style={{height: '100%', overflow: 'auto', width: '100%'}}
                                        onChange={handleInputChange}>
                                    <option value={0}>Tüm Kategoriler</option>
                                    {categories.map(cat => {
                                        return <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    })}
                                </select>
                            </div>

                            <div style={{marginTop: '5px'}}>
                                <select name="brandId" className="form-control col text-center"
                                        onClick={getBrands} onFocus={getBrands} onMouseEnter={getBrands}
                                        value={productFilterValues.brandId}
                                        style={{height: '100%', overflow: 'auto', width: '100%'}}
                                        onChange={handleInputChange}>
                                    <option value={0}>Tüm Markalar</option>
                                    {brands.map(brand => {
                                        return <option key={brand.id} value={brand.id}>{brand.name}</option>
                                    })}
                                </select>
                            </div>

                            <div style={{marginTop: '5px'}}>
                                <select name="isSoldId" className="form-control col text-center"
                                        style={{height: '100%', overflow: 'auto', width: '100%', margin: 'auto'}}
                                        value={productFilterValues.isSoldId}
                                        onChange={handleInputChange}>
                                    <option value={0}>Satılık Durumu Hepsi</option>
                                    <option value={1}>Satıldı</option>
                                    <option value={2}>Satılık</option>
                                </select>
                            </div>

                            <div style={{marginTop: '5px'}}>
                                <select name="isOfferable" className="form-control col text-center"
                                        style={{height: '100%', overflow: 'auto', width: '100%', margin: 'auto'}}
                                        value={productFilterValues.isOfferableIndex}
                                        onChange={handleInputChange}>
                                    <option value={0}>Teklif Durumu Hepsi</option>
                                    <option value={1}>Evet</option>
                                    <option value={2}>Hayır</option>
                                </select>
                            </div>

                            <div className="row" style={{margin: 'auto'}}>
                                {priceMenu}
                            </div>

                            <div style={{marginTop: '5px'}}>
                                <select name="orderByPrice" className="form-control col text-center"
                                        style={{height: '100%', overflow: 'auto', width: '100%', margin: 'auto'}}
                                        value={productFilterValues.orderByPriceIndex}
                                        onChange={handleInputChange}>
                                    <option value={0}>Sıralama Otomatik</option>
                                    <option value={1}>Fiyat: Artan</option>
                                    <option value={2}>Fiyat: Azalan</option>
                                </select>
                            </div>

                            <div>
                                <button className="btn btn-outline-primary" type="submit"
                                        onClick={() => setProductFilterValues(initialProductFilterValues)}
                                >Filtreleri Temizle</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="row">
                        {
                            products.length > 0 ?
                                products.map(product => {
                                    return (
                                        <div key={product.id} className="col-auto">
                                            <Product product={product}/>
                                        </div>
                                    )
                                })
                                :
                                <h3>Ürün Yok. "Ürün Ekle" butonuna tıklayarak yeni ürün ekleyebilirsiniz.</h3>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
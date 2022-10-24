import React, {useContext, useEffect, useState} from "react";
import {getProductByFilteringRequest} from "../API/ProductRequests";
import {UserContext} from "../Contexts/UserContext";
import Product from "../Components/Product";
import getCategoriesRequest from "../API/CategoryRequests";
import getBrandsRequest from "../API/BrandRequests";

export default function MyProductsPage() {
    const {user} = useContext(UserContext)

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])

    // filters
    const [searchName, setSearchName] = useState('')
    const [orderByPriceIndex, setOrderByPriceIndex] = useState(0)
    const [categoryIndex, setCategoryIndex] = useState(0)
    const [brandIndex, setBrandIndex] = useState(0)
    const [isOfferableIndex, setIsOfferableIndex] = useState(0)
    const [isSoldIndex, setIsSoldIndex] = useState(0)

    let getProducts = async () => {
        setProducts(await getProductByFilteringRequest({
            userId: user.id,
            name: searchName === '' ? null : searchName,
            description: searchName === '' ? null : searchName,
            isSold: isSoldIndex === 0 ? null : isSoldIndex === 1 ? true : false,
            categoryId: categoryIndex === 0 ? null : categoryIndex,
            brandId: brandIndex === 0 ? null : brandIndex,
            isOfferable: isOfferableIndex === 0 ? null : isOfferableIndex === 1 ? true : false,
            orderByPrice: orderByPriceIndex === 0 ? null : orderByPriceIndex === 1 ? false : true
        }))
    }

    let getCategories = async () => {
        setCategories(await getCategoriesRequest())
    }

    let getBrands = async () => {
        setBrands(await getBrandsRequest())
    }

    useEffect(() => {
        if (user.id !== undefined && user.id !== 0) {
            getProducts()
            getCategories()
            getBrands()
        }
    }, [user.id, searchName, orderByPriceIndex, categoryIndex, brandIndex, isOfferableIndex, isSoldIndex])

    const ClearFilters = () => {
        setSearchName('')
        setOrderByPriceIndex(0)
        setCategoryIndex(0)
        setBrandIndex(0)
        setIsOfferableIndex(0)
        setIsSoldIndex(0)
    }

    return (
        <>
            <div className="container-fluid">
                <h2>Ürünlerim</h2>
                <div className="row">
                    <div className="col-auto">
                        <div className="card">
                            <h5 style={{textAlign: 'center', marginTop: '5px'}}> Filtreler </h5>
                            <div className="card-body">

                                <div className="form-group" style={{padding: "5px"}}>
                                    <input type="text" className="form-control"
                                           placeholder="Ürün Ara"
                                           name="productName"
                                           value={searchName}
                                           onChange={(e) => setSearchName(e.target.value)}/>
                                </div>

                                <div style={{marginTop: '5px'}}>
                                    <select name="categoryId" className="form-control col text-center"
                                            onClick={getCategories} onFocus={getCategories} onMouseEnter={getCategories}
                                            value={categoryIndex}
                                            style={{height: '100%', overflow: 'auto', width: '100%'}}
                                            onChange={(e) => setCategoryIndex(parseInt(e.target.value))}>
                                        <option value={0}>Tüm Kategoriler</option>
                                        {categories.map(cat => {
                                            return <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        })}
                                    </select>
                                </div>

                                <div style={{marginTop: '5px'}}>
                                    <select name="brandId" className="form-control col text-center"
                                            onClick={getBrands} onFocus={getBrands} onMouseEnter={getBrands}
                                            value={brandIndex}
                                            style={{height: '100%', overflow: 'auto', width: '100%'}}
                                            onChange={(e) => setBrandIndex(parseInt(e.target.value))}>
                                        <option value={0}>Tüm Markalar</option>
                                        {brands.map(brand => {
                                            return <option key={brand.id} value={brand.id}>{brand.name}</option>
                                        })}
                                    </select>
                                </div>

                                <div style={{marginTop: '5px'}}>
                                    <select name="isSold" className="form-control col text-center"
                                            style={{height: '100%', overflow: 'auto', width: '100%', margin: 'auto'}}
                                            value={isSoldIndex}
                                            onChange={(e) => setIsSoldIndex(parseInt(e.target.value))}>
                                        <option value={0}>Satılık Durumu Hepsi</option>
                                        <option value={1}>Satıldı</option>
                                        <option value={2}>Satılık</option>
                                    </select>
                                </div>

                                <div style={{marginTop: '5px'}}>
                                    <select name="isOfferable" className="form-control col text-center"
                                            style={{height: '100%', overflow: 'auto', width: '100%', margin: 'auto'}}
                                            value={isOfferableIndex}
                                            onChange={(e) => setIsOfferableIndex(parseInt(e.target.value))}>
                                        <option value={0}>Teklif Durumu Hepsi</option>
                                        <option value={1}>Evet</option>
                                        <option value={2}>Hayır</option>
                                    </select>
                                </div>

                                <div style={{marginTop: '5px'}}>
                                    <select name="orderByPrice" className="form-control col text-center"
                                            style={{height: '100%', overflow: 'auto', width: '100%', margin: 'auto'}}
                                            value={orderByPriceIndex}
                                            onChange={(e) => setOrderByPriceIndex(parseInt(e.target.value))}>
                                        <option value={0}>Sıralama Otomatik</option>
                                        <option value={1}>Fiyat: Artan</option>
                                        <option value={2}>Fiyat: Azalan</option>
                                    </select>
                                </div>

                                <div>
                                    <button className="btn btn-outline-primary" type="submit"
                                            onClick={() => ClearFilters()}
                                    >Filtreleri Temizle
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="container col">
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
        </>
    )
}
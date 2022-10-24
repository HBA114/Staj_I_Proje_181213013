import React, { useEffect, useState } from "react";
import getProductsRequest from "../API/ProductRequests";
import Product from "../components/Product";

export default function MainPage() {

    const [products, setProducts] = useState([])

    let getProducts = async () => {
        setProducts(await getProductsRequest())
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div>
            <h1>Tüm Ürünler</h1>
            <div className="container">
                <table>
                    <tbody>
                        {
                            [...Array(Math.ceil(products.length / 4))].map((element, index) =>
                                <tr key={index}>
                                    <td>{<Product product={products[index]} />}</td>
                                    <td>{products[3 * index + 1] ? <Product product={products[3 * index + 1]} /> : null}</td>
                                    <td>{products[3 * index + 2] ? <Product product={products[3 * index + 2]} /> : null}</td>
                                    <td>{products[3 * index + 3] ? <Product product={products[3 * index + 3]} /> : null}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
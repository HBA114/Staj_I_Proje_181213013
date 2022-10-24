import React, { useEffect, useState } from "react"
import Product from "../components/Product"

export default function MyProducts({ user }) {

    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(
                "api/product/getbyfiltering",
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId: user.id
                    })
                }
            )

            const content = await response.json()
            setProducts(content)
        }

        fetchProducts()
    }, [])

    return (
        <div>
            <h1> Ürünlerim </h1>
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

// const Product = ({ product }) => {
//     return (
//         <div>
//             <h4>{product.name}</h4>
//             <div className="container" >
//                 <h5>{product.description}</h5>
//                 <h5>{product.price + " ₺"}</h5>
//             </div>
//         </div>
//     )
// }
import { useState } from "react"
import { Redirect } from "react-router"
import ProductDetail from "../Pages/productDetail"

const Product = ({ product }) => {

    const [redirect, setRedirect] = useState(false)

    const handleClick = () => {
        setRedirect(true)
    }

    if (redirect) {
        return <Redirect to={`/productDetail/id=${product.id}`} />
    }

    return (
        <div className="card" onClick={handleClick} style={{margin: '5px'}}>
            <div>
                <img style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', padding: "15px", height: "150px", width: "150px" }} alt="img" className="card-img-top rounded-circle" src={product.imageBase64} />
            </div>
            <div className="card-body">
                <h4>{product.name}</h4>
                <div className="container" >
                    <h5>{product.description}</h5>
                    <h5>{product.price + " ₺"}</h5>
                </div>
            </div>
        </div>
    )
}

export default Product
import {Navigate} from "react-router";
import {useState} from "react";
import commafy from "./PriceFunction";

const Product = ({product}) => {

    const [redirect, setRedirect] = useState(false)

    const handleClick = () => {
        setRedirect(true)
    }

    if (redirect) {
        return <Navigate to={`/product_detail/id=${product.id}`}/>
    }

    return (
        <div className="card" onClick={handleClick} style={{marginBottom: '5px', marginRight: '5px', width: "250px"}}>
            <div>
                <img style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    display: 'block',
                    padding: "15px",
                    height: "150px",
                    width: "150px"
                }} alt="img" className="card-img-top rounded-circle" src={product.imageBase64}/>
            </div>
            <div className="card-body" style={{width: '240px'}}>
                <h4>
                    {
                        product.name !== undefined && product.name.length > 15
                            ?
                            product.name.substring(0, 15) + " ..."
                            :
                            product.name
                    }
                </h4>
                <div>
                    <h5>
                        {
                            product.description !== undefined && product.description.length > 15
                                ?
                                product.description.substring(0, 15) + " ..."
                                :
                                product.description
                        }
                    </h5>
                    <h5 style={{textAlign: 'end'}}>
                        {
                            commafy(product.price) + " ₺"
                        }
                    </h5>
                </div>
            </div>
        </div>
    )
}

export default Product
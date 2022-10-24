import React, { Component, useEffect, useState } from 'react';
import { Route } from 'react-router';
import './custom.css'
import cookies from 'js-cookie';
import { BrowserRouter } from 'react-router-dom';
import Nav from './components/Nav';
import MainPage from './Pages/main';
import LoginPage from './Pages/login';
import RegisterPage from './Pages/register';
import Profile from './Pages/profile';
import MyProducts from './Pages/myProducts';
import AddProduct from './Pages/addProduct';
import ProductDetail from './Pages/productDetail';

export default function App() {

    const [jwt, setJwt] = useState('');
    const [user, setUser] = useState({});
    const [product, setProduct] = useState({})
    const [productId, setProductId] = useState(0)

    const getJwt = () => {
        setJwt(`Bearer ${cookies.get('jwt')}`);
    }

    const getUser = (cont) => {
        setUser(cont);
    }

    useEffect(() => {


        const login = async () => {
            const response = await fetch(
                "https://localhost:44391/api/user/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
                        email: "hasanbasriayhaner114@gmail.com",
                        password: "Qwe123--"
                    })
                }
            );
            const content = await response.json();
        }


        getJwt()
        const fetchData = async () => {
            const response2 = await fetch(
                "https://localhost:44391/api/user/user",
                {
                    headers: { "Content-Type": "application/json", 'Authorization': jwt },
                    credentials: "include",
                }
            );
            if (response2.ok) {
                const content = await response2.json();
                getUser(content)
            }
        }

        fetchData();
    }, [jwt]);

    // Tested json functionality and passed tests. .NET6 was not able to pass tests
    return (
        <div>
            <BrowserRouter>
                <Nav user={user} setUser={setUser} />
                <Route exact path="/" component={MainPage} />
                <Route exact path="/login" component={() => <LoginPage setUser={setUser} />} />
                <Route exact path="/register" component={RegisterPage} />
                <Route exact path="/profile" component={() => <Profile user={user} />} />
                <Route exact path="/myProducts" component={() => <MyProducts user={user} />} />
                <Route exact path="/addproduct" component={() => <AddProduct user={user} />} />
                <Route exact path="/productDetail/:productId" component={() => <ProductDetail user={user} />} />
            </BrowserRouter>
        </div>
    );
}

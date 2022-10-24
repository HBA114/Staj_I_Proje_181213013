import React from "react";
import {BrowserRouter} from 'react-router-dom'
import {Route, Routes} from 'react-router'
import Navigation from "./Components/Navigation";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import RegisterPage from "./Pages/RegisterPage";
import AddProductPage from "./Pages/AddProductPage";
import ProductDetailPage from "./Pages/ProductDetailPage";
import ProfilePage from "./Pages/ProfilePage";
import MyProductsPage from "./Pages/MyProductsPage";
import MyOrdersPage from "./Pages/MyOrdersPage";
import OffersPage from "./Pages/OffersPage";

function App() {
    return (
        <BrowserRouter>
            <Navigation/>
            <Routes>
                <Route exact path="/" element={<HomePage/>}/>
                <Route exact path="/login" element={<LoginPage/>}/>
                <Route exact path="/register" element={<RegisterPage/>}/>
                <Route exact path="/add_product" element={<AddProductPage/>}/>
                <Route exact path="/product_detail/:id" element={<ProductDetailPage/>}/>
                <Route exact path="/profile" element={<ProfilePage/>}/>
                <Route exact path="/myProducts" element={<MyProductsPage/>}/>
                <Route exact path="/myOrders" element={<MyOrdersPage/>}/>
                <Route exact path="/offers" element={<OffersPage />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

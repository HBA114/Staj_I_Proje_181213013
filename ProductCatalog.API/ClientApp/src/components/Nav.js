import React from "react";
import { Link } from "react-router-dom";

export default function Nav(props) {



    const logout = async () => {
        await fetch(
            "https://localhost:44391/api/user/logout",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            }
        );
        
        props.setUser({});
    }


    let menu;

    if (props.user.name === undefined || props.user.name === '') {
        menu = (
            <ul className="navbar-nav mr-auto mb-2 mb-md-0">
                <li className="nav-item active">
                    <Link className="nav-link" to="/login"> Giriş Yap </Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link" to="/register"> Kayıt Ol </Link>
                </li>
            </ul>
        );
    }
    else {
        menu = (
            <ul className="navbar-nav mr-auto mb-2 mb-md-0">
                <li className="nav-item active">
                    <Link className="nav-link" to="/addproduct"> Ürün Ekle </Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link" to="/profile"> Profil </Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link" to="/login" onClick={logout} > Çıkış Yap </Link>
                </li>
            </ul>
        );
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Ürün Kataloğu</a>
                <div className="expand navbar-expand">

                    {menu}

                    {/* Search Bar */}
                    {/* <form className="form-inline mt-2 mt-md-0"> 
                        <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form> */}
                </div>
            </div>
        </nav>
    );
}
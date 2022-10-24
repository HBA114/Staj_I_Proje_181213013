import React, {Component} from "react";
import {Link} from 'react-router-dom'
import {UserContext} from "../Contexts/UserContext";

export default class Navigation extends Component {
    static contextType = UserContext

    render() {
        const {logout} = this.context
        const menu = this.context.user.id === undefined ? (
                <ul className="navbar-nav mr-auto mb-2 mb-md-0">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/login"> Giriş Yap </Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/register"> Kayıt Ol </Link>
                    </li>
                </ul>
            )
            : (
                <ul className="navbar-nav mr-auto mb-2 mb-md-0">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/add_product"> Ürün Ekle </Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/profile"> Profil </Link>
                    </li>
                    {/*<li className="nav-item active">*/}
                    {/*    <Link className="nav-link" to="/login" onClick={logout}> Çıkış Yap </Link>*/}
                    {/*</li>*/}
                </ul>
            )
        return (
            <>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">Ürün Kataloğu</a>
                        <div className="expand navbar-expand">
                            {menu}
                        </div>
                    </div>
                </nav>
            </>
        )
    }
}
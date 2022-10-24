import React, {Component, createContext} from "react";

export const UserContext = createContext({})

export default class UserContextProvider extends Component {
    state = {
        user: {}
    }

    async componentDidMount() {
        const jwt = `Bearer ${localStorage.getItem("jwt")}`
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}api/user/user`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwt
                },
                credentials: 'include'
            }
        )
        if (response.ok) {
            const content = await response.json()
            this.setState({
                user: content
            })
        } else {
            console.log("jwt is invalid")
        }
    }

    logout = () => {
        localStorage.clear()
        this.setState({
            user: {}
        })
    }

    login = async ({email, password}) => {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}api/user/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        )
        if (response.ok) {
            const content = await response.json()
            // this.toggleUserState(content)
            localStorage.setItem("jwt", content["jwt"])
            this.setState({
                user: content
            })
        } else {
            alert("Hatalı e-posta veya şifre!")
            this.setState({
                user: {}
            })
        }
    }

    render() {
        return (
            <>
                <UserContext.Provider value={{...this.state, logout: this.logout, login: this.login}}>
                    {this.props.children}
                </UserContext.Provider>
            </>
        )
    }

}
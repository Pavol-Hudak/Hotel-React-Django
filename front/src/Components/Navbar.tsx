import React, { ReactNode, useEffect } from "react";
import "../CSS/navbar.css";
import { NavLink} from "react-router-dom";
import Dropdown from "./Dropdown";
import { useState } from "react";

interface ChildrenProps {
    children: ReactNode;
}

const checkIfAuthenticated = () => {
    const value = localStorage.getItem("isAuthenticated");
    if (value === "false") {
        return false;
    }
    return true;
};

const Navbar: React.FC<ChildrenProps> = ({ children }: ChildrenProps) => {
    const languages = ["English", "Slovak", "Korean"];
    const logoutDropdown = ["Profile", "Settings", "Logout"];
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(checkIfAuthenticated());

    useEffect(() => {
        fetch("api/guest-auth")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Failed to fetch");
                }
            })
            .then((data) => {
                const isAuthValue: boolean = data.is_authenticated === true;
                setIsAuthenticated(isAuthValue);
                localStorage.setItem("isAuthenticated", String(isAuthValue));
            })
            .catch((error) => {
                console.error("Error", error);
            });
    }, []);

    const logout = async () => {
        try {
            const response = await fetch("api/logout", {
                method: "POST",
                credentials: "include",
            });
            if (response.ok) {
                setIsAuthenticated(false);
                localStorage.setItem("isAuthenticated", "false");
                window.location.href = "/";
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const backHome = () => {
        window.location.href = "/";
    };

    const selectOption = (value: string) => {
        if (value === "Logout") {
            logout();
        }
        if (value === "Profile") {
            console.log("a");
            window.location.href = "/profile";
        }
    };

    const selectLanguage = (value: string) => {
        console.log(value);
    };

    return (
        <>
            <div className="container">
                <h1 onClick={backHome} id="title">
                    Hotel Jožo
                </h1>
                <div className="navbar">
                    <div className="navbar-left">
                        <NavLink to="/explore" className="nav-link">
                            Explore
                        </NavLink>
                        <NavLink to="/offers" className="nav-link">
                            Offers
                        </NavLink>
                        <NavLink to="/events" className="nav-link">
                            Events
                        </NavLink>
                        <NavLink to="/membership" className="nav-link">
                            Membership
                        </NavLink>
                    </div>
                    <div className="navbar-right">
                        <Dropdown defValue={"English"} options={languages} onChange={selectLanguage} />
                        {isAuthenticated ? (
                            //<NavLink to='/' className={'nav-link login'} onClick={logout}>{buttonText}</NavLink>
                            <Dropdown defValue={"My account"} options={logoutDropdown} onChange={selectOption} />
                        ) : (
                            <NavLink to="/signin" className={"nav-link login"}>
                                Sign-in
                            </NavLink>
                        )}
                    </div>
                </div>
            </div>
            {children}
        </>
    );
};

export default Navbar;

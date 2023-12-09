import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import { useUser } from '../Context/UserContext';

function Navbar() {
    const navigate = useNavigate();
    const { user } = useUser();

    const goToSignUp = () => {
        navigate("/signup")
    }

    return (
        <div>
            <nav className="navbar">
                <div className="container">
                    <div style={{ color: "#ffffff", fontWeight: "bold", fontVariant: "common-ligatures", fontSize: "26px" }}>
                        Parcel Tracking
                    </div>
                    <div className="nav-elements">
                        {user ? (
                            <ul>
                                <li style={{ color: "#ffffff", fontWeight: "bold", textTransform: "capitalize" }}>
                                    {user.username}
                                </li>

                            </ul>
                        ) : (
                            <ul>
                                <li>
                                    <Link style={{ color: "#ffffff", }} to={'/login'}>Login</Link>
                                </li>
                                <li>
                                    <Button
                                        variant='contained'
                                        color='info'
                                        style={{ color: '#fcfcfc' }}
                                        onClick={goToSignUp}
                                    >Sign Up</Button>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
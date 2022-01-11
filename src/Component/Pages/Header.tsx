import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faAddressCard,
    faCartPlus,
    faHome,
    faShoppingBag,
    faSignInAlt,
    faUser,
} from '@fortawesome/free-solid-svg-icons'
import { imagePath } from '../../utils/images'
import { RootState } from '../../redux/rootReducer'
import { AuthData } from '../Types'
import { signOut } from '../../redux/auth/actions'

const Header: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth: AuthData = useSelector((state: RootState) => state.authReducer)
    const myTotalCount: number = useSelector(
        (state: RootState) => state.cartReducer.myTotalCount
    )

    const handleSignOut = () => {
        swal('Are you sure you want to Log out?', {
            buttons: ['No', 'Yes'],
        }).then(function (isConfirm) {
            if (isConfirm) {
                swal({
                    title: 'Logout!',
                    text: 'Successfully Logout!',
                    icon: 'success',
                })
                dispatch(signOut())
                navigate('/login')
            }
        })
    }

    const handleSignIn = () => {
        navigate('/login')
    }

    const onClickHomePage = () => {
        navigate('/')
    }

    return (
        <>
            <div className="container">
                <div className="navbar">
                    <div className="logo cursor">
                        <img
                            src={imagePath.logo}
                            alt="logo"
                            width="125px"
                            onClick={() => {
                                onClickHomePage()
                            }}
                        />
                    </div>
                    <nav>
                        <ul id="MenuItems">
                            {auth.token ? (
                                <li>
                                    <NavLink
                                        to="/"
                                        className={(navData) =>
                                            navData.isActive ? 'navHeader' : ''
                                        }
                                    >
                                        <FontAwesomeIcon icon={faHome} /> Home
                                    </NavLink>
                                </li>
                            ) : (
                                ''
                            )}
                            {auth.token ? (
                                <li>
                                    <NavLink
                                        to="/products"
                                        className={(navData) =>
                                            navData.isActive ? 'navHeader' : ''
                                        }
                                    >
                                        Products
                                    </NavLink>
                                </li>
                            ) : (
                                ''
                            )}
                            {auth.token ? (
                                <li>
                                    <NavLink
                                        to="/cart"
                                        className={(navData) =>
                                            navData.isActive ? 'navHeader' : ''
                                        }
                                    >
                                        <FontAwesomeIcon icon={faCartPlus} />{' '}
                                        Cart
                                        <span className="header-cart-value">
                                            {' '}
                                            {myTotalCount}
                                        </span>
                                    </NavLink>
                                </li>
                            ) : (
                                ''
                            )}
                            {auth.token ? (
                                <li>
                                    <NavLink
                                        to="/about"
                                        className={(navData) =>
                                            navData.isActive ? 'navHeader' : ''
                                        }
                                    >
                                        <FontAwesomeIcon icon={faAddressCard} />{' '}
                                        About
                                    </NavLink>
                                </li>
                            ) : (
                                ''
                            )}
                            {auth.token ? (
                                <li>
                                    <NavLink
                                        to="/contact"
                                        className={(navData) =>
                                            navData.isActive ? 'navHeader' : ''
                                        }
                                    >
                                        <FontAwesomeIcon icon={faAddressCard} />{' '}
                                        Contact
                                    </NavLink>
                                </li>
                            ) : (
                                ''
                            )}
                            {auth.token ? (
                                <li>
                                    <NavLink
                                        to="/profile"
                                        className={(navData) =>
                                            navData.isActive ? 'navHeader' : ''
                                        }
                                    >
                                        <FontAwesomeIcon icon={faUser} />{' '}
                                        {auth.name}
                                    </NavLink>
                                </li>
                            ) : (
                                ''
                            )}
                            {/* <li>
                                {auth.token ? (
                                    <span
                                        className="cursor"
                                        onClick={() => {
                                            handleSignOut()
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faUser} />{' '}
                                        {auth.name}
                                    </span>
                                ) : (
                                    <span
                                        className="cursor"
                                        onClick={() => {
                                            handleSignIn()
                                        }}
                                    >
                                        Sign In{' '}
                                        <FontAwesomeIcon icon={faSignInAlt} />
                                    </span>
                                )}
                            </li> */}
                        </ul>
                    </nav>
                    <span>
                        <FontAwesomeIcon icon={faShoppingBag} />
                    </span>
                    <img
                        src={imagePath.menu}
                        alt="menu"
                        className="menu-icon"
                    />
                </div>
            </div>
        </>
    )
}

export default Header

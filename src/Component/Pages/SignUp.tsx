import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { signUp } from '../../redux/auth/actions'
import { useDocumentTitle } from '../setDocumentTitle'
import { imagePath } from '../../utils/images'
import Loader from '../Loader'
import { AuthData, UserRegisterData } from '../Types'
import { RootState } from '../../redux/rootReducer'

const SignUp: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useDocumentTitle('Sign Up')

    const auth: AuthData = useSelector((state: RootState) => state.authReducer)

    const [user, setUser] = useState<UserRegisterData>({
        name: '',
        email: '',
        password: '',
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(signUp(user))
        setUser({ name: '', email: '', password: '' })
    }

    // const googleLoginHandler = async (googleProvider: any) => {
    //     console.log('clicked');
    //     // const provider = new GoogleAuthProvider();
    //     const res = await socialMediaAuth(googleProvider);
    //     console.log(res, 'res');
    // }

    if (auth._id) {
        navigate('/')
    }

    return (
        <div id="page-container">
            <Header />
            {auth.isLoading ? (
                <Loader />
            ) : (
                <div className="signup-page" id="content-wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-2">
                                <img
                                    src={imagePath.image1}
                                    alt="image1"
                                    width="100%"
                                />
                            </div>
                            <div className="col-2">
                                <div className="form-container">
                                    <div className="form-btn">
                                        <span>Register</span>
                                        <hr id="Indicator" />
                                        {/* <button
                                            type="submit"
                                            className='btn'
                                            style={{ border: 'none' }}
                                            onClick={() => { googleLoginHandler(googleProvider) }}
                                        >
                                            Login With Google
                                        </button> */}
                                    </div>
                                    <form
                                        id="RegForm"
                                        onSubmit={(e) => {
                                            handleSubmit(e)
                                        }}
                                    >
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            value={user.name}
                                            onChange={(e) =>
                                                setUser({
                                                    ...user,
                                                    name: e.target.value,
                                                })
                                            }
                                        />
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            value={user.email}
                                            onChange={(e) =>
                                                setUser({
                                                    ...user,
                                                    email: e.target.value,
                                                })
                                            }
                                        />
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            value={user.password}
                                            onChange={(e) =>
                                                setUser({
                                                    ...user,
                                                    password: e.target.value,
                                                })
                                            }
                                        />
                                        <button type="submit" className="btn">
                                            Register
                                        </button>
                                        <NavLink to="/login">
                                            Already a member?{' '}
                                            <span style={{ color: '#11C8B1' }}>
                                                {' '}
                                                Sign In{' '}
                                            </span>
                                        </NavLink>
                                    </form>
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    )
}

export default SignUp

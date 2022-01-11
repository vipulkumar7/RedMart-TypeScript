import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import Header from './Header';
import Footer from './Footer';
import { signOut } from '../../redux/auth/actions'
import { AuthData } from '../Types';
import { RootState } from '../../redux/rootReducer';
import { imagePath } from '../../utils/images'

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth: AuthData = useSelector((state: RootState) => state.authReducer)

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
    return (
        <div id="page-container">
            <Header />
            <div id="content-wrap">
                <div className="small-container">
                    <img src={imagePath.personal_info} alt='Personal_information' height='350px' width='100%' />
                    <div className="row row-2">
                        <div>
                            <h2>Personal Information</h2>
                            <h4>Name: {auth.name}</h4>
                            <h4>Email: {auth.email}</h4>
                        </div>
                        <button
                            type="button"
                            className="btn cursor"
                            onClick={handleSignOut}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile;

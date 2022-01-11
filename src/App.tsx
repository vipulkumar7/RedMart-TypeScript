import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loader from './Component/Loader'
import Profile from './Component/Pages/Profile'
import PrivateRoute from './routing/PrivateRoute'

const Home = lazy(() => import('./Component/Pages/Home'))
const Products = lazy(() => import('./Component/Pages/Products'))
const ProductDetails = lazy(() => import('./Component/Pages/ProductDetails'))
const Cart = lazy(() => import('./Component/Pages/Cart'))
const SignUp = lazy(() => import('./Component/Pages/SignUp'))
const Login = lazy(() => import('./Component/Pages/Login'))
const About = lazy(() => import('./Component/Pages/About'))
const Contact = lazy(() => import('./Component/Pages/Contact'))
const NoPageFound = lazy(() => import('./Component/Pages/NoPageFound'))

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ToastContainer autoClose={1500} />
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<NoPageFound />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default App

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { SpinnerCircular } from 'spinners-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faIndent,
    faRupeeSign,
    faStar,
    faStarHalfAlt,
} from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'
import Footer from './Footer'
import Header from './Header'
import { useDocumentTitle } from '../setDocumentTitle'
import { RootState } from '../../redux/rootReducer'
import { addtoCart } from '../../redux/cartPage/actions'
import {
    getProductDescription,
    getRelatedProducts,
} from '../../redux/productPage/actions'
import Loader from '../Loader'
import { ReduxData } from '../Types'
import { filledStar, emptyStar } from '../../commonFunction'

const ProductDetails: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()

    useDocumentTitle('Product Details')
    const [quantity, setQuantity] = useState<number>(1)
    const [size, setSize] = useState<string>('')

    const productSpinner: boolean = useSelector(
        (state: RootState) => state.productReducer.productSpinner
    )
    const productDescData: ReduxData = useSelector(
        (state: RootState) => state.productReducer.productDescData
    )
    const relatedProducts: ReduxData[] = useSelector(
        (state: RootState) => state.productReducer.relatedProducts
    )

    useEffect(() => {
        dispatch(getProductDescription(id!))
        dispatch(getRelatedProducts())
    }, [dispatch, id])

    const onChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (parseInt(e.target.value) > 0 && parseInt(e.target.value) <= 5) {
            setQuantity(Math.floor(parseInt(e.target.value)))
        }
    }

    const onClickAddToCart = (productDescData: ReduxData) => {
        productDescData.quantity = quantity
        productDescData.size = size
        // !size && _afterShow();
        size && dispatch(addtoCart(productDescData))
        size && navigate('/cart')
    }

    const onClickProducts = () => {
        navigate('/products')
    }

    const onClickProductDetails = (productID: number) => {
        window.scrollTo(0, 0)
        navigate(`/product/${productID}`)
    }

    return (
        <div id="page-container">
            <Header />
            <div id="content-wrap">
                {productSpinner ? (
                    <Loader />
                ) : (
                    <div className="small-container single-product">
                        <div className="row">
                            <div className="col-2">
                                <img
                                    src={productDescData?.image}
                                    alt="gallery-1"
                                    id="ProductImg"
                                    width="100%"
                                    height="100%"
                                />
                            </div>
                            <div className="col-2">
                                <p>{productDescData?.category}</p>
                                <h1>{productDescData?.title}</h1>
                                <h4>
                                    <FontAwesomeIcon icon={faRupeeSign} />
                                    {productDescData?.price}
                                </h4>
                                <select
                                    className="dropdown"
                                    defaultValue={'default'}
                                    onChange={(e) => {
                                        setSize(e.target.value)
                                    }}
                                >
                                    <option value="default" disabled>
                                        Select Size
                                    </option>
                                    <option value="Small">S</option>
                                    <option value="Medium">M</option>
                                    <option value="Large">L</option>
                                    <option value="XL">XL</option>
                                    <option value="XXL">XXL</option>
                                </select>
                                <input
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={quantity}
                                    onChange={(e) => onChangeQuantity(e)}
                                />
                                <span
                                    className={
                                        size ? 'btn cursor' : 'btn opacity'
                                    }
                                    onClick={() => {
                                        onClickAddToCart(productDescData)
                                    }}
                                    data-tip
                                    data-for="selectSize"
                                >
                                    Add To Cart
                                </span>
                                <ReactTooltip
                                    id="selectSize"
                                    place="top"
                                    effect="solid"
                                    globalEventOff={'click'}
                                >
                                    {!size && 'Please select a Size to proceed'}
                                </ReactTooltip>
                                <h3>
                                    Product Details{' '}
                                    <FontAwesomeIcon icon={faIndent} />
                                </h3>
                                <br />
                                <p>{productDescData?.description}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/*Title */}
                <div className="small-container">
                    <div className="row row-2">
                        <h2>Related Products</h2>
                        <p className="cursor" onClick={onClickProducts}>
                            View more
                        </p>
                    </div>
                </div>

                {/*Products */}
                <div
                    className="small-container"
                    style={{ marginBottom: '40px' }}
                >
                    {productSpinner ? (
                        <SpinnerCircular
                            className="spinner"
                            size={200}
                            thickness={100}
                            speed={100}
                            color="#36ad47"
                            secondaryColor="rgba(0, 0, 0, 0.44)"
                        />
                    ) : (
                        <div className="row">
                            {relatedProducts.map((product) => (
                                <div
                                    className="col-4"
                                    key={product.id}
                                    onClick={() => {
                                        onClickProductDetails(product.id)
                                    }}
                                >
                                    <img
                                        src={product.image}
                                        alt="product-9"
                                        width="230px"
                                        height="300px"
                                    />
                                    <h4>{product.title}</h4>
                                    <div className="rating">
                                        {filledStar(product).map(
                                            (it, index) => (
                                                <FontAwesomeIcon
                                                    icon={faStar}
                                                    key={index}
                                                />
                                            )
                                        )}
                                        {emptyStar(product).map((it, index) => (
                                            <FontAwesomeIcon
                                                icon={faStarHalfAlt}
                                                key={index}
                                            />
                                        ))}
                                    </div>
                                    <p>
                                        <FontAwesomeIcon icon={faRupeeSign} />{' '}
                                        {product.price}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ProductDetails

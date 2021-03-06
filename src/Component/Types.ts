import { ReactPaginateProps } from 'react-paginate'

export interface ReduxData {
    id: number
    title: string
    brand: string
    price: number
    description: string
    category: string
    image: string
    quantity?: number
    size?: string
    rating: IRating
}

interface IRating {
    rate: number
    count: number
}

export interface QuotesReduxData {
    name: string
    id: number
    quote: string
    rating: number
    image: string
}

export interface AuthData {
    token: string | null
    name: string | null
    email: string | null
    _id: string | null
    isLoading: boolean
}

export interface UserRegisterData {
    email: string
    name: string
    password: string
}

export interface user {
    email: string
    name: string
    iat: number
    _id: string
}

export interface LoginData {
    email: string
    password: string
}

export interface RemoveCartType {
    cartId: number
    cartQuantity: number
}

export interface RandomData {
    body: string
    id: number
    title: string
    spinner: boolean
}

export interface IProductDesc {
    id: number
    title: string
    brand: string
    price: number
    description: string
    category: string
    image: string
    rating: IRating
}

//Sorting

export interface ISort {
    rating: Irate
    price: number
}

export interface Irate {
    rate: number
}

// ReactPaginateProps

export type OnPageChangeCallback = ReactPaginateProps['onPageChange']

//Redux Saga Get Posts

export interface IPosts {
    userId: number,
    id: number,
    title: string,
    body: string,
}

import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import authReducer from './auth/reducer'
import productReducer from './productPage/reducer'
import aboutReducer from './aboutPage/reducer'
import cartReducer from './cartPage/reducer'
import { Action } from './auth/actions'
import { ActionType } from './auth/types'

const appReducer = combineReducers({
    authReducer,
    productReducer,
    cartReducer,
    aboutReducer,
})

const rootReducer = (state: any, action: Action) => {
    if (action.type === ActionType.SIGN_OUT) {
        storage.removeItem('persist:root')
        return appReducer(undefined, action)
    }
    return appReducer(state, action)
}

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>

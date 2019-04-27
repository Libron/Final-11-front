import {
    CREATE_PRODUCT_FAILURE,
    CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAILURE,
    FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS
} from "../actions/productsActions";

const initialState = {
    products: [],
    product: null,
    error: null,
    loading: false
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
        case FETCH_PRODUCT_REQUEST:
        case CREATE_PRODUCT_REQUEST:
            return {...state, loading: true};
        case FETCH_PRODUCTS_FAILURE:
        case FETCH_PRODUCT_FAILURE:
        case CREATE_PRODUCT_FAILURE:
            return {...state, error: action.error, loading: false};
        case FETCH_PRODUCT_SUCCESS:
            return {...state, product: action.product, loading: false};
        case FETCH_PRODUCTS_SUCCESS:
            return {...state, products: action.products, loading: false};
        case CREATE_PRODUCT_SUCCESS:
            return {...state, error: null, loading: false};
        default:
            return state;
    }
};

export default productsReducer;
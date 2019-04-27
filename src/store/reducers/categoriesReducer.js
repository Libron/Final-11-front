import {
    FETCH_CATEGORIES_FAILURE,
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS
} from "../actions/categoriesActions";

const initialState = {
    categories: [],
    error: null,
    loading: false
};

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES_REQUEST:
            return {...state, loading: true};
        case FETCH_CATEGORIES_SUCCESS:
            return {...state, categories: action.categories, loading: false};
        case FETCH_CATEGORIES_FAILURE:
            return {...state, error: action.error, loading:false};
        default:
            return state;
    }
};

export default categoriesReducer;
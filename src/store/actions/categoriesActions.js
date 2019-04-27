import axios from '../../axios-api';

export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

const fetchCategoriesRequest = () => ({type: FETCH_CATEGORIES_REQUEST});
const fetchCategoriesSuccess = (categories) => ({type: FETCH_CATEGORIES_SUCCESS, categories});
const fetchCategoriesFailure = (error) => ({type: FETCH_CATEGORIES_FAILURE, error});

export const fetchCategories = () => {
    return (dispatch) => {
        dispatch(fetchCategoriesRequest());

        return axios.get('/categories').then(
            response => {
                dispatch(fetchCategoriesSuccess(response.data));
            },
            error => {
                if (error.response) {
                    dispatch(fetchCategoriesFailure(error.response.data))
                } else {
                    dispatch(fetchCategoriesFailure({global: 'No connection'}))
                }
            }
        )
    }
};
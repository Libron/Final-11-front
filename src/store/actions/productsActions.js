import axios from '../../axios-api';
import {push} from "connected-react-router";

import {NotificationManager} from "react-notifications";

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';

export const CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE';

export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';

export const fetchProductsRequest = () => ({type: FETCH_PRODUCTS_REQUEST});
export const fetchProductsSuccess = products => ({type: FETCH_PRODUCTS_SUCCESS, products});
export const fetchProductsFailure = error => ({type: FETCH_PRODUCTS_FAILURE, error});

export const fetchProductRequest = () => ({type: FETCH_PRODUCT_REQUEST});
export const fetchProductSuccess = product => ({type: FETCH_PRODUCT_SUCCESS, product});
export const fetchProductFailure = error => ({type: FETCH_PRODUCT_FAILURE, error});

export const createProductRequest = () => ({type: CREATE_PRODUCT_REQUEST});
export const createProductSuccess = () => ({type: CREATE_PRODUCT_SUCCESS});
export const createProductFailure = (error) => ({type: CREATE_PRODUCT_FAILURE, error});

export const deleteProductRequest = () => ({type: DELETE_PRODUCT_REQUEST});
export const deleteProductSuccess = () => ({type: DELETE_PRODUCT_SUCCESS});
export const deleteProductFailure = (error) => ({type: DELETE_PRODUCT_FAILURE, error});

export const fetchProducts = (catId) => {
  return dispatch => {
      let query = '';
      if (catId) {
          query = catId;
      }

      dispatch(fetchProductsRequest());
    return axios.get('/products' + query).then(
      response => dispatch(fetchProductsSuccess(response.data)),
      error => dispatch(fetchProductsFailure(error))
    );
  };
};

export const fetchProduct = id => {
    return dispatch => {
        dispatch(fetchProductRequest());
        return axios.get('/products/' + id).then(
            response => dispatch(fetchProductSuccess(response.data)),
            error => dispatch(fetchProductFailure(error))
        );
    };
};

export const createProduct = productData => {
  return (dispatch, getState) => {
      const token = getState().users.user.token;
      const config = {headers: {'Authorization': token}};
      dispatch(createProductRequest());

    return axios.post('/products', productData, config).then(
        () =>{
            NotificationManager.success('Successfully product created');
            dispatch(createProductSuccess());
            dispatch(push('/'));
        },
        error => {
            NotificationManager.error('Please fill all required fields');
            if (error.response) {
                dispatch(createProductFailure(error.response.data))
            } else {
                dispatch(createProductFailure({global: 'No connection'}))
            }
        }
    );
  };
};

export const deleteProduct = id => {
    return (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': token}};
        dispatch(deleteProductRequest());
        return axios.delete('/products/' + id, config).then(
            () =>{
                console.log('S');
                NotificationManager.success('Product removed');
                dispatch(deleteProductSuccess());
                dispatch(push('/'));
            },
            error => {
                NotificationManager.error('Something went wrong');
                if (error.response) {
                    dispatch(deleteProductFailure(error.response.data))
                } else {
                    dispatch(deleteProductFailure({global: 'No connection'}))
                }
            }
        );
    };
};
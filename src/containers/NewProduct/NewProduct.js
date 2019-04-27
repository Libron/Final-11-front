import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";

import ProductForm from "../../components/ProductForm/ProductForm";
import {createProduct} from "../../store/actions/productsActions";
import Spinner from "../../components/UI/Spinner/Spinner";

class NewProduct extends Component {
  componentDidMount() {
      if (!this.props.user) {
          this.props.history.push('/')
      }
  }

  render() {
      if (this.props.loading || !this.props.categories) {
          return <Spinner />;
      }

      return (
      <Fragment>
        <h2>New product</h2>
        <ProductForm
          submit={this.props.createProduct}
          categories={this.props.categories}
          error={this.props.error}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categories,
    error: state.products.error,
    user: state.users.user,
    loading: state.categories.loading
});

const mapDispatchToProps = dispatch => ({
  createProduct: productData => dispatch(createProduct(productData))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);
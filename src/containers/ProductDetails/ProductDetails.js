import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {deleteProduct, fetchProduct} from "../../store/actions/productsActions";
import Product from "../../components/UI/Product/Product";
import {Button} from "reactstrap";

import './ProductDetails.css';
import Spinner from "../../components/UI/Spinner/Spinner";

class ProductDetails extends Component {
    componentDidMount() {
        this.props.fetchProduct(this.props.match.params.id);
    };

    render() {
        if (this.props.loading || !this.props.product) {
            return <Spinner />;
        }

        const product = this.props.product;
        const removeButton = <Button color="danger" className="btn-remove" onClick={() => this.props.deleteProduct(this.props.match.params.id)}>SOLD !</Button>;

        return (
            <div className="ProductDetails clearfix">
                <Product
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    image={product.image}
                    category={product.category.title}
                    seller={product.seller.displayname}
                    phone={product.seller.phone}
                />
                {(this.props.user) && (product.seller._id === this.props.user._id) ? removeButton : null}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    product: state.products.product,
    user: state.users.user,
    loading: state.products.loading
});

const mapDispatchToProps = dispatch => ({
    fetchProduct: (id) => dispatch(fetchProduct(id)),
    deleteProduct: (id) => dispatch(deleteProduct(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
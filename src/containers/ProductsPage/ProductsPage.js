import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Button, Card, CardBody, CardImg, CardSubtitle, CardTitle} from "reactstrap";
import {NavLink as RouterNavLink} from 'react-router-dom';

import {fetchProducts} from "../../store/actions/productsActions";
import {apiURL} from "../../constants";
import Spinner from "../../components/UI/Spinner/Spinner";

import './ProductsPage.css';

class ProductsPage extends Component {
    componentDidMount() {
        this.props.fetchProducts(this.props.location.search);
    };

    render() {
        if (!this.props.products) {
            return <Spinner />
        }

        return (
            <Fragment>
                <div className="Products">
                    {this.props.products.map(item => (
                        <Card key={item._id}>
                            <CardImg top width="150px" src={apiURL + '/uploads/' + item.image} alt="Card image cap" />
                            <CardBody>
                                <CardTitle>{item.title}</CardTitle>
                                <CardSubtitle>{item.price} USD</CardSubtitle>
                                <Button color="success"  className="btn-buy" tag={RouterNavLink} to={/products/ + item._id}>Buy now !</Button>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    products: state.products.products
});

const mapDispatchToProps = dispatch => ({
    fetchProducts: (query) => dispatch(fetchProducts(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
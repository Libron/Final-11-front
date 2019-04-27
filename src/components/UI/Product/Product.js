import React from 'react';
import {Table} from "reactstrap";
import PropTypes from 'prop-types';
import ImageThumbnail from "../ImageThumbnail/ImageThumbnail";

import './Product.css';

const Product = props => {
    return (
        <div className="Product clearfix">
            <ImageThumbnail image={props.image || null} />
            <h2 className="Title">{props.title}</h2>
            <h3>Technical Specification</h3>
            <Table dark>
                <tbody>
                <tr>
                    <th scope="row">Description</th>
                    <td>{props.description}</td>
                </tr>
                <tr>
                    <th scope="row">Price</th>
                    <td>{props.price} USD</td>
                </tr>
                <tr>
                    <th scope="row">Category</th>
                    <td>{props.category}</td>
                </tr>
                <tr>
                    <th scope="row">seller</th>
                    <td>{props.seller}</td>
                </tr>
                <tr>
                    <th scope="row">phone</th>
                    <td>{props.phone}</td>
                </tr>
                </tbody>
            </Table>


        </div>
    );
};

Product.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    seller: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired
};

export default Product;
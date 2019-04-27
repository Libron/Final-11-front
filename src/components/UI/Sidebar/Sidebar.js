import React from 'react';
import {Badge, ListGroup, ListGroupItem} from "reactstrap";
import {NavLink as RouterNavLink} from 'react-router-dom';

import './Sidebar.css';

const Sidebar = ({categories, fetchHandler}) => {
    return (
        <ListGroup className="Categories">
            <h2>Categories:</h2>
            <ListGroupItem className="justify-content-between Item" onClick={() => fetchHandler()} tag={RouterNavLink} to="/" >All products</ListGroupItem>
            {categories.map(cat => (
                <ListGroupItem key={cat._id} className="justify-content-between Item" onClick={() => fetchHandler(`?catId=${cat._id}`)} tag={RouterNavLink} to={`/products?catId=${cat._id}`}>{cat.title} <Badge pill>{cat.count}</Badge></ListGroupItem>
            ))}
        </ListGroup>
    );
};

export default Sidebar;
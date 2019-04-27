import React, {Component} from 'react';
import {connect} from "react-redux";
import {NotificationContainer} from "react-notifications";
import {Col, Container, Row} from "reactstrap";
import {Route, Switch, withRouter} from "react-router-dom";

import {logoutUser} from "./store/actions/usersActions";
import {fetchCategories} from "./store/actions/categoriesActions";
import {fetchProducts} from "./store/actions/productsActions";

import ProductsPage from "./containers/ProductsPage/ProductsPage";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import ProductDetails from "./containers/ProductDetails/ProductDetails";
import NewProduct from "./containers/NewProduct/NewProduct";
import Toolbar from "./components/UI/Toolbar/Toolbar";
import Sidebar from "./components/UI/Sidebar/Sidebar";

import './App.css';
import Spinner from "./components/UI/Spinner/Spinner";

class App extends Component {
    componentDidMount() {
        this.props.fetchCategories();
    };

    render() {
        if (this.props.loading || !this.props.categories) {
            return <Spinner />
        }

      return (
        <div className="App">
            <NotificationContainer/>
            <header>
                <Toolbar user={this.props.user} logout={this.props.logoutUser}/>
            </header>
            <Container>
                <Row>
                    <Col md={3} sm={12}>
                        <Sidebar categories={this.props.categories} fetchHandler={this.props.fetchProducts} />
                    </Col>
                    <Col md={9} sm={12}>
                        <Switch>
                            <Route path="/" exact component={ProductsPage} />
                            <Route path="/products" exact component={ProductsPage} />
                            <Route path="/products/new" exact component={NewProduct} />
                            <Route path="/products/:id" exact component={ProductDetails} />
                            <Route path="/register" exact component={Register}/>
                            <Route path="/login" exact component={Login}/>
                            <Route render={() => <h1>Page Not Found</h1>} />
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </div>
      );
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    categories: state.categories.categories,
    loading: state.categories.loading
});

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser()),
    fetchCategories: () => dispatch(fetchCategories()),
    fetchProducts: (query) => dispatch(fetchProducts(query))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
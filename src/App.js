import React from 'react';
import {NotificationContainer} from "react-notifications";
import {Container} from "reactstrap";
import {Route, Switch, withRouter} from "react-router-dom";

import './App.css';
import Toolbar from "./components/UI/Toolbar/Toolbar";
import {connect} from "react-redux";
import {logoutUser} from "./store/actions/usersActions";

function App() {
  return (
    <div className="App">
        <NotificationContainer/>
        <header>
            <Toolbar user={this.props.user} logout={this.props.logoutUser}/>
        </header>
        <Container>
            <Switch>
                <Route path="/" exact render={() => <h1>Some component</h1>} />
                <Route render={() => <h1>Page Not Found</h1>} />
            </Switch>
        </Container>
    </div>
  );
}

const mapStateToProps = state => ({
    user: state.users.user
});

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
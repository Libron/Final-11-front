import React from 'react';
import {NotificationContainer} from "react-notifications";
import {Container} from "reactstrap";
import {Route, Switch} from "react-router-dom";

import './App.css';

function App() {
  return (
    <div className="App">
        <NotificationContainer/>
        <header>
            {/*<Toolbar user={this.props.user} logout={this.props.logoutUser}/>*/}
        </header>
        <Container style={{marginTop: '20px'}}>
            <Switch>
                <Route path="/" exact render={() => <h1>Some component</h1>} />
                <Route render={() => <h1>Page Not Found</h1>} />
            </Switch>
        </Container>
    </div>
  );
}

export default App;

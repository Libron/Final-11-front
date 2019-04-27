import React, {Component} from 'react';
import {Alert, Button,  Form, FormGroup} from "reactstrap";
import FormElement from "../../components/UI/Form/FormElement";
import {loginUser} from "../../store/actions/usersActions";
import connect from "react-redux/es/connect/connect";

class Login extends Component {
    state = {
        username: '',
        password: ''
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    submitFormHandler = event => {
        event.preventDefault();
        this.props.loginUser({...this.state});
    };

    render() {
        return (
            <div className="Login">
                <h2>Login</h2>
                {this.props.error && (
                    <Alert color="danger">{this.props.error.error}</Alert>
                )}
                <Form onSubmit={this.submitFormHandler}>
                    <FormElement
                        propertyName="username"
                        title="Username"
                        type="text"
                        value={this.state.username}
                        onChange={this.inputChangeHandler}
                        placeholder="Enter username you registered with"
                        autoComplete="current-username"
                    />

                    <FormElement
                        propertyName="password"
                        title="Password"
                        type="password"
                        value={this.state.password}
                        onChange={this.inputChangeHandler}
                        placeholder="Enter password"
                        autoComplete="current-password"
                    />

                    <FormGroup row>
                            <Button type="submit" color="primary" size="lg" block style={{marginTop: '15px'}}>Login</Button>
                    </FormGroup>

                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    error: state.users.loginError
});

const mapDispatchToProps = dispatch => ({
    loginUser: userData => dispatch(loginUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
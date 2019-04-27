import React, {Component} from 'react';
import {Alert, Button, Form, FormGroup} from "reactstrap";
import {registerUser} from "../../store/actions/usersActions";
import {connect} from "react-redux";
import FormElement from "../../components/UI/Form/FormElement";

class Register extends Component {
    state = {
        username: '',
        password: '',
        displayname: '',
        phone: ''
    };

    inputChangeHandler = event => {
        this.setState({
           [event.target.name]: event.target.value
        });
    };

    submitFormHandler = event => {
      event.preventDefault();
      this.props.registerUser({...this.state});
    };

    getFieldError = fieldName => {
        return this.props.error && this.props.error.errors && this.props.error.errors[fieldName] && this.props.error.errors[fieldName].message;
    };

    render() {
        return (
            <div className="Register">
                <h2>Register New User</h2>
                {this.props.error && this.props.error.global && (
                    <Alert color="danger">
                        {this.props.error.global}
                    </Alert>
                )}
                <Form onSubmit={this.submitFormHandler}>
                    <FormElement
                        propertyName="displayname"
                        title="Display Name"
                        type="text"
                        value={this.state.displayname}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldError('displayname')}
                        placeholder="Enter Full Name"
                        autoComplete="new-displayname"
                    />

                   <FormElement
                       propertyName="username"
                       title="Username"
                       type="text"
                       value={this.state.username}
                       onChange={this.inputChangeHandler}
                       error={this.getFieldError('username')}
                       placeholder="Enter your desired username"
                       autoComplete="new-username"
                   />

                    <FormElement
                        propertyName="password"
                        title="Password"
                        type="password"
                        value={this.state.password}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldError('password')}
                        placeholder="Enter new secure password"
                        autoComplete="new-password"
                    />

                    <FormElement
                        propertyName="phone"
                        title="Phone number"
                        type="text"
                        value={this.state.phone}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldError('phone')}
                        placeholder="+996 779 24 88 88"
                        autoComplete="new-phone"
                    />

                    <FormGroup row>
                        <Button type="submit" color="success" size="lg" block style={{marginTop: '15px'}}>Register</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
  error: state.users.registerError
});

const mapDispatchToProps = dispatch => ({
    registerUser: userData => dispatch(registerUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
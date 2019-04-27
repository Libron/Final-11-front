import React, {Component} from 'react';
import {Button, Col, Form, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import FormElement from "../UI/Form/FormElement";

class ProductForm extends Component {
  state = {
    title: '',
    price: '',
    description: '',
    image: '',
    category: ''
  };

  submitFormHandler = event => {
    event.preventDefault();

    const formData = new FormData();

    Object.keys(this.state).forEach(key => {
      formData.append(key, this.state[key]);
    });

    this.props.submit(formData);
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  fileChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.files[0]
    })
  };

    getFieldError = fieldName => {
        return this.props.error && this.props.error.errors && this.props.error.errors[fieldName] && this.props.error.errors[fieldName].message;
    };

    render() {
    return (
      <Form onSubmit={this.submitFormHandler}>
          <FormElement
              propertyName="title"
              title="Title"
              type="text"
              value={this.state.title}
              error={this.getFieldError('title')}
              placeholder="Enter product title"
              onChange={this.inputChangeHandler}
          />

          <FormElement
              propertyName="description"
              title="Description"
              type="textarea"
              value={this.state.description}
              error={this.getFieldError('description')}
              placeholder="Enter product description"
              onChange={this.inputChangeHandler}
          />

          <FormGroup row>
              <Label sm={2} for="image">Product Image</Label>
              <Col sm={10}>
                  <Input
                      type="file"
                      name="image" id="image"
                      onChange={this.fileChangeHandler}
                  />

                  {this.props.error && (
                      <FormFeedback>{this.getFieldError('image')}</FormFeedback>
                  )}
              </Col>
          </FormGroup>

          <FormElement
              propertyName="price"
              title="Price"
              type="number"
              value={this.state.price}
              error={this.getFieldError('price')}
              onChange={this.inputChangeHandler}
          />

        <FormGroup row>
          <Label sm={2} for="category">Category</Label>
          <Col sm={10}>
            <Input
              type="select"
              name="category" id="category"
              value={this.state.category}
              onChange={this.inputChangeHandler}
            >
              <option value="">Please select category...</option>
              {this.props.categories.map(category => (
                <option key={category._id} value={category._id}>{category.title}</option>
              ))}
            </Input>
              {this.props.error && (
                  <FormFeedback>{this.getFieldError('category')}</FormFeedback>
              )}
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col sm={{offset:2, size: 10}}>
            <Button type="submit" color="primary">Save</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default ProductForm;

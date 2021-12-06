import React, { Component } from "react";
import Axios from "axios";
import { setErrors } from "../conmmon/setErrors";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      emailId: "",
      errors: {},
    };
  }
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  validate = (firstName, lastName, emailId) => {
    const errors = setErrors(firstName, lastName , emailId);
    this.setState({ errors: errors });
    return Object.values(errors).every((err) => err === "");
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { firstName: firstName, lastName: lastName, category: emailId } = this.state;
    if (this.validate(firstName, lastName, emailId)) {
      const data = {
        firstName: firstName,
        lastName: lastName,
        emailId: emailId,
      };
      console.log(data);
      Axios.post("/api/v1/employees", data).then((res) => {
        if (res.data.success) {
          alert("Added");
          this.setState({ firstName: "", lastName: "", emailId: "" });
        }
      });
    }
  };

  render() {
    return (
      <div className="col-md-10 mt-3 mx-auto">
        <h1 className="h3 mb-3 font-weight-normal">Create new post</h1>
        <form className="needs-validation" noValidate>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              placeholder="Enter title"
              value={this.state.firstName}
              onChange={this.handleInputChange}
            />
            {this.state.errors.firstName && (
              <div className="text-danger">{this.state.errors.firstName}</div>
            )}
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              placeholder="Enter category"
              value={this.state.lastName}
              onChange={this.handleInputChange}
            />
            {this.state.errors.lastName && (
              <div className="text-danger">{this.state.errors.lastName}</div>
            )}
          </div>
          <div className="form-group">
            <label>EmailId</label>
            <CKEditor
              editor={ClassicEditor}
              data={this.state.emailId}
              onChange={(event, editor) => {
                const data = editor.getData();
                this.setState({ emailId: data });
              }}
            />
            {this.state.errors.description && (
              <div className="text-danger">{this.state.errors.emailId}</div>
            )}
          </div>

          <button
            className="btn btn-success"
            type="submit"
            onClick={this.onSubmit}
          >
            <i className="far fa-check-square"></i>
            &nbsp;Submit
          </button>
        </form>
      </div>
    );
  }
}

export default CreatePost;

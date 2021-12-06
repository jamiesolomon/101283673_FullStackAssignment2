import React, { Component } from "react";
import axios from "axios";

class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`/api/vi/employees/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          post: res.data.post,
        });
        console.log("post: ", this.state.post);
      }
    });
  }
  render() {
    const { firstName, lastName, emailId } = this.state.post;
    return (
      <div>
        <h4>{firstName}</h4>
        <hr />
        <dl className="row">
          <dt className="col-sm-2">Last Name</dt>
          <dd className="col-sm-10">{lastName}</dd>

          <dt className="col-sm-2">Email Id</dt>
          <dd className="col-sm-10">
            <p dangerouslySetInnerHTML={{ __html: emailId }}></p>
          </dd>
        </dl>
      </div>
    );
  }
}

export default DetailPage;

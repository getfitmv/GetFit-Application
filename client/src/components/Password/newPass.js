import React, { Component } from "react";
import axios from "axios";
import FormField from "../utils/Form/formfield";
import { update, generateData, isFormValid } from "../utils/Form/formActions";
import Dialog from "@material-ui/core/Dialog";

class NewPass extends Component {
  state = {
    resetToken: "",
    formErrorMessage: "",
    formError: false,
    formSuccess: "",
    formdata: {
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Enter your password"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      confirmPassword: {
        element: "input",
        value: "",
        config: {
          name: "confirm_password_input",
          type: "password",
          placeholder: "Confirm your password"
        },
        validation: {
          required: true,
          confirm: "password"
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  componentDidMount() {
    const resetToken = this.props.match.params.token;
    this.setState({ resetToken });
  }

  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, "new_pass");
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, "new_pass");
    let formIsValid = isFormValid(this.state.formdata, "new_pass");

    if (formIsValid) {
      axios
        .post("/api/users/new_pass", {
          ...dataToSubmit,
          resetToken: this.state.resetToken
        })
        .then(response => {
          if (!response.data.success) {
            this.setState({
              formError: true,
              formErrorMessage: response.data.message
            });
          } else {
            this.setState({ formError: false, formSuccess: true });
            setTimeout(() => {
              this.props.history.push("/regeisterlogin");
            }, 3000);
          }
        });
    } else {
      this.setState({
        formError: true
      });
    }
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={event => this.submitForm(event)}>
          <h2>New Password</h2>
          <div className="block">
            <FormField
              id={"password"}
              formdata={this.state.formdata.password}
              change={element => this.updateForm(element)}
            />
          </div>
          <div className="block">
            <FormField
              id={"confirmPassword"}
              formdata={this.state.formdata.confirmPassword}
              change={element => this.updateForm(element)}
            />
          </div>
          <div>
            {this.state.formError ? (
              <div className="error_label">Please check your data</div>
            ) : null}
            <button onClick={event => this.submitForm(event)}>send</button>
          </div>
        </form>

        <Dialog open={this.state.formSuccess}>
          <div className="dialog_alert">
            <div>Alright !!</div>
            <div>Your password was reseted...you will be redirected</div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default NewPass;

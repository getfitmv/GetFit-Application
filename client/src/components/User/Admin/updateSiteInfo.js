import React, { Component } from "react";
import FormField from "../../utils/Form/formfield";
import {
  update,
  generateData,
  isFormValid,
  populateFields
} from "../../utils/Form/formActions";

import { getSiteInfo, updateSiteInfo } from "../../../Store/Actions/siteAction";

import { connect } from "react-redux";

class UpdateSiteInfo extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      address: {
        element: "input",
        value: "",
        config: {
          name: "address_input",
          type: "text",
          placeholder: "Enter the address",
          label: "Address"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true
      },
      hours: {
        element: "input",
        value: "",
        config: {
          name: "working_input",
          type: "text",
          placeholder: "Enter the working hours",
          label: "hours"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true
      },
      phone: {
        element: "input",
        value: "",
        config: {
          name: "phone_input",
          type: "text",
          placeholder: "Enter the phone num ",
          label: "phone num"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true
      },
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter the email ",
          label: "Email"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true
      }
    }
  };
  componentDidMount() {
    this.props.dispatch(getSiteInfo()).then(() => {
      console.log(this.props.site.siteInfo[0]);
      const newFormData = populateFields(
        this.state.formdata,
        this.props.site.siteInfo[0]
      );

      this.setState({
        formdata: newFormData
      });
    });
  }

  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, "site_info");
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, "site_info");
    let formIsValid = isFormValid(this.state.formdata, "site_info");

    if (formIsValid) {
      this.props.dispatch(updateSiteInfo(dataToSubmit)).then(() => {
        this.setState(
          {
            formSuccess: true
          },
          () => {
            setTimeout(() => {
              this.setState({
                formSuccess: false
              });
            }, 2000);
          }
        );
      });
    } else {
      this.setState({
        formError: true
      });
    }
  };

  render() {
    return (
      <div>
        <h1>Site Information</h1>

        <form onSubmit={event => this.submitForm(event)}>
          <FormField
            id={"address"}
            formdata={this.state.formdata.address}
            change={element => this.updateForm(element)}
          />
          <FormField
            id={"hours"}
            formdata={this.state.formdata.hours}
            change={element => this.updateForm(element)}
          />
          <FormField
            id={"phone"}
            formdata={this.state.formdata.phone}
            change={element => this.updateForm(element)}
          />
          <FormField
            id={"email"}
            formdata={this.state.formdata.email}
            change={element => this.updateForm(element)}
          />

          <div>
            {this.state.formSuccess ? (
              <div className="form_success">Site Info has been updated</div>
            ) : null}

            {this.state.formError ? (
              <div className="error_label">Please check your data</div>
            ) : null}
            <button onClick={event => this.submitForm(event)}>
              Update Info
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    site: state.site
  };
};

export default connect(mapStateToProps)(UpdateSiteInfo);

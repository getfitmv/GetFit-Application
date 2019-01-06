import React, { Component } from "react";
import { connect } from "react-redux";

import FormField from "../../utils/Form/formfield";
import {
  update,
  generateData,
  isFormValid,
  restFields
} from "../../utils/Form/formActions";

import {
  getGends,
  addGend,
  clearGend
} from "../../../Store/Actions/productsAction";

class ManageGenders extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: "input",
        value: "",
        config: {
          label: "Gender name",
          name: "Catogery_input",
          type: "text",
          placeholder: "Enter Gender name"
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

  componentDidMount = () => {
    this.props.dispatch(getGends());
  };

  showGends = () =>
    this.props.products.gends
      ? this.props.products.gends.map((item, i) => (
          <div className="category_item" key={item._id}>
            {item.name}
          </div>
        ))
      : null;

  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, "gends");
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  };

  updateFields = newFormdata => {
    this.setState({
      formdata: newFormdata
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, "gends");
    let formIsValid = isFormValid(this.state.formdata, "gends");
    let existingGends = this.props.products.gends;

    if (formIsValid) {
      this.props
        .dispatch(addGend(dataToSubmit, existingGends))
        .then(response => {
          if (response.payload.success) {
            this.restField();
          } else {
            this.setState({ formError: true });
          }
        });
    } else {
      this.setState({
        formError: true
      });
    }
  };

  restField = () => {
    const newFormData = restFields(this.state.formdata, "gends");

    this.setState({
      formdata: newFormData,
      formSuccess: true
    });
    setTimeout(() => {
      this.setState(
        {
          formSuccess: false
        },
        () => {
          this.props.dispatch(clearGend());
        }
      );
    }, 2000);
  };
  render() {
    return (
      <div className="admin_category_wrapper">
        <h1>Category</h1>
        <div className="admin_two_column">
          <div className="left">
            <div className="brands_container">{this.showGends()}</div>
          </div>
          <div className="right">
            <form onSubmit={event => this.submitForm(event)}>
              <FormField
                id={"name"}
                formdata={this.state.formdata.name}
                change={element => this.updateForm(element)}
              />

              {this.state.formSuccess ? (
                <div className="form_success">Success</div>
              ) : null}

              {this.state.formError ? (
                <div className="error_label">Please check your data</div>
              ) : null}
              <button onClick={event => this.submitForm(event)}>
                Add product
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(ManageGenders);

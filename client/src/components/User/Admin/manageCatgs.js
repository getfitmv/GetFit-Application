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
  getCatgs,
  addCatg,
  clearCatg
} from "../../../Store/Actions/productsAction";

class ManageCatgs extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "name_input",
          type: "text",
          placeholder: "Enter the brand"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  componentDidMount = () => {
    this.props.dispatch(getCatgs());
  };

  showCatgs = () =>
    this.props.products.catgs
      ? this.props.products.catgs.map((item, i) => (
          <div className="category_item" key={item._id}>
            {item.name}
          </div>
        ))
      : null;

  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, "catgs");
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, "catgs");
    let formIsValid = isFormValid(this.state.formdata, "catgs");
    let existingCatgs = this.props.products.catgs;

    if (formIsValid) {
      this.props
        .dispatch(addCatg(dataToSubmit, existingCatgs))
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
    const newFormData = restFields(this.state.formdata, "catgs");

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
          this.props.dispatch(clearCatg());
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
            <div className="brands_container">{this.showCatgs()}</div>
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

export default connect(mapStateToProps)(ManageCatgs);

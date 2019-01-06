import React, { Component } from "react";
import UserLayout from "../../../hoc/userLayout";
import FormField from "../../utils/Form/formfield";
import FileUpload from "../../utils/Form/fileUpload";

import {
  update,
  generateData,
  isFormValid,
  optionFields,
  restFields
} from "../../utils/Form/formActions";
import { connect } from "react-redux";
import {
  getCatgs,
  getGends,
  addProduct,
  clearProduct
} from "../../../Store/Actions/productsAction";

class AddProduct extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: "input",
        value: "",
        config: {
          label: "Product name",
          name: "name_input",
          type: "text",
          placeholder: "Enter your name"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true
      },
      description: {
        element: "textarea",
        value: "",
        config: {
          label: "Product description",
          name: "description_input",
          type: "text",
          placeholder: "Enter your description"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true
      },
      price: {
        element: "input",
        value: "",
        config: {
          label: "Product price",
          name: "price_input",
          type: "number",
          placeholder: "Enter your price"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true
      },
      catg: {
        element: "select",
        value: "",
        config: {
          label: "Product catgery",
          name: "catgery_input",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true
      },

      gend: {
        element: "select",
        value: "",
        config: {
          label: "Product Gender",
          name: "Gender_input",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true
      },
      images: {
        value: [],
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationMessage: "",
        showlabel: false
      }
    }
  };

  componentDidMount() {
    const formdata = this.state.formdata;
    this.props.dispatch(getCatgs()).then(response => {
      const newFormData = optionFields(
        formdata,
        this.props.products.catgs,
        "catg"
      );
      this.updateFields(newFormData);
    });

    this.props.dispatch(getGends()).then(response => {
      const newFormData = optionFields(
        formdata,
        this.props.products.gends,
        "gend"
      );
      this.updateFields(newFormData);
    });
  }

  updateFields = newFormdata => {
    this.setState({
      formdata: newFormdata
    });
  };

  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, "products");
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  };

  restField = () => {
    const newFormData = restFields(this.state.formdata, "products");

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
          this.props.dispatch(clearProduct());
        }
      );
    }, 3000);
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, "products");
    let formIsValid = isFormValid(this.state.formdata, "products");

    if (formIsValid) {
      this.props.dispatch(addProduct(dataToSubmit)).then(() => {
        if (this.props.products.addProduct.success) {
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

  imagesHandler = images => {
    const newFormData = {
      ...this.state.formdata
    };
    newFormData["images"].value = images;
    newFormData["images"].valid = true;

    this.setState({
      formdata: newFormData
    });
  };

  render() {
    return (
      <UserLayout>
        <div>
          <h1>Add Products</h1>

          <form onSubmit={event => this.submitForm(event)}>
            <FileUpload
              imagesHandler={images => this.imagesHandler(images)}
              reset={this.state.formSuccess}
            />

            <FormField
              id={"name"}
              formdata={this.state.formdata.name}
              change={element => this.updateForm(element)}
            />

            <FormField
              id={"description"}
              formdata={this.state.formdata.description}
              change={element => this.updateForm(element)}
            />

            <FormField
              id={"price"}
              formdata={this.state.formdata.price}
              change={element => this.updateForm(element)}
            />

            <div className="form_devider" />

            <FormField
              id={"catg"}
              formdata={this.state.formdata.catg}
              change={element => this.updateForm(element)}
            />

            <FormField
              id={"gend"}
              formdata={this.state.formdata.gend}
              change={element => this.updateForm(element)}
            />

            <div>
              {this.state.formSuccess ? (
                <div className="form_success">Product Added</div>
              ) : null}

              {this.state.formError ? (
                <div className="error_label">Please check your data</div>
              ) : null}
              <button onClick={event => this.submitForm(event)}>
                Add Products
              </button>
            </div>
          </form>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(AddProduct);

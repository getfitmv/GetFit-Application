import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./hoc/layout";
import RegeisterLogin from "./components/Register_login";
import Register from "./components/Register_login/register";
import UserDashboard from "./components/User";
import Auth from "./hoc/auth";
import AddProduct from "./components/User/Admin/AddProduct";
import ManageSite from "./components/User/Admin/manageSite";
import ShopTrainer from "./components/Shop";
import ManageCatogeries from "./components/User/Admin/manageCatogeries";
import CartUser from "./components/User/cart";
import ProfileUpdate from "./components/User/profileUpdate";
import PageNotFound from "./components/utils/pageNotFound";
import RestPass from "./components/Password";
import NewPass from "./components/Password/newPass";

import ProductPage from "./components/Product";

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route
          path="/user/dashboard"
          exact
          component={Auth(UserDashboard, true)}
        />

        <Route path="/user/cart" exact component={Auth(CartUser, true)} />
        <Route
          path="/user/profile"
          exact
          component={Auth(ProfileUpdate, true)}
        />

        <Route path="/register" exact component={Auth(Register, false)} />

        <Route
          path="/regeisterlogin"
          exact
          component={Auth(RegeisterLogin, false)}
        />
        <Route path="/resetpass" exact component={Auth(RestPass, false)} />
        <Route
          path="/new_password/:token"
          exact
          component={Auth(NewPass, false)}
        />
        <Route
          path="/admin/add_product"
          exact
          component={Auth(AddProduct, true)}
        />
        <Route
          path="/admin/site_info"
          exact
          component={Auth(ManageSite, true)}
        />

        <Route
          path="/admin/manage_categories"
          exact
          component={Auth(ManageCatogeries, true)}
        />

        <Route path="/" exact component={Auth(Home, null)} />
        <Route path="/trainer" exact component={Auth(ShopTrainer, null)} />
        <Route
          path="/product_detail/:id"
          exact
          component={Auth(ProductPage, null)}
        />

        <Route exact component={Auth(PageNotFound)} />
      </Switch>
    </Layout>
  );
};

export default Routes;

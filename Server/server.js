//===============================
//         MAIN CONFIG
//===============================

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const formidable = require("express-formidable");
const cloudinary = require("cloudinary");
const moment = require("moment");
const async = require("async");
const app = express();
const mongoose = require("mongoose");
const { sendEmail } = require("./mailComp/mail/index");
require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET
});

//===============================
//            MODELS
//===============================

const { User } = require("./models/user");
const { Catg } = require("./models/catogery");
const { Gend } = require("./models/gender");
const { Product } = require("./models/product");
const { Site } = require("./models/site");
const { Payment } = require("./models/payment");

//===============================
//           MiddleWare
//===============================

const { auth } = require("./middleware/auth");

const { admin } = require("./middleware/admin");

//===============================
//            USERS
//===============================

app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history
  });
});

app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    sendEmail(doc.email, doc.name, null, "welcome");
    return res.status(200).json({
      success: true,
      userdata: doc
    });
  });
});

app.post("/api/users/login", (req, res) => {
  // this function will cheak the email, then pass, then generate a token
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Try Again!! Email not found"
      });
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, masseage: "Wrong Password" });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res
          .cookie("w_auth", user.token)
          .status(200)
          .json({
            loginSuccess: true
          });
      });
    });
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true
    });
  });
});

app.post("/api/users/updateprofile", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $set: req.body
    },
    { new: true },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      });
    }
  );
});

app.post("/api/users/resetUser", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    user.generateNewToken((err, user) => {
      if (err) return res.json({ success: false, err });
      sendEmail(user.email, user.name, null, "reset_pass", user);
      return res.json({ success: true });
    });
  });
});

app.post("/api/users/new_pass", (req, res) => {
  let exp = moment()
    .startOf("day")
    .valueOf();

  User.findOne(
    {
      resetToken: req.body.resetToken,
      resetTokenExp: {
        $gte: exp
      }
    },
    (err, user) => {
      if (!user)
        return res.json({
          success: false,
          masseage: "sorry,reset password Again!!!"
        });

      user.password = req.body.password;
      user.resetToken = "";
      user.resetTokenExp = "";

      user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
          success: true
        });
      });
    }
  );
});

//==============================
//          Imgaes
//==============================

app.post("/api/users/uploadimage", auth, admin, formidable(), (req, res) => {
  cloudinary.uploader.upload(
    req.files.file.path,
    result => {
      console.log(result);
      res.status(200).send({
        public_id: result.public_id,
        url: result.url
      });
    },
    {
      public_id: `${Date.now()}`,
      resource_type: "auto"
    }
  );
});

app.get("/api/users/removeimage", auth, admin, (req, res) => {
  let image_id = req.query.public_id;
  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) return res.json({ success: false, err });
    res.status(200).send("ok");
  });
});

//===============================
//          Gender
//===============================
app.post("/api/product/gend", auth, admin, (req, res) => {
  const gend = new Gend(req.body);
  gend.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      gend: doc
    });
  });
});

app.get("/api/product/gends", (req, res) => {
  Gend.find({}, (err, gends) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(gends);
  });
});

//===============================
//          Catogery
//===============================

app.post("/api/product/catg", auth, admin, (req, res) => {
  const catg = new Catg(req.body);

  catg.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      catg: doc
    });
  });
});

app.get("/api/product/catgs", (req, res) => {
  Catg.find({}, (err, catgs) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(catgs);
  });
});

//===============================
//          Products
//===============================

app.post("/api/product/trainer", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 200;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gt: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .populate("gend")
    .populate("catg")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, trainers) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        size: trainers.length,
        trainers
      });
    });
});

app.post("/api/product/create", auth, admin, (req, res) => {
  const product = new Product(req.body);

  product.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      create: doc
    });
  });
});

app.get("/api/product/productid", (req, res) => {
  let type = req.query.type;
  items = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(",");
    items = [];
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item);
    });
  }

  Product.find({ _id: { $in: items } })
    .populate("gend")
    .populate("catg")
    .exec((err, docs) => {
      return res.status(200).send(docs);
    });
});

//
app.get("/api/product/list_product", (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 30;

  Product.find()
    .populate("gend")
    .populate("catg")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, list_product) => {
      if (err) return res.status(400).send(err);
      res.send(list_product);
    });
});

//=================================
//            SITE
//=================================

app.get("/api/site/site_data", (req, res) => {
  Site.find({}, (err, site) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(site[0].siteInfo);
  });
});

app.post("/api/site/site_data", auth, admin, (req, res) => {
  Site.findOneAndUpdate(
    { name: "site" },
    { $set: { siteInfo: req.body } },
    { new: true },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
        siteInfo: doc.siteInfo
      });
    }
  );
});

//===============================
//            CART
//===============================

app.post("/api/users/addtocart", auth, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, doc) => {
    let duple = false;

    doc.cart.forEach(item => {
      if (item.id == req.query.productId) {
        duple = true;
      }
    });
    if (duple) {
      User.findOneAndUpdate(
        {
          _id: req.user._id,
          "cart.id": mongoose.Types.ObjectId(req.query.productId)
        },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true },
        (err, doc) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(doc.cart);
        }
      );
    } else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: mongoose.Types.ObjectId(req.query.productId),
              quantity: 1,
              date: Date.now()
            }
          }
        },
        { new: true },
        (err, doc) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(doc.cart);
        }
      );
    }
  });
});

app.get("/api/users/removeitem", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { cart: { id: mongoose.Types.ObjectId(req.query._id) } } },
    { new: true },
    (err, doc) => {
      let cart = doc.cart;
      let arrayCart = cart.map(item => {
        return mongoose.Types.ObjectId(item.id);
      });

      Product.find({ _id: { $in: arrayCart } })
        .populate("gend")
        .populate("catg")
        .exec((err, cartDetail) => {
          return res.status(200).json({
            cartDetail,
            cart
          });
        });
    }
  );
});

app.post("/api/users/successBuy", auth, (req, res) => {
  let history = [];
  let transactionData = {};

  // user history
  req.body.cartDetail.forEach(item => {
    history.push({
      dateOfPurchase: Date.now(),
      name: item.name,
      catg: item.catg.name,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: req.body.paymentData.paymentID
    });
  });

  // PAYMENTS DASH
  transactionData.user = {
    id: req.user._id,
    name: req.user.name,
    lastname: req.user.lastname,
    email: req.user.email
  };
  transactionData.data = req.body.paymentData;
  transactionData.product = history;

  User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { history: history }, $set: { cart: [] } },
    { new: true },
    (err, user) => {
      if (err) return res.json({ success: false, err });

      const payment = new Payment(transactionData);
      payment.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        let products = [];
        doc.product.forEach(item => {
          products.push({ id: item.id, quantity: item.quantity });
        });

        async.eachSeries(
          products,
          (item, callback) => {
            Product.update(
              { _id: item.id },
              {
                $inc: {
                  sold: item.quantity
                }
              },
              { new: false },
              callback
            );
          },
          err => {
            if (err) return res.json({ success: false, err });
            res.status(200).json({
              success: true,
              cart: user.cart,
              cartDetail: []
            });
          }
        );
      });
    }
  );
});


app.delete
/**
|--------------------------------------------------
|           EMAIL             
|--------------------------------------------------
*/

// const smtpTransport = mailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: "amalxm12@gmail.com",
//     pass: "P@$$mohd010"
//   }
// });

// var mail = {
//   from: "GetFit <amalxm12@gmail.com>",
//   to: "maeajmv@gmail.com",
//   subject: "send test",
//   text: "testgn ",
//   html: "<b>rojgojrojgorjgorjgro</b>"
// };

// smtpTransport.sendMail(mail, (err, res) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("email sent");
//   }
//   smtpTransport.close();
// });

//===============================
//        SERVER CONFIG
//===============================

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server Runin at ${port}`);
});

const mailer = require("nodemailer");
require("dotenv").config();
const { WelcomeMail } = require("./welcomeMail");
const { resetPassMail } = require("./resetPassMail");

const EmailTemplate = (to, name, token, template, actionData) => {
  let mail = null;
  switch (template) {
    case "welcome":
      mail = {
        from: "GetFit <getfitmv@gmail.com>",
        to,
        subject: `Welcome to GetFit ${name}`,
        html: WelcomeMail()
      };
      break;
    case "reset_pass":
      mail = {
        from: "GetFit <getfitmv@gmail.com>",
        to,
        subject: `Reset Password`,
        html: resetPassMail(actionData)
      };
      break;
    default:
      mail;
  }

  return mail;
};
const sendEmail = (to, name, token, template, actionData = null) => {
  const smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user: "getfitmv@gmail.com",
      pass: "P@$$010Mohd"
    }
  });

  const mail = EmailTemplate(to, name, token, template, actionData);

  smtpTransport.sendMail(mail, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("email sent");
    }
    smtpTransport.close();
  });
};
module.exports = { sendEmail };

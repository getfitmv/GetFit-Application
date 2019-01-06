import React, { Component } from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";

/**
|--------------------------------------------------
| {"paid":true,"cancelled":false,"payerID":"VU8D877NV8284","paymentID":"PAY-9CN13168E9670282BLQLITIQ","paymentToken":"EC-4US13546GJ4985938","returnUrl":"https://www.sandbox.paypal.com/?paymentId=PAY-9CN13168E9670282BLQLITIQ&token=EC-4US13546GJ4985938&PayerID=VU8D877NV8284","address":{"recipient_name":"User one","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"},"email":"User1-getfit@gmail.com"}
|--------------------------------------------------
*/

class Paypal extends Component {
  render() {
    const onSuccess = payment => {
      console.log(JSON.stringify(payment));
      this.props.onSuccess(payment);
    };

    const onCancel = data => {
      console.log(JSON.stringify(data));
    };

    const onError = err => {
      console.log(JSON.stringify(err));
    };

    let env = "sandbox";
    let currency = "USD";
    let total = this.props.amountToPay;

    const client = {
      sandbox:
        "AfybCDNvsXgDWCc80PuE8Q6hUVCJWI4HKNqrzFGnNIIw62iZM9uoAiMXnsf4ZfBXaMjBMJ0hHpn-5Pqt",
      production: ""
    };

    return (
      <div>
        <PaypalExpressBtn
          env={env}
          client={client}
          currency={currency}
          total={total}
          onError={onError}
          onSuccess={onSuccess}
          onCancel={onCancel}
          style={{
            size: "large",
            color: "blue",
            shape: "rect"
          }}
        />
      </div>
    );
  }
}

export default Paypal;

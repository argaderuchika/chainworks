const axios = require('axios');
var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');


/* GET users listing. */
router.post('/', function(req, res, next) {
    var cryptoCurrencyId = req.body.cryptoCurrencyId;
    var email = req.body.email;


    axios.get('https://api.coincap.io/v2/assets/' + cryptoCurrencyId)
    .then(function (response) {
    // handle success
    var priceUsd = response.data.data.priceUsd;
    res.send(response.data);
    const transporter = nodemailer.createTransport({
        host: 'server65.web-hosting.com',
        port: 465,
        secure: true,
        auth: {
          user: 'devuser@chainworks.io',
          pass: 'DevUser#6789'
        }
    });
    
    const recipientEmail = 'argaderuchika2012@gmail.com';
    const assetId = 'bitcoin';
    const price = '10985.6337176268522729';
    const html = `<div>Hello!<br/><br/>The price of the asset <strong>${assetId}</strong> you requested is <strong>${price}</strong><br/><br/>Thank you for using the CryptoPrice service!</div>`

    const mailOptions = {
    from: 'Crypto Mailer <devuser@chainworks.io>',
    to: recipientEmail,
    subject: `Crypto Price Service - ${assetId}`,
    html: html
    };

    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('ERROR SENDING MAIL');
        console.log(error);
        process.exit(1);
    }
    console.log('MAIL SENT SUCCESSFULLY!')
    console.log(info);
    process.exit(0);
    });
    console.log(response);
    })
    .catch(function (error) {
    // handle error
    console.log(error);
    })
    .then(function () {
    // always executed
    });
    
});

module.exports = router;

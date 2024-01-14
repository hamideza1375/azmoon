const express = require('express');
const fs = require('fs');
const router = express.Router();
const ZarinpalCheckout = require('zarinpal-checkout');
const zarinpal = ZarinpalCheckout.create('00000000-0000-0000-0000-000000000000', true);


router.get('/', (req, res) => {
	res.sendFile('index.html', { root: __dirname + '/../public/html' });
})


router.post('/confirmPayment', async (req, res) => {
	try {
		const response = await zarinpal.PaymentRequest({
			Amount: req.body.price,
			CallbackURL: 'http://localhost:4000/verifyPayment',
			Description: 'azmoon javascript',
		});
		const payArr = {
			userName: req.body.userName,
			price: req.body.price
		}
		fs.writeFileSync('newFile.json', JSON.stringify(payArr));
		res.status(200).json({ value: response.url });
	} catch (error) {
		console.log(error);
	}
})


router.get('/verifyPayment', async (req, res) => {
	const textFile = fs.readFileSync('newFile.json');
	const user = JSON.parse(textFile)
	if (req.query.Status === "OK") {
		res.redirect(`http://localhost:4000/html/payment.html?userName=${user.userName}&price=${user.price}`)
	} else {
		res.send('<h3 style="color:#b00; text-align:center; margin-top:20px" >پرداخت ناموفق</h3>')
	}
})


router.get('/*', (req, res) => res.send('404'))

module.exports = router;
const stripe = require('stripe')('your_secret_key');

const express = require('express');
const QRCode = require('qrcode');
const app = express();

app.get('/',async(req,res)=>{
  const price = await stripe.prices.create({
    currency: 'usd',
    unit_amount: 1000,
    product: 'prod_MWGLuHHf8COJ6T',
  }); 

  const paymentLink = await stripe.paymentLinks.create({
    line_items: [{price: price.id, quantity: 1}],
  });

  let img='';
  let qr= await QRCode.toDataURL(paymentLink.url);
  console.log(qr);
  img = `<image src= " `+qr+ `" />`
  return res.send(img);
});

app.listen(3000, ()=>{
    console.log("app is running at port 3000")
})

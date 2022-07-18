import { Router } from "express"
const { testSeller, testSeller2} = require('./Seller');

    const RouterSeller = Router();

    RouterSeller.get('/seller', testSeller);
    RouterSeller.get('/seller2', testSeller2);


module.exports = RouterSeller;
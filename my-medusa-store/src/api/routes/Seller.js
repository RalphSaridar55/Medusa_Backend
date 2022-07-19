import { Router } from "express"
const { testSeller, testSeller2 } = require('../seller');

    const RouterSeller = Router();

    RouterSeller.get('/helo', testSeller);
    RouterSeller.get('/seller2', testSeller2);


module.exports = RouterSeller;
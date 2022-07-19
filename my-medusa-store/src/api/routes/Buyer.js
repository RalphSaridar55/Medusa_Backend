import { Router } from "express"
const { testBuyer, testBuyer2} = require('../Buyer');

    const RouterBuyer = Router();

    RouterBuyer.get('/buyer', testBuyer);
    RouterBuyer.get('/buyer2', testBuyer2);


module.exports = RouterBuyer;
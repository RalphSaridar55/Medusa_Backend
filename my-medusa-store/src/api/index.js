import { Router } from "express";
const { testBuyer } = require('./buyer');
const { testSeller } = require('./seller');
const { RouterBuyer, RouterSeller } = require('./routes');

export default () => {
    const router = Router();

    router.use('/store-seller/', /* RouterSeller */()=>'test');
    router.use('/store-buyer/', RouterBuyer);

    return router;
}
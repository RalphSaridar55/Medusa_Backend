import { Router } from "express";
// const express = require('express');
// const { testBuyer } = require('./buyer');
// const { testSeller } = require('./seller');
const RouterBuyer = require('./routes/Buyer');
const RouterSeller = require('./routes/Seller');

export default () => {
    const router = Router();

    router.use('/admin', RouterSeller);
    // router.get('/admin/seller', (req,res)=>res.json({test:'test'}));
    router.use('/store-buyer', RouterBuyer);

    return router;
}

// import { Router } from "express"

// export default () => {
//   const router = Router()

//   router.get("/admin/hello", (req, res) => {
//     res.json({
//       message: "Welcome to Your Store!",
//     })
//   })

//   return router
// }

// ** if route is incorrect, I receive 401 ??  check below **
// ** routes prefixes must always be either admin or buyer or i'll receive error 404
// ** I keep on receiving error 401 on custom calls possibly because user must login at first, get the auth token then we use it as middleware to proceed with our custom call
// ** you can't change the port number 
// ** gatsby apps don't run unless you are running localhost
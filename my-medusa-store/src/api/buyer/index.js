
  export const testBuyer = (req, res) => {
    res.json({
      message: "Welcome to My Buyer!",
    })
  }
  
  export const testBuyer2 = (req, res) => {
    res.json({
      message: "Welcome to My Buyer2!",
    })
  }

  module.exports = {
    testBuyer,
    testBuyer2,
  }
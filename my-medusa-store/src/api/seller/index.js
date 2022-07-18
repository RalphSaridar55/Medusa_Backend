
  export const testSeller = (req, res) => {
    res.json({
      message: "Welcome to My Seller!",
    })
  }

  export const testSeller2 = (req, res) => {
    res.json({
      message: "Welcome to My Seller2!",
    })
  }

  module.exports = {
    testSeller,
    testSeller2,
  }
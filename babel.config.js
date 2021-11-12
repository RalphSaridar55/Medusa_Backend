module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module:react-native-dotenv", {
        moduleName: "@env",
        path: ".env",
      }],
     /*  [
        "module:@stripe/stripe-react-native",
        {
          merchantIdentifier: "merchant.identifier",
          enableGooglePay: false
        }
      ] */
    ]
  };
};

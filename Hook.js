import * as Font from 'expo-font';

export default useFonts = async () =>
  await Font.loadAsync({
    'Inter-Black-Light': require('./assets/fonts/static/Inter-Regular.ttf'),
    'Inter-Black-Bold': require('./assets/fonts/static/Inter-Medium.ttf'),
    'Adam-Light': require('./assets/fonts/static/Adam-Light.ttf'),
    'Adam-Medium': require('./assets/fonts/static/Adam-Medium.ttf'),
    'Adam-Bold': require('./assets/fonts/static/Adam-Bold.ttf'),
  });
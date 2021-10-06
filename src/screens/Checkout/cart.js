import React, { useState } from 'react';
import { Text, View } from 'react-native';

import Stepper from 'react-native-stepper-ui';

const MyComponent = (props) => {
  return (
    <View>
      <Text>{props.title}</Text>
      <View>
        {props.children}
      </View>
    </View>
  );
};

const content = [
  <MyComponent title="Component 1" >
    <Text>Hello</Text>
  </MyComponent>,

  <MyComponent title="Component 2" />,
  <MyComponent title="Component 3" />,
];

const Cart = () => {
  const [active, setActive] = useState(0);

  return (
    <View style={{marginTop:60,marginHorizontal:20}}>
      <Stepper
        active={active}
        content={content}
        onBack={() => setActive((p) => p - 1)}
        onFinish={() => alert('Finish')}
        onNext={() => setActive((p) => p + 1)}
      />
    </View>
  );
};

export default Cart;





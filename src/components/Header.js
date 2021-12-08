import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
//import { theme } from '../core/theme'

export default function Header(props) {
  return <Text style={styles.header} {...props} />
}

const styles = StyleSheet.create({
  header: {
    fontFamily:'Adam-Bold',
    fontSize: 24,
    textTransform:'uppercase',
    color: "#6E91EC",
    marginBottom: 10,
  },
})

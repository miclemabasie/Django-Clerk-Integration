import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const index = () => {
  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}>
      <TouchableOpacity 

      onPress={() => {
        console.log("btn")
      }}
      
      style={{
          backgroundColor: "blue",
          paddingHorizontal: 60,
          paddingVertical: 15,
          borderRadius: 10
          
      }}>
        <Text style={{
          fontSize: 20,
          color: "white",
          fontWeight: 'bold'
        }}>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default index
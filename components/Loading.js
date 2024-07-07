import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { theme } from '../theme';
import * as Progress from 'react-native-progress'

const {width,height }=Dimensions.get('window');

export default function Loading() {
  return (
    <View style={{height,width}} className='absolute z-50 flex-col justify-center items-center'>
      <Progress.CircleSnail
      thickness={12}
      size={width/3}
      color={theme.background}
      />
      
    </View>
  )
}
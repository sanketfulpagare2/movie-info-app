import { View, Text, ScrollView, TouchableWithoutFeedback, Image, Dimensions } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { styles } from '../theme'
import { useNavigation } from '@react-navigation/native';
import { image185, image342 } from '../api/moviedb';




var {width,height}=Dimensions.get('window');
export default function MovieList({title,data,hideSeeAll}) {
    let movieName='Ant Man And The Wasp: Quantumania';
    const navigation=useNavigation();

  return (
    <View className="mb-8 space-y-4">
        <View className="mx-4 flex-row justify-between items-center">
            <Text className="text-white text-xl">{title}</Text>
           
            {
                    !hideSeeAll && <TouchableOpacity>
                         <Text style={styles.text}>See All</Text>
                     </TouchableOpacity>
            }

            </View>
            <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal:15}}>
                {data && data.map((item, index) => {
                     return (
                 <TouchableWithoutFeedback key={index} onPress={() => navigation.push('Movie', item)}>
                     
                         <View className="mr-4 space-y-1">
                             <Image 
                             
                            //  source={require('../assets/moviePoster.png')} 
                            source={{uri: image185(item.poster_path)}}
                             className="rounded-3xl"
                             style={{width:width*0.33,height:height*0.22}}
                             />


                         {item.title && <Text className="text-neutral-300 ml-1">{item.title.length>14?item.title.substring(0,14)+'...':item.title}</Text>}

                         </View>
                  
                </TouchableWithoutFeedback>
            );
            })}

            </ScrollView>

     
    </View>
  )
}
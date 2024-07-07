import { View, Text, Dimensions, Platform, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';
import { debounce } from 'lodash';
import { image185, searchMovies } from '../api/moviedb';



const {width,height}=Dimensions.get('window');
const ios=Platform.OS=='ios'
const topMargin =ios?' ':'mt-3'
export default function SearchScreen() {
    const navigation=useNavigation();
    const [results,setResults]=useState([]);
    const [loading, setLoading] = useState(false);
    let movieName='Ant Man And The Wasp: Quantumania';
    const handleSearch=value=>{
        if(value && value.length>2){
            setLoading(true);
            searchMovies ({
                query:value,
                include_adults:'false',
                language:'en-US',
                page:1

            }).then(data=>{
                setLoading(false);
                console.log(data)
                if(data) setResults(data.results);
            })
            
        }
        else{
            setLoading(true);
            setResults([])
        }
    }
    const handleTextDebounce=useCallback(debounce(handleSearch,400),[])

  return (
   <SafeAreaView className='bg-neutral-800 flex-1'>
    <View className={'mx-4 mb-3 flex-row justify-between items-center border  border-neutral-500 rounded-full '+topMargin}>
        <TextInput
        onChangeText={handleTextDebounce}
        placeholder='Search Movie'
        placeholderTextColor={'lightgray'}
        className='pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider'
        />
        <TouchableOpacity onPress={()=>navigation.navigate("Home")}
            className='rounded-full p-3 m-1 bg-neutral-500'
            >
                <XMarkIcon size={25} color={'white'}/>
            </TouchableOpacity>
    </View>
    {/* results */}
    {
        loading?(
            <Loading/>

        ):(
            results.length>0?(
                <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal:15}}
                className='space-y-3'
            >
                <Text className='text-white font-semibold ml-1  '> Results ({results.length})</Text>
                <View className='flex-row justify-between flex-wrap'>
                    {
                        results.map((item,index)=>(
        
                            <TouchableWithoutFeedback 
                                key={index}
                                onPress={()=>navigation.push("Movie",item)}
                            >
                                <View className='space-y-2 mb-4'>
                                <Image className='rounded-3xl'
                                // source={require("../assets/moviePoster.png")}
                                source={{uri:image185(item?.poster_path)}}
                                style={{width:width*0.44,height:height*0.3  }}
                                />
                                <Text className="text-neutral-300 ml-1">{item?.title.length>22?item.title.substring(0,22   )+'...':item?.title}</Text>
        
        
                                </View>
        
                                
        
                            </TouchableWithoutFeedback>
                        ))
                    }
        
                </View>
        
        
            </ScrollView>
        
            ):(<View className='flex-row justify-center'>
                <Image source={require("../assets/movieTime.png")}
                className='h-96 w-96'
                />
            </View>)
        )
    }
        

   
    
   </SafeAreaView>
  )
}
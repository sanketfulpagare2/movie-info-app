import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ChevronLeftIcon }from 'react-native-heroicons/outline'
import {HeartIcon }from 'react-native-heroicons/solid'
import { styles } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient'
import Cast from '../components/Cast'
import MovieList from '../components/MovieList'
import Loading from '../components/Loading'
import { fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../api/moviedb'





var {width,height}=Dimensions.get('window');
const ios=Platform.OS=='ios'
const topMargin =ios?' ':'mt-3'
export default function MovieScreen() {
  const {params:item}=useRoute();
  const navigation=useNavigation();
  const [isFavourite,toggleFavourite]=useState(false);
  const [movie,setMovie]=useState(null);
  const [cast,setCast]=useState([]);
  const[similerMovies,setSimilerMovies]=useState([1,2,3,4,]);
  const [loading, setLoading] = useState(false);
  
  let movieName='Ant Man And The Wasp: Quantumania';

  useEffect(()=>{

    //call movie api
    // console.log("itemID"+item.id);
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  },[item]);

  const getMovieDetails=async (id)=>{
    const data =await fetchMovieDetails(id);
    if(data) setMovie(data);
    setLoading(false);
    
  }
  const getMovieCredits =async id=>{
    
    const data =await fetchMovieCredits(id);
    if(data) setCast(data.cast);
    // console.log(data);
  }
  const getSimilarMovies =async id=>{
    
    const data =await fetchSimilarMovies(id);
    if(data) setSimilerMovies(data.results);
    // console.log(data);
  }

  if (!movie) return <Loading/>;

  return (
    <ScrollView
    contentContainerStyle={{  paddingBottom:20}}
    className="flex-1 bg-neutral-900"
    >
      <View className="w-full">
        <SafeAreaView  className={" absolute z-20 w-full  flex-row  justify-between items-center px-4 "+topMargin}>
         
          <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.background} className="rounded-xl p-1">
              <ChevronLeftIcon size={28} strokeWidth={2.5 } color='white'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>toggleFavourite(!isFavourite)}>
              <HeartIcon size={35} color={isFavourite? 'red' : 'white'} />

          </TouchableOpacity>

        </SafeAreaView>
            {
              loading?(
                    <Loading />
              ):(
                <View>
                <Image 
                // source={require('../assets/moviePoster.png')}
                source={{uri:image500 (movie?.poster_path) }}
                  style={{width,height:height*0.55}}
                />
                <LinearGradient 
                colors={['transparent','rgba(23,23,23,0.8)','rgba(23,23,23,1)']}
                style={{width,height:height*0.40}}
                start={{x:0.5,y:0}}
                end={{x:0.5,y:1}}
                className='absolute bottom-0'
                />
            </View>
              )
            }

        


        {/* movie details */}
        <View style={{marginTop:-(height*0.09)}} className='space-y-3'>
          {/* title */}
          <Text className='text-white text-center text-3xl  font-bold tracking-wider'>
                {movie.title}
          </Text>
              {/* status,release ,runtime   */}
          <Text className='text-neutral-400 text-center text-base font-semibold'>

            {movie?.status} • {movie?.release_date?.split('-')[0]} • {movie?.runtime}min

          </Text>


          <View className="flex-row justify-center  mx-4 space-x-2">
            {
              movie?.genres.map((genre,index)=>{

                let showdot=index+1!= movie?.genres.length;
                return(

                <Text key={index} className="text-neutral-400 text-center text-base font-semibold">
                {genre?.name } {showdot?"•":null}</Text> 
                )
                  })
            }
            
          
            
          </View>
          {/* discription */}

          <Text className="text-neutral-400 mx-4 tracking-wider">
          {
            movie?.overview
          }
          </Text>


        </View>
       

      </View>
      {/* cast */}
    <Cast cast={cast} navigation={navigation}></Cast>
    <MovieList title={"Similar Movies"} data={similerMovies} hideSeeAll={true}/>

    </ScrollView>
  )
}
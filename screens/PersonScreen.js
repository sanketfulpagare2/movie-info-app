import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { styles } from '../theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HeartIcon } from 'react-native-heroicons/solid';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import { fetchPersonDetails, fetchPersonMovies, image342 } from '../api/moviedb';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';

export default function PersonScreen() {
  const verticalMargin = ios ? ' ' : 'my-3';
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);
  const [personMovies, setPersonMovies] = useState([]);
  const [person, setPerson] = useState(null);
  const {params:item}=useRoute();
  const [loading, setLoading] = useState(false);

  // Simulating a data fetch
  useEffect(() => {
    // Change the timeout duration as needed
   setLoading(true);
   getPersonDetails(item.id);
   getPersonMovies(item.id);
  
  }, [item]);
  const getPersonDetails = async (id) => {
    const data=await fetchPersonDetails(id);
    // console.log(data)
    setPerson(data);
    setLoading(false)
  }
  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    setPersonMovies(data.cast);
    setLoading(false);
    }
  if(!person) return <Loading/>;
  return (
    <View className="flex-1 bg-neutral-900">
      {/* Ensure the Loading component is displayed while loading is true */}
      {loading && <Loading />}
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <SafeAreaView
          className={
            'z-20 w-full flex-row justify-between items-center px-4 ' +
            verticalMargin
          }
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.background}
            className="rounded-xl p-1"
          >
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
            <HeartIcon size={35} color={isFavourite ? 'red' : 'white'} />
          </TouchableOpacity>
        </SafeAreaView>

        {/* Conditional Rendering for Loading */}
        {!loading && (
          <View>
            {/* Person Details */}
            <View className="flex-row justify-center">
              <View
                className="items-center rounded-full overflow-hidden h-72 w-72 border border-neutral-500"
                style={{
                  shadowColor: 'gray',
                  shadowRadius: 40,
                  shadowOffset: { width: 0, height: 5 },
                  shadowOpacity: 1,
                  elevation: 10,
                }}
              >
                <Image
                  // source={require('../assets/moviePoster.png')}
                  source={{ uri: image342(person?.profile_path)  }}
                  style={{ width: width * 0.74, height: height * 0.43 }}
                />
              </View>
            </View>
            <View className="mt-6">
              <Text className="text-3xl text-white font-bold text-center">
                {person?.name}
              </Text>
              <Text className="text-base text-neutral-500 font-bold text-center">
                {person?.place_of_birth}
              </Text>
            </View>
            <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Gender</Text>
                <Text className="text-neutral-300 text-sm">{person?.gender==1? 'Female' : 'Male'}</Text>

              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Birthday</Text>
                <Text className="text-neutral-300 text-sm">{person.birthday}</Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Known For</Text>
                <Text className="text-neutral-300 text-sm">{person?.known_for_department}</Text>
              </View>
              <View className="px-2 items-center">
                <Text className="text-white font-semibold">Popularity</Text>
                <Text className="text-neutral-300 text-sm">{person?.popularity?.toFixed(2)}%</Text>
              </View>
            </View>
            <View className="my-6 mx-4 space-y-2">
              <Text className="text-lg text-white">Biography</Text>
              <Text className="text-neutral-400 tracking-wide text-justify">
                {
                  person?.biography ||  'No Biography Available'

                }
              </Text>
            </View>
            <MovieList title={'Movies'} hideSeeAll={true} data={personMovies} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

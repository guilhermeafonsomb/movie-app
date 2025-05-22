import { icons } from "@/constants/icons";
import useFetch from "@/hooks/useFeatch";
import { fetchMovieDetails } from "@/services/api";
import { router, useLocalSearchParams } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { MovieInfo } from "./(components)/MovieInfo";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const { data: movie } = useFetch(() => fetchMovieDetails(id as string));
  return (
    <View className="bg-primary flex-1">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <View className="flex-1">
          <Image
            className="w-full h-[550px]"
            resizeMode="stretch"
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
          />
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold font-xl">{movie?.title}</Text>

          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date?.split("-")[0]}
            </Text>
            <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
          </View>

          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image className="size-4" source={icons.star} />
            <Text className="text-white font-bold text-sm ">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-light-200 text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres.map((g) => g.name).join(" - ") || "N/A"}
          />
          <View className="flex flex-row justify-between w-[60%]">
            <MovieInfo
              label="Budget"
              value={`$${movie?.budget! / 1_000_000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(movie?.revenue!) / 1_000_000} million`}
            />
          </View>

          <MovieInfo
            label="Production Campanies"
            value={
              movie?.production_companies.map((c) => c.name).join(" - ") ||
              "N/A"
            }
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        className="absolute mt-5 bottom-10 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#FFF"
          source={icons.arrow}
        />
        <Text className="text-white font-semibold text-base">Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;

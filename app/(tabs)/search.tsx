import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/hooks/useFeatch";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import { useDeferredValue, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearchQuery = useDeferredValue(searchQuery);

  const {
    data: movies = [],
    loading,
    error,
    refeatch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: deferredSearchQuery }), false);

  useEffect(() => {
    const fetchMovies = async () => {
      console.log(deferredSearchQuery, "deferredSearchQuery");
      if (deferredSearchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    };

    fetchMovies();
  }, [deferredSearchQuery]);

  useEffect(() => {
    if (movies?.length > 0 && movies?.[0]) {
      updateSearchCount(deferredSearchQuery, movies[0]);
    }
  }, [movies, deferredSearchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
        source={images.bg}
      />

      <FlatList
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image className="w-12 h-10" source={icons.logo} />
            </View>

            <View className="my-5">
              <SearchBar
                placeholder="Search movies ..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {loading && (
              <ActivityIndicator
                className="my-3"
                size="large"
                color="#0000FF"
              />
            )}
            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )}

            {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text className="text-xl text-white font-bol">
                Search Results for {""}
                <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard {...item} />}
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim() ? "No movies found" : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;

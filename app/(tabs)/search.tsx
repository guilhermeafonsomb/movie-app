import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/hooks/useFeatch";
import { fetchMovies } from "@/services/api";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, View } from "react-native";

const Search = () => {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

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
              <SearchBar placeholder="Search movies ..." />
            </View>

            {moviesLoading && (
              <ActivityIndicator
                className="my-3"
                size="large"
                color="#0000FF"
              />
            )}
          </>
        }
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard {...item} />}
      />
    </View>
  );
};

export default Search;

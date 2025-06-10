import { Account, Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        title: movie.title,
      });
    }
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.log("Error: ", error);
    throw undefined;
  }
};

export const signin = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    await account.createEmailPasswordSession(email, password);
    const user = await account.get();

    return { id: user.$id, name: user.name, email: user.email };
  } catch (error) {
    console.log("Error signing in:", error);
    throw error;
  }
};

export const getSession = async (): Promise<AccountSession | null> => {
  try {
    const session = await account.getSession("current");
    return session ? { id: session.$id, expire: session.expire } : null;
  } catch (error) {
    console.log("Error getting session:", error);
    throw error;
  }
};

export const getUser = async (): Promise<User> => {
  try {
    const user = await account.get();
    return {
      id: user.$id,
      name: user.name,
      email: user.email,
    };
  } catch (error) {
    console.log("Error getting user:", error);
    throw error;
  }
};

export const logout = async (sessionId: string): Promise<void> => {
  try {
    await account.deleteSession(sessionId);
  } catch (error) {
    console.log("Error logging out:", error);
    throw error;
  }
};

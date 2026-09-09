import { supabase } from "./supabase";


export async function getMovies(){

  const {data,error}=await supabase
  .from("movies")
  .select(`
    *,
    categories(
      name
    )
  `)
  .order(
    "created_at",
    {
      ascending:false
    }
  );


  if(error){
    throw error;
  }


  return data;

}

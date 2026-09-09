import { supabase } from './supabase';
import type { Category, Movie } from './types';

const movieSelect = `
  id,
  title,
  year,
  description,
  poster_url,
  video_url,
  trailer_url,
  subtitle_url,
  category_id,
  created_at,
  categories(id,name)
`;

export async function getMovies(): Promise<Movie[]> {
  const { data, error } = await supabase
    .from('movies')
    .select(movieSelect)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data ?? []) as unknown as Movie[];
}

export async function getMovie(id: string): Promise<Movie | null> {
  const { data, error } = await supabase
    .from('movies')
    .select(movieSelect)
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return data as unknown as Movie | null;
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('id,name')
    .order('name', { ascending: true });

  if (error) throw error;
  return (data ?? []) as Category[];
}

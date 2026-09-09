export type Category = {
  id: string;
  name: string;
};

export type Movie = {
  id: string;
  title: string;
  year: number | null;
  description: string | null;
  poster_url: string | null;
  video_url: string | null;
  trailer_url: string | null;
  subtitle_url: string | null;
  category_id: string | null;
  created_at: string | null;
  categories?: Category | null;
};

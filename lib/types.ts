export type Movie = {
  id: string;
  title: string;
  description: string;
  poster_url: string;
  trailer_url?: string;
  video_url?: string;
  year: number;
  category_id: string;
  subtitle_url?: string;
  created_at?: string;
};


export type Category = {
  id: string;
  name: string;
  created_at?: string;
};


export type UserRole = {
  id: string;
  email: string;
  role: "admin" | "user";
};

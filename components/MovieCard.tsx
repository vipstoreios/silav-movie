type MovieCardProps = {
  title: string;
  year: string;
  image: string;
};

export default function MovieCard({
  title,
  year,
  image,
}: MovieCardProps) {
  return (
    <div>
      <img
        src={image}
        alt={title}
      />

      <h2>{title}</h2>
      <p>{year}</p>
    </div>
  );
}

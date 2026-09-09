type Props = {
  title: string;
  year: string;
  image: string;
};


export default function MovieCard({
  title,
  year,
  image
}: Props) {


  return (

    <div className="
      bg-zinc-900
      rounded-xl
      overflow-hidden
    ">

      <img
        src={image}
        alt={title}
        className="
          w-full
          h-80
          object-cover
        "
      />


      <div className="p-4">

        <h2 className="text-xl font-bold">
          {title}
        </h2>


        <p className="text-gray-400">
          {year}
        </p>


        <span className="text-red-500">
          ژێرنوسی کوردی
        </span>

      </div>


    </div>

  );
}

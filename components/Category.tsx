const categories = [
  "هەموو",
  "دراما",
  "ئەکشن",
  "کۆمیدی",
  "ترسناک"
];


export default function Category() {

  return (

    <div className="
      container
      flex
      gap-4
      overflow-x-auto
    ">

      {categories.map((item)=>(

        <button
          key={item}
          className="
            bg-zinc-900
            px-6
            py-3
            rounded-full
            hover:bg-red-600
          "
        >

          {item}

        </button>

      ))}

    </div>

  );
}

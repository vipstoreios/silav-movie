const categories = [
  "هەموو",
  "دراما",
  "ئەکشن",
  "کۆمیدی",
  "ترسناک",
  "ئەنیمەیشن",
];


export default function Category() {
  return (
    <div className="container flex gap-4 overflow-x-auto py-4">

      {categories.map((item)=>(
        <button
          key={item}
          className="
          bg-zinc-900
          px-6
          py-2
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

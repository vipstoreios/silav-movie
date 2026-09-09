export default function AdminDashboard() {

  return (

    <main className="
      min-h-screen
      bg-black
      text-white
      p-10
    ">


      <h1 className="
        text-4xl
        font-bold
        mb-10
      ">
        Silav Movie Admin 🎬
      </h1>


      <div className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
      ">


        <div className="
          bg-zinc-900
          p-6
          rounded-xl
        ">
          <h2 className="text-xl">
            Movies
          </h2>

          <p className="text-3xl font-bold">
            0
          </p>
        </div>



        <div className="
          bg-zinc-900
          p-6
          rounded-xl
        ">
          <h2 className="text-xl">
            Categories
          </h2>

          <p className="text-3xl font-bold">
            0
          </p>
        </div>



        <div className="
          bg-zinc-900
          p-6
          rounded-xl
        ">
          <h2 className="text-xl">
            Users
          </h2>

          <p className="text-3xl font-bold">
            0
          </p>
        </div>


      </div>


    </main>

  );
}

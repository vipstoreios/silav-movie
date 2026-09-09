export default function AdminLogin(){

return(

<main className="
min-h-screen
flex
items-center
justify-center
bg-black
">


<div className="
bg-zinc-900
p-10
rounded-2xl
w-96
">


<h1 className="
text-3xl
font-bold
mb-8
">

Admin Login

</h1>



<input

placeholder="Email"

className="
w-full
bg-black
border
border-zinc-700
p-3
rounded-lg
mb-4
"

/>



<input

placeholder="Password"

type="password"

className="
w-full
bg-black
border
border-zinc-700
p-3
rounded-lg
mb-6
"

/>



<button

className="
w-full
bg-red-600
p-3
rounded-lg
">

Login

</button>


</div>


</main>

)

}

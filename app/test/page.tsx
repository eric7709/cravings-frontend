
"use client"

export default function page() {
  return (
    <div className='h-screen bg-blue-100 overflow-y-auto flex flex-col'>
      <div  onClick={() => alert("Red")}  className="h-20 bg-red-400"></div>
      <div className="flex-1 bg-blue-500 overflow-y-auto flex  p-4">
        <div className="h-1000 w-64 bg-amber-300 mx-auto font-bold text-3xl flex flex-col justify-between items-center">
          <p>TOP</p>
        </div>
      </div>
      <div onClick={() => alert("Purple")} className="h-20 bg-purple-400"></div>
    </div>
  )
}

"use client";


export default function ErrorScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/95 px-6 text-center">
      <h2 className="mb-4 text-3xl font-bold text-gray-800">
        Sorry this table is not currently Bookable 
      </h2>

      <p className="mb-8 max-w-md text-lg text-gray-600">
        Please check another table
      </p>

      <button
        onClick={() => window.history.back()}
        className="rounded-full bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-600 active:scale-95"
      >
      </button>
    </div>
  );
}

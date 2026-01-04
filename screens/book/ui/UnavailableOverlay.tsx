type UnavailableOverlayProps = {
  open: boolean;
};

export default function UnavailableOverlay({ open }: UnavailableOverlayProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-sm w-full p-6 text-center">
        {/* Icon */}
        <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-red-100 flex items-center justify-center">
          <span className="text-2xl">😔</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800">
          Sorry, this table isn’t available
        </h2>

        {/* Message */}
        <p className="text-gray-600 text-sm mt-2">
          Service for this table is currently unavailable.
          Please choose another table or try again shortly.
        </p>

        {/* Action */}
        <button
          onClick={() => window.history.back()}
          className="mt-6 w-full rounded-full bg-gray-800 text-white py-3 font-medium hover:bg-gray-900 transition"
        >
          Go back
        </button>
      </div>
    </div>
  );
}

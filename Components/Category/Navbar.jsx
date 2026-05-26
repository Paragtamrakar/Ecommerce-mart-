import { ShoppingCart, MapPin } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">

      <div className="px-4 pt-3 pb-2">

        {/* TOP ROW */}
        <div className="flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-3">

            {/* LOGO */}
            <div className="w-11 h-11 rounded-2xl bg-green-600 flex items-center justify-center shadow-md">

              <span className="text-white font-bold text-lg">
                OG
              </span>

            </div>

            {/* LOCATION */}
            <div>

              <p className="text-xs text-gray-500 font-medium">
                Delivering to
              </p>

              <div className="flex items-center gap-1">

                <MapPin size={14} className="text-green-600" />

                <p className="text-sm font-bold text-gray-900">
                  Bus Stand Beohari
                </p>

              </div>

            </div>

          </div>

          {/* CART BUTTON */}
          <button className="relative w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center bg-gray-50">

            <ShoppingCart size={20} className="text-gray-800" />

            {/* CART COUNT */}
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-white">

              0

            </span>

          </button>

        </div>

        {/* SEARCH BAR */}
        <div className="mt-4">

          <input
            type="text"
            placeholder="Search atta, milk, snacks..."
            className="w-full h-12 rounded-full border border-gray-200 bg-gray-50 px-5 text-sm outline-none focus:border-green-600"
          />

        </div>

      </div>

    </header>
  );
}
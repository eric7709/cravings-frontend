import { BusSeat } from "./BusSeat";

 
export default function SeatContainer() {
  return (
    <div className="mt-5 min-w-[400px] max-w-[450px] mx-asuto">
      <div className=" rounded-2xl pt-10 space-y-8 p-4 border-2 border-gray-300 shadow-md  bg-white">
        <div className="flex gap-4 items-center">
          <BusSeat status="driver" />
          <BusSeat status="occupied" className="ml-auto" seatNumber={1} />
        </div>
        <div className="flex gap-4 items-center">
          <BusSeat status="selected" seatNumber={2} />
          <BusSeat status="available" seatNumber={3} />
          <BusSeat status="occupied" className="ml-auto" seatNumber={4} />
        </div>
        <div className="flex gap-4 items-center">
          <BusSeat status="selected" seatNumber={5} />
          <BusSeat status="available" seatNumber={6} />
          <BusSeat status="occupied" className="ml-auto" seatNumber={7} />
        </div>
        <div className="flex gap-4 items-center">
          <BusSeat status="selected" seatNumber={8} />
          <BusSeat status="available" seatNumber={9} />
          <BusSeat status="occupied" className="ml-auto" seatNumber={10} />
        </div>
        <div className="flex gap-4 justify-between items-center">
          <BusSeat status="selected" seatNumber={11} />
          <BusSeat status="available" seatNumber={12} />
          <BusSeat status="available" seatNumber={13} />
          <BusSeat status="occupied"  seatNumber={14} />
        </div>
      </div>
    </div>
  )
}

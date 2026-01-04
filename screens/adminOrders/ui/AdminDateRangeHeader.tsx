'use client';

import { useOrderStore } from '@/models/orders/store';
import { getTodayISODate } from '@/shared/utils/getTodayISODate';
import { toLocalDateString } from '@/shared/utils/toLocalDateString';
import { CompactDatePicker } from './CompactDatePicker';
import { BsArrowRight } from 'react-icons/bs';

export default function AdminHeaderDateRange() {
  const { startDate, endDate, setStartDate, setEndDate } = useOrderStore();

  const handleStartChange = (d?: Date) => {
    if (!d) return;
    const newStart = toLocalDateString(d);

    // Convert endDate to Date for correct comparison
    const currentEnd = endDate ? new Date(endDate) : null;

    if (currentEnd && d > currentEnd) {
      // If start > end → sync both to newStart
      setStartDate(newStart);
      setEndDate(newStart);
    } else {
      setStartDate(newStart);
    }
  };

  const handleEndChange = (d?: Date) => {
    if (!d) return;
    const newEnd = toLocalDateString(d);

    const currentStart = startDate ? new Date(startDate) : null;

    if (currentStart && d < currentStart) {
      // If end < start → sync both to newEnd
      setStartDate(newEnd);
      setEndDate(newEnd);
    } else {
      setEndDate(newEnd);
    }
  };

  return (
    <div className="ml-auto justify-between xl:justify-start flex items-center gap-3">
      <CompactDatePicker
        value={startDate ?? getTodayISODate()}
        onChange={handleStartChange}
        className='left-0'
      />
      <BsArrowRight className="text-lg  text-gray-600" />
      <CompactDatePicker
        value={endDate ?? getTodayISODate()}
        className='right-0'
        onChange={handleEndChange}
      />
    </div>
  );
}

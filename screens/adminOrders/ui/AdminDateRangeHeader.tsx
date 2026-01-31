'use client'

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
    if (endDate && d > new Date(endDate)) setEndDate(newStart);
    setStartDate(newStart);
  };

  const handleEndChange = (d?: Date) => {
    if (!d) return;
    const newEnd = toLocalDateString(d);
    if (startDate && d < new Date(startDate)) setStartDate(newEnd);
    setEndDate(newEnd);
  };

  return (
    <div className="flex items-center gap-2 ml-auto xl:ml-0">
      <CompactDatePicker value={startDate ?? getTodayISODate()} onChange={handleStartChange} className="left-0" />
      <BsArrowRight className="text-gray-600 text-base" />
      <CompactDatePicker value={endDate ?? getTodayISODate()} onChange={handleEndChange} className="right-0" />
    </div>
  );
}

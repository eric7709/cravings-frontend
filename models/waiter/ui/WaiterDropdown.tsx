import { forwardRef } from 'react';
import Link from 'next/link';
import { useWaiterHeader } from '../hooks/useWaiterHeader';
import { useLogout } from '@/shared/hooks/useLogout';

type Props = {
  className?: string;
  opened: boolean;
};

const WaiterDropdown = forwardRef<HTMLDivElement, Props>(
  ({ className, opened }, ref) => {
    const { navDropDownLinks } = useWaiterHeader();
    const logout = useLogout()

    return (
      <div
        ref={ref}
        className={`
          w-56 absolute right-3 z-50
          bg-white rounded-2xl
          border border-gray-100
          shadow-xl shadow-gray-200/50
          backdrop-blur-sm
          overflow-hidden
          transition-all duration-200 ease-out
          ${opened
            ? "top-[110%] opacity-100 visible scale-100"
            : "top-full opacity-0 invisible scale-95 pointer-events-none"
          }
          ${className ?? ''}
        `}
      >
        <div className="py-2">
          {navDropDownLinks.map(({ type, href, label, icon: Icon }, index) => {
            const isLogout = type === 'button';

            if (type === 'link') {
              return (
                <Link
                  key={label}
                  href={href!}
                  className="
                    group flex items-center gap-3.5
                    px-4 py-3 mx-2 rounded-lg
                    text-sm font-medium text-gray-700
                    hover:bg-linear-to-r hover:from-blue-50 hover:to-indigo-50
                    hover:text-blue-700
                    transition-all duration-200
                    relative overflow-hidden
                  "
                >
                  <div className="relative z-10 flex items-center gap-3.5 w-full">
                    <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-blue-100 transition-colors duration-200">
                      <Icon className="h-4 w-4 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
                    </div>
                    <span className="flex-1">{label}</span>
                  </div>
                </Link>
              );
            }

            return (
              <div key={label} className="px-2">
                {index > 0 && (
                  <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent my-2" />
                )}
                <button
                  onClick={() => {
                    logout();
                  }} className="
                    group flex items-center gap-3.5
                    w-full px-4 py-3 rounded-lg
                    text-sm font-medium text-red-600
                    hover:bg-linear-to-r hover:from-red-50 hover:to-pink-50
                    hover:text-red-700
                    transition-all duration-200
                    relative overflow-hidden
                  "
                >
                  <div className="relative z-10 flex items-center gap-3.5 w-full">
                    <div className="p-1.5 rounded-lg bg-red-50 group-hover:bg-red-100 transition-colors duration-200">
                      <Icon className="h-4 w-4 text-red-600 group-hover:text-red-700 transition-colors duration-200" />
                    </div>
                    <span className="flex-1">{label}</span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

WaiterDropdown.displayName = 'WaiterDropdown';

export default WaiterDropdown;
'use client'

import { useAnalytics } from '@/models/analytics/hooks'
import { useAnalyticsStore } from '@/models/analytics/store'

export default function Base() {
    // 1. Initialize the hook to start the "Auto-fetch" on date change
    const { isLoading } = useAnalytics() 
    const { analytics } = useAnalyticsStore()

    console.log(analytics, "ANALYTICS")
    

    if (isLoading && !analytics) return <div className="p-8">Loading Intelligence...</div>
    if (!analytics) return <div className="p-8">No data found for this period.</div>

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            {/* --- 1. EXECUTIVE SUMMARY (Top Cards) --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
                    <h3 className="text-2xl font-bold text-green-600">${analytics.summary.totalRevenue.toLocaleString()}</h3>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 font-medium">Total Orders</p>
                    <h3 className="text-2xl font-bold text-blue-600">{analytics.summary.totalOrders}</h3>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 font-medium">Avg Order Value</p>
                    <h3 className="text-2xl font-bold text-purple-600">
                        ${(analytics.summary.totalRevenue / (analytics.summary.totalOrders || 1)).toFixed(2)}
                    </h3>
                </div>
            </div>

            {/* --- 2. SHIFT & TIME ANALYSIS --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h4 className="font-bold mb-4 text-gray-800 border-b pb-2">Shift Performance</h4>
                    <div className="space-y-4">
                        {analytics.shifts.map((shift) => (
                            <div key={shift.shiftName} className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-gray-700">{shift.shiftName}</p>
                                    <p className="text-xs text-gray-400">{shift.orders} orders</p>
                                </div>
                                <p className="font-bold text-gray-800">${shift.revenue.toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h4 className="font-bold mb-4 text-gray-800 border-b pb-2">Busiest Days</h4>
                    <div className="space-y-4">
                        {analytics.days.slice(0, 3).map((day) => (
                            <div key={day.dayIndex} className="flex justify-between items-center">
                                <p className="text-gray-700">{day.dayIndex}</p>
                                <div className="text-right">
                                    <p className="font-bold text-gray-800">${day.revenue.toLocaleString()}</p>
                                    <p className="text-xs text-gray-500">{day.orders} orders</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- 3. TOP WAITERS & ITEMS (The "Leaderboards") --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Top Waiters */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h4 className="font-bold mb-4 text-gray-800">Top Waiters</h4>
                    {analytics.waiters.map((waiter, i) => (
                        <div key={waiter.name} className="flex items-center gap-3 py-2 border-b last:border-0">
                            <span className="text-xs font-bold text-gray-400">#{i + 1}</span>
                            <div className="flex-1">
                                <p className="text-sm font-medium">{waiter.name}</p>
                            </div>
                            <p className="text-sm font-bold text-gray-700">${waiter.revenue}</p>
                        </div>
                    ))}
                </div>

                {/* Top Menu Items */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h4 className="font-bold mb-4 text-gray-800">Top Items (Quantity)</h4>
                    {analytics.menuItems.slice(0, 5).map((item) => (
                        <div key={item.name} className="flex justify-between py-2 border-b last:border-0 text-sm">
                            <span>{item.name}</span>
                            <span className="font-bold">{item.quantity} sold</span>
                        </div>
                    ))}
                </div>

                {/* Table Performance */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h4 className="font-bold mb-4 text-gray-800">Table Utilization</h4>
                    {analytics.tables.slice(0, 5).map((table) => (
                        <div key={table.tableName} className="flex justify-between py-2 border-b last:border-0 text-sm">
                            <span>{table.tableName}</span>
                            <span className="text-green-600 font-bold">${table.revenue}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
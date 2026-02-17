import { Download, TrendingUp, Wallet, Calendar, Plus } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { month: "Jan", Food: 1000000, Education: 600000, Health: 400000 },
  { month: "Feb", Food: 800000, Education: 500000, Health: 250000 },
  { month: "Mar", Food: 600000, Education: 350000, Health: 150000 },
  { month: "Apr", Food: 400000, Education: 300000, Health: 200000 },
  { month: "May", Food: 350000, Education: 250000, Health: 150000 },
  { month: "Jun", Food: 900000, Education: 550000, Health: 300000 },
  { month: "Jul", Food: 1050000, Education: 600000, Health: 350000 },
  { month: "Aug", Food: 550000, Education: 200000, Health: 100000 },
  { month: "Sep", Food: 600000, Education: 400000, Health: 200000 },
  { month: "Oct", Food: 850000, Education: 550000, Health: 380000 },
  { month: "Nov", Food: 880000, Education: 500000, Health: 300000 },
  { month: "Dec", Food: 1000000, Education: 600000, Health: 400000 },
];

const recentTransactions = [
  {
    id: "1",
    description: "Monthly specialized diet supplement",
    date: "2026-02-01",
    amount: -45000,
    icon: Wallet,
  },
  {
    id: "2",
    description: "School fees Term 1",
    date: "2026-02-01",
    amount: -120000,
    icon: Wallet,
  },
  {
    id: "3",
    description: "Initial clinical checkup & meds",
    date: "2026-02-01",
    amount: -15000,
    icon: Wallet,
  },
  {
    id: "4",
    description: "Kitchen supplies restock",
    date: "2026-02-01",
    amount: -250000,
    icon: Wallet,
  },
  {
    id: "5",
    description: "New school uniforms (2 sets)",
    date: "2026-02-01",
    amount: -35000,
    icon: Wallet,
  },
  {
    id: "6",
    description: "Vitamin fortified juice pack",
    date: "2026-02-01",
    amount: -12000,
    icon: Wallet,
  },
];

const formatYAxis = (value: number) => {
  if (value >= 1000000) return `${value / 1000000}M`;
  if (value >= 1000) return `${value / 1000}k`;
  return `${value}`;
};

export default function FinancialsView() {
  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-hidden">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start justify-between mb-5 gap-4 shrink-0">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              Financial Management
            </h1>
            <p className="text-sm text-gray-600">
              Track expenses, budgets, and school fees for all children.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">
              <Download className="w-4 h-4" />
              Export Report
            </button>
            <button className="flex items-center gap-2 bg-emerald-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-800 transition-colors whitespace-nowrap">
              <Plus className="w-4 h-4" />
              Record Expense
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5 shrink-0">
          {/* Total Budget */}
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5 text-gray-600" />
            </div>
            <p className="text-xs text-gray-500 mb-1">Total Budget Used (Feb)</p>
            <p className="text-xl font-bold text-gray-900 mb-1">1,245,000 RWF</p>
            <p className="text-xs text-gray-500">↑ 4.2% from last month</p>
          </div>

          {/* Pending School Fees */}
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
              <Wallet className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-xs text-gray-500 mb-1">Pending School Fees</p>
            <p className="text-xl font-bold text-gray-900 mb-1">850,000 RWF</p>
            <p className="text-xs text-amber-500">5 children outstanding</p>
          </div>

          {/* Insurance Renewals */}
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
              <Calendar className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-xs text-gray-500 mb-1">Insurance Renewals</p>
            <p className="text-xl font-bold text-gray-900 mb-1">Next: Mar 1st</p>
            <p className="text-xs text-gray-500">12 children (Mutuelle)</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-5 overflow-hidden min-h-0">

          {/* Bar Chart - Left 2/3 */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-5 flex flex-col overflow-hidden">
            <h2 className="text-base font-semibold text-gray-900 mb-4 shrink-0">
              Revenue vs Expenses
            </h2>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                  barSize={18}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#9ca3af" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                    tickFormatter={formatYAxis}
                  />
                  <Tooltip
                    formatter={(value: number) =>
                      `${value.toLocaleString()} RWF`
                    }
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      fontSize: "12px",
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: "12px", paddingTop: "16px" }}
                    iconType="circle"
                    iconSize={8}
                  />
                  <Bar dataKey="Food" stackId="a" fill="#064e3b" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="Education" stackId="a" fill="#60a5fa" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="Health" stackId="a" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Transactions - Right 1/3 */}
          <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col overflow-hidden">
            <h2 className="text-base font-semibold text-gray-900 mb-4 shrink-0">
              Recent Transactions
            </h2>

            {/* Transaction List */}
            <div className="flex-1 overflow-auto space-y-1 min-h-0">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                      <Wallet className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 leading-tight">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{transaction.date}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-800 ml-2 whitespace-nowrap">
                    {transaction.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <button className="mt-4 w-full py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors shrink-0">
              View All Transactions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
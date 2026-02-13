import Link from 'next/link';

export default function AccountsPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/" className="text-blue-600 hover:underline">← Back to Home</Link>
            <h1 className="text-3xl font-bold mt-4">Retirement Accounts</h1>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            + Add Account
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Your Nest Egg Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SummaryCard title="Total Balance" value="$600,000" />
            <SummaryCard title="Monthly Contribution" value="$2,000" />
            <SummaryCard title="Asset Allocation" value="70/25/5" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Account</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Type</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Balance</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Monthly</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Allocation</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4">401k</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">Pre-tax</span></td>
                <td className="px-6 py-4 font-medium">$500,000</td>
                <td className="px-6 py-4">$1,500</td>
                <td className="px-6 py-4">70/25/5</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:underline mr-3">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4">Roth IRA</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded">Post-tax</span></td>
                <td className="px-6 py-4 font-medium">$100,000</td>
                <td className="px-6 py-4">$500</td>
                <td className="px-6 py-4">80/15/5</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:underline mr-3">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex justify-center">
          <Link 
            href="/expenses"
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Next: Expenses →
          </Link>
        </div>
      </div>
    </main>
  );
}

function SummaryCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

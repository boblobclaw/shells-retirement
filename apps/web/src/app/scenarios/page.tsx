import Link from 'next/link';

export default function ScenariosPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/expenses" className="text-blue-600 hover:underline">← Back to Expenses</Link>
            <h1 className="text-3xl font-bold mt-4">Retirement Scenarios</h1>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            + New Scenario
          </button>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard label="Current Age" value="45" />
            <StatCard label="Retirement Age" value="65" />
            <StatCard label="Years to Retire" value="20" />
            <StatCard label="Success Rate" value="87%" highlight />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Scenario</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Retire At</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Annual Spending</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Success Rate</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <ScenarioRow
                name="Base Plan"
                retireAt="65"
                spending="$78,000"
                successRate={87}
                isDefault
              />
              <ScenarioRow
                name="Early Retirement"
                retireAt="60"
                spending="$65,000"
                successRate={62}
              />
              <ScenarioRow
                name="Lean FIRE"
                retireAt="55"
                spending="$50,000"
                successRate={45}
              />
            </tbody>
          </table>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">AI Lifestyle Preview</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700 italic">
              "With your projected retirement budget of $78,000 per year, you'll enjoy a comfortable 
              lifestyle with regular dining out, annual international travel, and plenty of room for 
              hobbies and entertainment. Your housing situation provides good value, leaving ample 
              discretionary funds for enjoying your retirement years..."
            </p>
            <div className="mt-4 flex gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Generate Full Description
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
                Compare Scenarios
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <Link 
            href="/expenses"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            ← Back to Expenses
          </Link>
          <Link 
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Home →
          </Link>
        </div>
      </div>
    </main>
  );
}

function StatCard({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="bg-white rounded-lg p-4">
      <p className="text-sm text-gray-600">{label}</p>
      <p className={`text-2xl font-bold ${highlight ? 'text-green-600' : ''}`}>{value}</p>
    </div>
  );
}

function ScenarioRow({ 
  name, 
  retireAt, 
  spending, 
  successRate, 
  isDefault = false 
}: { 
  name: string; 
  retireAt: string; 
  spending: string; 
  successRate: number;
  isDefault?: boolean;
}) {
  const successColor = successRate >= 80 ? 'text-green-600' : 
                       successRate >= 60 ? 'text-yellow-600' : 'text-red-600';
  
  return (
    <tr>
      <td className="px-6 py-4">
        <div className="flex items-center">
          {name}
          {isDefault && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">Default</span>
          )}
        </div>
      </td>
      <td className="px-6 py-4">{retireAt}</td>
      <td className="px-6 py-4">{spending}</td>
      <td className={`px-6 py-4 font-bold ${successColor}`}>{successRate}%</td>
      <td className="px-6 py-4">
        <button className="text-blue-600 hover:underline mr-3">View</button>
        <button className="text-blue-600 hover:underline mr-3">Edit</button>
        <button className="text-red-600 hover:underline">Delete</button>
      </td>
    </tr>
  );
}

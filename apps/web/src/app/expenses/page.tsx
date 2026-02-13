import Link from 'next/link';

export default function ExpensesPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/accounts" className="text-blue-600 hover:underline">← Back to Accounts</Link>
            <h1 className="text-3xl font-bold mt-4">Retirement Expenses</h1>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            + Add Expense
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ExpenseCategory 
            title="Essential Expenses" 
            total="$4,500"
            items={[
              { name: 'Housing', amount: '$2,000', type: 'essential' },
              { name: 'Healthcare', amount: '$800', type: 'essential' },
              { name: 'Food', amount: '$600', type: 'essential' },
              { name: 'Utilities', amount: '$400', type: 'essential' },
              { name: 'Insurance', amount: '$300', type: 'essential' },
              { name: 'Transportation', amount: '$400', type: 'essential' },
            ]}
          />
          
          <ExpenseCategory 
            title="Discretionary Expenses" 
            total="$2,000"
            items={[
              { name: 'Dining Out', amount: '$500', type: 'discretionary' },
              { name: 'Travel', amount: '$600', type: 'discretionary' },
              { name: 'Entertainment', amount: '$300', type: 'discretionary' },
              { name: 'Hobbies', amount: '$400', type: 'discretionary' },
              { name: 'Shopping', amount: '$200', type: 'discretionary' },
            ]}
          />
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-2">Monthly Budget Summary</h2>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <p className="text-sm text-gray-600">Essential</p>
              <p className="text-xl font-bold">$4,500</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Discretionary</p>
              <p className="text-xl font-bold">$2,000</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-xl font-bold text-blue-600">$6,500</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Link 
            href="/accounts"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            ← Back to Accounts
          </Link>
          <Link 
            href="/scenarios"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Next: Scenarios →
          </Link>
        </div>
      </div>
    </main>
  );
}

function ExpenseCategory({ 
  title, 
  total, 
  items 
}: { 
  title: string; 
  total: string; 
  items: { name: string; amount: string; type: string }[];
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className="text-xl font-bold">{total}</span>
      </div>
      
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.name} className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-700">{item.name}</span>
            <div className="flex items-center gap-3">
              <span className="font-medium">{item.amount}</span>
              <button className="text-blue-600 hover:underline text-sm">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

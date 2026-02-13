import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Shells Retirement Advisor
        </h1>
        
        <p className="text-center text-lg mb-8">
          AI-powered retirement planning application
        </p>

        <div className="flex gap-4 justify-center">
          <Link 
            href="/accounts"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            Manage Accounts
          </Link>
          <Link 
            href="/scenarios"
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            View Scenarios
          </Link>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        <FeatureCard
          title="Portfolio Projection"
          description="Monte Carlo simulation to visualize your retirement trajectory"
        />
        <FeatureCard
          title="Healthcare Costs"
          description="Estimate pre and post-Medicare healthcare expenses"
        />
        <FeatureCard
          title="AI Lifestyle"
          description="Get personalized lifestyle descriptions based on your savings"
        />
      </div>
    </main>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

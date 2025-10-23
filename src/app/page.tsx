export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Financial Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Simple financial data analysis and risk assessment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Portfolio Value</h3>
            <p className="text-3xl font-bold text-green-600">$1,250,000</p>
            <p className="text-sm text-gray-600">+12.5% from last month</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Risk Score</h3>
            <p className="text-3xl font-bold text-red-600">65.5</p>
            <p className="text-sm text-gray-600">High Risk Level</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Daily P&L</h3>
            <p className="text-3xl font-bold text-green-600">+$2,450</p>
            <p className="text-sm text-gray-600">+0.2% today</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Alerts</h3>
            <p className="text-3xl font-bold text-yellow-600">3</p>
            <p className="text-sm text-gray-600">Risk notifications</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">System Operational</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-500">Last updated: {new Date().toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
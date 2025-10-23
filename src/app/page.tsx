export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Financial Dashboard</h1>
          <p className="mt-2 text-gray-600">Real-time portfolio analysis and risk assessment</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Portfolio Value</p>
                <p className="text-2xl font-semibold text-gray-900">$1.25M</p>
                <p className="text-sm text-green-600">+12.5%</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Risk Score</p>
                <p className="text-2xl font-semibold text-gray-900">65.5</p>
                <p className="text-sm text-red-600">High Risk</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Daily P&L</p>
                <p className="text-2xl font-semibold text-gray-900">$2,450</p>
                <p className="text-sm text-green-600">+0.2%</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Alerts</p>
                <p className="text-2xl font-semibold text-gray-900">3</p>
                <p className="text-sm text-yellow-600">Risk Notifications</p>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Performance */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Portfolio Performance</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Performance chart will be displayed here</p>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Risk Assessment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">35%</p>
              <p className="text-sm text-gray-600">Market Risk</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">25%</p>
              <p className="text-sm text-gray-600">Credit Risk</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">20%</p>
              <p className="text-sm text-gray-600">Liquidity Risk</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">15%</p>
              <p className="text-sm text-gray-600">Operational Risk</p>
            </div>
          </div>
        </div>

        {/* Holdings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Holdings</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <div>
                <span className="font-medium">AAPL</span>
                <span className="text-gray-500 ml-2">Apple Inc.</span>
              </div>
              <div className="text-right">
                <div className="font-medium">$15,000</div>
                <div className="text-green-600 text-sm">+1.01%</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b">
              <div>
                <span className="font-medium">GOOGL</span>
                <span className="text-gray-500 ml-2">Alphabet Inc.</span>
              </div>
              <div className="text-right">
                <div className="font-medium">$140,000</div>
                <div className="text-red-600 text-sm">-0.14%</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center py-2">
              <div>
                <span className="font-medium">MSFT</span>
                <span className="text-gray-500 ml-2">Microsoft Corporation</span>
              </div>
              <div className="text-right">
                <div className="font-medium">$70,000</div>
                <div className="text-green-600 text-sm">+0.72%</div>
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            System Status: <span className="text-green-600 font-medium">Operational</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
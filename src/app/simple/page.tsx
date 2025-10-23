export default function SimplePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Financial Data Analysis & Risk Assessment System
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Advanced financial data analysis and risk assessment platform
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Portfolio Value</h3>
              <p className="text-2xl font-bold text-blue-600">$1,250,000</p>
              <p className="text-sm text-blue-700">+12.5%</p>
            </div>
            
            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-red-900 mb-2">Risk Score</h3>
              <p className="text-2xl font-bold text-red-600">65.5</p>
              <p className="text-sm text-red-700">High Risk</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">Daily P&L</h3>
              <p className="text-2xl font-bold text-green-600">+$2,450</p>
              <p className="text-sm text-green-700">+0.2%</p>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">Active Alerts</h3>
              <p className="text-2xl font-bold text-yellow-600">3</p>
              <p className="text-sm text-yellow-700">Risk Notifications</p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Holdings</h3>
            <div className="space-y-3">
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
    </div>
  );
}

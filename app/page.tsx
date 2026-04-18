export default function Home() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welkom bij de Uitzendkracht Planner!</h2>
      <p className="text-gray-600 mb-6">
        Gebruik deze applicatie om uitzendkrachten te beheren, hun beschikbaarheid in te voeren en diensten efficiënt in te plannen.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-blue-800 mb-2">Start met Uitzendkrachten</h3>
          <p className="text-blue-700">Voeg nieuwe uitzendkrachten toe en beheer hun profielen en rayons.</p>
          {/* Later: Link to /uitzendkrachten */}
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Bekijk Uitzendkrachten
          </button>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-green-800 mb-2">Plan Diensten</h3>
          <p className="text-green-700">Voer nieuwe diensten in en vind de best passende uitzendkrachten.</p>
          {/* Later: Link to /diensten */}
          <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Bekijk Diensten
          </button>
        </div>
      </div>
    </div>
  )
}

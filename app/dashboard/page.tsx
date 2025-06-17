"use client"

const DashboardPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-500 to-yellow-700 text-white bg-clip-text text-transparent">
        BBMI Student Dashboard
      </h1>
      <p className="text-gray-700 mb-4">
        Welcome to the Brushed by Betty Makeup Institute student dashboard. Here you can access your courses, track your
        progress, and connect with other students.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Example Course Card */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img src="https://via.placeholder.com/600x400" alt="Course Thumbnail" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Makeup Artistry Fundamentals</h2>
            <p className="text-gray-600">Learn the basics of makeup application.</p>
            <button className="mt-4 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
              View Course
            </button>
          </div>
        </div>

        {/* Example Progress Tracker */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Progress Tracker</h2>
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-yellow-200">
                <div
                  style={{ width: "75%" }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500"
                ></div>
              </div>
              <p className="text-gray-600">75% Complete</p>
            </div>
          </div>
        </div>

        {/* Example Community Section */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Community Forum</h2>
            <p className="text-gray-600">Connect with fellow students and instructors.</p>
            <button className="mt-4 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
              Visit Forum
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage

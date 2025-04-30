import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

// Mock data for analytics
const monthlyAdmissionData = [
  { month: 'Jan', admissions: 145, discharges: 124, emergency: 78 },
  { month: 'Feb', admissions: 132, discharges: 130, emergency: 62 },
  { month: 'Mar', admissions: 156, discharges: 142, emergency: 71 },
  { month: 'Apr', admissions: 168, discharges: 170, emergency: 85 },
  { month: 'May', admissions: 172, discharges: 165, emergency: 79 },
  { month: 'Jun', admissions: 180, discharges: 176, emergency: 92 },
  { month: 'Jul', admissions: 188, discharges: 182, emergency: 97 },
  { month: 'Aug', admissions: 195, discharges: 190, emergency: 103 },
  { month: 'Sep', admissions: 182, discharges: 184, emergency: 89 },
  { month: 'Oct', admissions: 176, discharges: 172, emergency: 83 },
  { month: 'Nov', admissions: 168, discharges: 164, emergency: 77 },
  { month: 'Dec', admissions: 151, discharges: 149, emergency: 70 },
];

const admissionsByDepartment = [
  { name: 'Cardiology', value: 845 },
  { name: 'Orthopedics', value: 756 },
  { name: 'Pediatrics', value: 612 },
  { name: 'Oncology', value: 589 },
  { name: 'Neurology', value: 478 },
  { name: 'Obstetrics', value: 387 },
];

const bedOccupancyData = [
  { day: 'Mon', occupancy: 78 },
  { day: 'Tue', occupancy: 85 },
  { day: 'Wed', occupancy: 92 },
  { day: 'Thu', occupancy: 87 },
  { day: 'Fri', occupancy: 83 },
  { day: 'Sat', occupancy: 76 },
  { day: 'Sun', occupancy: 69 },
];

const operationTrendData = [
  { month: 'Jan', planned: 48, emergency: 18 },
  { month: 'Feb', planned: 52, emergency: 15 },
  { month: 'Mar', planned: 59, emergency: 21 },
  { month: 'Apr', planned: 63, emergency: 19 },
  { month: 'May', planned: 67, emergency: 22 },
  { month: 'Jun', planned: 72, emergency: 24 },
  { month: 'Jul', planned: 78, emergency: 28 },
  { month: 'Aug', planned: 81, emergency: 25 },
  { month: 'Sep', planned: 75, emergency: 23 },
  { month: 'Oct', planned: 70, emergency: 20 },
  { month: 'Nov', planned: 65, emergency: 17 },
  { month: 'Dec', planned: 58, emergency: 15 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const performanceMetrics = [
  { metric: 'Average Length of Stay', value: '4.2 days', change: -0.3, unit: 'days' },
  { metric: 'Bed Occupancy Rate', value: '82.5%', change: 2.1, unit: '%' },
  { metric: 'Patient Satisfaction', value: '4.6/5', change: 0.2, unit: 'points' },
  { metric: 'Readmission Rate', value: '3.2%', change: -0.5, unit: '%' },
  { metric: 'Average ER Wait Time', value: '18 mins', change: -3, unit: 'mins' },
  { metric: 'Surgery Success Rate', value: '98.7%', change: 0.4, unit: '%' },
];

const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('month');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation Bar */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/organization/dashboard"
            className="mr-4 bg-blue-50 hover:bg-blue-100 p-2 rounded-full"
          >
            <span className="material-icons text-blue-700">arrow_back</span>
          </Link>
          <h1 className="text-2xl font-bold text-blue-800">Analytics Dashboard</h1>
        </div>
        <div className="flex space-x-2">
          <Link to="/organization/emergency" className="bg-blue-50 hover:bg-blue-100 p-2 rounded-full" title="Emergency Protocols">
            <span className="material-icons text-blue-700">emergency</span>
          </Link>
          <Link to="/organization/staffing" className="bg-blue-50 hover:bg-blue-100 p-2 rounded-full" title="Staff Roster">
            <span className="material-icons text-blue-700">badge</span>
          </Link>
          <Link to="/organization/wards" className="bg-blue-50 hover:bg-blue-100 p-2 rounded-full" title="Ward Management">
            <span className="material-icons text-blue-700">bed</span>
          </Link>
        </div>
      </div>

      {/* Filter section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-blue-800 mr-4">Hospital Analytics</h2>
            <span className="text-sm text-gray-500">Last updated: Today, 2:30 PM</span>
          </div>
          <div className="flex space-x-2 mt-2 sm:mt-0">
            <div className="flex items-center">
              <label className="text-sm font-medium text-gray-700 mr-2">Department:</label>
              <select
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="all">All Departments</option>
                <option value="cardiology">Cardiology</option>
                <option value="orthopedics">Orthopedics</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="oncology">Oncology</option>
                <option value="neurology">Neurology</option>
                <option value="obstetrics">Obstetrics</option>
              </select>
            </div>
            <div className="flex items-center">
              <label className="text-sm font-medium text-gray-700 mr-2">Time Range:</label>
              <div className="flex border border-gray-300 rounded-md overflow-hidden">
                <button
                  className={`px-3 py-1 text-sm font-medium ${timeRange === 'day' ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-700'}`}
                  onClick={() => setTimeRange('day')}
                >
                  Day
                </button>
                <button
                  className={`px-3 py-1 text-sm font-medium border-l border-gray-300 ${timeRange === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-700'}`}
                  onClick={() => setTimeRange('week')}
                >
                  Week
                </button>
                <button
                  className={`px-3 py-1 text-sm font-medium border-l border-gray-300 ${timeRange === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-700'}`}
                  onClick={() => setTimeRange('month')}
                >
                  Month
                </button>
                <button
                  className={`px-3 py-1 text-sm font-medium border-l border-gray-300 ${timeRange === 'year' ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-700'}`}
                  onClick={() => setTimeRange('year')}
                >
                  Year
                </button>
              </div>
            </div>
            <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm flex items-center">
              <span className="material-icons text-sm mr-1">download</span>
              Export
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {performanceMetrics.map((metric, index) => (
          <div key={index} className="bg-white p-5 rounded-lg shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">{metric.metric}</h3>
                <p className="text-2xl font-bold mt-1">{metric.value}</p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${metric.change >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <span className="material-icons text-xs mr-0.5">
                  {metric.change >= 0 ? 'arrow_upward' : 'arrow_downward'}
                </span>
                {Math.abs(metric.change)}{metric.unit}
              </div>
            </div>
            <div className="mt-2">
              <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${metric.change >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ width: `${metric.change >= 0 ? 65 + Math.min(metric.change * 10, 30) : 65 - Math.min(Math.abs(metric.change) * 10, 30)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Patient Admissions Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
            <span className="material-icons mr-2">trending_up</span>
            Patient Admissions & Discharges
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyAdmissionData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="admissions" stroke="#0088FE" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="discharges" stroke="#00C49F" />
                <Line type="monotone" dataKey="emergency" stroke="#FF8042" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Admissions Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
            <span className="material-icons mr-2">pie_chart</span>
            Admissions by Department
          </h3>
          <div className="h-80 flex flex-col md:flex-row items-center justify-around">
            <ResponsiveContainer width="60%" height="100%">
              <PieChart>
                <Pie
                  data={admissionsByDepartment}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {admissionsByDepartment.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="md:w-1/3">
              <ul className="space-y-2">
                {admissionsByDepartment.map((dept, index) => (
                  <li key={index} className="flex items-center">
                    <div
                      className="w-4 h-4 rounded-sm mr-2"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-sm">{dept.name}: <strong>{dept.value}</strong></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bed Occupancy and Operations Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
            <span className="material-icons mr-2">bed</span>
            Bed Occupancy Rate (%)
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={bedOccupancyData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Area type="monotone" dataKey="occupancy" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
            <span className="material-icons mr-2">medical_services</span>
            Operations Trend
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={operationTrendData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="planned" fill="#0088FE" name="Planned Surgeries" />
                <Bar dataKey="emergency" fill="#FF8042" name="Emergency Surgeries" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Additional Analysis Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
          <span className="material-icons mr-2">insights</span>
          Key Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border-l-4 border-blue-500 p-3 bg-blue-50 rounded-r-md">
            <h4 className="font-semibold mb-1">Patient Admissions</h4>
            <p className="text-sm text-gray-700">
              Admissions increased by 8.2% compared to last year with the highest growth in Cardiology.
            </p>
          </div>
          <div className="border-l-4 border-green-500 p-3 bg-green-50 rounded-r-md">
            <h4 className="font-semibold mb-1">Operational Efficiency</h4>
            <p className="text-sm text-gray-700">
              Average length of stay decreased by 0.3 days while maintaining high patient satisfaction.
            </p>
          </div>
          <div className="border-l-4 border-amber-500 p-3 bg-amber-50 rounded-r-md">
            <h4 className="font-semibold mb-1">Capacity Planning</h4>
            <p className="text-sm text-gray-700">
              Peak bed occupancy occurs on Wednesdays (92%). Consider staff adjustments for mid-week capacity.
            </p>
          </div>
        </div>
      </div>

      {/* Reports Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-blue-800 flex items-center">
            <span className="material-icons mr-2">description</span>
            Available Reports
          </h3>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm flex items-center">
            <span className="material-icons text-sm mr-1">add</span>
            New Report
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated On</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">Monthly Performance Report</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">All Departments</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Apr 28, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                  <button className="text-blue-600 hover:text-blue-800 mr-3">Download</button>
                  <button className="text-gray-600 hover:text-gray-800">Share</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">Quarterly Financial Analysis</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Finance</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Apr 15, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                  <button className="text-blue-600 hover:text-blue-800 mr-3">Download</button>
                  <button className="text-gray-600 hover:text-gray-800">Share</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">Emergency Department Metrics</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Emergency</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Apr 10, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                  <button className="text-blue-600 hover:text-blue-800 mr-3">Download</button>
                  <button className="text-gray-600 hover:text-gray-800">Share</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">Surgical Outcomes Review</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Surgery</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Apr 05, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                  <button className="text-blue-600 hover:text-blue-800 mr-3">Download</button>
                  <button className="text-gray-600 hover:text-gray-800">Share</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;

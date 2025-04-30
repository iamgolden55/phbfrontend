import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import ResearchDataAPI, { PatientDataPoint, PopulationData } from './ResearchDataAPI';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ResearchDataVisualization: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'population' | 'patient' | 'regional'>('population');
  const [patientData, setPatientData] = useState<PatientDataPoint[]>([]);
  const [populationData, setPopulationData] = useState<PopulationData[]>([]);
  const [selectedRegion, setSelectedRegion] = useState('');

  // Filters for patient data
  const [filters, setFilters] = useState({
    ageMin: 0,
    ageMax: 100,
    gender: '',
    region: '',
    riskFactors: [] as string[],
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const popData = await ResearchDataAPI.getPopulationData();
        setPopulationData(popData);

        if (popData.length > 0) {
          setSelectedRegion(popData[0].region);
        }

        const patData = await ResearchDataAPI.getPatientData();
        setPatientData(patData);
      } catch (error) {
        console.error('Error fetching research data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters to patient data
  const applyFilters = async () => {
    setLoading(true);
    try {
      const filteredData = await ResearchDataAPI.getFilteredPatientData({
        ageMin: filters.ageMin || undefined,
        ageMax: filters.ageMax || undefined,
        gender: filters.gender || undefined,
        region: filters.region || undefined,
        riskFactors: filters.riskFactors.length > 0 ? filters.riskFactors : undefined,
      });
      setPatientData(filteredData);
    } catch (error) {
      console.error('Error applying filters:', error);
    } finally {
      setLoading(false);
    }
  };

  // Prepare chart data for population age distribution
  const populationAgeChartData = {
    labels: populationData.map(data => data.region),
    datasets: [
      {
        label: '18-30',
        data: populationData.map(data =>
          data.ageGroups.find(group => group.category === '18-30')?.male || 0 +
          data.ageGroups.find(group => group.category === '18-30')?.female || 0 +
          data.ageGroups.find(group => group.category === '18-30')?.other || 0
        ),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: '31-45',
        data: populationData.map(data =>
          data.ageGroups.find(group => group.category === '31-45')?.male || 0 +
          data.ageGroups.find(group => group.category === '31-45')?.female || 0 +
          data.ageGroups.find(group => group.category === '31-45')?.other || 0
        ),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: '46-60',
        data: populationData.map(data =>
          data.ageGroups.find(group => group.category === '46-60')?.male || 0 +
          data.ageGroups.find(group => group.category === '46-60')?.female || 0 +
          data.ageGroups.find(group => group.category === '46-60')?.other || 0
        ),
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      },
      {
        label: '61-75',
        data: populationData.map(data =>
          data.ageGroups.find(group => group.category === '61-75')?.male || 0 +
          data.ageGroups.find(group => group.category === '61-75')?.female || 0 +
          data.ageGroups.find(group => group.category === '61-75')?.other || 0
        ),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: '76+',
        data: populationData.map(data =>
          data.ageGroups.find(group => group.category === '76+')?.male || 0 +
          data.ageGroups.find(group => group.category === '76+')?.female || 0 +
          data.ageGroups.find(group => group.category === '76+')?.other || 0
        ),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  // Prepare chart data for disease prevalence
  const diseasePrevalenceChartData = {
    labels: selectedRegion ?
      populationData.find(data => data.region === selectedRegion)?.diseasePrevalence.map(d => d.disease) || [] :
      [],
    datasets: [
      {
        label: 'Prevalence (%)',
        data: selectedRegion ?
          populationData.find(data => data.region === selectedRegion)?.diseasePrevalence.map(d => d.prevalence) || [] :
          [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(199, 199, 199, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Prepare patient data charts
  const patientAgeDistribution = {
    labels: ['18-30', '31-45', '46-60', '61-75', '76+'],
    datasets: [
      {
        label: 'Patients by Age Group',
        data: [
          patientData.filter(p => p.age >= 18 && p.age <= 30).length,
          patientData.filter(p => p.age >= 31 && p.age <= 45).length,
          patientData.filter(p => p.age >= 46 && p.age <= 60).length,
          patientData.filter(p => p.age >= 61 && p.age <= 75).length,
          patientData.filter(p => p.age >= 76).length,
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const patientBMIDistribution = {
    labels: ['Underweight (<18.5)', 'Normal (18.5-24.9)', 'Overweight (25-29.9)', 'Obese Class I (30-34.9)', 'Obese Class II (35-39.9)', 'Obese Class III (≥40)'],
    datasets: [
      {
        label: 'Patients by BMI Category',
        data: [
          patientData.filter(p => p.bmi < 18.5).length,
          patientData.filter(p => p.bmi >= 18.5 && p.bmi < 25).length,
          patientData.filter(p => p.bmi >= 25 && p.bmi < 30).length,
          patientData.filter(p => p.bmi >= 30 && p.bmi < 35).length,
          patientData.filter(p => p.bmi >= 35 && p.bmi < 40).length,
          patientData.filter(p => p.bmi >= 40).length,
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  };

  // Correlation data - BMI vs Blood Pressure
  const correlationData = {
    datasets: [
      {
        label: 'BMI vs Systolic BP',
        data: patientData.map(p => ({ x: p.bmi, y: p.bloodPressureSystolic })),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        pointRadius: 3,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Research Data Visualization</h2>
      <p className="text-gray-600 mb-6">
        Interactive visualization tools for health research data analysis. These visualizations provide insights into population health trends and patient characteristics.
      </p>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('population')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'population'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Population Health Data
          </button>
          <button
            onClick={() => setActiveTab('patient')}
            className={`ml-4 px-4 py-2 text-sm font-medium ${
              activeTab === 'patient'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Patient Analysis
          </button>
          <button
            onClick={() => setActiveTab('regional')}
            className={`ml-4 px-4 py-2 text-sm font-medium ${
              activeTab === 'regional'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Regional Comparisons
          </button>
        </nav>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="ml-2">Loading data...</p>
        </div>
      ) : (
        <>
          {/* Population Health Data Tab */}
          {activeTab === 'population' && (
            <div>
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-blue-700 mb-4">Population Age Distribution by Region</h3>
                <div className="h-80">
                  <Bar
                    data={populationAgeChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        title: {
                          display: true,
                          text: 'Population by Age Group and Region',
                        },
                        legend: {
                          position: 'top',
                        },
                      },
                      scales: {
                        x: {
                          stacked: true,
                        },
                        y: {
                          stacked: true,
                          title: {
                            display: true,
                            text: 'Population Count',
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-blue-700 mb-4">Disease Prevalence by Region</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Region
                  </label>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-md"
                  >
                    {populationData.map((data) => (
                      <option key={data.region} value={data.region}>
                        {data.region}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="h-80">
                  <Pie
                    data={diseasePrevalenceChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'right',
                        },
                        title: {
                          display: true,
                          text: `Disease Prevalence in ${selectedRegion} Region (%)`,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Patient Analysis Tab */}
          {activeTab === 'patient' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="col-span-1 bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-700 mb-4">Filter Patients</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Age Range
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={filters.ageMin}
                          onChange={(e) => setFilters({...filters, ageMin: parseInt(e.target.value) || 0})}
                          className="w-20 px-2 py-1 border border-gray-300 rounded-md"
                          min="0"
                          max="120"
                        />
                        <span>to</span>
                        <input
                          type="number"
                          value={filters.ageMax}
                          onChange={(e) => setFilters({...filters, ageMax: parseInt(e.target.value) || 0})}
                          className="w-20 px-2 py-1 border border-gray-300 rounded-md"
                          min="0"
                          max="120"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      <select
                        value={filters.gender}
                        onChange={(e) => setFilters({...filters, gender: e.target.value})}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md"
                      >
                        <option value="">All Genders</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Region
                      </label>
                      <select
                        value={filters.region}
                        onChange={(e) => setFilters({...filters, region: e.target.value})}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md"
                      >
                        <option value="">All Regions</option>
                        {populationData.map((data) => (
                          <option key={data.region} value={data.region}>
                            {data.region}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Risk Factors
                      </label>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <input
                            id="smoking"
                            type="checkbox"
                            checked={filters.riskFactors.includes('smoking')}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFilters({...filters, riskFactors: [...filters.riskFactors, 'smoking']});
                              } else {
                                setFilters({...filters, riskFactors: filters.riskFactors.filter(f => f !== 'smoking')});
                              }
                            }}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                          <label htmlFor="smoking" className="ml-2 text-sm text-gray-700">
                            Smoking
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="diabetes"
                            type="checkbox"
                            checked={filters.riskFactors.includes('diabetes')}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFilters({...filters, riskFactors: [...filters.riskFactors, 'diabetes']});
                              } else {
                                setFilters({...filters, riskFactors: filters.riskFactors.filter(f => f !== 'diabetes')});
                              }
                            }}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                          <label htmlFor="diabetes" className="ml-2 text-sm text-gray-700">
                            Diabetes
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="hypertension"
                            type="checkbox"
                            checked={filters.riskFactors.includes('hypertension')}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFilters({...filters, riskFactors: [...filters.riskFactors, 'hypertension']});
                              } else {
                                setFilters({...filters, riskFactors: filters.riskFactors.filter(f => f !== 'hypertension')});
                              }
                            }}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                          <label htmlFor="hypertension" className="ml-2 text-sm text-gray-700">
                            Hypertension
                          </label>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={applyFilters}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>

                <div className="col-span-2 md:col-span-2">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-blue-700 mb-4">Patient Summary</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Total Patients</p>
                        <p className="text-xl font-bold text-blue-700">{patientData.length}</p>
                      </div>

                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Average Age</p>
                        <p className="text-xl font-bold text-blue-700">
                          {patientData.length > 0
                            ? Math.round(patientData.reduce((sum, p) => sum + p.age, 0) / patientData.length)
                            : 'N/A'}
                        </p>
                      </div>

                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Average BMI</p>
                        <p className="text-xl font-bold text-blue-700">
                          {patientData.length > 0
                            ? (patientData.reduce((sum, p) => sum + p.bmi, 0) / patientData.length).toFixed(1)
                            : 'N/A'}
                        </p>
                      </div>

                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Diabetic</p>
                        <p className="text-xl font-bold text-blue-700">
                          {patientData.length > 0
                            ? `${((patientData.filter(p => p.diabetic).length / patientData.length) * 100).toFixed(1)}%`
                            : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="text-md font-semibold text-gray-700 mb-2">Age Distribution</h4>
                      <div className="h-60">
                        <Bar
                          data={patientAgeDistribution}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: {
                                display: false,
                              },
                            },
                          }}
                        />
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="text-md font-semibold text-gray-700 mb-2">BMI Distribution</h4>
                      <div className="h-60">
                        <Pie
                          data={patientBMIDistribution}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: {
                                position: 'right',
                                labels: {
                                  font: {
                                    size: 10
                                  }
                                }
                              },
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-blue-700 mb-4">BMI vs Blood Pressure Correlation</h3>
                <div className="h-80">
                  <Line
                    data={correlationData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false,
                        },
                        tooltip: {
                          callbacks: {
                            label: function(context) {
                              return `BMI: ${context.parsed.x}, Systolic BP: ${context.parsed.y}`;
                            }
                          }
                        }
                      },
                      scales: {
                        x: {
                          type: 'linear',
                          position: 'bottom',
                          title: {
                            display: true,
                            text: 'BMI',
                          },
                          min: 15,
                          max: 45,
                        },
                        y: {
                          title: {
                            display: true,
                            text: 'Systolic Blood Pressure (mmHg)',
                          },
                          min: 90,
                          max: 200,
                        },
                      },
                      elements: {
                        point: {
                          radius: 3,
                        },
                      },
                    }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Scatter plot showing the relationship between BMI and systolic blood pressure across the patient population.
                  Each point represents an individual patient. This visualization helps identify potential correlations
                  between these two health metrics.
                </p>
              </div>
            </div>
          )}

          {/* Regional Comparisons Tab */}
          {activeTab === 'regional' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-blue-700 mb-4">Risk Factor Comparison by Region</h3>
                <div className="h-80">
                  <Bar
                    data={{
                      labels: populationData.map(data => data.region),
                      datasets: populationData[0]?.riskFactors.map((factor, index) => ({
                        label: factor.factor,
                        data: populationData.map(region =>
                          region.riskFactors[index]?.percentage || 0
                        ),
                        backgroundColor: [
                          'rgba(255, 99, 132, 0.6)',
                          'rgba(54, 162, 235, 0.6)',
                          'rgba(255, 206, 86, 0.6)',
                          'rgba(75, 192, 192, 0.6)',
                          'rgba(153, 102, 255, 0.6)',
                        ][index % 5],
                      })) || [],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        title: {
                          display: true,
                          text: 'Risk Factor Prevalence by Region (%)',
                        },
                        legend: {
                          position: 'top',
                        },
                      },
                      scales: {
                        y: {
                          title: {
                            display: true,
                            text: 'Prevalence (%)',
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="mt-8 bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-700 mb-4">Regional Health Data Export</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Download health data reports for specific regions. These anonymized datasets can be used for
                  research, policy planning, and public health interventions.
                </p>
                <div className="flex flex-wrap gap-2">
                  {populationData.map(region => (
                    <button
                      key={region.region}
                      className="px-4 py-2 bg-white border border-blue-300 text-blue-700 rounded-md hover:bg-blue-50"
                      onClick={() => {
                        // Download functionality would be implemented here in a real app
                        alert(`Downloading data for ${region.region} region`);
                      }}
                    >
                      {region.region} Region Data
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <div className="mt-8 text-sm text-gray-500">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Data Usage Disclaimer</h3>
        <p>
          The research data presented here is simulated for demonstration purposes only. In a real implementation,
          this would be anonymized patient data collected with proper consent and approval from ethical committees.
          All research using PHB professional tools must comply with relevant data protection regulations, research
          ethics guidelines, and institutional policies.
        </p>
      </div>
    </div>
  );
};

export default ResearchDataVisualization;

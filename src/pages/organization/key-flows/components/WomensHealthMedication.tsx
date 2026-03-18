import React from 'react';
import { Pill, Plus, AlertCircle, Search, Filter } from 'lucide-react';

const WomensHealthMedication: React.FC = () => {
    return (
        <div className="flex h-full gap-6 animate-in fade-in duration-500 font-sans">
            <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">Medications</h1>
                        <p className="text-gray-500 flex items-center">
                            Manage electronic medication administration records (eMAR).
                        </p>
                    </div>
                    <button className="px-4 py-2 bg-pink-600 text-white font-bold rounded-lg hover:bg-pink-700 shadow-sm transition-colors flex items-center">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Medication
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 flex flex-col items-center justify-center text-center flex-1">
                    <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mb-4">
                        <Pill className="w-8 h-8 text-pink-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Medication Management</h3>
                    <p className="text-gray-500 max-w-md mt-2 mb-6">
                        This view will allow you to schedule medications, set dosages, and track administration records (eMAR) for each patient.
                    </p>
                    <div className="flex gap-4">
                        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                            View Documentation
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WomensHealthMedication;

import React from 'react';
import { FileText, Plus, ChevronRight, TrendingUp } from 'lucide-react';

const AssessmentTab = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">Assessments</h2>
                <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                    <Plus size={16} />
                    New Assessment
                </button>
            </div>

            {/* Assessment History */}
            <div className="grid grid-cols-1 gap-4">
                {[
                    { name: "PHQ-9 (Depression Screening)", score: "12/27", severity: "Moderate", date: "June 15, 2024", performedBy: "Dr. Smith" },
                    { name: "Katz Index of Independence in ADL", score: "6/6", severity: "Full Function", date: "May 20, 2024", performedBy: "Nurse Joy" },
                    { name: "Mini-Mental State Exam (MMSE)", score: "28/30", severity: "Normal Alert", date: "April 10, 2024", performedBy: "Dr. Adams" }
                ].map((assessment, i) => (
                    <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:border-indigo-100 transition-all cursor-pointer group">
                        <div className="flex justify-between items-start">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-base">{assessment.name}</h3>
                                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                                        <span>{assessment.date}</span>
                                        <span>•</span>
                                        <span>{assessment.performedBy}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-bold text-gray-900">{assessment.score}</div>
                                <div className={`text-xs font-medium px-2 py-0.5 rounded inline-block mt-1 ${assessment.severity === 'Moderate' ? 'bg-amber-100 text-amber-700' :
                                        assessment.severity.includes('Normal') || assessment.severity.includes('Full') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    {assessment.severity}
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                            <div className="text-xs text-gray-400 flex items-center gap-1">
                                <TrendingUp size={12} />
                                Previous score: <span className="text-gray-600">Stable</span>
                            </div>
                            <button className="text-xs font-semibold text-indigo-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                                View Details <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AssessmentTab;

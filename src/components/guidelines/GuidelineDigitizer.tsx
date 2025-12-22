import React, { useState, useEffect } from 'react';
import { Scan, CheckCircle, FileText, ArrowRight, Brain, ShieldCheck, Loader } from 'lucide-react';

interface GuidelineDigitizerProps {
    onComplete: () => void;
    fileName: string;
}

const GuidelineDigitizer: React.FC<GuidelineDigitizerProps> = ({ onComplete, fileName }) => {
    const [step, setStep] = useState(0);
    const [progress, setProgress] = useState(0);

    const steps = [
        {
            title: 'Phase 1: AI Translation',
            description: 'Vision Language Model scanning document structure...',
            icon: Scan,
            color: 'text-blue-500',
            bgColor: 'bg-blue-100',
        },
        {
            title: 'Phase 2: Safety Verification',
            description: 'Converting to rigid logic tree & verifying safety protocols...',
            icon: ShieldCheck,
            color: 'text-purple-500',
            bgColor: 'bg-purple-100',
        },
        {
            title: 'Phase 3: Interface Generation',
            description: 'Building interactive command center...',
            icon: Brain,
            color: 'text-green-500',
            bgColor: 'bg-green-100',
        },
    ];

    useEffect(() => {
        let timer: NodeJS.Timeout;

        // Simulate the scanning process
        if (step < 3) {
            if (progress < 100) {
                timer = setTimeout(() => {
                    setProgress(prev => Math.min(prev + (Math.random() * 10), 100));
                }, 200);
            } else {
                timer = setTimeout(() => {
                    setStep(prev => prev + 1);
                    setProgress(0);
                }, 500);
            }
        } else {
            timer = setTimeout(() => {
                onComplete();
            }, 1000);
        }

        return () => clearTimeout(timer);
    }, [step, progress, onComplete]);

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-2xl w-full mx-auto p-8">
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center p-4 bg-blue-50 rounded-full mb-4">
                    <Brain className="w-12 h-12 text-blue-600 animate-pulse" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Digitizing Guideline</h2>
                <p className="text-gray-500">Transforming "{fileName}" into an interactive protocol</p>
            </div>

            <div className="space-y-8 relative">
                {/* Connecting Line */}
                <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-100 -z-10"></div>

                {steps.map((s, index) => {
                    const isActive = step === index;
                    const isCompleted = step > index;
                    const Icon = s.icon;

                    return (
                        <div key={index} className={`flex items-start transition-all duration-500 ${isActive || isCompleted ? 'opacity-100' : 'opacity-40'}`}>
                            <div className={`
                flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-4 shadow-sm z-10 transition-colors duration-300
                ${isCompleted ? 'bg-green-500 text-white' : isActive ? 'bg-white border-2 border-blue-500' : 'bg-gray-100 text-gray-400'}
              `}>
                                {isCompleted ? (
                                    <CheckCircle className="w-6 h-6" />
                                ) : isActive ? (
                                    <Loader className="w-6 h-6 text-blue-600 animate-spin" />
                                ) : (
                                    <span className="text-sm font-bold">{index + 1}</span>
                                )}
                            </div>

                            <div className="flex-1 pt-1">
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className={`font-bold text-lg ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                                        {s.title}
                                    </h3>
                                    {isActive && (
                                        <span className="text-sm font-medium text-blue-600">
                                            {Math.round(progress)}%
                                        </span>
                                    )}
                                </div>
                                <p className="text-gray-500 text-sm mb-3">{s.description}</p>

                                {isActive && (
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className={`mt-10 transition-opacity duration-500 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex items-center justify-center text-green-600 font-bold text-lg">
                    <CheckCircle className="w-6 h-6 mr-2" />
                    Digitization Complete! Launching Navigator...
                </div>
            </div>
        </div>
    );
};

export default GuidelineDigitizer;

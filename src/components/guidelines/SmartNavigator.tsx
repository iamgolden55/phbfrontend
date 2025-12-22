import React, { useState } from 'react';
import {
    ArrowRight,
    ArrowLeft,
    RotateCcw,
    AlertTriangle,
    CheckCircle,
    HelpCircle,
    Mic,
    Activity,
    Phone,
    Clock,
    ChevronRight
} from 'lucide-react';

export interface NavigatorStep {
    id: string;
    question?: string;
    content?: string;
    type: 'question' | 'action' | 'result' | 'warning';
    options?: { label: string; nextId: string; variant?: 'primary' | 'danger' | 'default' }[];
    isEmergency?: boolean;
}

export interface NavigatorProps {
    guidelineTitle: string;
    steps: Record<string, NavigatorStep>;
    initialStepId: string;
    onExit: () => void;
}

const SmartNavigator: React.FC<NavigatorProps> = ({
    guidelineTitle,
    steps,
    initialStepId,
    onExit
}) => {
    const [history, setHistory] = useState<string[]>([]);
    const [currentStepId, setCurrentStepId] = useState(initialStepId);
    const [isListening, setIsListening] = useState(false);

    const currentStep = steps[currentStepId];

    const handleOptionClick = (nextId: string) => {
        setHistory([...history, currentStepId]);
        setCurrentStepId(nextId);
    };

    const handleBack = () => {
        if (history.length > 0) {
            const prevStepId = history[history.length - 1];
            setHistory(history.slice(0, -1));
            setCurrentStepId(prevStepId);
        }
    };

    const handleReset = () => {
        setHistory([]);
        setCurrentStepId(initialStepId);
    };

    const toggleVoice = () => {
        setIsListening(!isListening);
        // In a real app, this would start the Web Speech API
    };

    const progress = Math.min((history.length / 5) * 100, 100); // Rough estimation

    return (
        <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col overflow-hidden">
            {/* Top Bar - Emergency Style */}
            <div className="bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center shadow-md z-10">
                <div className="flex items-center space-x-3">
                    <button
                        onClick={onExit}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div>
                        <h1 className="text-white font-bold text-lg flex items-center">
                            <Activity className="w-5 h-5 text-red-500 mr-2 animate-pulse" />
                            {guidelineTitle}
                        </h1>
                        <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Smart Navigator Mode</p>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex items-center bg-gray-700 rounded-full px-3 py-1">
                        <Clock className="w-4 h-4 text-gray-300 mr-2" />
                        <span className="text-gray-200 text-sm font-mono">00:00:42</span>
                    </div>
                    <button
                        onClick={toggleVoice}
                        className={`p-3 rounded-full transition-all duration-300 ${isListening ? 'bg-red-600 text-white ring-4 ring-red-900' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                        title="Voice Commands"
                    >
                        <Mic className={`w-5 h-5 ${isListening ? 'animate-pulse' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">

                {/* Left Side: Context / History */}
                <div className="hidden md:flex flex-col w-1/3 bg-gray-800 border-r border-gray-700 p-6 overflow-y-auto">
                    <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-4">Decision Path</h3>
                    <div className="space-y-4">
                        {history.map((stepId, index) => {
                            const step = steps[stepId];
                            return (
                                <div key={index} className="flex items-start opacity-70">
                                    <div className="flex-shrink-0 mt-1 mr-3">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                    </div>
                                    <div>
                                        <p className="text-gray-300 text-sm font-medium">{step.content || step.question}</p>
                                        <span className="text-xs text-gray-500">Step {index + 1}</span>
                                    </div>
                                </div>
                            );
                        })}

                        <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-blue-500 ml-1.5 mr-4 animate-pulse"></div>
                            <p className="text-blue-400 text-sm font-medium">Current Step</p>
                        </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-gray-700">
                        <div className="bg-blue-900/30 border border-blue-800 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                                <HelpCircle className="w-4 h-4 text-blue-400 mr-2" />
                                <h4 className="text-blue-300 font-semibold text-sm">Quick Reference</h4>
                            </div>
                            <p className="text-blue-200/70 text-xs leading-relaxed">
                                Remember to verify patient ID before administering any medication. If unsure at any step, consult senior staff immediately.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Active Step */}
                <div className="flex-1 flex flex-col bg-gray-900 relative">
                    {/* Progress Bar */}
                    <div className="h-1 bg-gray-800 w-full">
                        <div
                            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 overflow-y-auto">
                        <div className="max-w-3xl w-full">

                            {/* Card Container */}
                            <div className={`
                bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 transform
                ${currentStep.isEmergency ? 'border-l-8 border-red-500' : 'border-l-8 border-blue-500'}
              `}>
                                <div className="p-8 md:p-10 text-center">

                                    {/* Icon Header */}
                                    <div className="flex justify-center mb-8">
                                        <div className={`
                      w-20 h-20 rounded-full flex items-center justify-center
                      ${currentStep.isEmergency ? 'bg-red-100 text-red-600' : 'bg-blue-50 text-blue-600'}
                      ${currentStep.type === 'action' ? 'bg-green-100 text-green-600' : ''}
                    `}>
                                            {currentStep.isEmergency ? (
                                                <AlertTriangle className="w-10 h-10 animate-bounce" />
                                            ) : currentStep.type === 'action' ? (
                                                <Activity className="w-10 h-10" />
                                            ) : (
                                                <HelpCircle className="w-10 h-10" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Main Question/Content */}
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                                        {currentStep.question || currentStep.content}
                                    </h2>

                                    {/* Options */}
                                    {currentStep.options ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                                            {currentStep.options.map((option, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleOptionClick(option.nextId)}
                                                    className={`
                            group relative p-6 rounded-xl border-2 text-left transition-all duration-200 hover:scale-105 active:scale-95
                            ${option.variant === 'primary'
                                                            ? 'bg-blue-600 border-blue-600 text-white shadow-lg hover:bg-blue-700'
                                                            : option.variant === 'danger'
                                                                ? 'bg-white border-red-200 text-red-700 hover:border-red-500 hover:bg-red-50'
                                                                : 'bg-white border-gray-200 text-gray-800 hover:border-blue-300 hover:bg-blue-50'
                                                        }
                          `}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xl font-bold">{option.label}</span>
                                                        <ArrowRight className={`w-6 h-6 transition-transform group-hover:translate-x-1 ${option.variant === 'primary' ? 'text-white' : 'text-gray-400'}`} />
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="mt-8">
                                            <button
                                                onClick={handleReset}
                                                className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
                                            >
                                                <RotateCcw className="w-5 h-5 mr-2" />
                                                Restart Protocol
                                            </button>
                                        </div>
                                    )}

                                </div>
                            </div>

                            {/* Emergency Override */}
                            <div className="mt-8 text-center">
                                <button
                                    type="button"
                                    className="inline-flex items-center text-sm text-gray-500 hover:text-white transition-colors border border-gray-700 px-4 py-2 rounded-full hover:bg-gray-800"
                                >
                                    <Phone className="w-4 h-4 mr-2" />
                                    Call Emergency Support
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SmartNavigator;

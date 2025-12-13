import React, { useState } from 'react';
import { MoreVertical, ChevronDown } from 'lucide-react';

export interface ActionTool {
    icon: React.ElementType;
    label: string;
    tooltip?: string;
    onClick: () => void;
    badge?: number | string;
}

export interface ActionButton {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    icon?: React.ElementType;
    disabled?: boolean;
}

interface OrganizationActionBarProps {
    tools?: ActionTool[];
    actions?: ActionButton[];
    message?: React.ReactNode;
    position?: 'top' | 'bottom';
    className?: string;
}

const OrganizationActionBar: React.FC<OrganizationActionBarProps> = ({
    tools = [],
    actions = [],
    message,
    position = 'top',
    className = '',
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const positionClasses = position === 'top'
        ? 'sticky top-0 z-30 border-b'
        : 'sticky bottom-0 z-30 border-t';

    const getVariantClasses = (variant: ActionButton['variant'] = 'primary') => {
        switch (variant) {
            case 'primary':
                return 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500';
            case 'secondary':
                return 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500';
            case 'danger':
                return 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
            case 'ghost':
                return 'bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-500';
            default:
                return 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500';
        }
    };

    return (
        <div className={`w-full transition-all duration-300 ${positionClasses} ${className}`}>
            {/* Main Container with Premium Glassmorphism */}
            <div className="relative overflow-hidden bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl ring-1 ring-black/5">

                {/* Subtle Gradient Overlay for Depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none"></div>

                {/* Geometric Background Patterns (Subtle) */}
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 px-6 py-4 flex items-center justify-between gap-6">

                    {/* Left: Tools */}
                    <div className="flex items-center gap-3">
                        {tools.map((tool, index) => (
                            <div key={index} className="relative group">
                                <button
                                    onClick={tool.onClick}
                                    className="p-2.5 rounded-xl text-gray-600 hover:text-blue-700 hover:bg-white/50 hover:shadow-sm transition-all duration-300 relative overflow-hidden group/btn border border-transparent hover:border-white/50"
                                    aria-label={tool.label}
                                >
                                    <tool.icon size={20} className="relative z-10 transform group-hover/btn:scale-110 transition-transform duration-300" />
                                    {tool.badge && (
                                        <span className="absolute top-2 right-2 flex h-2 w-2 z-20">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 shadow-sm"></span>
                                        </span>
                                    )}
                                </button>
                                {/* Tooltip */}
                                {tool.tooltip && (
                                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 px-3 py-1.5 bg-gray-900/80 backdrop-blur-md text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-white/10">
                                        {tool.tooltip}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Center: Message/Banner */}
                    <div className="flex-1 text-center hidden md:block">
                        {typeof message === 'string' ? (
                            <p className="text-sm font-medium text-gray-700 tracking-wide">{message}</p>
                        ) : (
                            <div className="inline-block animate-in fade-in slide-in-from-top-2 duration-500">
                                {message}
                            </div>
                        )}
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-4">
                        {/* Desktop Actions */}
                        <div className="hidden md:flex items-center gap-3">
                            {actions.map((action, index) => (
                                <button
                                    key={index}
                                    onClick={action.onClick}
                                    disabled={action.disabled}
                                    className={`
                    px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center gap-2 shadow-sm hover:shadow-lg active:scale-95 border
                    ${action.variant === 'primary'
                                            ? 'bg-gray-900 text-white border-transparent hover:bg-gray-800'
                                            : action.variant === 'secondary'
                                                ? 'bg-white/50 text-gray-800 border-white/60 hover:bg-white hover:border-white'
                                                : getVariantClasses(action.variant)
                                        }
                    ${action.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                                >
                                    {action.icon && <action.icon size={18} />}
                                    {action.label}
                                </button>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden relative">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2.5 rounded-xl text-gray-600 hover:bg-white/50 hover:text-gray-900 transition-colors border border-transparent hover:border-white/50"
                            >
                                <MoreVertical size={20} />
                            </button>

                            {/* Mobile Dropdown */}
                            {isMobileMenuOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    />
                                    <div className="absolute right-0 top-full mt-3 w-64 bg-white/80 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/40 z-50 py-2 animate-in fade-in zoom-in-95 duration-200 origin-top-right ring-1 ring-black/5">
                                        {/* Mobile Message if present */}
                                        {message && (
                                            <div className="px-4 py-3 border-b border-gray-200/50 mb-2">
                                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">System Info</p>
                                                <div className="text-sm text-gray-800">
                                                    {message}
                                                </div>
                                            </div>
                                        )}

                                        <div className="px-2 space-y-1">
                                            {actions.map((action, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => {
                                                        action.onClick();
                                                        setIsMobileMenuOpen(false);
                                                    }}
                                                    disabled={action.disabled}
                                                    className={`
                                w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center gap-3
                                ${action.variant === 'primary' ? 'bg-gray-900 text-white hover:bg-gray-800' : 'hover:bg-white/60 text-gray-700'}
                                ${action.variant === 'danger' ? 'text-red-600 hover:bg-red-50' : ''}
                                ${action.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                              `}
                                                >
                                                    {action.icon && <action.icon size={18} />}
                                                    {action.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrganizationActionBar;

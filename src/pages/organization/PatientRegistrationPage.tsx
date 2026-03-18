import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface FormData {
    firstName: string;
    lastName: string;
    dob: string;
    gender: string;
    phone: string;
    email: string;
    country: string;
    state: string;
    city: string;
    address: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    bloodGroup: string;
    genotype: string;
    allergies: string;
    existingConditions: string;
    nin: string;
}

interface RegistrationResponse {
    message: string;
    hpn: string;
    email: string;
    phone: string;
    verification_sent: boolean;
}

const PatientRegistrationPage: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});
    const [registeredPatient, setRegisteredPatient] = useState<RegistrationResponse | null>(null);

    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        dob: '',
        gender: 'male',
        phone: '',
        email: '',
        country: 'Nigeria',
        state: '',
        city: '',
        address: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        bloodGroup: '',
        genotype: '',
        allergies: '',
        existingConditions: '',
        nin: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear validation error for this field when user starts typing
        if (validationErrors[name]) {
            setValidationErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setValidationErrors({});

        try {
            // Prepare API payload
            const payload = {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                date_of_birth: formData.dob,
                gender: formData.gender.toLowerCase(),
                country: formData.country,
                state: formData.state,
                city: formData.city,
                address: formData.address,
                blood_group: formData.bloodGroup,
                genotype: formData.genotype,
                allergies: formData.allergies,
                existing_conditions: formData.existingConditions,
                emergency_contact_name: formData.emergencyContactName,
                emergency_contact_phone: formData.emergencyContactPhone,
                nin: formData.nin
            };

            // Make API call with cookie-based authentication
            const response = await fetch('http://localhost:8000/api/admissions/register_patient/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // Include cookies for authentication
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle validation errors (400)
                if (response.status === 400 && typeof data === 'object') {
                    setValidationErrors(data);
                    setError('Please fix the validation errors below.');
                }
                // Handle duplicate patient (409)
                else if (response.status === 409) {
                    setError(data.error || 'A patient with this information already exists.');
                    if (data.existing_hpn) {
                        setError(`${data.error}\nExisting HPN: ${data.existing_hpn}\n${data.suggestion || ''}`);
                    }
                }
                // Handle permission errors (403)
                else if (response.status === 403) {
                    setError('You do not have permission to register patients. Only hospital administrators can perform this action.');
                }
                // Handle other errors
                else {
                    setError(data.error || 'Failed to register patient. Please try again.');
                }
                return;
            }

            // Success!
            setRegisteredPatient(data);
            setSuccess(true);

            // Redirect to patients list after 3 seconds
            setTimeout(() => {
                navigate('/organization/patients');
            }, 3000);

        } catch (err) {
            console.error('Registration error:', err);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Show success message
    if (success && registeredPatient) {
        return (
            <div className="space-y-6 max-w-4xl mx-auto">
                <Helmet>
                    <title>Patient Registered Successfully | SmartHR</title>
                </Helmet>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    <div className="text-center space-y-6">
                        <div className="flex justify-center">
                            <div className="rounded-full bg-green-100 p-4">
                                <CheckCircle size={48} className="text-green-600" />
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Patient Registered Successfully!</h2>
                            <p className="text-gray-600">The patient account has been created and invitation sent.</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6 space-y-3 text-left max-w-md mx-auto">
                            <div className="grid grid-cols-2 gap-2">
                                <span className="text-sm font-medium text-gray-600">HPN:</span>
                                <span className="text-sm font-bold text-blue-600">{registeredPatient.hpn}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <span className="text-sm font-medium text-gray-600">Email:</span>
                                <span className="text-sm text-gray-800">{registeredPatient.email}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <span className="text-sm font-medium text-gray-600">Phone:</span>
                                <span className="text-sm text-gray-800">{registeredPatient.phone}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <span className="text-sm font-medium text-gray-600">Verification:</span>
                                <span className="text-sm text-green-600 flex items-center gap-1">
                                    <CheckCircle size={14} />
                                    Email Sent
                                </span>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                            <p className="font-medium mb-1">📧 What happens next?</p>
                            <ul className="text-left space-y-1 ml-4">
                                <li>• Patient receives account setup email</li>
                                <li>• Patient verifies email and sets password</li>
                                <li>• Patient can log in and access their records</li>
                            </ul>
                        </div>

                        <button
                            onClick={() => navigate('/organization/patients')}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Go to Patients List
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <Helmet>
                <title>New Patient Registration | SmartHR</title>
            </Helmet>

            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/organization/patients" className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">New Patient Registration</h1>
                        <p className="text-gray-500 text-sm">Enter patient details to create a new record.</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => navigate('/organization/patients')}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="registration-form"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader size={18} className="animate-spin" />
                                <span>Registering...</span>
                            </>
                        ) : (
                            <>
                                <Save size={18} />
                                <span>Register Patient</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Error Alert */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <h4 className="font-medium text-red-800 mb-1">Registration Failed</h4>
                        <p className="text-sm text-red-700 whitespace-pre-line">{error}</p>
                    </div>
                    <button
                        onClick={() => setError(null)}
                        className="text-red-600 hover:text-red-800"
                    >
                        ×
                    </button>
                </div>
            )}

            {/* Form */}
            <form id="registration-form" onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 space-y-8">

                    {/* Personal Information */}
                    <section>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    required
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${validationErrors.first_name ? 'border-red-500' : 'border-gray-300'}`}
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                {validationErrors.first_name && (
                                    <p className="text-sm text-red-600 mt-1">{validationErrors.first_name[0]}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    required
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${validationErrors.last_name ? 'border-red-500' : 'border-gray-300'}`}
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                {validationErrors.last_name && (
                                    <p className="text-sm text-red-600 mt-1">{validationErrors.last_name[0]}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                                <input
                                    type="date"
                                    name="dob"
                                    required
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${validationErrors.date_of_birth ? 'border-red-500' : 'border-gray-300'}`}
                                    value={formData.dob}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                {validationErrors.date_of_birth && (
                                    <p className="text-sm text-red-600 mt-1">{validationErrors.date_of_birth[0]}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                                <select
                                    name="gender"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    disabled={loading}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number *
                                    <span className="text-xs text-gray-500 ml-1">(with country code, e.g., +234...)</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    placeholder="+234..."
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${validationErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                    value={formData.phone}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                {validationErrors.phone && (
                                    <p className="text-sm text-red-600 mt-1">{validationErrors.phone[0]}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${validationErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                {validationErrors.email && (
                                    <p className="text-sm text-red-600 mt-1">{validationErrors.email[0]}</p>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Location Information */}
                    <section>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Location Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                                <select
                                    name="country"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={formData.country}
                                    onChange={handleChange}
                                    disabled={loading}
                                >
                                    <option value="Nigeria">Nigeria</option>
                                    <option value="Ghana">Ghana</option>
                                    <option value="Kenya">Kenya</option>
                                    <option value="South Africa">South Africa</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                                <input
                                    type="text"
                                    name="state"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={formData.state}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                                <input
                                    type="text"
                                    name="city"
                                    required
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${validationErrors.city ? 'border-red-500' : 'border-gray-300'}`}
                                    value={formData.city}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                {validationErrors.city && (
                                    <p className="text-sm text-red-600 mt-1">{validationErrors.city[0]}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    NIN
                                    <span className="text-xs text-gray-500 ml-1">(National Identification Number - Optional)</span>
                                </label>
                                <input
                                    type="text"
                                    name="nin"
                                    maxLength={11}
                                    placeholder="11 digits"
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${validationErrors.nin ? 'border-red-500' : 'border-gray-300'}`}
                                    value={formData.nin}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                {validationErrors.nin && (
                                    <p className="text-sm text-red-600 mt-1">{validationErrors.nin[0]}</p>
                                )}
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Residential Address</label>
                                <textarea
                                    name="address"
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={formData.address}
                                    onChange={handleChange}
                                    disabled={loading}
                                ></textarea>
                            </div>
                        </div>
                    </section>

                    {/* Medical Information */}
                    <section>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Medical Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                                <select
                                    name="bloodGroup"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={formData.bloodGroup}
                                    onChange={handleChange}
                                    disabled={loading}
                                >
                                    <option value="">Select...</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Genotype</label>
                                <select
                                    name="genotype"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={formData.genotype}
                                    onChange={handleChange}
                                    disabled={loading}
                                >
                                    <option value="">Select...</option>
                                    <option value="AA">AA</option>
                                    <option value="AS">AS</option>
                                    <option value="SS">SS</option>
                                    <option value="AC">AC</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Allergies</label>
                                <textarea
                                    name="allergies"
                                    rows={2}
                                    placeholder="List any known allergies..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={formData.allergies}
                                    onChange={handleChange}
                                    disabled={loading}
                                ></textarea>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Existing Medical Conditions</label>
                                <textarea
                                    name="existingConditions"
                                    rows={2}
                                    placeholder="List any chronic conditions..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={formData.existingConditions}
                                    onChange={handleChange}
                                    disabled={loading}
                                ></textarea>
                            </div>
                        </div>
                    </section>

                    {/* Emergency Contact */}
                    <section>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Emergency Contact</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name *</label>
                                <input
                                    type="text"
                                    name="emergencyContactName"
                                    required
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${validationErrors.emergency_contact_name ? 'border-red-500' : 'border-gray-300'}`}
                                    value={formData.emergencyContactName}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                {validationErrors.emergency_contact_name && (
                                    <p className="text-sm text-red-600 mt-1">{validationErrors.emergency_contact_name[0]}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone *</label>
                                <input
                                    type="tel"
                                    name="emergencyContactPhone"
                                    required
                                    placeholder="+234..."
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${validationErrors.emergency_contact_phone ? 'border-red-500' : 'border-gray-300'}`}
                                    value={formData.emergencyContactPhone}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                {validationErrors.emergency_contact_phone && (
                                    <p className="text-sm text-red-600 mt-1">{validationErrors.emergency_contact_phone[0]}</p>
                                )}
                            </div>
                        </div>
                    </section>

                </div>
            </form>
        </div>
    );
};

export default PatientRegistrationPage;

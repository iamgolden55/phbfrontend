import React, { useState } from 'react';
import './captchaStyles.css';

const CaptchaTestPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaRequired, setCaptchaRequired] = useState(false);
  const [captchaChallenge, setCaptchaChallenge] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [apiEndpoint, setApiEndpoint] = useState<string>('/api/token/');

  // Log the response to console
  const logResponse = (response: any) => {
    console.log('API Response:', response);
    setApiResponse(JSON.stringify(response, null, 2));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);
    setApiResponse(null);

    try {
      // Prepare login payload
      const loginPayload: any = { username: email, password };
      
      // Add CAPTCHA data if required
      if (captchaRequired && captchaToken && captchaAnswer) {
        loginPayload.captcha_token = captchaToken;
        loginPayload.captcha_answer = captchaAnswer;
      }
      
      // Log the request body for debugging
      console.log('Request payload:', loginPayload);
      
      // Direct fetch call to see exact response
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginPayload),
      });
      
      // Log raw response for debugging
      console.log('Response status:', response.status);
      console.log('Response status text:', response.statusText);
      
      // Check if we got a response at all
      setApiResponse(`Status: ${response.status} ${response.statusText}\n\nHeaders:\n${JSON.stringify(Object.fromEntries([...response.headers]), null, 2)}`);
      
      let data: any;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        try {
          // Clone the response before parsing to avoid "body already read" errors
          const responseClone = response.clone();
          const rawText = await responseClone.text();
          console.log('Raw response text:', rawText);
          
          // Now try to parse as JSON
          data = await response.json();
          logResponse(data);
          setApiResponse((prev: string | null) => `${prev || ''}\n\nJSON Body:\n${JSON.stringify(data, null, 2)}`);
        } catch (jsonError) {
          console.error('JSON parsing error:', jsonError);
          const rawText = await response.text();
          setApiResponse((prev: string | null) => `${prev || ''}\n\nResponse Text (not valid JSON):\n${rawText}`);
          throw new Error(`Failed to parse JSON response: ${jsonError}. Raw response: ${rawText.substring(0, 100)}...`);
        }
      } else {
        // Not a JSON response
        const rawText = await response.text();
        setApiResponse((prev: string | null) => `${prev || ''}\n\nResponse Text (not JSON):\n${rawText}`);
        if (!response.ok) {
          throw new Error(`Non-JSON error response: ${response.status} ${response.statusText}`);
        }
        return; // Exit early for non-JSON responses
      }
      
      // Handle different response scenarios
      if (!response.ok) {
        if (response.status === 403 && data?.captcha_required) {
          setCaptchaRequired(true);
          setCaptchaChallenge(data.captcha_challenge || '');
          setCaptchaToken(data.captcha_token || '');
          setError(data.detail || 'CAPTCHA verification required');
        } else if (response.status === 429) {
          setError('Too many login attempts. Please wait a moment before trying again.');
        } else {
          setError(data?.detail || `Error: ${response.status} ${response.statusText}`);
        }
      } else if (data?.access) {
        // Success case
        setSuccessMessage('Login successful!');
        setCaptchaRequired(false);
        setCaptchaChallenge('');
        setCaptchaToken('');
        setCaptchaAnswer('');
      } else {
        setError('Unexpected response format');
      }
    } catch (err: any) {
      console.error('Login attempt failed:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Force CAPTCHA mode for testing
  const forceCaptchaMode = () => {
    setCaptchaRequired(true);
    setCaptchaChallenge('What is 5 + 10?');
    setCaptchaToken('test-token-123');
    setError('CAPTCHA verification required due to multiple failed attempts.');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm max-w-md mx-auto my-10">
      <h2 className="text-2xl font-bold mb-6">CAPTCHA Test Page</h2>
      
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-medium">Test Login Form</h3>
        <button 
          type="button"
          onClick={forceCaptchaMode}
          className="px-3 py-1 bg-gray-200 rounded text-sm"
        >
          Force CAPTCHA Mode
        </button>
      </div>

      <div className="mb-6">
        <label htmlFor="api-endpoint" className="block font-medium mb-1">
          API Endpoint
        </label>
        <div className="flex space-x-2">
          <select 
            id="api-endpoint"
            className="flex-grow px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#005eb8]"
            value={apiEndpoint}
            onChange={(e) => setApiEndpoint(e.target.value)}
          >
            <option value="/api/token/">Default: /api/token/</option>
            <option value="/api/login/">/api/login/</option>
            <option value="/api/auth/token/">/api/auth/token/</option>
            <option value="/api/user/login/">/api/user/login/</option>
          </select>
          <button 
            type="button"
            onClick={() => setApiEndpoint(prompt('Enter custom API endpoint', apiEndpoint) || apiEndpoint)}
            className="px-3 py-1 bg-gray-200 rounded text-sm"
          >
            Custom
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">Try different endpoints if the default one isn't working</p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-green-700">{successMessage}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">
            Email/Username
          </label>
          <input
            type="text"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#005eb8]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#005eb8]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        
        {/* CAPTCHA challenge section */}
        {captchaRequired && (
          <div className="captcha-container mb-6">
            <div className="captcha-challenge">
              <h4 className="text-lg font-medium mb-2">Security Check</h4>
              <p className="text-gray-800 text-lg font-medium">{captchaChallenge}</p>
            </div>
            <div className="mt-3">
              <label htmlFor="captcha-answer" className="block font-medium mb-1">
                Answer
              </label>
              <input
                type="text"
                id="captcha-answer"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#005eb8]"
                value={captchaAnswer}
                onChange={(e) => setCaptchaAnswer(e.target.value)}
                placeholder="Enter your answer"
                required={captchaRequired}
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#005eb8] text-white py-2 px-4 rounded hover:bg-[#003f7e] transition-colors"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : captchaRequired ? 'Verify & Sign in' : 'Sign in'}
        </button>
      </form>

      {apiResponse && (
        <div className="mt-6 p-4 bg-gray-100 rounded overflow-auto">
          <h4 className="font-medium mb-2">API Response:</h4>
          <pre className="text-xs">{apiResponse}</pre>
        </div>
      )}
    </div>
  );
};

export default CaptchaTestPage;

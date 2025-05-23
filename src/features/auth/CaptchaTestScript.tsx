import React, { useState } from 'react';
import './captchaStyles.css';

const CaptchaTestScript: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [username, setUsername] = useState('testuser');
  const [wrongPassword, setWrongPassword] = useState('wrongpassword');
  const [apiUrl, setApiUrl] = useState('http://localhost:8000/api/token/');
  const [captchaData, setCaptchaData] = useState<any>(null);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, message]);
    console.log(message);
  };

  // Function to attempt login
  const attemptLogin = async (
    username: string, 
    password: string, 
    captchaData: { token: string; answer: string } | null = null
  ) => {
    // Use 'email' field instead of 'username' as the backend expects
    const payload: any = { email: username, password };
    
    // Add CAPTCHA data if provided
    if (captchaData) {
      payload.captcha_token = captchaData.token;
      payload.captcha_answer = captchaData.answer;
    }
    
    addLog(`📤 Sending: ${JSON.stringify(payload)}`);
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      const status = response.status;
      let data;
      
      try {
        const text = await response.text();
        addLog(`📥 Raw response: ${text}`);
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        addLog(`❌ JSON Parse Error: ${e instanceof Error ? e.message : String(e)}`);
        return { status, data: null, error: e };
      }
      
      addLog(`🔢 Status: ${status}`);
      addLog(`📄 Data: ${JSON.stringify(data, null, 2)}`);
      
      return { status, data, error: null };
    } catch (e) {
      addLog(`❌ Fetch Error: ${e instanceof Error ? e.message : String(e)}`);
      return { status: 0, data: null, error: e };
    }
  };

  const runTests = async () => {
    setLogs([]);
    setIsRunning(true);
    setCaptchaData(null);
    
    try {
      // Test 1: First failed attempt
      addLog('\n🔄 Test 1: First failed attempt');
      await attemptLogin(username, wrongPassword);
      
      // Small delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Test 2: Second failed attempt
      addLog('\n🔄 Test 2: Second failed attempt');
      await attemptLogin(username, wrongPassword);
      
      // Small delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Test 3: Third failed attempt (should trigger CAPTCHA)
      addLog('\n🔄 Test 3: Third failed attempt (should trigger CAPTCHA)');
      const result = await attemptLogin(username, wrongPassword);
      
      // Test 4: If CAPTCHA was triggered, attempt with CAPTCHA
      if (result.data && result.data.captcha_required) {
        addLog('\n🧩 CAPTCHA detected!');
        addLog(`Challenge: ${result.data.captcha_challenge}`);
        
        // Extract the math problem and solve it
        const challenge = result.data.captcha_challenge;
        const match = challenge.match(/What is (\d+) ([+\-*]) (\d+)\?/);
        
        if (match) {
          const num1 = parseInt(match[1]);
          const operator = match[2];
          const num2 = parseInt(match[3]);
          
          let answer;
          if (operator === '+') answer = num1 + num2;
          else if (operator === '-') answer = num1 - num2;
          else if (operator === '*') answer = num1 * num2;
          
          addLog(`Calculated answer: ${answer}`);
          
          // Save the CAPTCHA data for manual testing
          setCaptchaData({
            challenge: result.data.captcha_challenge,
            token: result.data.captcha_token,
            calculatedAnswer: answer
          });
          
          // Test with solved CAPTCHA
          addLog('\n🔄 Test 4: Attempt with solved CAPTCHA');
          await attemptLogin(username, wrongPassword, {
            token: result.data.captcha_token,
            answer: String(answer)
          });
        }
      } else {
        addLog('\n❌ CAPTCHA was not triggered as expected');
      }
    } catch (error) {
      addLog(`Test run error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsRunning(false);
    }
  };

  const testWithCaptcha = async () => {
    if (!captchaData) {
      addLog('No CAPTCHA data available. Run the full test sequence first.');
      return;
    }
    
    setIsRunning(true);
    addLog('\n🔄 Manual CAPTCHA test');
    
    try {
      await attemptLogin(username, wrongPassword, {
        token: captchaData.token,
        answer: String(captchaData.calculatedAnswer)
      });
    } catch (error) {
      addLog(`Test error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm max-w-4xl mx-auto my-10">
      <h2 className="text-2xl font-bold mb-6">CAPTCHA Test Script</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="mb-4">
            <label htmlFor="apiUrl" className="block font-medium mb-1">API URL</label>
            <input
              type="text"
              id="apiUrl"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              disabled={isRunning}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="username" className="block font-medium mb-1">Test Username</label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isRunning}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="wrongPassword" className="block font-medium mb-1">Wrong Password</label>
            <input
              type="text"
              id="wrongPassword"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              value={wrongPassword}
              onChange={(e) => setWrongPassword(e.target.value)}
              disabled={isRunning}
            />
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={runTests}
              disabled={isRunning}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 flex-grow"
            >
              {isRunning ? 'Running Tests...' : 'Run Full Test Sequence'}
            </button>
            
            <button
              onClick={testWithCaptcha}
              disabled={isRunning || !captchaData}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400 flex-grow"
            >
              Test CAPTCHA Only
            </button>
          </div>
        </div>
        
        <div>
          {captchaData && (
            <div className="captcha-container mb-4">
              <div className="captcha-challenge">
                <h4 className="text-lg font-medium mb-2">CAPTCHA Challenge</h4>
                <p className="text-gray-800 text-lg font-medium">{captchaData.challenge}</p>
              </div>
              <div className="mt-3">
                <p className="mb-1"><strong>Token:</strong> {captchaData.token.substring(0, 15)}...</p>
                <p className="mb-1"><strong>Calculated Answer:</strong> {captchaData.calculatedAnswer}</p>
              </div>
            </div>
          )}
          
          <div className="mt-4">
            <h4 className="font-medium text-lg mb-2">Important Notes</h4>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li>CAPTCHA challenge appears after 3 failed attempts</li>
              <li>Responses with 403 status indicate CAPTCHA is required</li>
              <li>The test solves math problems automatically</li>
              <li>Check browser console for additional debug info</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Test Logs</h3>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-md h-96 overflow-y-auto font-mono text-sm whitespace-pre-wrap">
          {logs.length > 0 ? logs.map((log, i) => <div key={i}>{log}</div>) : 'Logs will appear here...'}
        </div>
      </div>
    </div>
  );
};

export default CaptchaTestScript;

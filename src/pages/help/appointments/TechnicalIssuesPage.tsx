import React from 'react';
import { Link } from 'react-router-dom';

const TechnicalIssuesPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <Link to="/help" className="ml-1 text-gray-700 hover:text-blue-600 md:ml-2">
                  Help
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <Link to="/help/appointments" className="ml-1 text-gray-700 hover:text-blue-600 md:ml-2">
                  Appointments
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="ml-1 text-gray-500 md:ml-2">Technical issues</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">Troubleshooting video appointment issues</h1>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-800">
              Having technical difficulties with your video appointment? This guide will help you resolve common issues quickly.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">System requirements</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Supported browsers
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Google Chrome (version 90+)
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Mozilla Firefox (version 88+)
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Safari (version 14+)
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Microsoft Edge (version 90+)
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
                Minimum requirements
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Internet speed: 2 Mbps download/upload
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Webcam (built-in or external)
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Microphone and speakers/headphones
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Updated browser (within last 6 months)
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-800">
                  Test your system before your appointment using our connection test tool in your account settings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Camera Issues */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="bg-red-500 px-6 py-3">
            <h2 className="text-xl font-bold text-white flex items-center">
              <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Camera not working
            </h2>
          </div>
          <div className="p-6">
            <h3 className="font-semibold mb-3">Solutions to try:</h3>
            <ol className="space-y-4">
              <li className="flex">
                <span className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold mr-3">1</span>
                <div>
                  <h4 className="font-medium">Check browser permissions</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Click the camera icon in your browser's address bar and allow access. You may need to refresh the page after granting permission.
                  </p>
                </div>
              </li>
              <li className="flex">
                <span className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold mr-3">2</span>
                <div>
                  <h4 className="font-medium">Check if camera is in use elsewhere</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Close any other applications that might be using your camera (Zoom, Skype, Teams, etc.).
                  </p>
                </div>
              </li>
              <li className="flex">
                <span className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold mr-3">3</span>
                <div>
                  <h4 className="font-medium">Check system settings</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Windows:</strong> Settings → Privacy → Camera → Allow apps to access camera<br />
                    <strong>Mac:</strong> System Preferences → Security & Privacy → Camera → Check browser
                  </p>
                </div>
              </li>
              <li className="flex">
                <span className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold mr-3">4</span>
                <div>
                  <h4 className="font-medium">Try a different browser</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    If your camera still doesn't work, switch to a different supported browser (Chrome is recommended).
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>

        {/* Microphone Issues */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="bg-orange-500 px-6 py-3">
            <h2 className="text-xl font-bold text-white flex items-center">
              <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              Audio/microphone issues
            </h2>
          </div>
          <div className="p-6">
            <h3 className="font-semibold mb-3">Solutions to try:</h3>
            <ol className="space-y-4">
              <li className="flex">
                <span className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold mr-3">1</span>
                <div>
                  <h4 className="font-medium">Check volume and mute settings</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Ensure your device volume is turned up and you're not muted in both the browser and system settings.
                  </p>
                </div>
              </li>
              <li className="flex">
                <span className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold mr-3">2</span>
                <div>
                  <h4 className="font-medium">Check microphone permissions</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Similar to camera, allow microphone access in your browser settings and system preferences.
                  </p>
                </div>
              </li>
              <li className="flex">
                <span className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold mr-3">3</span>
                <div>
                  <h4 className="font-medium">Select correct audio device</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    If using external headphones or microphone, ensure the correct device is selected in your browser settings.
                  </p>
                </div>
              </li>
              <li className="flex">
                <span className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold mr-3">4</span>
                <div>
                  <h4 className="font-medium">Test with another device</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Try unplugging and replugging headphones, or test with your device's built-in microphone and speakers.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>

        {/* Connection Issues */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="bg-blue-500 px-6 py-3">
            <h2 className="text-xl font-bold text-white flex items-center">
              <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
              Poor video quality or connection
            </h2>
          </div>
          <div className="p-6">
            <h3 className="font-semibold mb-3">Solutions to try:</h3>
            <ol className="space-y-4">
              <li className="flex">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-3">1</span>
                <div>
                  <h4 className="font-medium">Check your internet speed</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Run a speed test at speedtest.net. You need at least 2 Mbps for video calls. If too slow, try moving closer to your router.
                  </p>
                </div>
              </li>
              <li className="flex">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-3">2</span>
                <div>
                  <h4 className="font-medium">Close bandwidth-heavy applications</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Stop downloads, streaming services, and close unnecessary browser tabs and applications.
                  </p>
                </div>
              </li>
              <li className="flex">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-3">3</span>
                <div>
                  <h4 className="font-medium">Use wired connection if possible</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Connect your computer directly to your router with an ethernet cable for more stable connection.
                  </p>
                </div>
              </li>
              <li className="flex">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-3">4</span>
                <div>
                  <h4 className="font-medium">Turn off video if necessary</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    If connection remains poor, turn off your camera to save bandwidth. Audio-only is better than disconnecting.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>

        {/* Can't Join */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="bg-purple-500 px-6 py-3">
            <h2 className="text-xl font-bold text-white flex items-center">
              <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Can't join appointment
            </h2>
          </div>
          <div className="p-6">
            <h3 className="font-semibold mb-3">Solutions to try:</h3>
            <ol className="space-y-4">
              <li className="flex">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold mr-3">1</span>
                <div>
                  <h4 className="font-medium">Check appointment time</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    The join button usually appears 10 minutes before your appointment. Confirm you have the correct date and time.
                  </p>
                </div>
              </li>
              <li className="flex">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold mr-3">2</span>
                <div>
                  <h4 className="font-medium">Clear browser cache and cookies</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Clear your browsing data and try again. Sometimes cached data can prevent you from joining.
                  </p>
                </div>
              </li>
              <li className="flex">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold mr-3">3</span>
                <div>
                  <h4 className="font-medium">Try incognito/private mode</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Open an incognito/private browsing window and try joining from there.
                  </p>
                </div>
              </li>
              <li className="flex">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold mr-3">4</span>
                <div>
                  <h4 className="font-medium">Check your login status</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Ensure you're logged into your PHB account. Log out and log back in if necessary.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden mt-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Still having issues?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 border rounded-lg p-4">
              <h3 className="font-medium mb-2 flex items-center">
                <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Contact technical support
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Call our technical support line:
              </p>
              <p className="text-lg font-semibold text-blue-600">0800 123 4567</p>
              <p className="text-xs text-gray-500">Available 8am - 8pm, 7 days a week</p>
            </div>

            <div className="bg-gray-50 border rounded-lg p-4">
              <h3 className="font-medium mb-2 flex items-center">
                <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Switch to phone appointment
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                If you can't resolve the issue, your healthcare professional can call you instead.
              </p>
              <p className="text-sm text-gray-600">
                Contact them before your appointment time to arrange this.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border-l-4 border-green-500 p-4 mt-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800 mb-1">Prevention tip</h3>
            <p className="text-sm text-green-700">
              Test your setup 24 hours before your appointment using our system check tool. This gives you time to fix any issues before your appointment time.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Related help guides</h2>
        <ul className="space-y-2 text-blue-600">
          <li>
            <Link to="/help/appointments/how-to-book" className="inline-flex items-center hover:underline">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              How to book an appointment
            </Link>
          </li>
          <li>
            <Link to="/help/appointments/prepare" className="inline-flex items-center hover:underline">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              How to prepare for your appointment
            </Link>
          </li>
          <li>
            <Link to="/help/appointments/types" className="inline-flex items-center hover:underline">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Appointment types explained
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TechnicalIssuesPage;

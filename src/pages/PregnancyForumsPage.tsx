import React from 'react';
import { Link } from 'react-router-dom';
import PregnancyForums from '../features/pregnancy/PregnancyForums';

const PregnancyForumsPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <div className="flex items-center mb-2">
            <Link to="/pregnancy" className="text-white hover:underline mr-2">
              Pregnancy
            </Link>
            <span className="mx-2">›</span>
            <span>Community Forums</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">Pregnancy Community Forums</h1>
          <p className="text-xl">
            Connect with other parents-to-be, ask questions, and share your experiences
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">About Our Forums</h2>
          <p className="mb-4">
            Welcome to the PHB Pregnancy Community Forums, a place where you can connect with other expectant parents, share experiences, and get support throughout your pregnancy journey.
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Join discussions on different stages of pregnancy</li>
            <li>Ask questions and get advice from parents who've been there</li>
            <li>Share your experiences and support others</li>
            <li>Find information on specific pregnancy topics</li>
            <li>Connect with a community that understands what you're going through</li>
          </ul>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
            <p className="text-yellow-800">
              <span className="font-bold">Please Note:</span> While our community is a valuable resource for support and shared experiences, the information shared in these forums should not replace medical advice from your healthcare provider.
            </p>
          </div>
        </div>

        <PregnancyForums />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Forum Guidelines</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-[#0891b2] mr-2">•</span>
                <span>Be respectful and supportive of all community members</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0891b2] mr-2">•</span>
                <span>Avoid sharing personal medical information</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0891b2] mr-2">•</span>
                <span>Remember that medical advice should come from healthcare professionals</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0891b2] mr-2">•</span>
                <span>Keep discussions relevant to the topic of each forum category</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0891b2] mr-2">•</span>
                <span>Report any inappropriate content to our moderators</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Meet Our Moderators</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <img src="https://i.pravatar.cc/150?img=36" alt="Moderator" className="h-10 w-10 rounded-full mr-3" />
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-gray-600">Certified Midwife & Forum Moderator</p>
                </div>
              </div>
              <div className="flex items-center">
                <img src="https://i.pravatar.cc/150?img=29" alt="Moderator" className="h-10 w-10 rounded-full mr-3" />
                <div>
                  <p className="font-medium">Michelle Chen</p>
                  <p className="text-sm text-gray-600">Prenatal Nutritionist & Forum Moderator</p>
                </div>
              </div>
              <div className="flex items-center">
                <img src="https://i.pravatar.cc/150?img=15" alt="Moderator" className="h-10 w-10 rounded-full mr-3" />
                <div>
                  <p className="font-medium">David Williams</p>
                  <p className="text-sm text-gray-600">Parent Educator & Forum Moderator</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Other Pregnancy Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold mb-2">Pregnancy Calendar</h3>
              <p className="text-sm text-gray-600 mb-3">Track your baby's development week by week throughout your pregnancy.</p>
              <Link to="/pregnancy/calendar" className="text-[#0891b2] hover:underline text-sm">
                View calendar →
              </Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold mb-2">Birth Plan Creator</h3>
              <p className="text-sm text-gray-600 mb-3">Create a personalized birth plan to share with your healthcare team.</p>
              <Link to="/pregnancy/birth-plan-creator" className="text-[#0891b2] hover:underline text-sm">
                Create your plan →
              </Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold mb-2">Hospital Bag Checklist</h3>
              <p className="text-sm text-gray-600 mb-3">Make sure you're prepared for labor with our comprehensive hospital bag checklist.</p>
              <Link to="/pregnancy/hospital-bag-checklist" className="text-[#0891b2] hover:underline text-sm">
                View checklist →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PregnancyForumsPage;

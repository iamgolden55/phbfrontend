import React from 'react';
import { Link } from 'react-router-dom';

interface ResourceType {
  title: string;
  description: string;
  href: string;
  imageSrc?: string;
  tags?: string[];
}

const mentalHealthResources: ResourceType[] = [
  {
    title: 'Depression',
    description: 'Information on depression symptoms, causes and treatments, and how you can help yourself.',
    href: '/mental-health/depression',
    imageSrc: 'https://images.unsplash.com/photo-1594839688520-77c7898072a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250&q=80',
    tags: ['Common conditions', 'Mood disorders']
  },
  {
    title: 'Anxiety',
    description: 'Learn about anxiety disorders, including symptoms, causes, treatments and self-help options.',
    href: '/mental-health/anxiety',
    imageSrc: 'https://images.unsplash.com/photo-1604881988114-444286142299?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250&q=80',
    tags: ['Common conditions', 'Anxiety disorders']
  },
  {
    title: 'Stress',
    description: 'Tips and advice on managing stress, including what triggers it and how it affects your body.',
    href: '/mental-health/stress',
    imageSrc: 'https://images.unsplash.com/photo-1541199249251-f713e6145474?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250&q=80',
    tags: ['Common conditions', 'Self-help']
  },
  {
    title: 'Post-traumatic stress disorder (PTSD)',
    description: 'Find out about post-traumatic stress disorder (PTSD), including causes, symptoms and treatments.',
    href: '/mental-health/ptsd',
    imageSrc: 'https://images.unsplash.com/photo-1609588558629-3125a86de969?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250&q=80',
    tags: ['Trauma-related', 'Anxiety disorders']
  },
  {
    title: 'Self-harm',
    description: 'Information and support for those who self-harm, including how to get help and coping strategies.',
    href: '/mental-health/self-harm',
    imageSrc: 'https://images.unsplash.com/photo-1590004953392-5aba2e72269a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250&q=80',
    tags: ['Urgent support', 'Young people']
  },
  {
    title: 'Eating disorders',
    description: 'Information about eating disorders, including symptoms, causes, treatment and prevention.',
    href: '/mental-health/eating-disorders',
    imageSrc: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250&q=80',
    tags: ['Self-image', 'Young people']
  },
];

const MentalHealthPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Mental health</h1>
          <p className="text-xl font-medium">
            Information and advice about mental health problems, services and support
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        {/* Urgent help section */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
          <h2 className="text-xl font-bold mb-2 text-red-800">Urgent mental health help</h2>
          <p className="mb-4 text-red-700">
            If you or someone you know needs help for a mental health crisis or emergency, you should get help immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:112"
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-center font-bold"
            >
              Call 112 for immediate danger
            </a>
            <a
              href="tel:0800-12-13-14"
              className="bg-[#0891b2] text-white px-4 py-2 rounded-md hover:bg-[#0e7490] transition-colors text-center font-bold"
            >
              PHB Mental Health Helpline
            </a>
          </div>
        </div>

        {/* Cultural context section */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <h2 className="text-xl font-bold mb-2 text-blue-800">Understanding mental health in our communities</h2>
          <p className="mb-4 text-blue-700">
            Mental health is viewed differently across various cultures and communities in Africa. Traditional beliefs, religious practices, and cultural values all influence how mental health conditions are understood and addressed.
          </p>
          <p className="mb-4 text-blue-700">
            Mental health conditions are medical issues, not signs of personal weakness, spiritual punishment, or moral failing. With proper support, people with mental health conditions can lead full and productive lives.
          </p>
          <p className="text-blue-700">
            The Public Health Bureau encourages a balanced approach that respects cultural perspectives while promoting evidence-based care for mental health conditions.
          </p>
        </div>

        {/* Mental health resources */}
        <h2 className="text-2xl font-bold mb-6">Common mental health conditions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mentalHealthResources.map((resource, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
            >
              {resource.imageSrc && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={resource.imageSrc}
                    alt={resource.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-[#0891b2] mb-2">
                  <Link to={resource.href} className="hover:underline">
                    {resource.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">{resource.description}</p>

                {resource.tags && resource.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <Link
                  to={resource.href}
                  className="text-[#0891b2] font-medium hover:underline flex items-center mt-auto"
                >
                  Read more
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Support services */}
        <h2 className="text-2xl font-bold mb-6">Mental health services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-[#f0f4f5] p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">PHB counseling services</h3>
            <p className="mb-4">
              PHB provides access to counseling services through community health centers and mobile health units.
              These services offer support for common mental health problems like stress, anxiety, and depression.
            </p>
            <Link
              to="/services/counseling-services"
              className="phb-button inline-block"
            >
              Find PHB counseling services
            </Link>
          </div>

          <div className="bg-[#f0f4f5] p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Youth mental health programs</h3>
            <p className="mb-4">
              If you're a young person experiencing mental health problems, PHB offers specialized programs in schools and community centers designed specifically for youth.
            </p>
            <Link
              to="/services/youth-mental-health"
              className="phb-button inline-block"
            >
              Youth mental health programs
            </Link>
          </div>
        </div>

        {/* Traditional and faith-based support */}
        <h2 className="text-2xl font-bold mb-6">Community-based support</h2>
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm mb-8">
          <p className="mb-4">
            Many people find comfort and support through traditional healers, faith leaders, and community groups. These can complement medical treatments for mental health conditions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold mb-3">Faith-based support</h3>
              <p className="text-sm text-gray-600 mb-2">
                Religious organizations often provide counseling and community support that can help with mental well-being.
              </p>
              <Link to="/mental-health/faith-support" className="text-[#0891b2] text-sm hover:underline">
                Faith-based mental health support
              </Link>
            </div>

            <div>
              <h3 className="font-bold mb-3">Family support</h3>
              <p className="text-sm text-gray-600 mb-2">
                Family plays a central role in mental health support in many African communities. Learn how families can help.
              </p>
              <Link to="/mental-health/family-support" className="text-[#0891b2] text-sm hover:underline">
                Family support guide
              </Link>
            </div>

            <div>
              <h3 className="font-bold mb-3">Community groups</h3>
              <p className="text-sm text-gray-600 mb-2">
                Peer support groups bring together people with similar experiences to share coping strategies and provide mutual support.
              </p>
              <Link to="/mental-health/community-support" className="text-[#0891b2] text-sm hover:underline">
                Find local support groups
              </Link>
            </div>
          </div>
        </div>

        {/* Self-help and advice */}
        <h2 className="text-2xl font-bold mb-6">Self-help and wellbeing</h2>
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold mb-3">Improve mental wellbeing</h3>
              <p className="text-sm text-gray-600 mb-2">
                5 steps to mental wellbeing that can help you feel more positive and get the most out of life.
              </p>
              <Link to="/mental-health/wellbeing" className="text-[#0891b2] text-sm hover:underline">
                5 steps to wellbeing
              </Link>
            </div>

            <div>
              <h3 className="font-bold mb-3">Sleep and mental health</h3>
              <p className="text-sm text-gray-600 mb-2">
                Find out how to improve your sleep when you have mental health problems, and how poor sleep can affect your mental health.
              </p>
              <Link to="/mental-health/sleep" className="text-[#0891b2] text-sm hover:underline">
                Sleep tips
              </Link>
            </div>

            <div>
              <h3 className="font-bold mb-3">Stress management</h3>
              <p className="text-sm text-gray-600 mb-2">
                Learn practical techniques to manage stress in daily life and during challenging times.
              </p>
              <Link to="/mental-health/stress-management" className="text-[#0891b2] text-sm hover:underline">
                Stress management guide
              </Link>
            </div>
          </div>
        </div>

        {/* Mental health assessment tool */}
        <div className="bg-[#0891b2] text-white p-8 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Mental health self-assessment</h2>
            <p className="mb-6">
              If you're concerned about your mental health, take our short assessment to get personalized advice and resources.
            </p>
            <Link
              to="/tools/mental-health-assessment"
              className="bg-white text-[#0891b2] px-6 py-3 rounded-md hover:bg-gray-100 transition-colors inline-block font-bold"
            >
              Take the assessment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalHealthPage;

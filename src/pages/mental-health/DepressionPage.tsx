import React from 'react';
import { Link } from 'react-router-dom';

const DepressionPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Depression</h1>
          <p className="text-xl font-medium">
            Information on depression symptoms, causes and treatments, and how you can help yourself
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <p className="mb-4">
            Depression is more than simply feeling unhappy or fed up for a few days. Most people go through periods of feeling down, but when you're depressed, you feel persistently sad for weeks or months, rather than just a few days.
          </p>
          <p className="mb-4">
            Some people think depression is trivial or not a genuine health condition. They're wrong – it is a real illness with real symptoms. Depression is not a sign of weakness or something you can "snap out of" by "pulling yourself together".
          </p>
          <p>
            The good news is that with the right treatment and support, most people with depression can make a full recovery.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Symptoms</h2>
          <p className="mb-4">
            Depression affects people in different ways and can cause a wide variety of symptoms.
          </p>
          <p className="mb-4">They range from lasting feelings of unhappiness and hopelessness, to losing interest in the things you used to enjoy and feeling very tearful. Many people with depression also have symptoms of anxiety.</p>

          <h3 className="text-xl font-bold mt-6 mb-3">Psychological symptoms include:</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Continuous low mood or sadness</li>
            <li>Feeling hopeless and helpless</li>
            <li>Having low self-esteem</li>
            <li>Feeling tearful</li>
            <li>Feeling guilt-ridden</li>
            <li>Feeling irritable and intolerant of others</li>
            <li>Having no motivation or interest in things</li>
            <li>Finding it difficult to make decisions</li>
            <li>Not getting any enjoyment out of life</li>
            <li>Feeling anxious or worried</li>
            <li>Having suicidal thoughts or thoughts of harming yourself</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">Physical symptoms include:</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Moving or speaking more slowly than usual</li>
            <li>Changes in appetite or weight (usually decreased, but sometimes increased)</li>
            <li>Constipation</li>
            <li>Unexplained aches and pains</li>
            <li>Lack of energy</li>
            <li>Low sex drive</li>
            <li>Changes to your menstrual cycle</li>
            <li>Disturbed sleep – for example, finding it difficult to fall asleep at night or waking up very early in the morning</li>
          </ul>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
            <h4 className="font-bold text-lg mb-2">When to get help</h4>
            <p>If you experience symptoms of depression for most of the day, every day, for more than 2 weeks, you should seek help from a healthcare provider, community health worker, or local clinic.</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Understanding depression in African communities</h2>
          <p className="mb-4">
            In many African communities, mental health conditions like depression may be understood differently than in Western contexts. Various local terms exist to describe what might be recognized as depression in clinical settings.
          </p>
          <p className="mb-4">
            Depression may sometimes be attributed to spiritual causes, social problems, or family issues. It's important to understand that depression is a medical condition that can affect anyone, regardless of their background or circumstances.
          </p>
          <p className="mb-4">
            Seeking help for depression is not a sign of weakness but an important step toward healing. Treatment can incorporate both modern healthcare approaches and traditional support systems that are meaningful to you.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Treatment</h2>
          <p className="mb-4">
            Treatment for depression can involve a combination of lifestyle changes, talking therapies, community support, and medication.
          </p>
          <p className="mb-4">
            The treatment recommended will depend on the nature and severity of your depression, as well as available healthcare resources in your area.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Treatments include:</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Self-help</strong> – Activities like regular exercise, maintaining healthy sleep patterns, and engaging with supportive community groups
            </li>
            <li>
              <strong>Talking therapies</strong> – Such as counseling or cognitive behavioural therapy (CBT), which may be available at local health centers or through NGOs
            </li>
            <li>
              <strong>Medication</strong> – Antidepressants may be prescribed by healthcare providers at district hospitals or clinics
            </li>
            <li>
              <strong>Community support</strong> – Community-based mental health programs, religious organizations, and peer support groups can provide valuable assistance
            </li>
          </ul>

          <Link to="/services/mental-health-support" className="bg-[#0891b2] text-white px-6 py-3 rounded-md hover:bg-[#0e7490] transition-colors inline-block font-medium mt-4">
            Find mental health services
          </Link>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Living with depression</h2>
          <p className="mb-4">
            Many people with depression benefit by making lifestyle changes, such as getting more exercise, eating healthily, and connecting with others.
          </p>
          <p className="mb-4">
            Talking with trusted family members, community elders, or religious leaders can also provide valuable support for many people.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Self-help tips:</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Stay active and exercise regularly</li>
            <li>Eat regular, healthy meals</li>
            <li>Maintain connections with family and community</li>
            <li>Participate in religious or spiritual practices if they provide comfort</li>
            <li>Set realistic goals for yourself</li>
            <li>Break large tasks into smaller ones, set priorities</li>
            <li>Try to spend time with others and confide in a trusted friend or relative</li>
            <li>Postpone important decisions until you feel better</li>
            <li>Avoid alcohol and other substances as they can worsen depression</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Overcoming stigma</h2>
          <p className="mb-4">
            In many communities, there can be stigma attached to mental health problems such as depression. This stigma can make people reluctant to seek help.
          </p>
          <p className="mb-4">
            Remember that depression is a medical condition, not a personal failure. Seeking help for depression is a sign of strength, not weakness.
          </p>
          <p>
            Community leaders, healthcare workers, and educators play an important role in raising awareness about depression and reducing stigma. If you feel comfortable, sharing your experiences may help others understand that they are not alone.
          </p>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Related conditions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/mental-health/anxiety" className="block bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-[#0891b2]">Anxiety</h3>
              <p className="text-sm text-gray-600">Learn about anxiety disorders and treatments</p>
            </Link>
            <Link to="/mental-health/ptsd" className="block bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-[#0891b2]">PTSD</h3>
              <p className="text-sm text-gray-600">Post-traumatic stress disorder information</p>
            </Link>
            <Link to="/mental-health/stress" className="block bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-[#0891b2]">Stress</h3>
              <p className="text-sm text-gray-600">Ways to cope with stress and reduce its impact</p>
            </Link>
          </div>
        </div>

        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
          <h2 className="text-xl font-bold mb-2 text-red-800">Urgent help</h2>
          <p className="mb-4 text-red-700">
            If you are feeling suicidal or having thoughts of harming yourself, you should get help immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:112"
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-center font-bold"
            >
              Call emergency services (112)
            </a>
            <a
              href="tel:0800-12-13-14"
              className="bg-[#0891b2] text-white px-4 py-2 rounded-md hover:bg-[#0e7490] transition-colors text-center font-bold"
            >
              PHB Mental Health Helpline
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepressionPage;

import React from 'react';
import { Link } from 'react-router-dom';

const SelfHarmPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Self-harm</h1>
          <p className="text-xl font-medium">
            Information and support for those who self-harm, including how to get help and coping strategies
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
          <h2 className="text-xl font-bold mb-2 text-red-800">Urgent help</h2>
          <p className="mb-4 text-red-700">
            If you have seriously harmed yourself, call emergency services (112) or go to the nearest hospital or health center. If you need urgent support, call the PHB Mental Health Helpline at 0800-12-13-14.
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

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Understanding self-harm</h2>
          <p className="mb-4">
            Self-harm is when someone intentionally damages or injures their body. It's usually a way of coping with or expressing overwhelming emotional distress.
          </p>
          <p className="mb-4">
            Sometimes, people harm themselves because they want to punish themselves, or they may self-harm to signal to others that they need support. Self-harm can also be a cry for help.
          </p>
          <p>
            If you're self-harming, you should speak to someone you trust or seek professional help. Remember, you're not alone and help is available.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Self-harm in African communities</h2>
          <p className="mb-4">
            In many African communities, self-harm and mental health challenges may be viewed through different cultural, spiritual, or social perspectives. These views can sometimes make it difficult for individuals to seek help.
          </p>
          <p className="mb-4">
            It's important to understand that self-harm is often a response to emotional pain and is not typically related to witchcraft, spiritual possession, or moral failure – views that can sometimes exist in communities.
          </p>
          <p className="mb-4">
            Self-harm affects people from all backgrounds, regardless of age, gender, or social status. Understanding self-harm as a health issue is crucial for providing appropriate support and reducing stigma.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Why people self-harm</h2>
          <p className="mb-4">
            Self-harm is more common than many people realize, especially among younger people.
          </p>
          <p className="mb-4">
            The reasons why people self-harm are complex and vary from person to person. Some people have described self-harm as a way to:
          </p>

          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Express feelings that can't be put into words</li>
            <li>Deal with feelings of shame or guilt</li>
            <li>Turn emotional pain into physical pain</li>
            <li>Regain control over their feelings</li>
            <li>Distract themselves from emotional pain</li>
            <li>Communicate to others that they're distressed</li>
            <li>Punish themselves for perceived 'wrongdoings'</li>
          </ul>

          <p className="mb-4">
            Self-harm often has an addictive quality, making it difficult to stop. For some people, it may be a one-off incident, but for others it can become a long-term coping mechanism.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Types of self-harm</h2>
          <p className="mb-4">
            There are many different ways people can intentionally harm themselves, but common methods include:
          </p>

          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Cutting or burning the skin</li>
            <li>Punching or hitting themselves</li>
            <li>Taking harmful substances</li>
            <li>Misusing alcohol or drugs</li>
            <li>Deliberately starving themselves or overeating</li>
            <li>Excessive exercise</li>
          </ul>

          <p>
            Self-harm is linked to anxiety and depression. These mental health conditions can affect people of all ages. Self-harm can also occur alongside social and behavioral problems.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Warning signs of self-harm</h2>
          <p className="mb-4">
            If you're concerned that a family member or friend may be self-harming, look out for these warning signs:
          </p>

          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Unexplained cuts, bruises or burns, usually on their wrists, arms, thighs and chest</li>
            <li>Keeping themselves fully covered at all times, even in hot weather</li>
            <li>Signs of depression, such as low mood, tearfulness or a lack of interest in life</li>
            <li>Self-loathing and expressing a wish to punish themselves</li>
            <li>Becoming very withdrawn and isolated</li>
            <li>Unusual eating habits; sudden weight loss or gain</li>
            <li>Low self-esteem and self-blame</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Getting help</h2>
          <p className="mb-4">
            If you're self-harming, there are many people who can help you:
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Talk to someone you trust</h3>
          <p className="mb-4">
            The first step is usually to talk to someone you trust, such as a friend, family member, religious leader, teacher or healthcare provider.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Visit a healthcare provider</h3>
          <p className="mb-4">
            Your local healthcare provider can assess your needs and connect you with appropriate mental health services. Community health workers can also help guide you to available resources.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Treatment options</h3>
          <p className="mb-4">
            Treatment for people who self-harm usually involves talking therapies that help them understand and deal with the underlying causes, as well as developing coping strategies.
          </p>
          <p className="mb-4">
            The main treatments are:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Counseling</strong> – Talking with a trained counselor about your thoughts and feelings</li>
            <li><strong>Cognitive behavioral therapy (CBT)</strong> – A talking therapy that helps you manage your problems by changing how you think and behave</li>
            <li><strong>Family therapy</strong> – A type of psychological therapy that involves the family</li>
            <li><strong>Community support groups</strong> – Groups where you can share experiences with others facing similar challenges</li>
          </ul>

          <Link to="/services/mental-health-support" className="bg-[#0891b2] text-white px-6 py-3 rounded-md hover:bg-[#0e7490] transition-colors inline-block font-medium mt-4">
            Find mental health services
          </Link>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Helping yourself right now</h2>
          <p className="mb-4">
            If you feel the urge to self-harm, try these coping techniques:
          </p>

          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Find a distraction – go for a walk, listen to music, or call a friend</li>
            <li>Express your feelings in a journal or by drawing</li>
            <li>Release tension or anger through physical activity</li>
            <li>Hold an ice cube against your skin (this can create a cooling sensation similar to self-harm)</li>
            <li>Focus on your breathing to calm yourself</li>
            <li>Engage in community activities or religious practices that bring you comfort</li>
            <li>Talk to an elder or community leader you respect</li>
            <li>Focus on your senses – what can you see, smell, taste, hear and feel right now?</li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
            <h4 className="font-bold text-lg mb-2">Try this grounding technique</h4>
            <p className="mb-4">The 5-4-3-2-1 method can help during moments of distress:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Name 5 things you can see around you</li>
              <li>Name 4 things you can feel or touch</li>
              <li>Name 3 things you can hear</li>
              <li>Name 2 things you can smell</li>
              <li>Name 1 thing you can taste</li>
            </ul>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Helping someone who self-harms</h2>
          <p className="mb-4">
            If you discover someone you care about is self-harming, your reaction can make a big difference to their recovery. Here's how you can help:
          </p>

          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Stay calm and don't judge</li>
            <li>Let them know you're there for them</li>
            <li>Encourage them to speak to a healthcare provider or community health worker</li>
            <li>Offer to go with them to appointments</li>
            <li>Help them identify triggers and find alternative coping strategies</li>
            <li>Learn about self-harm to better understand what they're going through</li>
            <li>Respect their confidentiality while ensuring they get appropriate help</li>
            <li>Be patient – recovery takes time</li>
          </ul>

          <p>
            It's important to take care of your own mental health too. Supporting someone who self-harms can be challenging, so make sure you have someone to talk to as well.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Overcoming stigma</h2>
          <p className="mb-4">
            In many communities, there can be significant stigma surrounding self-harm and mental health issues. People may be reluctant to seek help due to fear of judgment or misunderstanding.
          </p>
          <p className="mb-4">
            It's important to understand that self-harm is a health issue, not a character flaw or a spiritual failing. Changing attitudes begins with education and open, compassionate conversations.
          </p>
          <p>
            Healthcare providers, community leaders, teachers, and religious figures all have important roles to play in reducing stigma and creating environments where people feel safe seeking help.
          </p>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Where to get help</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-3">Emergency support</h3>
              <ul className="space-y-2">
                <li>
                  <strong>Call 112</strong> or go to the nearest hospital if you or someone else is in immediate danger
                </li>
                <li>
                  <strong>PHB Mental Health Helpline</strong> – 0800-12-13-14 for urgent mental health support
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-3">Other support</h3>
              <ul className="space-y-2">
                <li>
                  <strong>Community health centers</strong> – Visit your local clinic for referrals to mental health services
                </li>
                <li>
                  <strong>PHB Mobile Health Units</strong> – Provide mental health services in rural areas
                </li>
                <li>
                  <strong>Mental Health NGOs</strong> – Several organizations provide free or low-cost counseling services
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Related conditions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/mental-health/depression" className="block bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-[#0891b2]">Depression</h3>
              <p className="text-sm text-gray-600">Information on depression and its treatments</p>
            </Link>
            <Link to="/mental-health/anxiety" className="block bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-[#0891b2]">Anxiety</h3>
              <p className="text-sm text-gray-600">Learn about anxiety disorders and treatments</p>
            </Link>
            <Link to="/mental-health/eating-disorders" className="block bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-[#0891b2]">Eating disorders</h3>
              <p className="text-sm text-gray-600">Information about eating disorders and support</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfHarmPage;

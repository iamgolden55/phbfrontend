import React from 'react';
import { Link } from 'react-router-dom';

const AnxietyPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Anxiety</h1>
          <p className="text-xl font-medium">
            Learn about anxiety disorders, including symptoms, causes, treatments and self-help options
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <p className="mb-4">
            Anxiety is a feeling of unease, such as worry or fear, that can be mild or severe. Everyone has feelings of anxiety at some point in their life. For example, you may feel worried and anxious about sitting an exam, or having a medical test or job interview.
          </p>
          <p className="mb-4">
            During times like these, feeling anxious can be perfectly normal. But some people find it hard to control their worries. Their feelings of anxiety are more constant and can often affect their daily lives.
          </p>
          <p>
            Anxiety is the main symptom of several conditions, including panic disorder, phobias, post-traumatic stress disorder and social anxiety disorder (social phobia).
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Symptoms</h2>
          <p className="mb-4">
            Anxiety can cause both psychological (mental) and physical symptoms.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Psychological symptoms include:</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Restlessness</li>
            <li>A sense of dread</li>
            <li>Feeling constantly "on edge"</li>
            <li>Difficulty concentrating</li>
            <li>Irritability</li>
            <li>Impatience</li>
            <li>Being easily distracted</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">Physical symptoms include:</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Dizziness</li>
            <li>Tiredness</li>
            <li>Heart palpitations</li>
            <li>Muscle aches and tension</li>
            <li>Trembling or shaking</li>
            <li>Dry mouth</li>
            <li>Excessive sweating</li>
            <li>Shortness of breath</li>
            <li>Stomach ache</li>
            <li>Nausea</li>
            <li>Headache</li>
            <li>Difficulty falling or staying asleep (insomnia)</li>
          </ul>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
            <h4 className="font-bold text-lg mb-2">When to get help</h4>
            <p>Although feelings of anxiety at certain times are completely normal, see a GP if anxiety is affecting your daily life or causing you distress.</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Types of anxiety disorders</h2>
          <p className="mb-4">
            Anxiety can be a symptom of several different types of mental health conditions:
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Common anxiety disorders include:</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Generalised anxiety disorder (GAD)</strong> – A long-term condition that causes you to feel anxious about a wide range of situations and issues, rather than one specific event
            </li>
            <li>
              <strong>Panic disorder</strong> – A condition where you have recurring and regular panic attacks, often for no apparent reason
            </li>
            <li>
              <strong>Social anxiety disorder</strong> – An intense fear of social situations
            </li>
            <li>
              <strong>Phobias</strong> – An overwhelming and debilitating fear of an object, place, situation, feeling or animal
            </li>
            <li>
              <strong>Post-traumatic stress disorder (PTSD)</strong> – A condition caused by frightening or distressing events
            </li>
            <li>
              <strong>Obsessive-compulsive disorder (OCD)</strong> – A condition where you have obsessive thoughts and compulsive behaviors
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Treatment</h2>
          <p className="mb-4">
            The type of treatment you'll be offered depends on what's causing your anxiety and how severe it is. Your GP may suggest trying self-help treatments before having more intensive psychological therapy or medication.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Treatment options include:</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Self-help approaches</strong> – Including exercising regularly, cutting down on alcohol and caffeine, and using relaxation techniques
            </li>
            <li>
              <strong>Talking therapies</strong> – Such as cognitive behavioural therapy (CBT), which can help you recognize and change anxious thoughts
            </li>
            <li>
              <strong>Applied relaxation therapy</strong> – A technique that involves learning how to relax your muscles in situations where you normally experience anxiety
            </li>
            <li>
              <strong>Medications</strong> – Including a type of antidepressant called selective serotonin reuptake inhibitors (SSRIs) or if they're not suitable, a type called serotonin and noradrenaline reuptake inhibitors (SNRIs)
            </li>
          </ul>

          <Link to="/services/talking-therapies" className="bg-[#0891b2] text-white px-6 py-3 rounded-md hover:bg-[#0e7490] transition-colors inline-block font-medium mt-4">
            Find PHB talking therapies
          </Link>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Self-help tips for anxiety</h2>
          <p className="mb-4">
            There are several things you can do yourself to help reduce your anxiety:
          </p>

          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Try breathing exercises to help manage anxiety</li>
            <li>Stay physically active</li>
            <li>Keep a diary of what makes you anxious</li>
            <li>Try complementary therapies like yoga and meditation</li>
            <li>Break the cycle of negative thoughts</li>
            <li>Eat a healthy diet</li>
            <li>Avoid caffeine, alcohol and smoking</li>
            <li>Join an anxiety support group</li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
            <h4 className="font-bold text-lg mb-2">Try this breathing exercise for stress</h4>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Sit or lie in a comfortable position with your feet slightly apart, one hand on your chest and the other on your stomach.</li>
              <li>Breathe in slowly through your nose for a count of 4, feeling your stomach rise.</li>
              <li>Hold for a count of 2.</li>
              <li>Exhale slowly for a count of 6.</li>
              <li>Repeat 5 to 10 times.</li>
            </ol>
          </div>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Related conditions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/mental-health/depression" className="block bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-[#0891b2]">Depression</h3>
              <p className="text-sm text-gray-600">Information on depression and its treatments</p>
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
          <h2 className="text-xl font-bold mb-2 text-red-800">Urgent mental health help</h2>
          <p className="mb-4 text-red-700">
            If you're having severe anxiety attacks or if your anxiety is severely affecting your daily life, you should seek help immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:111"
              className="bg-[#0891b2] text-white px-4 py-2 rounded-md hover:bg-[#0e7490] transition-colors text-center font-bold"
            >
              Call PHB 111 for urgent advice
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnxietyPage;

import React from 'react';
import { Link } from 'react-router-dom';

const PTSDPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Post-traumatic stress disorder (PTSD)</h1>
          <p className="text-xl font-medium">
            Find out about post-traumatic stress disorder (PTSD), including causes, symptoms and treatments
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <p className="mb-4">
            Post-traumatic stress disorder (PTSD) is an anxiety disorder caused by very stressful, frightening or distressing events.
          </p>
          <p className="mb-4">
            Someone with PTSD often relives the traumatic event through nightmares and flashbacks, and may experience feelings of isolation, irritability and guilt.
          </p>
          <p>
            They may also have problems sleeping, such as insomnia, and find concentrating difficult. These symptoms are often severe and persistent enough to have a significant impact on the person's day-to-day life.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Symptoms of PTSD</h2>
          <p className="mb-4">
            The specific symptoms of PTSD can vary widely between individuals, but generally fall into the categories described below.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Re-experiencing</h3>
          <p className="mb-4">
            Re-experiencing is the most typical symptom of PTSD. This is when a person involuntarily and vividly relives the traumatic event in the form of:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Flashbacks</li>
            <li>Nightmares</li>
            <li>Repetitive and distressing images or sensations</li>
            <li>Physical sensations such as pain, sweating, feeling sick or trembling</li>
          </ul>
          <p>Some people have constant negative thoughts about their experience, repeatedly asking themselves questions that prevent them from coming to terms with the event.</p>

          <h3 className="text-xl font-bold mt-6 mb-3">Avoidance and emotional numbing</h3>
          <p className="mb-4">
            Trying to avoid being reminded of the traumatic event is another key symptom of PTSD. This usually means avoiding certain people or places that remind you of the trauma, or avoiding talking to anyone about your experience.
          </p>
          <p className="mb-4">
            Many people with PTSD try to push memories of the event out of their mind, often distracting themselves with work or hobbies.
          </p>
          <p>Some people attempt to deal with their feelings by trying not to feel anything at all. This is known as emotional numbing. This can lead to the person becoming isolated and withdrawn, and they may also give up pursuing activities they used to enjoy.</p>

          <h3 className="text-xl font-bold mt-6 mb-3">Hyperarousal (feeling 'on edge')</h3>
          <p className="mb-4">
            Someone with PTSD may be very anxious and find it difficult to relax. They may be constantly aware of threats and easily startled. This state of mind is known as hyperarousal.
          </p>
          <p>Hyperarousal often leads to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Irritability</li>
            <li>Angry outbursts</li>
            <li>Sleep problems (insomnia)</li>
            <li>Difficulty concentrating</li>
          </ul>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
            <h4 className="font-bold text-lg mb-2">When to seek help</h4>
            <p>It's normal to experience upsetting and confusing thoughts after a traumatic event, but most people improve naturally over a few weeks. You should see a GP if you or your child are still having problems about 4 weeks after the traumatic experience, or if the symptoms are particularly troublesome.</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Causes</h2>
          <p className="mb-4">
            PTSD can develop immediately after someone experiences a disturbing event, or it can occur weeks, months or even years later.
          </p>
          <p className="mb-4">
            PTSD is estimated to affect about 1 in every 3 people who have a traumatic experience, but it's not clear exactly why some people develop the condition and others don't.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Types of events that can lead to PTSD include:</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Serious accidents</li>
            <li>Physical or sexual assault</li>
            <li>Abuse, including childhood or domestic abuse</li>
            <li>Exposure to traumatic events at work, including remote exposure</li>
            <li>Serious health problems, such as being admitted to intensive care</li>
            <li>Childbirth experiences, such as losing a baby</li>
            <li>War and conflict</li>
            <li>Torture</li>
          </ul>

          <p className="mb-4">
            PTSD is not usually related to situations that are simply upsetting, such as divorce, job loss, or failing exams.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Complex PTSD</h2>
          <p className="mb-4">
            People who repeatedly experience traumatic situations, such as severe neglect, abuse or violence, may develop complex PTSD.
          </p>
          <p className="mb-4">
            Complex PTSD can cause similar symptoms to PTSD but may include:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Difficulty controlling your emotions</li>
            <li>Feeling very hostile or distrustful towards the world</li>
            <li>Constant feelings of emptiness or hopelessness</li>
            <li>Feeling as if you are permanently damaged or worthless</li>
            <li>Feeling as if you're completely different to other people</li>
            <li>Feeling like nobody can understand what happened to you</li>
            <li>Avoiding friendships and relationships, or finding them very difficult</li>
            <li>Destructive or risky behavior, such as self-harm, alcohol misuse or drug abuse</li>
            <li>Suicidal thoughts</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Treatment</h2>
          <p className="mb-4">
            PTSD can be successfully treated, even when it develops many years after a traumatic event. Treatment depends on the severity of symptoms and how soon they occur after the traumatic event.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">The main treatments are:</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Watchful waiting</strong> – Monitoring symptoms to see if they improve or get worse without treatment
            </li>
            <li>
              <strong>Psychological therapies</strong> – Such as trauma-focused cognitive behavioral therapy (CBT) or eye movement desensitization and reprocessing (EMDR)
            </li>
            <li>
              <strong>Medication</strong> – Such as antidepressants
            </li>
          </ul>

          <p className="mb-4">
            If you have PTSD, speak to your GP about the treatments available to you. Your treatment plan will often involve a combination of treatments.
          </p>

          <Link to="/services/talking-therapies" className="bg-[#0891b2] text-white px-6 py-3 rounded-md hover:bg-[#0e7490] transition-colors inline-block font-medium mt-4">
            Find PHB talking therapies
          </Link>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">PTSD in children</h2>
          <p className="mb-4">
            Children and teens can also develop PTSD after experiencing or witnessing a traumatic event. The symptoms are similar to those in adults, but there are some specific differences:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Children may have frightening dreams that may not specifically include aspects of the trauma</li>
            <li>Children might express their trauma through play, drawing, or re-enacting the event</li>
            <li>Children may develop new fears unrelated to the trauma</li>
            <li>Children may experience physical symptoms like stomach aches or headaches</li>
          </ul>
          <p>
            If you think your child might have PTSD, it's important to talk to a GP. Treatment usually involves psychological therapies adapted for children.
          </p>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Related conditions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/mental-health/anxiety" className="block bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-[#0891b2]">Anxiety</h3>
              <p className="text-sm text-gray-600">Learn about anxiety disorders and treatments</p>
            </Link>
            <Link to="/mental-health/depression" className="block bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-[#0891b2]">Depression</h3>
              <p className="text-sm text-gray-600">Information on depression and its treatments</p>
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
            If you or someone you know is experiencing a mental health crisis, you should get help immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:999"
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-center font-bold"
            >
              Call 999 for immediate danger
            </a>
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

export default PTSDPage;

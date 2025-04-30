import React from 'react';
import { Link } from 'react-router-dom';

const StressPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Stress</h1>
          <p className="text-xl font-medium">
            Tips and advice on managing stress, including what triggers it and how it affects your body
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">What is stress?</h2>
          <p className="mb-4">
            Stress is the body's reaction to feeling threatened or under pressure. It's very common, can be motivating to help us achieve things in our daily life, and can help us meet the demands of home, work and family life.
          </p>
          <p className="mb-4">
            But too much stress can affect our mood, our body and our relationships – especially when it feels out of our control. It can make us feel anxious and irritable, and affect our self-esteem.
          </p>
          <p>
            Experiencing a lot of stress over a long period of time can also lead to a feeling of physical, mental and emotional exhaustion, often called burnout.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Signs of stress</h2>
          <p className="mb-4">
            We all experience stress differently in different situations. Sometimes you might be able to tell right away when you're feeling under stress, but other times you might keep going without recognizing the signs.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Stress can affect you in the following ways:</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-bold mb-3">How you feel emotionally</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Overwhelmed</li>
                <li>Irritable</li>
                <li>Anxious</li>
                <li>Fearful</li>
                <li>Lacking in self-esteem</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-bold mb-3">How you feel mentally</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Racing thoughts</li>
                <li>Constant worrying</li>
                <li>Difficulty concentrating</li>
                <li>Difficulty making decisions</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-bold mb-3">How you behave</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Snapping at people</li>
                <li>Avoiding contact with others</li>
                <li>Not doing things you usually enjoy</li>
                <li>Difficulty sleeping or changes in sleep pattern</li>
                <li>Eating more or less than usual</li>
                <li>Drinking or smoking more</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-bold mb-3">How you feel physically</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Tired</li>
                <li>Headaches</li>
                <li>Upset stomach</li>
                <li>Chest pain or faster heartbeat</li>
                <li>High blood pressure</li>
                <li>Muscle tension or jaw clenching</li>
                <li>Problems with sex drive</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
            <h4 className="font-bold text-lg mb-2">When to get help</h4>
            <p>If you're feeling stressed or anxious for long periods of time and it's affecting your daily life or causing you distress, you should consider speaking to your GP.</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Causes of stress</h2>
          <p className="mb-4">
            All sorts of situations can cause stress. The most common involve work, money matters and relationships with partners, children or other family members.
          </p>
          <p className="mb-4">
            Stress may be caused by major life events such as:
          </p>

          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Moving home</li>
            <li>Getting married</li>
            <li>Having a baby</li>
            <li>Serious illness</li>
            <li>Bereavement</li>
            <li>Divorce or relationship breakdown</li>
          </ul>

          <p>But stress can also be caused by a series of small, seemingly insignificant things that mount up over time, such as feeling undervalued at work or arguing with a family member.</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">10 tips to help with stress</h2>
          <ol className="list-decimal pl-6 mb-4 space-y-4">
            <li>
              <strong>Split up big tasks</strong>
              <p>If a task seems overwhelming and difficult to start, try breaking it down into easier chunks, and give yourself credit for completing them.</p>
            </li>
            <li>
              <strong>Allow yourself some positivity</strong>
              <p>Take time to think about the good things in your life. Each day, consider what went well and try to list 3 things you're thankful for.</p>
            </li>
            <li>
              <strong>Challenge unhelpful thoughts</strong>
              <p>The way we think affects the way we feel. Watch out for thoughts like "I can't do this" or "Everything is going wrong". Try to replace them with balanced thoughts like "I can do this if I break it down" or "Some things are difficult right now, but not everything is bad".</p>
            </li>
            <li>
              <strong>Be more active</strong>
              <p>Being active can help you burn off nervous energy. It will not make your stress disappear, but it can make it less intense.</p>
            </li>
            <li>
              <strong>Talk to someone</strong>
              <p>Talking to someone you trust about what's making you stressed can help. You can try a friend or family member.</p>
            </li>
            <li>
              <strong>Plan your time</strong>
              <p>Planning out your day or week can help you feel more in control of things.</p>
            </li>
            <li>
              <strong>Create a wellness toolkit</strong>
              <p>Come up with a list of activities that help you relax, such as having a bath, reading a book, or going for a walk.</p>
            </li>
            <li>
              <strong>Practice mindfulness</strong>
              <p>Mindfulness can help you focus on the present moment rather than worrying about the past or future.</p>
            </li>
            <li>
              <strong>Get a good night's sleep</strong>
              <p>Good quality sleep makes a big difference to how we feel, so it's important to get enough.</p>
            </li>
            <li>
              <strong>Limit caffeine and alcohol</strong>
              <p>Drinking too much caffeine or alcohol can increase feelings of anxiety. Try to cut down or avoid them completely if you can.</p>
            </li>
          </ol>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <h3 className="text-xl font-bold mb-3">Quick stress reliever: The 4-7-8 breathing technique</h3>
          <p className="mb-4">This breathing technique can help calm you down when you're feeling stressed or anxious:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Empty your lungs of air</li>
            <li>Breathe in quietly through your nose for 4 seconds</li>
            <li>Hold your breath for a count of 7 seconds</li>
            <li>Exhale forcefully through your mouth, pursing your lips and making a "whoosh" sound, for 8 seconds</li>
            <li>Repeat the cycle up to 4 times</li>
          </ol>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Getting help for stress</h2>
          <p className="mb-4">
            If you've tried self-help techniques and they are not working, you may want to discuss how you're feeling with your GP, who can refer you to a specialist or recommend other support options.
          </p>
          <p className="mb-4">
            If you're at college or university, you may be able to access free counseling through your institution's student services.
          </p>
          <p className="mb-4">
            Mental health charities, such as Mind, offer advice and support online and through helplines.
          </p>

          <Link to="/services/talking-therapies" className="bg-[#005eb8] text-white px-6 py-3 rounded-md hover:bg-[#003f7e] transition-colors inline-block font-medium mt-4">
            Find PHB talking therapies
          </Link>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Related conditions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/mental-health/anxiety" className="block bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-[#005eb8]">Anxiety</h3>
              <p className="text-sm text-gray-600">Learn about anxiety disorders and treatments</p>
            </Link>
            <Link to="/mental-health/depression" className="block bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-[#005eb8]">Depression</h3>
              <p className="text-sm text-gray-600">Information on depression and its treatments</p>
            </Link>
            <Link to="/mental-health/sleep" className="block bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-[#005eb8]">Sleep problems</h3>
              <p className="text-sm text-gray-600">Tips for better sleep and managing sleep problems</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StressPage;

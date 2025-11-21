import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';

const EatingDisordersPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' },
              { label: 'Mental health', url: '/womens-health/mental-health' },
              { label: 'Eating disorders', url: '/womens-health/mental-health/eating-disorders' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Eating Disorders</h1>
          <p className="text-xl font-medium">
            Information about eating disorders, which disproportionately affect women
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-[#d8157d]">About eating disorders</h2>
              <p className="mb-4">
                Eating disorders are serious mental health conditions that involve an unhealthy
                relationship with food, eating, and body image. They can affect anyone but are
                more common in women and often develop during adolescence or early adulthood.
              </p>
              <p>
                With proper treatment, recovery is possible. Early intervention leads to better outcomes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Types of eating disorders</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Anorexia nervosa</h3>
                  <p className="mb-2">
                    Characterized by restricting food intake, intense fear of gaining weight,
                    and a distorted body image. May involve extreme weight loss, though not always.
                  </p>
                  <p className="text-sm text-gray-600">
                    Can lead to serious physical complications including heart problems and osteoporosis.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Bulimia nervosa</h3>
                  <p className="mb-2">
                    Involves cycles of binge eating followed by purging behaviours (vomiting,
                    excessive exercise, or misuse of laxatives) to prevent weight gain.
                  </p>
                  <p className="text-sm text-gray-600">
                    Often maintained at a normal weight, making it less visible to others.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Binge eating disorder</h3>
                  <p className="mb-2">
                    Regular episodes of eating large amounts of food while feeling out of control,
                    often followed by feelings of guilt and shame. Unlike bulimia, there's no
                    regular purging.
                  </p>
                  <p className="text-sm text-gray-600">
                    The most common eating disorder in the UK.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Other specified feeding or eating disorders (OSFED)</h3>
                  <p className="mb-2">
                    Eating disorders that don't fit neatly into other categories but are
                    still serious and require treatment.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#d8157d] mb-2">Avoidant/restrictive food intake disorder (ARFID)</h3>
                  <p className="mb-2">
                    Avoiding certain foods or eating very little, not due to body image concerns
                    but because of sensory issues, fear of choking, or lack of interest in food.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Warning signs</h2>
              <p className="mb-4">
                Eating disorders can be hard to spot. Warning signs may include:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Behavioural signs</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Skipping meals or making excuses not to eat</li>
                    <li>Eating very slowly or cutting food into tiny pieces</li>
                    <li>Going to the bathroom immediately after meals</li>
                    <li>Excessive exercise</li>
                    <li>Wearing baggy clothes to hide weight loss</li>
                    <li>Withdrawing from social situations involving food</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Physical and emotional signs</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Noticeable weight changes</li>
                    <li>Feeling cold, tired, or dizzy</li>
                    <li>Hair loss or dry skin</li>
                    <li>Preoccupation with food, weight, or shape</li>
                    <li>Low self-esteem</li>
                    <li>Mood changes</li>
                    <li>Difficulty concentrating</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Causes and risk factors</h2>
              <p className="mb-4">
                Eating disorders are complex and usually caused by a combination of factors:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Genetic factors:</strong> Family history of eating disorders or other mental health conditions</li>
                <li><strong>Psychological factors:</strong> Perfectionism, low self-esteem, anxiety, depression</li>
                <li><strong>Social factors:</strong> Pressure to be thin, bullying, trauma, difficult relationships</li>
                <li><strong>Life events:</strong> Bereavement, abuse, relationship breakdowns</li>
                <li><strong>Biological factors:</strong> Changes in brain chemistry</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Health complications</h2>
              <p className="mb-4">
                Eating disorders can cause serious physical health problems:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Heart problems and irregular heartbeat</li>
                <li>Kidney damage</li>
                <li>Osteoporosis (weak bones)</li>
                <li>Dental problems</li>
                <li>Fertility issues and menstrual irregularities</li>
                <li>Digestive problems</li>
                <li>Muscle weakness</li>
                <li>Impaired immune function</li>
              </ul>
              <p className="mt-4 text-sm font-bold">
                Eating disorders have the highest mortality rate of any mental illness.
                Seeking help early is crucial.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Treatment</h2>
              <p className="mb-4">
                Treatment is tailored to the individual and the type of eating disorder:
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Psychological therapies</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Cognitive behavioural therapy (CBT)</li>
                    <li>Family therapy (especially for younger people)</li>
                    <li>Interpersonal therapy</li>
                    <li>Specialist supportive clinical management</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Nutritional support</h3>
                  <p className="mb-2">
                    Working with a dietitian to develop healthy eating patterns
                    and restore nutritional health.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Medical care</h3>
                  <p className="mb-2">
                    Monitoring and treating physical health complications.
                    Medication may help with co-occurring conditions like depression or anxiety.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#d8157d] mb-2">Specialist services</h3>
                  <p className="mb-2">
                    Outpatient, day patient, or inpatient treatment depending on
                    severity. Early intervention services available in many areas.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Supporting someone with an eating disorder</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Learn about eating disorders to better understand their experience</li>
                <li>Listen without judgement and avoid commenting on appearance or weight</li>
                <li>Encourage them to seek professional help</li>
                <li>Offer to accompany them to appointments</li>
                <li>Focus on their feelings rather than food or eating behaviours</li>
                <li>Be patient - recovery can be a long process with setbacks</li>
                <li>Look after your own wellbeing and seek support if needed</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-red-50 p-6 rounded-lg shadow-sm border border-red-200">
              <h3 className="text-xl font-bold mb-4 text-red-600">When to get urgent help</h3>
              <p className="mb-4">
                Seek urgent medical help if you or someone you know:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>Is very underweight</li>
                <li>Has fainted or is having heart palpitations</li>
                <li>Is vomiting blood</li>
                <li>Has thoughts of self-harm or suicide</li>
              </ul>
              <p className="mt-4 text-sm font-bold">
                Call 999 or go to A&E in an emergency.
              </p>
            </div>

            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Get help</h3>
              <p className="mb-4">
                If you think you may have an eating disorder, speak to your GP as soon as possible.
              </p>
              <p className="text-sm text-gray-600">
                You can also contact eating disorder charities for advice and support.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Helplines</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-bold">Beat Eating Disorders</p>
                  <p>0808 801 0677</p>
                  <p className="text-sm text-gray-500">Open 365 days a year</p>
                </div>
                <div>
                  <p className="font-bold">Samaritans</p>
                  <p>116 123</p>
                  <p className="text-sm text-gray-500">24 hours, 7 days a week</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Related information</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/womens-health/mental-health" className="text-[#d8157d] hover:underline">
                    Women's mental health
                  </Link>
                </li>
                <li>
                  <Link to="/womens-health/mental-health/anxiety-depression" className="text-[#d8157d] hover:underline">
                    Anxiety and depression
                  </Link>
                </li>
                <li>
                  <Link to="/live-well/healthy-eating" className="text-[#d8157d] hover:underline">
                    Healthy eating
                  </Link>
                </li>
                <li>
                  <Link to="/live-well/mental-wellbeing" className="text-[#d8157d] hover:underline">
                    Mental wellbeing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EatingDisordersPage;

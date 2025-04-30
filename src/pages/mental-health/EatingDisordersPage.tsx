import React from 'react';
import { Link } from 'react-router-dom';

const EatingDisordersPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Eating disorders</h1>
          <p className="text-xl font-medium">
            Information about eating disorders, including symptoms, causes, treatment and prevention
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">What are eating disorders?</h2>
          <p className="mb-4">
            Eating disorders are complex mental health conditions characterized by abnormal eating habits and severe distress about body weight or shape. They can affect anyone, regardless of age, gender, or background, but they're most common in young women.
          </p>
          <p className="mb-4">
            Eating disorders can have serious physical and psychological consequences, but with the right support and treatment, recovery is possible.
          </p>
          <p>
            If you or someone you know is displaying signs of an eating disorder, it's important to seek help as soon as possible. Early intervention gives the best chance of recovery.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Types of eating disorders</h2>

          <div className="mb-6">
            <h3 className="text-xl font-bold mt-6 mb-3">Anorexia nervosa</h3>
            <p className="mb-4">
              A person with anorexia tries to keep their weight as low as possible by not eating enough food, exercising too much, or both.
            </p>
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-bold mb-2">Signs of anorexia include:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Restricting food intake or eating very little</li>
                <li>Having an intense fear of gaining weight</li>
                <li>Having a distorted body image (seeing yourself as overweight when you're underweight)</li>
                <li>Excessive exercise</li>
                <li>Low body weight for height, age, and biological sex</li>
                <li>Missing periods in women and girls</li>
                <li>Loss of sexual interest in both men and women</li>
              </ul>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold mt-6 mb-3">Bulimia nervosa</h3>
            <p className="mb-4">
              A person with bulimia goes through periods of binge eating followed by purging to prevent weight gain. Purging can include vomiting, taking laxatives, fasting, or exercising excessively.
            </p>
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-bold mb-2">Signs of bulimia include:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Binge eating (eating large amounts of food in short periods of time)</li>
                <li>Purging after eating</li>
                <li>Feeling out of control around food</li>
                <li>Fear of gaining weight</li>
                <li>Self-esteem that's overly tied to body image</li>
                <li>Sore throat or damage to teeth from frequent vomiting</li>
                <li>Using the bathroom immediately after meals</li>
              </ul>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold mt-6 mb-3">Binge eating disorder (BED)</h3>
            <p className="mb-4">
              A person with BED regularly eats large amounts of food in a short time, until they feel uncomfortably full, often accompanied by feelings of distress and loss of control. Unlike bulimia, they don't regularly purge afterward.
            </p>
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-bold mb-2">Signs of binge eating disorder include:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Eating large amounts of food, often rapidly and until uncomfortably full</li>
                <li>Eating when not physically hungry</li>
                <li>Eating alone due to embarrassment about how much is being eaten</li>
                <li>Feeling disgusted, depressed, or guilty after overeating</li>
                <li>Not regularly using purging behaviors (like vomiting)</li>
              </ul>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold mt-6 mb-3">Other specified feeding or eating disorders (OSFED)</h3>
            <p className="mb-4">
              OSFED is a category for eating disorders that don't meet the exact criteria for anorexia, bulimia, or BED but still cause significant distress or impairment. This includes conditions like atypical anorexia (where someone has anorexic behaviors but is not underweight) and purging disorder (purging without binge eating).
            </p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
            <h4 className="font-bold text-lg mb-2">When to seek help</h4>
            <p>You should see a GP if you think you may have an eating disorder. The earlier you get help, the better your recovery chances. If you're concerned about a friend or family member, encourage them to see a GP. You can go with them if they'd like support.</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Causes of eating disorders</h2>
          <p className="mb-4">
            Eating disorders are complex conditions that arise from a combination of genetic, biological, psychological, and social factors. They're not a lifestyle choice or a diet gone too far.
          </p>
          <p className="mb-4">
            Factors that may contribute to eating disorders include:
          </p>

          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Genetic factors</strong> – Research suggests that eating disorders may run in families</li>
            <li><strong>Psychological factors</strong> – Such as perfectionism, body image dissatisfaction, and difficulty expressing emotions</li>
            <li><strong>Social factors</strong> – Including pressure from society, peers, or family to be thin, experiences of bullying or abuse</li>
            <li><strong>Biological factors</strong> – Such as changes in brain chemicals that control hunger, appetite, and digestion</li>
            <li><strong>Life changes or stressful events</strong> – Major life transitions or traumatic events can trigger the onset of an eating disorder</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Health risks</h2>
          <p className="mb-4">
            Eating disorders can lead to serious physical health complications if left untreated:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-bold mb-3">Physical health risks</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Heart problems, including heart failure</li>
                <li>Severe dehydration, which can lead to kidney failure</li>
                <li>Osteoporosis (reduced bone density)</li>
                <li>Severe tooth decay and gum disease from frequent vomiting</li>
                <li>Digestive problems</li>
                <li>Hormonal imbalances that can affect periods and fertility</li>
                <li>Electrolyte imbalances, which can lead to cardiac arrest</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-bold mb-3">Psychological impact</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Depression and anxiety</li>
                <li>Obsessive thoughts and behaviors</li>
                <li>Low self-esteem and poor body image</li>
                <li>Social isolation</li>
                <li>Suicidal thoughts or behavior</li>
                <li>Substance misuse as a coping mechanism</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Diagnosis</h2>
          <p className="mb-4">
            If you visit your GP about a suspected eating disorder, they'll likely ask questions about your eating habits and how you feel about your weight. They might check your weight and calculate your BMI, but this alone doesn't determine if you have an eating disorder.
          </p>
          <p className="mb-4">
            Your GP may refer you to an eating disorder specialist or team for a more detailed assessment. This might involve:
          </p>

          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Questions about your thoughts, feelings, and behaviors related to food, eating, and body image</li>
            <li>A physical examination to check for any health complications</li>
            <li>Blood tests to check your overall health</li>
            <li>Discussions about your personal and family medical history</li>
          </ul>

          <p>
            Remember, being honest about your eating habits and feelings is important for getting the right diagnosis and treatment.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Treatment</h2>
          <p className="mb-4">
            Treatment for eating disorders usually involves a combination of psychological therapy and monitoring physical health. The specific approach depends on the type of eating disorder and individual needs.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Treatment typically includes:</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Psychological therapy</strong> – Such as cognitive behavioral therapy (CBT), family therapy, or interpersonal psychotherapy to address thoughts, feelings, and behaviors related to the eating disorder
            </li>
            <li>
              <strong>Nutritional counseling</strong> – Working with a dietitian to develop a healthy meal plan and relationship with food
            </li>
            <li>
              <strong>Regular health monitoring</strong> – To check weight, heart function, and other physical aspects affected by the eating disorder
            </li>
            <li>
              <strong>Medication</strong> – Sometimes prescribed to treat associated mental health conditions like depression or anxiety
            </li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">Treatment settings</h3>
          <p className="mb-4">
            Treatment can take place in different settings depending on the severity of the eating disorder:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Outpatient care</strong> – Regular appointments with healthcare professionals while living at home</li>
            <li><strong>Day treatment programs</strong> – Intensive treatment during the day with evenings at home</li>
            <li><strong>Inpatient care</strong> – Hospital admission for those with severe medical complications or at high risk</li>
            <li><strong>Residential treatment</strong> – Living at a specialized facility for intensive treatment over a longer period</li>
          </ul>

          <Link to="/services/talking-therapies" className="bg-[#005eb8] text-white px-6 py-3 rounded-md hover:bg-[#003f7e] transition-colors inline-block font-medium mt-4">
            Find PHB talking therapies
          </Link>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Recovery and support</h2>
          <p className="mb-4">
            Recovery from an eating disorder is possible with the right support. The journey is different for everyone, and it can take time. During recovery, you might:
          </p>

          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Work on developing a healthier relationship with food</li>
            <li>Address the underlying emotional issues that contribute to your eating disorder</li>
            <li>Learn new coping strategies for dealing with stress and emotions</li>
            <li>Rebuild social connections and engage in activities you enjoy</li>
            <li>Focus on overall well-being rather than weight or appearance</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">Support for loved ones</h3>
          <p className="mb-4">
            Supporting someone with an eating disorder can be challenging. Here's how you can help:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Learn about eating disorders to better understand what they're going through</li>
            <li>Encourage them to seek professional help</li>
            <li>Focus conversations on feelings and experiences, not on food, weight, or appearance</li>
            <li>Be patient and recognize that recovery takes time</li>
            <li>Take care of your own well-being and seek support if needed</li>
          </ul>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Finding help</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-3">Professional help</h3>
              <ul className="space-y-2">
                <li>
                  <strong>See your GP</strong> for an initial assessment and referral
                </li>
                <li>
                  <strong>PHB eating disorder services</strong> – Specialist treatment available through PHB referral
                </li>
                <li>
                  <strong>Private treatment</strong> – Options include private therapists, dietitians, and treatment centers
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-3">Support organizations</h3>
              <ul className="space-y-2">
                <li>
                  <strong>Beat</strong> – The UK's eating disorder charity offers helplines, online support groups, and information
                </li>
                <li>
                  <strong>PHB talking therapies</strong> – Self-referral for psychological therapies in some areas
                </li>
                <li>
                  <strong>Student services</strong> – Universities and colleges often offer counseling and support
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
          <h2 className="text-xl font-bold mb-2 text-red-800">Urgent help</h2>
          <p className="mb-4 text-red-700">
            If you or someone you know is seriously ill with an eating disorder, seek emergency medical help immediately.
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
              className="bg-[#005eb8] text-white px-4 py-2 rounded-md hover:bg-[#003f7e] transition-colors text-center font-bold"
            >
              Call PHB 111 for urgent advice
            </a>
          </div>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Related conditions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/mental-health/depression" className="block bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-[#005eb8]">Depression</h3>
              <p className="text-sm text-gray-600">Information on depression and its treatments</p>
            </Link>
            <Link to="/mental-health/anxiety" className="block bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-[#005eb8]">Anxiety</h3>
              <p className="text-sm text-gray-600">Learn about anxiety disorders and treatments</p>
            </Link>
            <Link to="/mental-health/self-harm" className="block bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-[#005eb8]">Self-harm</h3>
              <p className="text-sm text-gray-600">Information about self-harm and support</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EatingDisordersPage;

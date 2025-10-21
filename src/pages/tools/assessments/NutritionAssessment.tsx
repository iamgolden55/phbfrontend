import React from 'react';
import AssessmentTemplate, { AssessmentQuestion } from '../../../components/assessment/AssessmentTemplate';

// Define the questions for Nutritional Health assessment
const questions: AssessmentQuestion[] = [
  {
    id: 'fruit_vegetables',
    text: 'How many servings of fruits and vegetables do you eat per day?',
    required: true,
    options: [
      { value: 3, label: '5 or more servings', description: 'Meets recommended daily intake' },
      { value: 2, label: '3-4 servings', description: 'Good, but could increase' },
      { value: 1, label: '1-2 servings', description: 'Below recommendations' },
      { value: 0, label: 'Less than 1 serving', description: 'Significantly below recommendations' }
    ]
  },
  {
    id: 'whole_grains',
    text: 'How often do you choose whole grains over refined grains?',
    required: true,
    options: [
      { value: 3, label: 'Always or almost always', description: 'Excellent whole grain intake' },
      { value: 2, label: 'Often (more than half the time)', description: 'Good whole grain choices' },
      { value: 1, label: 'Sometimes', description: 'Occasional whole grain consumption' },
      { value: 0, label: 'Rarely or never', description: 'Mostly refined grains' }
    ]
  },
  {
    id: 'protein_sources',
    text: 'What are your primary protein sources?',
    required: true,
    options: [
      { value: 3, label: 'Varied: fish, poultry, legumes, nuts', description: 'Excellent protein diversity' },
      { value: 2, label: 'Mostly lean meats and plant proteins', description: 'Good protein choices' },
      { value: 1, label: 'Mix of lean and fatty meats', description: 'Some healthy protein sources' },
      { value: 0, label: 'Mostly processed or fatty meats', description: 'Less healthy protein sources' }
    ]
  },
  {
    id: 'processed_foods',
    text: 'How often do you eat highly processed or fast foods?',
    required: true,
    options: [
      { value: 3, label: 'Rarely (less than once per week)', description: 'Minimal processed food intake' },
      { value: 2, label: 'Occasionally (1-2 times per week)', description: 'Limited processed food consumption' },
      { value: 1, label: 'Regularly (3-4 times per week)', description: 'Frequent processed food intake' },
      { value: 0, label: 'Often (5+ times per week)', description: 'Heavy reliance on processed foods' }
    ]
  },
  {
    id: 'sugary_drinks',
    text: 'How often do you consume sugary drinks (soda, sweetened tea, juice)?',
    required: true,
    options: [
      { value: 3, label: 'Rarely or never', description: 'Excellent beverage choices' },
      { value: 2, label: 'Occasionally (1-2 per week)', description: 'Limited sugar-sweetened beverages' },
      { value: 1, label: 'Regularly (3-6 per week)', description: 'Frequent sugary drink consumption' },
      { value: 0, label: 'Daily or multiple times per day', description: 'Excessive added sugar intake' }
    ]
  },
  {
    id: 'water_intake',
    text: 'How much water do you drink daily?',
    required: true,
    options: [
      { value: 3, label: '8+ glasses (64+ oz)', description: 'Excellent hydration' },
      { value: 2, label: '5-7 glasses (40-56 oz)', description: 'Good hydration' },
      { value: 1, label: '3-4 glasses (24-32 oz)', description: 'Inadequate hydration' },
      { value: 0, label: 'Less than 3 glasses (24 oz)', description: 'Poor hydration' }
    ]
  },
  {
    id: 'healthy_fats',
    text: 'What types of fats do you consume most often?',
    required: true,
    options: [
      { value: 3, label: 'Healthy fats (olive oil, nuts, avocados, fish)', description: 'Excellent fat choices' },
      { value: 2, label: 'Mix of healthy and some saturated fats', description: 'Generally good fat choices' },
      { value: 1, label: 'Moderate amounts of saturated fats', description: 'Some unhealthy fat sources' },
      { value: 0, label: 'High saturated and trans fats', description: 'Unhealthy fat consumption' }
    ]
  },
  {
    id: 'meal_regularity',
    text: 'How regular are your meal times?',
    required: true,
    options: [
      { value: 3, label: 'Very regular (same times daily)', description: 'Consistent eating pattern' },
      { value: 2, label: 'Mostly regular', description: 'Generally consistent meals' },
      { value: 1, label: 'Irregular', description: 'Variable meal timing' },
      { value: 0, label: 'Very irregular or skip meals', description: 'Inconsistent eating pattern' }
    ]
  },
  {
    id: 'portion_control',
    text: 'How would you describe your portion sizes?',
    required: true,
    options: [
      { value: 3, label: 'Appropriate portions', description: 'Well-controlled portion sizes' },
      { value: 2, label: 'Slightly larger than recommended', description: 'Moderate portion control' },
      { value: 1, label: 'Often eat large portions', description: 'Poor portion control' },
      { value: 0, label: 'Consistently overeat', description: 'Significant overeating' }
    ]
  },
  {
    id: 'sodium_intake',
    text: 'How would you rate your sodium/salt intake?',
    required: true,
    options: [
      { value: 3, label: 'Low sodium diet', description: 'Minimal processed/salty foods' },
      { value: 2, label: 'Moderate sodium', description: 'Some attention to salt intake' },
      { value: 1, label: 'Higher sodium', description: 'Regular processed/salty foods' },
      { value: 0, label: 'Very high sodium', description: 'Frequent high-sodium foods' }
    ]
  },
  {
    id: 'cooking_habits',
    text: 'How often do you cook meals at home?',
    required: true,
    options: [
      { value: 3, label: 'Most meals (5+ times per week)', description: 'Excellent cooking habits' },
      { value: 2, label: 'Regularly (3-4 times per week)', description: 'Good home cooking frequency' },
      { value: 1, label: 'Occasionally (1-2 times per week)', description: 'Limited home cooking' },
      { value: 0, label: 'Rarely or never', description: 'Heavy reliance on eating out' }
    ]
  },
  {
    id: 'snacking_habits',
    text: 'What types of snacks do you typically choose?',
    required: true,
    options: [
      { value: 3, label: 'Healthy snacks (fruits, nuts, yogurt)', description: 'Nutritious snack choices' },
      { value: 2, label: 'Mix of healthy and some processed snacks', description: 'Generally good snacks' },
      { value: 1, label: 'Mostly processed snacks (chips, cookies)', description: 'Less healthy snacking' },
      { value: 0, label: 'High-calorie, low-nutrient snacks', description: 'Poor snack choices' }
    ]
  },
  {
    id: 'breakfast',
    text: 'How often do you eat breakfast?',
    required: true,
    options: [
      { value: 3, label: 'Every day', description: 'Consistent breakfast habit' },
      { value: 2, label: 'Most days (5-6 per week)', description: 'Regular breakfast consumption' },
      { value: 1, label: 'Sometimes (2-4 per week)', description: 'Occasional breakfast' },
      { value: 0, label: 'Rarely or never', description: 'Frequently skip breakfast' }
    ]
  },
  {
    id: 'eating_awareness',
    text: 'How mindful are you while eating?',
    required: true,
    options: [
      { value: 3, label: 'Very mindful (focus on food, eat slowly)', description: 'Excellent eating awareness' },
      { value: 2, label: 'Somewhat mindful', description: 'Generally aware while eating' },
      { value: 1, label: 'Often distracted while eating', description: 'Limited eating awareness' },
      { value: 0, label: 'Always eating while distracted (TV, phone, work)', description: 'Mindless eating' }
    ]
  },
  {
    id: 'emotional_eating',
    text: 'How often do you eat in response to emotions rather than hunger?',
    required: true,
    options: [
      { value: 3, label: 'Rarely or never', description: 'Eat based on physical hunger' },
      { value: 2, label: 'Occasionally', description: 'Sometimes emotional eating' },
      { value: 1, label: 'Regularly', description: 'Frequent emotional eating' },
      { value: 0, label: 'Very often', description: 'Significant emotional eating pattern' }
    ]
  },
  {
    id: 'dietary_restrictions',
    text: 'Do you follow any specific dietary pattern or have food allergies?',
    required: true,
    options: [
      { value: 3, label: 'Balanced diet or healthy pattern (Mediterranean, DASH)', description: 'Evidence-based dietary approach' },
      { value: 2, label: 'Some dietary modifications for health', description: 'Health-conscious eating' },
      { value: 1, label: 'Restrictive dieting or fad diets', description: 'Potentially unsustainable approach' },
      { value: 0, label: 'No dietary considerations', description: 'No specific dietary focus' }
    ]
  },
  {
    id: 'supplement_use',
    text: 'Do you use dietary supplements appropriately?',
    required: true,
    options: [
      { value: 3, label: 'As recommended by healthcare provider', description: 'Appropriate supplementation' },
      { value: 2, label: 'Basic multivitamin or specific deficiency', description: 'Reasonable supplement use' },
      { value: 1, label: 'Multiple supplements without guidance', description: 'Excessive supplementation' },
      { value: 0, label: 'No supplements despite deficiencies', description: 'May need nutritional support' }
    ]
  },
  {
    id: 'nutrition_knowledge',
    text: 'How would you rate your nutrition knowledge?',
    required: true,
    options: [
      { value: 3, label: 'Very knowledgeable', description: 'Strong understanding of nutrition principles' },
      { value: 2, label: 'Moderately knowledgeable', description: 'Basic nutrition knowledge' },
      { value: 1, label: 'Limited knowledge', description: 'Some confusion about healthy eating' },
      { value: 0, label: 'Very limited knowledge', description: 'Need nutrition education' }
    ]
  },
  {
    id: 'food_labels',
    text: 'How often do you read nutrition labels when shopping?',
    required: true,
    options: [
      { value: 3, label: 'Always or almost always', description: 'Excellent label awareness' },
      { value: 2, label: 'Often', description: 'Regular label checking' },
      { value: 1, label: 'Sometimes', description: 'Occasional label reading' },
      { value: 0, label: 'Rarely or never', description: 'No label checking' }
    ]
  },
  {
    id: 'budget_impact',
    text: 'How does your food budget impact your nutritional choices?',
    required: true,
    options: [
      { value: 3, label: 'Can afford nutritious foods', description: 'No budget constraints on healthy eating' },
      { value: 2, label: 'Some budget considerations', description: 'Balances cost and nutrition' },
      { value: 1, label: 'Budget limits healthy choices', description: 'Financial barriers to nutrition' },
      { value: 0, label: 'Severe budget constraints', description: 'Significant food insecurity' }
    ]
  }
];

// Calculate the score and provide interpretation
const calculateScore = (answers: Record<string, string | number>) => {
  // Sum up all the numeric values from the answers
  const totalScore = Object.values(answers).reduce((sum, value) => sum + Number(value), 0);

  // Maximum possible score (3 points per question)
  const maxScore = questions.length * 3;
  const scorePercentage = Math.round((totalScore / maxScore) * 100);

  // Determine nutritional health level
  let riskLevel: 'low' | 'moderate' | 'high' | 'very-high';
  let interpretation: string;
  let recommendations: string[] = [];

  if (scorePercentage >= 80) {
    riskLevel = 'low';
    interpretation = "Your nutritional habits are excellent! You're making healthy food choices and maintaining good eating patterns that support optimal health.";
    recommendations = [
      'Continue your excellent nutritional habits and balanced eating patterns',
      'Share your knowledge and inspire others to make healthier food choices',
      'Stay informed about new nutrition research and recommendations',
      'Consider tracking your nutrient intake occasionally to ensure balance',
      'Maintain your mindful eating practices and portion control',
      'Continue to prioritize whole, minimally processed foods'
    ];
  } else if (scorePercentage >= 60) {
    riskLevel = 'low';
    interpretation = "Your nutritional habits are generally good, with room for some improvements. You're on the right track to better health through nutrition.";
    recommendations = [
      'Increase your intake of fruits and vegetables to at least 5 servings daily',
      'Choose whole grains over refined grains more consistently',
      'Reduce consumption of processed foods and sugary beverages',
      'Plan your meals ahead to maintain regular eating patterns',
      'Stay hydrated by drinking at least 8 glasses of water daily',
      'Practice mindful eating by slowing down and minimizing distractions',
      'Consider consulting a registered dietitian for personalized guidance',
      'Start reading nutrition labels to make more informed choices'
    ];
  } else if (scorePercentage >= 40) {
    riskLevel = 'moderate';
    interpretation = "Your nutritional habits need improvement. Making changes to your diet could significantly benefit your health and wellbeing.";
    recommendations = [
      'Consider consulting with a registered dietitian for a personalized nutrition plan',
      'Start with small, sustainable changes rather than overhauling your entire diet',
      'Focus on adding more fruits, vegetables, and whole grains to your daily meals',
      'Reduce processed foods, sugary drinks, and high-sodium items',
      'Establish regular meal times and avoid skipping meals, especially breakfast',
      'Learn proper portion sizes and practice portion control',
      'Cook more meals at home to have better control over ingredients',
      'Keep a food diary to identify patterns and areas for improvement',
      'Stay hydrated throughout the day with water instead of sugary beverages',
      'Address emotional eating patterns with healthier coping strategies'
    ];
  } else {
    riskLevel = 'high';
    interpretation = "Your current nutritional habits may be significantly impacting your health. Professional nutritional guidance is strongly recommended.";
    recommendations = [
      'Schedule an appointment with a registered dietitian or nutritionist immediately',
      'Discuss your eating patterns with your primary healthcare provider',
      'Address any underlying issues such as food insecurity, emotional eating, or eating disorders',
      'Start with one small positive change, such as drinking more water or adding one fruit daily',
      'Consider group nutrition education classes or cooking classes',
      'If budget is a concern, ask your dietitian about affordable healthy eating strategies',
      'Seek support from community resources, food banks, or nutrition assistance programs if needed',
      'Learn basic nutrition principles through reliable sources',
      'Set realistic, achievable goals with professional guidance',
      'Remember that improving nutrition is a journey, and small steps count',
      'Address any medical conditions that may be affected by poor nutrition',
      'Consider therapy if emotional or disordered eating patterns are present'
    ];
  }

  return {
    score: scorePercentage,
    interpretation,
    recommendations,
    riskLevel
  };
};

const NutritionAssessment: React.FC = () => {
  return (
    <AssessmentTemplate
      id="nutrition"
      title="Nutritional Health Assessment"
      description="Analyze your diet and eating habits to identify areas for improvement"
      introduction="This comprehensive nutritional assessment evaluates various aspects of your eating habits, food choices, and relationship with food. Good nutrition is fundamental to overall health, disease prevention, and quality of life. This assessment can help identify areas where you're doing well and areas that may benefit from improvement. Please answer honestly for the most accurate assessment. This is not a diagnostic tool and should not replace consultation with a registered dietitian or healthcare provider."
      questions={questions}
      calculateScore={calculateScore}
    />
  );
};

export default NutritionAssessment;

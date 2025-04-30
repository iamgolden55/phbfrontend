import React, { useState } from 'react';

interface NutrientInfo {
  name: string;
  importance: string;
  sources: string[];
  recommended: string;
  tips: string;
}

interface MealIdea {
  title: string;
  description: string;
  ingredients: string[];
  nutrition: {
    calories: string;
    protein: string;
    iron: string;
    calcium: string;
  };
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  trimester: number[]; // Which trimesters this is good for (1, 2, 3)
}

const keyNutrients: NutrientInfo[] = [
  {
    name: 'Folate/Folic Acid',
    importance: 'Critical for preventing neural tube defects and supporting the baby\'s brain and spinal cord development.',
    sources: ['Leafy greens', 'Citrus fruits', 'Beans', 'Fortified cereals', 'Broccoli'],
    recommended: '600-800 mcg daily',
    tips: 'Start taking prenatal vitamins with folic acid before conception if possible.'
  },
  {
    name: 'Iron',
    importance: 'Essential for creating extra blood for you and your baby and preventing anemia.',
    sources: ['Lean red meat', 'Poultry', 'Fish', 'Beans', 'Lentils', 'Spinach', 'Iron-fortified cereals'],
    recommended: '27 mg daily',
    tips: 'Pair iron-rich foods with vitamin C for better absorption.'
  },
  {
    name: 'Calcium',
    importance: 'Builds your baby\'s bones, teeth, heart, and nerves. Prevents loss from your own bones.',
    sources: ['Dairy products', 'Fortified plant milks', 'Tofu', 'Almonds', 'Leafy greens'],
    recommended: '1,000 mg daily',
    tips: 'If you don\'t consume dairy, ensure you get calcium from other sources or supplements.'
  },
  {
    name: 'Protein',
    importance: 'Critical for your baby\'s tissue growth and your increased blood supply.',
    sources: ['Meat', 'Poultry', 'Fish', 'Eggs', 'Beans', 'Lentils', 'Tofu', 'Dairy', 'Nuts'],
    recommended: '75-100 g daily',
    tips: 'Distribute protein intake throughout the day for best utilization.'
  },
  {
    name: 'Omega-3 Fatty Acids',
    importance: 'Supports brain and eye development in your baby.',
    sources: ['Low-mercury fatty fish (salmon, sardines)', 'Walnuts', 'Flaxseeds', 'Chia seeds', 'Fortified foods'],
    recommended: '200-300 mg DHA daily',
    tips: 'If you don\'t eat fish, consider a DHA supplement approved by your healthcare provider.'
  },
  {
    name: 'Vitamin D',
    importance: 'Helps calcium absorption and supports immune function, bone growth, and cell division.',
    sources: ['Sunlight exposure', 'Fortified milk', 'Fatty fish', 'Egg yolks'],
    recommended: '600 IU daily',
    tips: 'Many women need supplementation, especially in winter or with limited sun exposure.'
  },
];

const mealIdeas: MealIdea[] = [
  {
    title: 'Iron-Boosting Breakfast Bowl',
    description: 'A nutritious bowl of iron-fortified cereal with berries and nuts to start your day with energy.',
    ingredients: ['Iron-fortified cereal', 'Sliced strawberries', 'Blueberries', 'Chopped walnuts', 'Low-fat milk or fortified plant milk'],
    nutrition: {
      calories: '350-400',
      protein: '10-15g',
      iron: '8-10mg',
      calcium: '300mg'
    },
    mealType: 'breakfast',
    trimester: [1, 2, 3]
  },
  {
    title: 'Morning Sickness Soothing Toast',
    description: 'A gentle breakfast option that can help calm morning sickness in early pregnancy.',
    ingredients: ['Whole grain toast', 'Thin layer of butter or nut butter', 'Sliced banana', 'Cinnamon', 'Ginger tea on the side'],
    nutrition: {
      calories: '250-300',
      protein: '5-8g',
      iron: '1-2mg',
      calcium: '50mg'
    },
    mealType: 'breakfast',
    trimester: [1]
  },
  {
    title: 'Spinach and Feta Omelette',
    description: 'Protein-packed eggs with iron-rich spinach and calcium from cheese.',
    ingredients: ['2 eggs', 'Fresh spinach', 'Feta cheese', 'Cherry tomatoes', 'Whole grain toast'],
    nutrition: {
      calories: '350-400',
      protein: '20g',
      iron: '3-4mg',
      calcium: '200mg'
    },
    mealType: 'breakfast',
    trimester: [2, 3]
  },
  {
    title: 'Mediterranean Chickpea Salad',
    description: 'A refreshing lunch rich in protein, fiber, and essential vitamins.',
    ingredients: ['Chickpeas', 'Cucumber', 'Cherry tomatoes', 'Feta cheese', 'Olives', 'Olive oil and lemon dressing'],
    nutrition: {
      calories: '400-450',
      protein: '15g',
      iron: '4mg',
      calcium: '150mg'
    },
    mealType: 'lunch',
    trimester: [1, 2, 3]
  },
  {
    title: 'Salmon and Quinoa Bowl',
    description: 'Omega-3 rich salmon with complete protein from quinoa and vegetables.',
    ingredients: ['Baked salmon fillet', 'Cooked quinoa', 'Steamed broccoli', 'Avocado slices', 'Lemon-tahini dressing'],
    nutrition: {
      calories: '450-500',
      protein: '30g',
      iron: '2-3mg',
      calcium: '100mg'
    },
    mealType: 'lunch',
    trimester: [1, 2, 3]
  },
  {
    title: 'Bean and Veggie Wrap',
    description: 'A portable lunch option packed with fiber, protein and iron.',
    ingredients: ['Whole grain tortilla', 'Black or pinto beans', 'Bell peppers', 'Spinach', 'Avocado', 'Greek yogurt sauce'],
    nutrition: {
      calories: '400-450',
      protein: '15g',
      iron: '3-4mg',
      calcium: '150mg'
    },
    mealType: 'lunch',
    trimester: [1, 2, 3]
  },
  {
    title: 'Slow Cooker Lentil Soup',
    description: 'A comforting dinner high in plant protein, iron, and fiber.',
    ingredients: ['Red lentils', 'Carrots', 'Celery', 'Onion', 'Tomatoes', 'Spinach', 'Whole grain bread'],
    nutrition: {
      calories: '350-400',
      protein: '18g',
      iron: '6-7mg',
      calcium: '100mg'
    },
    mealType: 'dinner',
    trimester: [1, 2, 3]
  },
  {
    title: 'Baked Chicken with Sweet Potato',
    description: 'A satisfying dinner with lean protein and vitamin A-rich sweet potato.',
    ingredients: ['Baked chicken breast', 'Roasted sweet potato', 'Steamed green beans', 'Olive oil and herbs'],
    nutrition: {
      calories: '450-500',
      protein: '35g',
      iron: '3mg',
      calcium: '80mg'
    },
    mealType: 'dinner',
    trimester: [1, 2, 3]
  },
  {
    title: 'Calcium-Rich Smoothie',
    description: 'A refreshing snack packed with calcium and protein.',
    ingredients: ['Greek yogurt', 'Frozen berries', 'Banana', 'Spinach', 'Chia seeds', 'Almond butter'],
    nutrition: {
      calories: '250-300',
      protein: '15g',
      iron: '1mg',
      calcium: '350mg'
    },
    mealType: 'snack',
    trimester: [1, 2, 3]
  },
  {
    title: 'Hummus and Veggie Sticks',
    description: 'A protein and fiber-rich snack that helps with digestion.',
    ingredients: ['Hummus', 'Carrot sticks', 'Cucumber slices', 'Bell pepper strips', 'Whole grain crackers'],
    nutrition: {
      calories: '200-250',
      protein: '8g',
      iron: '1-2mg',
      calcium: '50mg'
    },
    mealType: 'snack',
    trimester: [1, 2, 3]
  }
];

const trimesterGuidelines = [
  {
    number: 1,
    title: 'First Trimester (Weeks 1-12)',
    description: 'Focus on quality over quantity. Many women experience nausea and food aversions during this time.',
    tips: [
      'Eat small, frequent meals to manage nausea',
      'Focus on folate-rich foods',
      'Stay hydrated with water, ginger tea, or lemon water',
      'Take your prenatal vitamin (ideally at night with food if experiencing nausea)',
      'Don\'t worry about perfect nutrition if experiencing morning sickness'
    ],
    nutrients: ['Folate/Folic Acid', 'Iron', 'Vitamin B6']
  },
  {
    number: 2,
    title: 'Second Trimester (Weeks 13-26)',
    description: 'As nausea typically subsides, focus on increasing nutrient-dense foods for your growing baby.',
    tips: [
      'Increase calcium intake for baby\'s developing bones',
      'Consume adequate protein (75-100g daily)',
      'Include iron-rich foods to prevent anemia',
      'Add omega-3 fatty acids for baby\'s brain development',
      'Begin to add an extra 300 calories per day'
    ],
    nutrients: ['Calcium', 'Protein', 'Iron', 'Omega-3 Fatty Acids']
  },
  {
    number: 3,
    title: 'Third Trimester (Weeks 27-40)',
    description: 'Your baby is growing rapidly, requiring more calories and nutrients.',
    tips: [
      'Add an extra 450 calories per day from nutrient-dense foods',
      'Continue high calcium intake for baby\'s developing skeleton',
      'Eat more fiber and stay hydrated to combat constipation',
      'Consume regular protein for baby\'s growth',
      'Eat smaller, more frequent meals as your stomach gets compressed'
    ],
    nutrients: ['Calcium', 'Protein', 'Vitamin D', 'Fiber']
  }
];

const foodsToAvoid = [
  {
    category: 'Raw or Undercooked Foods',
    items: ['Raw meat, poultry, and seafood', 'Raw or undercooked eggs', 'Raw sprouts', 'Unpasteurized milk and cheeses'],
    reason: 'Risk of bacterial contamination such as Salmonella, E. coli, and Listeria'
  },
  {
    category: 'Certain Seafood',
    items: ['High-mercury fish (shark, swordfish, king mackerel, tilefish)', 'Raw shellfish', 'Excessive tuna (limit albacore)'],
    reason: 'Mercury and other contaminants can damage baby\'s developing nervous system'
  },
  {
    category: 'Certain Deli Items',
    items: ['Unpasteurized soft cheeses (feta, brie, blue cheese)', 'Deli meats and hot dogs (unless heated until steaming)'],
    reason: 'Risk of Listeria contamination, which can cause serious infection'
  },
  {
    category: 'Beverages',
    items: ['Alcohol (all types and amounts)', 'Excessive caffeine (limit to 200mg/day)', 'Unpasteurized juices'],
    reason: 'Alcohol can cause serious birth defects; excess caffeine may increase risk of miscarriage'
  }
];

const PregnancyNutritionGuide: React.FC = () => {
  const [activeTrimester, setActiveTrimester] = useState<number>(1);
  const [activeMealType, setActiveMealType] = useState<'all' | 'breakfast' | 'lunch' | 'dinner' | 'snack'>('all');
  const [selectedNutrient, setSelectedNutrient] = useState<NutrientInfo | null>(null);

  // Filter meals based on active trimester and meal type
  const filteredMeals = mealIdeas.filter(meal =>
    (activeTrimester === 0 || meal.trimester.includes(activeTrimester)) &&
    (activeMealType === 'all' || meal.mealType === activeMealType)
  );

  // Handle nutrient selection for detailed view
  const handleNutrientClick = (nutrient: NutrientInfo) => {
    setSelectedNutrient(nutrient === selectedNutrient ? null : nutrient);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Pregnancy Nutrition Guide</h2>

        {/* Trimester Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-6">
            <button
              className={`pb-4 px-2 ${activeTrimester === 0
                ? 'border-b-2 border-[#005eb8] text-[#005eb8] font-medium'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTrimester(0)}
            >
              All Trimesters
            </button>
            {trimesterGuidelines.map(trimester => (
              <button
                key={trimester.number}
                className={`pb-4 px-2 ${activeTrimester === trimester.number
                  ? 'border-b-2 border-[#005eb8] text-[#005eb8] font-medium'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                onClick={() => setActiveTrimester(trimester.number)}
              >
                {trimester.title.split(' ')[0]}
              </button>
            ))}
          </nav>
        </div>

        {/* Trimester Guidelines (if a specific trimester is selected) */}
        {activeTrimester > 0 && (
          <div className="mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-blue-800 mb-2">
                {trimesterGuidelines[activeTrimester - 1].title}
              </h3>
              <p className="mb-4">
                {trimesterGuidelines[activeTrimester - 1].description}
              </p>
              <div className="mb-4">
                <h4 className="font-medium text-blue-800 mb-2">Focus on these nutrients:</h4>
                <div className="flex flex-wrap gap-2">
                  {trimesterGuidelines[activeTrimester - 1].nutrients.map(nutrient => (
                    <span key={nutrient} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {nutrient}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Nutrition Tips:</h4>
                <ul className="list-disc pl-5 space-y-1 text-blue-800">
                  {trimesterGuidelines[activeTrimester - 1].tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Meal Type Filters */}
        <div className="mb-6">
          <h3 className="font-bold mb-3">Meal Ideas</h3>
          <div className="flex flex-wrap gap-2">
            {['all', 'breakfast', 'lunch', 'dinner', 'snack'].map(type => (
              <button
                key={type}
                className={`px-4 py-2 rounded-md text-sm ${
                  activeMealType === type
                    ? 'bg-[#005eb8] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveMealType(type as typeof activeMealType)}
              >
                {type === 'all' ? 'All Meals' : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Meal Ideas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {filteredMeals.map((meal, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-lg">{meal.title}</h4>
                <div>
                  <span className={`
                    inline-block px-2 py-0.5 rounded-full text-xs font-medium
                    ${meal.mealType === 'breakfast' ? 'bg-yellow-100 text-yellow-800' :
                      meal.mealType === 'lunch' ? 'bg-green-100 text-green-800' :
                      meal.mealType === 'dinner' ? 'bg-purple-100 text-purple-800' :
                      'bg-blue-100 text-blue-800'
                    }
                  `}>
                    {meal.mealType.charAt(0).toUpperCase() + meal.mealType.slice(1)}
                  </span>
                </div>
              </div>

              <p className="text-gray-700 my-2">{meal.description}</p>

              <div className="mb-3">
                <h5 className="font-medium text-sm mb-1">Ingredients:</h5>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-0.5">
                  {meal.ingredients.map((ingredient, idx) => (
                    <li key={idx}>{ingredient}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 p-2 rounded-md text-sm">
                <div className="font-medium text-gray-700 mb-1">Nutrition (approximate):</div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-gray-500">Calories:</span> {meal.nutrition.calories}
                  </div>
                  <div>
                    <span className="text-gray-500">Protein:</span> {meal.nutrition.protein}
                  </div>
                  <div>
                    <span className="text-gray-500">Iron:</span> {meal.nutrition.iron}
                  </div>
                  <div>
                    <span className="text-gray-500">Calcium:</span> {meal.nutrition.calcium}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Key Nutrients Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Essential Nutrients During Pregnancy</h3>
          <p className="mb-4">
            These key nutrients are particularly important during pregnancy for both your health and your baby's development.
            Click on each nutrient to learn more about food sources and recommended intake.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {keyNutrients.map((nutrient, index) => (
              <div
                key={index}
                className={`border rounded-lg overflow-hidden cursor-pointer transition-shadow hover:shadow-md
                  ${selectedNutrient === nutrient ? 'border-[#005eb8] border-2' : 'border-gray-200'}`}
                onClick={() => handleNutrientClick(nutrient)}
              >
                <div className="p-4">
                  <h4 className="font-bold mb-2">{nutrient.name}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">{nutrient.importance}</p>
                  {selectedNutrient === nutrient && (
                    <div className="mt-3 border-t pt-3">
                      <p className="text-sm mb-2">
                        <span className="font-medium">Recommended:</span> {nutrient.recommended}
                      </p>
                      <div className="mb-2">
                        <p className="text-sm font-medium mb-1">Food Sources:</p>
                        <ul className="list-disc pl-5 text-sm text-gray-600 space-y-0.5">
                          {nutrient.sources.map((source, idx) => (
                            <li key={idx}>{source}</li>
                          ))}
                        </ul>
                      </div>
                      <p className="text-sm italic">{nutrient.tips}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Foods to Avoid Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Foods to Avoid During Pregnancy</h3>
          <p className="mb-4">
            While most foods are safe during pregnancy, some pose risks to your baby's development or increase the chance of foodborne illness, which can be more serious when pregnant.
          </p>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">
              Always consult with your healthcare provider about specific food restrictions based on your health needs and local food safety guidelines.
            </p>
          </div>

          <div className="space-y-4">
            {foodsToAvoid.map((category, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold mb-2">{category.category}</h4>
                <ul className="list-disc pl-5 mb-2">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="text-gray-700">{item}</li>
                  ))}
                </ul>
                <p className="text-sm text-gray-600 italic">{category.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PregnancyNutritionGuide;

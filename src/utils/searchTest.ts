import { searchContent } from './searchService';

/**
 * Simple test function to verify search functionality
 */
async function testSearch() {
  console.log('Testing search functionality...');
  
  // Test cases
  const testQueries = [
    'Narcolepsy',
    'High Blood Pressure',
    'headache',
    'tired',
    'sleep',
    'heart',
    'misspelled',
    'anxity', // Misspelling of anxiety
    'depresion', // Misspelling of depression
    'hi blod presure', // Misspelling of high blood pressure
  ];
  
  // Run each test query
  for (const query of testQueries) {
    console.log(`\n\nSearching for: "${query}"...`);
    const results = await searchContent(query);
    
    console.log(`Found ${results.length} results:`);
    results.forEach((result, index) => {
      console.log(`${index + 1}. ${result.title} (${result.category}) - ${result.url}`);
      console.log(`   ${result.description.substring(0, 100)}...`);
    });
  }
}

// Run the test
testSearch().catch(console.error);

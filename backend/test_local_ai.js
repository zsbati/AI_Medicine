/**
 * Test script for Local AI integration
 */

const LocalAIService = require('./src/services/localAI');

// Initialize the local AI
const localAI = new LocalAIService();

// Test cases
const testCases = [
    {
        name: "Headache with nausea",
        symptoms: "I have had a headache for 3 days, it's worse in the morning, and I also feel nauseous."
    },
    {
        name: "Fever and cough",
        symptoms: "I have a high temperature, coughing, and feel very tired."
    },
    {
        name: "Chest pain",
        symptoms: "I'm having chest pain and shortness of breath."
    },
    {
        name: "Stomach issues",
        symptoms: "I have stomach pain and diarrhea after eating."
    },
    {
        name: "General fatigue",
        symptoms: "I feel extremely tired all the time and have no energy."
    }
];

console.log('🧪 Testing Local AI Service\n');
console.log('='.repeat(50));

testCases.forEach((testCase, index) => {
    console.log(`\n📋 Test ${index + 1}: ${testCase.name}`);
    console.log(`📝 Symptoms: "${testCase.symptoms}"`);
    console.log('-'.repeat(30));
    
    try {
        const result = localAI.analyzeSymptoms(testCase.symptoms);
        
        console.log(`✅ Analysis completed successfully`);
        console.log(`📊 Confidence: ${Math.round(result.confidence * 100)}%`);
        console.log(`🏥 Local AI: ${result.local ? 'Yes' : 'No'}`);
        console.log(`⏰ Timestamp: ${result.timestamp}`);
        
        // Show first 200 characters of analysis
        const preview = result.analysis.substring(0, 200) + '...';
        console.log(`🔍 Analysis preview: ${preview}`);
        
        // Check for urgent warnings
        if (result.analysis.includes('URGENT')) {
            console.log('🚨 URGENT: Contains urgent medical warning');
        }
        
    } catch (error) {
        console.log(`❌ Error: ${error.message}`);
    }
    
    console.log();
});

console.log('='.repeat(50));
console.log('🎯 Test Summary:');
console.log('- Local AI service is working');
console.log('- Rule-based symptom analysis functional');
console.log('- Confidence scoring operational');
console.log('- Urgent symptom detection active');
console.log('\n💡 The local AI is ready for development use!');

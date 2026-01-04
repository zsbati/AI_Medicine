/**
 * Test Medical Content Generator
 * Shows how to use the medical content generation with Windsurf AI
 */

const MedicalContentGenerator = require('./src/services/medicalContentGenerator');

async function testMedicalContent() {
    const generator = new MedicalContentGenerator();
    
    console.log('=== Medical Content Generator Test ===\n');
    
    // Test 1: Patient Summary
    console.log('1. Patient Summary Test:');
    const summary = await generator.generatePatientSummary(
        "headache and nausea",
        "3 days",
        "moderate"
    );
    console.log('Prompt for Windsurf AI (Ctrl+Shift+I):');
    console.log(summary.prompt);
    console.log('\n---\n');
    
    // Test 2: Patient Education
    console.log('2. Patient Education Test:');
    const education = await generator.generatePatientEducation(
        "diabetes",
        "simple"
    );
    console.log('Prompt for Windsurf AI (Ctrl+Shift+I):');
    console.log(education.prompt);
    console.log('\n---\n');
    
    // Test 3: Drug Explanation
    console.log('3. Drug Explanation Test:');
    const drugInfo = await generator.generateDrugExplanation(
        "Metformin",
        "treats type 2 diabetes"
    );
    console.log('Prompt for Windsurf AI (Ctrl+Shift+I):');
    console.log(drugInfo.prompt);
    console.log('\n---\n');
    
    console.log('=== Instructions ===');
    console.log('1. Start your server: node server.js');
    console.log('2. Use these endpoints with POST requests:');
    console.log('   - POST /api/medical-content/summary');
    console.log('   - POST /api/medical-content/education');
    console.log('   - POST /api/medical-content/drug-info');
    console.log('3. When you get the prompt, use Windsurf AI (Ctrl+Shift+I)');
    console.log('4. Replace the template content with AI-generated text');
}

testMedicalContent().catch(console.error);

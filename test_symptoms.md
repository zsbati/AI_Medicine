# Test Symptoms for Medical AI Demo

## Common Test Cases

### 1. Headache Case
**Symptoms:** "I have had a headache for 3 days, it's worse in the morning, and I also feel nauseous."

### 2. Fever Case  
**Symptoms:** "I have a high temperature, coughing, and feel very tired for the last 2 days."

### 3. Chest Pain Case (Urgent)
**Symptoms:** "I'm having chest pain and shortness of breath that started 1 hour ago."

### 4. Stomach Issues
**Symptoms:** "I have stomach pain and diarrhea after eating for the past day."

### 5. Fatigue Case
**Symptoms:** "I feel extremely tired all the time and have no energy for the past week."

### 6. Cold Symptoms
**Symptoms:** "I have a runny nose, sore throat, and sneezing for 3 days."

### 7. Back Pain
**Symptoms:** "I have lower back pain that radiates down my leg when I sit."

### 8. Dizziness
**Symptoms:** "I feel dizzy and lightheaded when I stand up quickly."

## How to Use

1. Copy any symptom from above
2. Go to `http://localhost:3000`
3. Navigate to Symptom Checker
4. Paste the symptoms
5. Click "Analyze Symptoms"
6. Use `Ctrl+Shift+I` with the generated prompt

## Expected Results

Each case should provide:
- Possible conditions
- Next steps
- When to seek medical attention
- General wellness advice

## Safety Notes

- Case #3 (Chest Pain) should trigger urgent care recommendations
- All results include medical disclaimers
- This is for demonstration purposes only

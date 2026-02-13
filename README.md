# AI Medicine

An intelligent healthcare platform that leverages artificial intelligence to enhance medical diagnosis, treatment recommendations, and patient care.

## Features

- **Intelligent Diagnosis**: AI-powered symptom analysis using Windsurf AI
- **Treatment Recommendations**: Personalized treatment suggestions based on patient data
- **Medical Image Analysis**: Advanced image processing for X-rays, MRIs, and CT scans
- **Patient Management**: Comprehensive patient record management system
- **Drug Interaction Checker**: Automated detection of potential drug interactions

## Technology Stack

### Backend
- **Framework**: Node.js with Express
- **Database**: PostgreSQL (planned)
- **AI Integration**: Windsurf AI (built-in)
- **API**: RESTful API

### Frontend
- **Framework**: React
- **UI Components**: Tailwind CSS
- **State Management**: React Query
- **Charts**: Chart.js for medical data visualization

## Getting Started

### Prerequisites
- Node.js 14+
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/zsbati/AI_Medicine.git
cd AI_Medicine
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

### Running the Application

**You need 2 terminals:**

**Terminal 1 - Backend:**
```bash
cd C:\Users\35196\AImed\backend
node server.js
```
This starts the AI server on port 5000

**Terminal 2 - Frontend:**
```bash
cd C:\Users\35196\AImed\frontend
npm start
```
This starts the website on port 3000

### Using the Medical AI

1. Open your browser and go to `http://localhost:3000`
2. Navigate to the Symptom Checker page
3. Enter your symptoms (minimum 10 characters)
4. Click "Analyze Symptoms"
5. The system will provide a prompt for Windsurf AI
6. Use `Ctrl+Shift+I` to open Windsurf AI
7. Paste the prompt and get AI-generated medical insights
8. Use the AI response for your medical records

### API Endpoints

- `GET /api/health` - Check if backend is running
- `POST /api/analyze-symptoms` - Analyze symptoms with AI

**Example API usage:**
```bash
curl -X POST http://localhost:5000/api/analyze-symptoms \
  -H "Content-Type: application/json" \
  -d '{"symptoms":"I have headache and nausea for 2 days"}'
```

## How It Works

1. **Symptom Input**: Patients enter symptoms through the web interface
2. **Prompt Generation**: The system creates a medical analysis prompt
3. **Windsurf AI**: Uses built-in Windsurf AI (`Ctrl+Shift+I`) to analyze symptoms
4. **Medical Insights**: Returns possible conditions, recommendations, and when to seek help
5. **Disclaimer**: Always includes medical disclaimer about professional consultation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This software is for educational and research purposes only. It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare providers with any questions you may have regarding a medical condition.

## Contact

Zbati - [@zsbati](https://github.com/zsbati)
Email: zbati123@gmail.com

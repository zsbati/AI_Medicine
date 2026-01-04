import React, { useState } from 'react';
import './PatientForm.css';

const PatientForm = () => {
    const [symptoms, setSymptoms] = useState('');
    const [duration, setDuration] = useState('');
    const [severity, setSeverity] = useState('moderate');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const response = await fetch('http://127.0.0.1:5000/api/medical-content/summary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    symptoms,
                    duration,
                    severity
                })
            });

            const data = await response.json();
            
            if (data.success) {
                setResult(data.data);
            } else {
                setError('Failed to generate summary');
            }
        } catch (err) {
            setError('Error connecting to server. Make sure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    const copyPrompt = () => {
        if (result && result.prompt) {
            navigator.clipboard.writeText(result.prompt);
            alert('Prompt copied! Use Ctrl+Shift+I in Windsurf to get AI response.');
        }
    };

    return (
        <div className="patient-form">
            <div className="form-container">
                <h2>Medical Symptom Form</h2>
                <p>Enter your symptoms to get a medical summary</p>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="symptoms">Symptoms:</label>
                        <textarea
                            id="symptoms"
                            value={symptoms}
                            onChange={(e) => setSymptoms(e.target.value)}
                            placeholder="Describe your symptoms (e.g., headache, nausea, fever)"
                            required
                            rows="4"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="duration">Duration:</label>
                        <input
                            type="text"
                            id="duration"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            placeholder="How long have you had these symptoms? (e.g., 2 days, 1 week)"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="severity">Severity:</label>
                        <select
                            id="severity"
                            value={severity}
                            onChange={(e) => setSeverity(e.target.value)}
                        >
                            <option value="mild">Mild</option>
                            <option value="moderate">Moderate</option>
                            <option value="severe">Severe</option>
                        </select>
                    </div>

                    <button type="submit" disabled={loading} className="submit-btn">
                        {loading ? 'Processing...' : 'Generate Medical Summary'}
                    </button>
                </form>

                {error && <div className="error">{error}</div>}

                {result && (
                    <div className="result">
                        <h3>AI Prompt Generated</h3>
                        <div className="prompt-box">
                            <p>{result.prompt}</p>
                            <button onClick={copyPrompt} className="copy-btn">
                                Copy Prompt for Windsurf AI
                            </button>
                        </div>
                        <div className="instructions">
                            <h4>Next Steps:</h4>
                            <ol>
                                <li>Click "Copy Prompt for Windsurf AI"</li>
                                <li>Press <kbd>Ctrl+Shift+I</kbd> to open Windsurf AI</li>
                                <li>Paste the prompt and get AI response</li>
                                <li>Use the AI response for your medical records</li>
                            </ol>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientForm;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileHeader } from '../components/ProfileHeader';
import { useFirebase } from '../context/Firebase';

/**
 * DailyCheckin Component
 * Multi-step carbon footprint questionnaire
 * Firebase-enabled version
 */
export const DailyCheckin = () => {
  const navigate = useNavigate();
  const { user, profile, updateProfile, loading } = useFirebase();

  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Transport", "Food", "Energy", "Lifestyle", "Summary"];

  const [answers, setAnswers] = useState({
    transportMode: '',
    distance: '',
    carpooling: false,
    flight: 'No',

    dietType: '',
    dairyUsage: 'None',
    foodWaste: 'None',

    energyUsage: 'Average',
    climateUsage: 'None',
    energySource: 'Mixed',

    purchases: 'None',
    plasticUsage: 'None',
    waterUsage: 'Average',
    positiveActions: []
  });

  const [totalCO2, setTotalCO2] = useState(0);
  const [ecoScore, setEcoScore] = useState(100);

  // --- Calculate CO2 impact ---
  const calculateImpact = () => {
    let co2 = 0;

    const transportWeights = { Walk: 0, Bicycle: 0, "Public Transport": 1.5, Car: 8, "Cab / Ride-share": 10, "Work From Home": 0 };
    const distanceWeights = { '<5 km': 0.5, '5–15 km': 1.0, '15+ km': 2.0 };

    if (answers.transportMode) {
      let base = transportWeights[answers.transportMode] || 0;
      let distMult = distanceWeights[answers.distance] || 1;
      let transportImpact = base * distMult;
      if (answers.carpooling && (answers.transportMode === 'Car' || answers.transportMode === 'Cab / Ride-share')) {
        transportImpact *= 0.6;
      }
      co2 += transportImpact;
    }

    if (answers.flight === 'Short flight') co2 += 150;
    if (answers.flight === 'Long flight') co2 += 450;

    const dietWeights = { Vegan: 1.5, Vegetarian: 2.5, Mixed: 4.5, 'Heavy meat-based': 8.5 };
    co2 += dietWeights[answers.dietType] || 0;

    if (answers.dairyUsage === 'Some') co2 += 1.2;
    if (answers.dairyUsage === 'A lot') co2 += 2.5;

    if (answers.foodWaste === 'Small amount') co2 += 1;
    if (answers.foodWaste === 'Large amount') co2 += 3;

    const usageWeights = { Minimal: 0.8, Average: 2.5, Heavy: 5.5 };
    const climateWeights = { None: 0, '<2 hours': 1.5, '2–6 hours': 4, '6+ hours': 8 };
    const sourceMultipliers = { 'Mostly renewable': 0.2, Mixed: 1, 'Mostly fossil fuels': 2.2 };

    let energyBase = (usageWeights[answers.energyUsage] || 0) + (climateWeights[answers.climateUsage] || 0);
    co2 += energyBase * (sourceMultipliers[answers.energySource] || 1);

    if (answers.purchases === 'Essential') co2 += 1.5;
    if (answers.purchases === 'Non-essential') co2 += 4.5;

    if (answers.plasticUsage === '1–2 items') co2 += 0.5;
    if (answers.plasticUsage === 'Many') co2 += 2;

    if (answers.waterUsage === 'Average') co2 += 0.5;
    if (answers.waterUsage === 'High') co2 += 1.5;

    co2 -= answers.positiveActions.length * 1.2;

    const finalCO2 = Math.max(0, parseFloat(co2.toFixed(1)));
    setTotalCO2(finalCO2);

    const score = Math.max(0, Math.min(100, Math.round(100 - (finalCO2 / 30) * 100)));
    setEcoScore(score);
  };

  useEffect(() => {
    calculateImpact();
  }, [answers]);

  const handleOptionSelect = (field, value) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const togglePositiveAction = (action) => {
    setAnswers(prev => {
      const exists = prev.positiveActions.includes(action);
      if (exists) {
        return { ...prev, positiveActions: prev.positiveActions.filter(a => a !== action) };
      } else {
        return { ...prev, positiveActions: [...prev.positiveActions, action] };
      }
    });
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  // --- Save to Firebase ---
  const handleSave = async () => {
  if (!profile || !user) return;

  const todayKey = new Date().toDateString();
  const updatedHeatmap = { ...profile.heatmap, [todayKey]: Math.round((100 - ecoScore) / 20) };
  const updatedProfile = {
    ...profile,
    heatmap: updatedHeatmap,
    streak: (profile.streak || 0) + 1,
    lastCheckin: new Date().toISOString()
  };

  // Pass the actual user UID
  await updateProfile(user.uid, updatedProfile);
  navigate('/dashboard');
};


  if (loading) return null;

  // --- UI Helpers ---
  const StepIndicator = () => (
    <div className="flex justify-between items-center mb-10 overflow-x-auto pb-4 no-scrollbar">
      {steps.map((step, idx) => (
        <div key={step} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
              idx === currentStep ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' :
              idx < currentStep ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
            }`}>
              {idx < currentStep ? '✓' : idx + 1}
            </div>
            <span className={`text-[10px] uppercase font-bold tracking-wider ${
              idx === currentStep ? 'text-emerald-600' : 'text-slate-400'
            }`}>{step}</span>
          </div>
          {idx < steps.length - 1 && (
            <div className={`h-[2px] flex-1 mx-4 min-w-[20px] rounded-full ${
              idx < currentStep ? 'bg-emerald-200' : 'bg-slate-100'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const OptionGroup = ({ label, field, options, current, icons = {} }) => (
    <div className="mb-8">
      <label className="block text-slate-800 font-bold mb-4 text-left">{label}</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => handleOptionSelect(field, opt)}
            className={`py-5 px-3 rounded-2xl text-sm font-bold transition-all border-2 text-center active:scale-95 flex flex-col items-center justify-center gap-2 min-h-[100px] ${
              current === opt
                ? 'border-emerald-600 bg-emerald-50 text-emerald-700 shadow-md'
                : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'
            }`}
          >
            {icons[opt] ? <span className="text-3xl mb-1">{icons[opt]}</span> : null}
            <span className="leading-tight">{opt}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const MultiSelectGroup = ({ label, options, selected }) => (
    <div className="mb-8">
      <label className="block text-slate-800 font-bold mb-4 text-left">{label}</label>
      <div className="flex flex-wrap gap-3">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => togglePositiveAction(opt)}
            className={`py-3 px-6 rounded-full text-sm font-bold transition-all border-2 active:scale-95 ${
              selected.includes(opt)
                ? 'border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-100'
                : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  // --- Render Steps ---
  const renderStep = () => {
    switch (currentStep) {
      // ------------------ Transport ------------------
      case 0:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-black text-slate-800 mb-2 flex items-center gap-2">
              <span>🚗</span> Transport
            </h2>
            <p className="text-slate-500 mb-8">How did you get around today?</p>

            <OptionGroup
              label="Primary mode of transport"
              field="transportMode"
              options={["Walk", "Bicycle", "Public Transport", "Car", "Cab / Ride-share", "Work From Home"]}
              current={answers.transportMode}
              icons={{
                "Walk": "🚶",
                "Bicycle": "🚲",
                "Public Transport": "🚌",
                "Car": "🚗",
                "Cab / Ride-share": "🚕",
                "Work From Home": "🏠"
              }}
            />

            {(answers.transportMode === 'Car' || answers.transportMode === 'Cab / Ride-share') && (
              <>
                <OptionGroup
                  label="Distance traveled"
                  field="distance"
                  options={["<5 km", "5–15 km", "15+ km"]}
                  current={answers.distance}
                  icons={{
                    "<5 km": "📍",
                    "5–15 km": "🛣️",
                    "15+ km": "🏁"
                  }}
                />
                <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-3xl mb-8">
                  <div className="flex-1">
                    <p className="font-bold text-slate-800">Did you carpool?</p>
                    <p className="text-sm text-slate-500">Sharing rides significantly lowers your impact.</p>
                  </div>
                  <button 
                    onClick={() => handleOptionSelect('carpooling', !answers.carpooling)}
                    className={`w-16 h-8 rounded-full relative transition-colors ${answers.carpooling ? 'bg-emerald-500' : 'bg-slate-300'}`}
                  >
                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${answers.carpooling ? 'left-9' : 'left-1'}`} />
                  </button>
                </div>
              </>
            )}

            <OptionGroup
              label="Any flights taken today?"
              field="flight"
              options={["No", "Short flight", "Long flight"]}
              current={answers.flight}
              icons={{
                "No": "🚫",
                "Short flight": "✈️",
                "Long flight": "🌍"
              }}
            />
          </div>
        );

      // ------------------ Food ------------------
      case 1:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-black text-slate-800 mb-2 flex items-center gap-2">
              <span>🥗</span> Food
            </h2>
            <p className="text-slate-500 mb-8">Your diet today affects your footprint.</p>

            <OptionGroup
              label="Diet type"
              field="dietType"
              options={["Vegan", "Vegetarian", "Mixed", "Heavy meat-based"]}
              current={answers.dietType}
            />

            <OptionGroup
              label="Dairy consumption"
              field="dairyUsage"
              options={["None", "Some", "A lot"]}
              current={answers.dairyUsage}
            />

            <OptionGroup
              label="Food waste"
              field="foodWaste"
              options={["None", "Small amount", "Large amount"]}
              current={answers.foodWaste}
            />
          </div>
        );

      // ------------------ Energy ------------------
      case 2:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-black text-slate-800 mb-2 flex items-center gap-2">
              <span>💡</span> Energy
            </h2>
            <p className="text-slate-500 mb-8">Home energy usage matters.</p>

            <OptionGroup
              label="Energy usage"
              field="energyUsage"
              options={["Minimal", "Average", "Heavy"]}
              current={answers.energyUsage}
            />

            <OptionGroup
              label="Climate control usage"
              field="climateUsage"
              options={["None", "<2 hours", "2–6 hours", "6+ hours"]}
              current={answers.climateUsage}
            />

            <OptionGroup
              label="Energy source"
              field="energySource"
              options={["Mostly renewable", "Mixed", "Mostly fossil fuels"]}
              current={answers.energySource}
            />
          </div>
        );

      // ------------------ Lifestyle ------------------
      case 3:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-black text-slate-800 mb-2 flex items-center gap-2">
              <span>🛍️</span> Lifestyle
            </h2>
            <p className="text-slate-500 mb-8">Everyday choices count.</p>

            <OptionGroup
              label="Purchases today"
              field="purchases"
              options={["None", "Essential", "Non-essential"]}
              current={answers.purchases}
            />

            <OptionGroup
              label="Plastic usage"
              field="plasticUsage"
              options={["None", "1–2 items", "Many"]}
              current={answers.plasticUsage}
            />

            <OptionGroup
              label="Water usage"
              field="waterUsage"
              options={["Low", "Average", "High"]}
              current={answers.waterUsage}
            />

            <MultiSelectGroup
              label="Positive actions taken today"
              options={["Recycled", "Composted", "Used reusable bag", "Walked/Biked", "Used public transport", "Conserved water/energy"]}
              selected={answers.positiveActions}
            />
          </div>
        );

      // ------------------ Summary ------------------
      case 4:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
            <h2 className="text-2xl font-black text-slate-800 mb-4">✅ Summary</h2>
            <p className="text-slate-500 mb-8">
              Your estimated CO₂ impact today: <span className="font-bold text-slate-800">{totalCO2} kg</span><br/>
              Your eco-score: <span className="font-bold text-emerald-600">{ecoScore}</span>
            </p>
            <p className="text-slate-400 text-sm">Press "Save & Return to Dashboard" to log today's check-in.</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <ProfileHeader />
      <main className="max-w-3xl mx-auto px-6 pt-10 pb-20">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-800">Daily Check-in</h1>
            <p className="text-slate-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Takes under 30 seconds
            </p>
          </div>

          {currentStep < 4 && (
            <div className="bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 flex items-center gap-4">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Est. Impact</p>
                <p className="text-lg font-black text-slate-800 leading-none">{totalCO2} kg</p>
              </div>
              <div className="w-[1px] h-8 bg-slate-200" />
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Score</p>
                <p className="text-lg font-black text-emerald-600 leading-none">{ecoScore}</p>
              </div>
            </div>
          )}
        </div>

        {/* Stepper */}
        <StepIndicator />

        {/* Form Content */}
        <div className="mb-12">{renderStep()}</div>

        {/* Persistent Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-100 p-4 sm:p-6 z-40">
          <div className="max-w-3xl mx-auto flex items-center gap-4">
            {currentStep > 0 && (
              <button 
                onClick={prevStep}
                className="px-8 py-4 text-slate-600 font-bold hover:bg-slate-50 rounded-2xl transition-all"
              >
                Back
              </button>
            )}
            {currentStep < 4 ? (
              <button 
                onClick={nextStep}
                className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95 disabled:opacity-50"
              >
                Next Step →
              </button>
            ) : (
              <button 
                onClick={handleSave}
                className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95"
              >
                Save & Return to Dashboard
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

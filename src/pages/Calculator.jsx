import React, { useState } from "react";
import { Header } from "../components/Header";

const TRANSPORTS = [
  { id: "car", label: "Car", icon: "car" },
  { id: "bus", label: "Bus", icon: "bus" },
  { id: "bike", label: "Bike", icon: "bicycle" },
  { id: "train", label: "Train", icon: "train" },
  { id: "walk", label: "Walk", icon: "walk" },
];

const Calculator = () => {
  const [step, setStep] = useState(1);
  const [transport, setTransport] = useState("");
  const [distance, setDistance] = useState("");
  const [electricity, setElectricity] = useState(40);
  const [diet, setDiet] = useState("");

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 flex flex-col">
        <div className="lg:px-20 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Section */}
          <section className="flex flex-col gap-6">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Calculate Your{" "}
              <span className="text-emerald-500">
                Carbon Footprint
              </span>
            </h1>

            <p className="text-lg text-slate-600 max-w-xl">
              Answer a few simple questions about your daily habits and
              discover your environmental impact.
            </p>
          </section>

          {/* Right Section (UNCHANGED) */}
          <section className="flex justify-center items-center">
            <div className="w-full max-w-xl p-4 text-center text-slate-500 aspect-7/5">
              <img
                src="/hero-img-1.png"
                className="w-full h-full object-cover"
              />
            </div>
          </section>
        </div>

        {/* Steps + Form */}
        <section className="flex flex-col gap-6 items-center">
          <ul className="steps steps-vertical lg:steps-horizontal">
            <li className="step step-success">Transport</li>
            <li className="step">Electricity</li>
            <li className="step">Food</li>
            <li className="step">Lifestyle</li>
          </ul>

          {step === 1 && (
            <div className="flex flex-col gap-6 mt-6">
              <h2 className="text-xl font-bold text-center">
                Primary Mode of Transport
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {TRANSPORTS.map(({ id, label, icon }) => (
                  <label
                    key={id}
                    htmlFor={id}
                    className="cursor-pointer focus-within:ring-2 focus-within:ring-emerald-400 rounded-2xl"
                  >
                    <input
                      id={id}
                      type="radio"
                      name="transport"
                      value={id}
                      checked={transport === id}
                      onChange={() => setTransport(id)}
                      className="peer hidden"
                    />

                    <div
                      className="
                        flex flex-col items-center justify-center
                        h-30 w-30 rounded-2xl border-2
                        border-emerald-600 text-emerald-600

                        transition-all duration-300 ease-in-out

                        hover:scale-105
                        hover:shadow-[0_0_16px_rgba(16,185,129,0.4)]

                        peer-checked:bg-emerald-600
                        peer-checked:text-white
                        peer-checked:shadow-[0_0_20px_rgba(16,185,129,0.6)]
                      "
                    >
                      <ion-icon
                        name={icon}
                        className="text-3xl"
                      ></ion-icon>
                      <span className="mt-2 text-sm font-bold uppercase tracking-wide">
                        {label}
                      </span>
                    </div>
                  </label>
                ))}
              </div>

              <label className="flex gap-2 text-sm font-semibold text-slate-700">
                Distance Travelled (km per day)
                <input
                  id="distance"
                  type="number"
                  min="0"
                  placeholder="e.g. 12"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="
                    w-64 px-4 py-2 rounded-xl border-2 border-slate-300
                    focus:outline-none focus:ring-2 focus:ring-emerald-400
                    focus:border-emerald-500
                  "
                />
              </label>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col items-center gap-4">
              <label className="font-semibold text-slate-700">
                Monthly Electricity Usage (kWh)
              </label>

              <input
                type="range"
                min={0}
                max={500}
                step={10}
                value={electricity}
                onChange={(e) => setElectricity(e.target.value)}
                className="range range-success w-80"
              />

              <span className="text-sm text-slate-600">
                {electricity} kWh / month
              </span>

              <p className="text-xs text-slate-500 text-center max-w-sm">
                You can find this on your electricity bill.
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center gap-6 mt-6">
              <h2 className="text-xl font-bold text-center">
                What best describes your monthly diet?
              </h2>

              <div className="grid grid-cols-3 gap-4">
                {["Vegetarian", "Non-Vegetarian", "Mixed"].map((type) => (
                  <label
                    key={type}
                    htmlFor={type}
                    className="cursor-pointer focus-within:ring-2 focus-within:ring-emerald-400 rounded-2xl"
                  >
                    <input
                      id={type}
                      type="radio"
                      name="diet"
                      value={type}
                      checked={diet === type}
                      onChange={() => setDiet(type)}
                      className="peer hidden"
                    />

                    <div
                      className="
                        flex flex-col items-center justify-center
                        h-30 w-30 rounded-2xl border-2
                        border-emerald-600 text-emerald-600

                        transition-all duration-300 ease-in-out
                        hover:scale-105
                        hover:shadow-[0_0_16px_rgba(16,185,129,0.4)]

                        peer-checked:bg-emerald-600
                        peer-checked:text-white
                        peer-checked:shadow-[0_0_20px_rgba(16,185,129,0.6)]
                      "
                    >
                      <span className="text-sm font-bold uppercase tracking-wide">
                        {type}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col justify-center items-center gap-6 mt-6">
              <h2 className="text-xl font-bold text-center">
                Lifestyle
              </h2>
              <div className="flex flex-col gap-5 justify-center">
                <label className="flex flex-col gap-2 justify-center">How many hours per day (on average) do you use air conditioning this month?
                  <select defaultValue="Pick a Runtime" className="select select-success">
                    <option disabled={true}>Select Hours</option>
                    <option>0-2 hours</option>
                    <option>2-4 hours</option>
                    <option>4-6 hours</option>
                    <option>More than 6 hours</option>
                  </select>
                </label>
                <label className="flex flex-col gap-2 justify-center">How many days this month did you use air conditioning?
                  <select defaultValue="Pick a Runtime" className="select select-success">
                    <option disabled={true}>Select Days</option>
                    <option>0-5 Days</option>
                    <option>6-15 Days</option>
                    <option>16-30 Days</option>
                  </select>
                </label>
                <div className="flex gap-3">
                  <p></p>
                  <div>
                    <label><input type="radio" />Yes</label>
                    <label><input type="radio" />No</label>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-5 w-full max-w-xl">
            {step > 1 ? (
              <button
                onClick={prevStep}
                className="
                  px-6 py-3 rounded-full font-semibold
                  text-emerald-700 border border-emerald-500
                  hover:bg-emerald-50 transition
                "
              >
                ← Back
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={nextStep}
              disabled={step === 1 && (!transport || !distance)}
              className="
                px-8 py-3 rounded-full font-semibold text-white
                bg-gradient-to-r from-emerald-500 to-emerald-700
                shadow-lg transition
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {step === 4 ? "Finish" : "Next →"}
            </button>
          </div>

          
        </section>
      </main>
    </div>
  );
};

export default Calculator;

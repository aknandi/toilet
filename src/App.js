import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './App.css'


const expression1 = (m, f, p_m, w_m, p_f, w_f) => (((p_m + w_m) * m) + (p_f + w_f) * f)
const expression2 = (p_m, w_m) => (w_m / (p_m + w_m))
const expression3 = (x, m, f, p_m, w_m, p_f, w_f) => (2 * m * p_m) + (m * (w_m - p_m) * x) + ((p_f + w_f) * f)
export const calculate_effort_f = (x, m, f, p_m, w_m, p_f, w_f) => {
  return (1 - x) * (m * w_m) / expression1(m, f, p_m, w_m, p_f, w_f)
};
export const calculate_effort_m = (x, m, f, p_m, w_m, p_f, w_f) => {
  return (x * expression2(p_m, w_m)) + expression3(x, m, f, p_m, w_m, p_f, w_f) * expression2(p_m, w_m) / expression1(m, f, p_m, w_m, p_f, w_f);
};

const PlotEquation = () => {
  const [m, setA1] = useState(2);
  const [f, setB1] = useState(2);
  const [p_m, setC1] = useState(1);
  const [w_m, setA2] = useState(5);
  const [p_f, setB2] = useState(1);
  const [w_f, setC2] = useState(5);
  const chartContainer = useRef(null);

  const prob_seat_down = Array.from({ length: 100 }, (_, i) => i / 100);
  const effort_female = prob_seat_down.map((val) => calculate_effort_f(val, m, f, p_m, w_m, p_f, w_f));
  const effort_male = prob_seat_down.map((val) => calculate_effort_m(val, m, f, p_m, w_m, p_f, w_f));
  const effort_total = prob_seat_down.map((val) => {
    return f * calculate_effort_f(val, m, f, p_m, w_m, p_f, w_f) + m * calculate_effort_m(val, m, f, p_m, w_m, p_f, w_f)
  });

  useEffect(() => {
    if (chartContainer.current) {
      const ctx = chartContainer.current.getContext('2d');
      let myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: prob_seat_down,
          datasets: [
            {
              label: `Effort per female`,
              data: effort_female,
              borderWidth: 4,
              pointRadius: 0,
              fill: false,
            },
            {
              label: `Effort per male`,
              data: effort_male,
              borderWidth: 4,
              pointRadius: 0,
              fill: false,
            },
            {
              label: `Total Effort`,
              data: effort_total,
              borderWidth: 4,
              pointRadius: 0,
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: { text: "Effort", display: true }
            },
            x: {
              type: "linear",
              title: { text: "Proportion of times someone puts a raised seat down after use", display: true }
            }
          },
        },
      });
      return () => {
        myChart.destroy();
      };
    }
  }, [m, f, p_m, w_m, p_f, w_f, prob_seat_down, effort_female, effort_male, effort_total]);


  return (
    <div className="app-container">
      <h1>Toilet Seat Dilemma</h1>
      <div className="container">
        <div className="left-column">
          <div className="plot">
            <canvas ref={chartContainer} style={{ maxWidth: '500px', maxHeight: '500px' }}></canvas>
          </div>
          <div className="inputs">
            <div className="input-row">
              <div className="input-container">
                <label htmlFor="a1">Number of women:</label>
                <input type="number" id="a1" value={m} onChange={(e) => setA1(parseFloat(e.target.value))} />
              </div>
              <div className="input-container">
                <label htmlFor="b1">Number of men:</label>
                <input type="number" id="b1" value={f} onChange={(e) => setB1(parseFloat(e.target.value))} />
              </div>
            </div>
            <div className="input-row">
              <div className="input-container">
                <label htmlFor="c1">Number of poos (men):</label>
                <input type="number" id="c1" value={p_m} onChange={(e) => setC1(parseFloat(e.target.value))} />
              </div>
              <div className="input-container">
                <label htmlFor="a2">Number of wees (men):</label>
                <input type="number" id="a2" value={w_m} onChange={(e) => setA2(parseFloat(e.target.value))} />
              </div>
            </div>
            <div className="input-row">
              <div className="input-container">
                <label htmlFor="b2">Number of poos (women):</label>
                <input type="number" id="b2" value={p_f} onChange={(e) => setB2(parseFloat(e.target.value))} />
              </div>
              <div className="input-container">
                <label htmlFor="c2">Number of wees (women):</label>
                <input type="number" id="c2" value={w_f} onChange={(e) => setC2(parseFloat(e.target.value))} />
              </div>
            </div>
          </div>
        </div>
        <div className="right-column">
          <p>
            What should you do with the toilet seat after going to the toilet? Traditionally
            people have thought that men should not leave the toilet seat up, but put it down
            when they have finished. Is this the best strategy? Is this fair?
          </p>
          <p>
            Let's do some maths
          </p>
        </div>
      </div>
    </div>
  )
};

export default PlotEquation;

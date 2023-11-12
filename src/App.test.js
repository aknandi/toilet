import React from 'react';
import { render, screen } from '@testing-library/react';
import PlotEquation from './App';
import { calculate_effort_f, calculate_effort_m } from './App';

test('renders parameters inputs', () => {
  render(<PlotEquation />);
  const aInput = screen.getByLabelText(/Number of women/i);
  // const bInput = screen.getByLabelText(/Parameter b1/i);
  // const cInput = screen.getByLabelText(/Parameter c1/i);
  expect(aInput).toBeInTheDocument();
  // expect(bInput).toBeInTheDocument();
  // expect(cInput).toBeInTheDocument();
});

test('female equation function returns the correct result', () => {
  expect(calculate_effort_f(1, 2, 2, 1, 5, 1, 5)).toBe(0);
  expect(calculate_effort_f(0, 2, 2, 1, 5, 1, 5)).toBe(5 / 12);
  // Add more test cases as needed
});

test('male equation function returns the correct result', () => {
  expect(calculate_effort_m(1, 2, 2, 1, 5, 1, 5)).toBe(5 / 3);
  expect(calculate_effort_m(0, 2, 2, 1, 5, 1, 5)).toBe(5 / 9);
  // Add more test cases as needed
});

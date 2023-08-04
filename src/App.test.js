import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app header', () => {
  render(<App />);
  const headerElement = screen.getByRole('banner');
  expect(headerElement).toBeInTheDocument();
});

test('renders logo', () => {
  render(<App />);
  const logoElement = screen.getByAltText('logo');
  expect(logoElement).toBeInTheDocument();
});

test('renders instruction text', () => {
  render(<App />);
  const instructionElement = screen.getByText((content, node) => {
    const hasText = (node) => node.textContent === "Edit src/App.js and save to reload.";
    const nodeHasText = hasText(node);
    const childrenDontHaveText = Array.from(node.children).every(
      (child) => !hasText(child)
    );

    return nodeHasText && childrenDontHaveText;
  });
  expect(instructionElement).toBeInTheDocument();
});


test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Learn React/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveAttribute('href', 'https://reactjs.org');
});

test('learn react link opens in new tab', () => {
  render(<App />);
  const linkElement = screen.getByText(/Learn React/i);
  expect(linkElement).toHaveAttribute('target', '_blank');
  expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
});

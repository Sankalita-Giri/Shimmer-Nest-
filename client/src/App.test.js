import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('ShimmerNest Shop Basic Triage', () => {

  // 1. Check Branding
  test('renders the ShimmerNest brand logo', () => {
    render(<App />);
    // getAllByText since "ShimmerNest" appears in header + footer
    const brandElements = screen.getAllByText(/ShimmerNest/i);
    expect(brandElements.length).toBeGreaterThan(0);
  });

  // 2. Check Search Input
  test('renders the search bar for customers', () => {
    render(<App />);
    const searchBar = screen.getByPlaceholderText(/Search magic.../i);
    expect(searchBar).toBeInTheDocument();
  });

  // 3. Check Initial Cart State — no badge visible
  test('starts with an empty basket and no badge', () => {
    render(<App />);
    // Find cart button specifically by its emoji
    const cartButton = screen.getByText('🧺').closest('button');
    expect(cartButton).toBeInTheDocument();

    // Badge should not exist when cart is empty
    const badge = screen.queryByText('1');
    expect(badge).not.toBeInTheDocument();
  });

  // 4. Check Navigation to Cart (matches updated App.js empty state text)
  test('navigates to cart and shows empty state message', () => {
    render(<App />);
    const cartButton = screen.getByText('🧺').closest('button');
    fireEvent.click(cartButton);

    // Matches "Your nest is empty!" from updated App.js
    expect(screen.getByText(/Your nest is empty!/i)).toBeInTheDocument();
    expect(screen.getByText(/Fill it with handmade magic/i)).toBeInTheDocument();
  });

  // 5. Test Search Trigger
  test('updates view to search when typing in search bar', () => {
    render(<App />);
    const searchBar = screen.getByPlaceholderText(/Search magic.../i);
    fireEvent.change(searchBar, { target: { value: 'Sunflower' } });

    expect(screen.getByText(/Results for "Sunflower"/i)).toBeInTheDocument();
  }
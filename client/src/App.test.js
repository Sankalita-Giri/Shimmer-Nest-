import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('ShimmerNest Shop Basic Triage', () => {

  test('renders the ShimmerNest brand logo', () => {
    render(<App />);
    const brandElements = screen.getAllByText(/ShimmerNest/i);
    expect(brandElements.length).toBeGreaterThan(0);
  });

  test('renders the search bar for customers', () => {
    render(<App />);
    const searchBar = screen.getByPlaceholderText(/Search magic.../i);
    expect(searchBar).toBeInTheDocument();
  });

  test('starts with an empty basket and no badge', () => {
    render(<App />);
    const cartButton = screen.getByText('🧺').closest('button');
    expect(cartButton).toBeInTheDocument();
    const badge = screen.queryByText('1');
    expect(badge).not.toBeInTheDocument();
  });

  test('navigates to cart and shows empty state message', () => {
    render(<App />);
    const cartButton = screen.getByText('🧺').closest('button');
    fireEvent.click(cartButton);
    expect(screen.getByText(/Your nest is empty!/i)).toBeInTheDocument();
    expect(screen.getByText(/Fill it with handmade magic/i)).toBeInTheDocument();
  });

  test('updates view to search when typing in search bar', () => {
    render(<App />);
    const searchBar = screen.getByPlaceholderText(/Search magic.../i);
    fireEvent.change(searchBar, { target: { value: 'Sunflower' } });
    expect(screen.getByText(/Results for "Sunflower"/i)).toBeInTheDocument();
  });

});
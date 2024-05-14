import React from 'react';
import { render, screen } from '@testing-library/react';
import VideoBanner from './VideoBanner';

describe('VideoBanner component', () => {
  test('renders an image if either icon or src prop is provided', () => {
    const iconUrl = 'path/to/icon.jpg';
    const srcUrl = 'path/to/image.jpg';
    render(<VideoBanner icon={iconUrl} />);

    const imageElement = screen.getByAltText('Icon');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', iconUrl);
  });

  test('renders children if no icon or src prop is provided', () => {
    render(
      <VideoBanner>
        <div>Custom content</div>
      </VideoBanner>
    );

    const customContentElement = screen.getByText('Custom content');
    expect(customContentElement).toBeInTheDocument();
  });

  test('renders a skeleton if neither icon nor src prop is provided', () => {
    render(<VideoBanner />);

    const skeletonElement = screen.getByTestId('video-banner-skeleton');
    expect(skeletonElement).toBeInTheDocument();
  });
});




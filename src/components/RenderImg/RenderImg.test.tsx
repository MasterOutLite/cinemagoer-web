import React from 'react';
import {render, screen} from '@testing-library/react';
import RenderImg from './RenderImg';

describe('RenderImg', () => {
  test('renders image when src is provided', () => {
    const src = 'https://example.com/image.jpg';
    render(<RenderImg src={src} alt="Test Image"/>);
    const imgElement = screen.getByAltText('Test Image');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', src);
  });

  test('renders children when src is not provided', () => {
    render(<RenderImg>This is a test</RenderImg>);
    const textElement = screen.getByText('This is a test');
    expect(textElement).toBeInTheDocument();
  });

  test('renders CircularProgress when src and children are not provided', () => {
    render(<RenderImg/>);
    const circularProgressElement = screen.getByRole('progressbar');
    expect(circularProgressElement).toBeInTheDocument();
  });

  test('renders alt text when alt is not provided for image', () => {
    render(<RenderImg src="https://example.com/image.jpg"/>);
    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('alt', 'None');
  });

  test('renders custom alt text when alt is provided for image', () => {
    render(<RenderImg src="https://example.com/image.jpg" alt="Custom Alt Text"/>);
    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('alt', 'Custom Alt Text');
  });
});

import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import Filter from './Filter';
import {VideoCategory} from "../../const/video-category";
import {Router} from "react-router-dom";

describe('Filter component', () => {
  test('renders correctly', () => {
    render(<Filter videoCategory={VideoCategory.Serial} setQuery={() => {}} />);
    expect(screen.getByText('Фільтр')).toBeInTheDocument();
    expect(screen.getByLabelText('Жанри')).toBeInTheDocument();
    expect(screen.getByLabelText('Категорія відео')).toBeInTheDocument();
    expect(screen.getByLabelText('Тип')).toBeInTheDocument();
    expect(screen.getByLabelText('Статус')).toBeInTheDocument();
    expect(screen.getByLabelText('Оберіть сезон виходу')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Знайти' })).toBeInTheDocument();
  });

  test('handles input change correctly', async () => {
    render(<Filter videoCategory={VideoCategory.Movie} setQuery={() => {}} />);
    fireEvent.change(screen.getByLabelText('Від'), { target: { value: '2000' } });
    expect(screen.getByLabelText('Від')).toHaveValue('2000');
  });

  test('handles button click correctly', async () => {
    const setQueryMock = jest.fn();
    render(<Filter videoCategory={VideoCategory.Movie} setQuery={setQueryMock} />);
    fireEvent.click(screen.getByRole('button', { name: 'Знайти' }));
    expect(setQueryMock).toHaveBeenCalled();
  });
});




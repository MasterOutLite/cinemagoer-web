import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import RenderSeriesDay from './RenderSeriesDay';

describe('RenderSeriesDay', () => {
  const mockSeries: any = [
    []
  ];

  test('зміна вкладок', () => {
    render(<RenderSeriesDay series={mockSeries} />);

    // Змінюємо вкладку та перевіряємо, чи змінюється вміст
    const tabs = screen.getAllByRole('tab');
    fireEvent.click(tabs[1]); // Клікаємо на другу вкладку

    // Перевіряємо, чи відображається відповідний вміст для другої вкладки
    const secondTabContent = screen.queryByText('Вівторок');
    expect(secondTabContent).toBeInTheDocument();
    // Додайте тут очікування щодо вмісту для другої вкладки на основі `mockSeries`
  });
});

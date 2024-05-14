import React from 'react';
import {render, screen} from '@testing-library/react';
import RenderSeries from './RenderSeries';
import {Series} from "../../type";

describe('RenderSeries', () => {
  const mockSeries: Series[] = [
    {
      series: 1,
      release: true,
      dateRelease: "2023-09-29T03:00:00.000Z",
      name: "The Journey's End",
      id: 2,
      dayOfWeek: 2,
      videoId: 2,
      seasonId: 5,
      video: {
        "id": 7,
        "name": ["Поки смерть не розлучить нас", "Til Death Do Us Part"],
        "dateRelease": "2023-09-01T03:00:00.000Z",
        "icon": "https://res.cloudinary.com/dgklbpona/image/upload/v1709454632/pictures/xiw62cl8s2imly9nmjuv.jpg",
        "type": "Serial",
        "status": "ItComesOut",
        "videoCategory": "movie",
        "seasonOfYear": "winter",
        "genre": [{
          "id": 1,
          "name": "Екшен/Бойовик",
          "description": "Драматичний жанр, в якому основна увага приділяється дії."
        }, {
          "id": 9,
          "name": "Трилер",
          "description": "Жанр кіно та літератури, в яких специфічні засоби повинні викликати у глядачів або читачів почуття співпереживання, пов'язане з емоціями тривожного очікування, невизначеності, хвилювання чи страху."
        }, {
          "id": 10,
          "name": "Жахи",
          "description": "Жанр художньої літератури, що початково мав на меті викликати в читача відчуття тривоги, страху і супутніх відчуттів."
        }],
        "ageRating": {
          "id": 3,
          "name": "PG-13",
          "description": "Діти до 13 років допускаються на фільм тільки з батьками."
        },
        "publisher": {"id": 17, "name": "Timothy Woodward Jr.", "description": "Студія"},
        "rate": 4.3,
        "yourRate": 0
      },
    }
  ];

  test('відображає серії правильно', () => {
    render(<RenderSeries series={mockSeries}/>);

    // Перевіряємо, чи відображається заголовок "Вихід серій"
    const header = screen.getByText('Вихід серій');
    expect(header).toBeInTheDocument();

    // Перевіряємо, чи відображаються всі серії
    mockSeries.forEach((seriesItem) => {
      const seriesNumber = screen.getByText(`${seriesItem.series} Серія`);
      expect(seriesNumber).toBeInTheDocument();
      const seriesName = screen.getByText(seriesItem.name);
      expect(seriesName).toBeInTheDocument();
      const seriesDate = screen.getByText(new Date(seriesItem.dateRelease).toLocaleDateString());
      expect(seriesDate).toBeInTheDocument();
    });
  });

  test('не відображає нічого, якщо серій немає', () => {
    render(<RenderSeries series={[]}/>);

    // Перевіряємо, чи не відображається жоден контент
    const header = screen.queryByText('Вихід серій');
    expect(header).not.toBeInTheDocument();
    const seriesNumber = screen.queryByText('Серія');
    expect(seriesNumber).not.toBeInTheDocument();
    const seriesName = screen.queryByText('Назва серії');
    expect(seriesName).not.toBeInTheDocument();
    const seriesDate = screen.queryByText('Дата виходу');
    expect(seriesDate).not.toBeInTheDocument();
  });
});

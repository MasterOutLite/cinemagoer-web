import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Video from './Video';
import {videoCategories} from "../../const/video-category";

describe('Video component', () => {
  const videoDetailMock: any = {
    "video": {
      "id": 7,
      "name": ["Поки смерть не розлучить нас", "Til Death Do Us Part"],
      "dateRelease": "2023-09-01T03:00:00.000Z",
      "icon": "https://res.cloudinary.com/dgklbpona/image/upload/v1709454632/pictures/xiw62cl8s2imly9nmjuv.jpg",
      "type": "Serial",
      "status": "ItComesOut",
      "videoCategory": "movie",
      "publisherId": 17,
      "ageRatingId": 3,
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
      "videoInfo": [{
        "id": 7,
        "videoId": 7,
        "description": "Комедійний фільм жахів «Поки смерть не розлучить нас» представляє героїню, яка пізно усвідомила помилку. Спроба її виправити призвела до непередбачуваних наслідків. Напередодні власного весілля, вже одягнувшись у білу сукню, вона зрозуміла, що хлопець, що здавався підходящим кандидатом у чоловіки, насправді інша людина. Вирішивши відмовитися від урочистостей, вона просто поїхала додому, повідомивши про несподіване рішення телефоном. Реакція нареченого, виявилася шоковою. Традиції його сім'ї не дозволяють прощати образ. Тут же зібравши компанію своїх приятелів, що тримали в страху всю округу, він помстився. Заміський особняк, що здавався надійним притулком від зазіхань, став місцем жорстоких випробувань для людей, які там живуть.\nНавіть скривджений нареченою головоріз не очікував такої запопадливості від одного з вірних друзів. Вижити цієї ночі її родичам виявиться досить важко. Однак на них теж чекала несподіванка. У дівчині воістину прокинулися демони, що спали до певної пори. Важко сказати, кому виявиться страшніше у час, коли люди перетворюються на чудовиськ.",
        "mainCharacters": ["Кем Жиґанде", "Джейсон Патрік", " Наталі Берн", "Орландо Джонс", "СерДаріус Блейн", "Панчо Молер"],
        "trailers": [],
        "countSeries": null,
        "pictures": [],
        "duration": "109 хвилин (01:49)"
      }],
      "videoSeries": [],
      "listView": [{"id": 18, "videoId": 7, "userListViewId": 14}],
      "group": [],
      "season": [],
      "ageRating": {
        "id": 3,
        "name": "PG-13",
        "description": "Діти до 13 років допускаються на фільм тільки з батьками."
      },
      "publisher": {"id": 17, "name": "Timothy Woodward Jr.", "description": "Студія"},
      "rate": 4.3,
      "yourRate": 0
    }, "videoInfo": {
      "id": 7,
      "videoId": 7,
      "description": "Комедійний фільм жахів «Поки смерть не розлучить нас» представляє героїню, яка пізно усвідомила помилку. Спроба її виправити призвела до непередбачуваних наслідків. Напередодні власного весілля, вже одягнувшись у білу сукню, вона зрозуміла, що хлопець, що здавався підходящим кандидатом у чоловіки, насправді інша людина. Вирішивши відмовитися від урочистостей, вона просто поїхала додому, повідомивши про несподіване рішення телефоном. Реакція нареченого, виявилася шоковою. Традиції його сім'ї не дозволяють прощати образ. Тут же зібравши компанію своїх приятелів, що тримали в страху всю округу, він помстився. Заміський особняк, що здавався надійним притулком від зазіхань, став місцем жорстоких випробувань для людей, які там живуть.\nНавіть скривджений нареченою головоріз не очікував такої запопадливості від одного з вірних друзів. Вижити цієї ночі її родичам виявиться досить важко. Однак на них теж чекала несподіванка. У дівчині воістину прокинулися демони, що спали до певної пори. Важко сказати, кому виявиться страшніше у час, коли люди перетворюються на чудовиськ.",
      "mainCharacters": ["Кем Жиґанде", "Джейсон Патрік", " Наталі Берн", "Орландо Джонс", "СерДаріус Блейн", "Панчо Молер"],
      "trailers": [],
      "countSeries": null,
      "pictures": [],
      "duration": "109 хвилин (01:49)"
    }, "series": [], "season": []
  };

  it('renders video details correctly', () => {
    render(<Video id={1} videoDetail={videoDetailMock}/>);
    // Check if video icon is rendered
    const videoIcon = screen.getByAltText('Icon');
    expect(videoIcon).toBeInTheDocument();
    expect(videoIcon).toHaveAttribute('src', videoDetailMock.video.icon);
    // Check if video description is rendered
    const name = screen.getByText(videoDetailMock.video.name[0]);
    expect(name).toBeInTheDocument();
  });

  it('allows switching between tabs', () => {
    render(<Video id={1} videoDetail={videoDetailMock}/>);
    // Switch to trailers tab
    const trailersTab = screen.getByText('Трейлери');
    userEvent.click(trailersTab);
    // Switch to comments tab
    const commentsTab = screen.getByText('Коментарі');
    userEvent.click(commentsTab);
    // Check if the comments section is rendered
    const commentsSection = screen.getByText('Коментарі');
    expect(commentsSection).toBeInTheDocument();
  });
});





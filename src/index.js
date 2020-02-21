import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";


const onHeaderClick = () => {};

const PromoFilm = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  YEAR: 2014
};

const filmsCards = [{
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  img: `img/snatch.jpg`
},
{
  title: `Bohemian Rhapsody`,
  img: `img/snatch.jpg`
},
{
  title: `Macbeth`,
  img: `img/snatch.jpg`
},
{
  title: `Aviator`,
  img: `img/snatch.jpg`
},
{
  title: `We need to talk about Kevin`,
  img: `img/snatch.jpg`
},
{
  title: `What We Do in the Shadows`,
  img: `img/snatch.jpg`
},
{
  title: `Revenant`,
  img: `img/snatch.jpg`
},
{
  title: `Johnny English`,
  img: `img/snatch.jpg`
}, {
  title: `Shutter Island`,
  img: `img/snatch.jpg`
}, {
  title: `Pulp Fiction`,
  img: `img/snatch.jpg`
}, {
  title: `No Country for Old Men`,
  img: `img/snatch.jpg`
}, {
  title: `Snatch`,
  img: `img/snatch.jpg`
}, {
  title: `Moonrise Kingdom`,
  img: `img/snatch.jpg`
},
{
  title: `Seven Years in Tibet`,
  img: `img/snatch.jpg`
},
{
  title: `Midnight Special`,
  img: `img/snatch.jpg`
},
{
  title: `War of the Worlds`,
  img: `img/snatch.jpg`
},
{
  title: `Dardjeeling Limited`,
  img: `img/snatch.jpg`
},
{
  title: `Orlando`,
  img: `img/snatch.jpg`
},
{
  title: `Mindhunter`,
  img: `img/snatch.jpg`
},
{
  title: `Midnight Special`,
  img: `img/snatch.jpg`
},
];

ReactDOM.render(<
  App title = {
    PromoFilm.TITLE
  }
  genre = {
    PromoFilm.GENRE
  }
  year = {
    PromoFilm.YEAR
  }
  cards = {filmsCards}
  onClickFunc = {onHeaderClick}
/>,
document.querySelector(`#root`)
);

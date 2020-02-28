export const PromoFilm = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  YEAR: 2014
};

const RANDOM_ARR_LENGTHS = {
  MIN: 1,
  MAX: 3
};

const directors = [`Guy Ritchie`, `James Cameron`, `Ridley Scott`, `Quentin Tarantino`];
const actors = [`Keanu Reeves`, `Arnold Schwarzenegger`, `Naomi Scott`, `Emilia Clarke`];

export const genres = [`All genres`,
  `Comedies`,
  `Crime`,
  `Documentary`,
  `Dramas`,
  `Horror`,
  `Kids & Family`,
  `Romance`,
  `Sci-Fi`,
  `Thrillers`];

export const films = [{
  id: 1,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  img: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`
},
{
  id: 2,
  title: `Bohemian Rhapsody`,
  img: `img/bohemian-rhapsody.jpg`
},
{
  id: 3,
  title: `Macbeth`,
  img: `img/macbeth.jpg`
},
{
  id: 4,
  title: `Aviator`,
  img: `img/aviator.jpg`
},
{
  id: 5,
  title: `We need to talk about Kevin`,
  img: `img/we-need-to-talk-about-kevin.jpg`
},
{
  id: 6,
  title: `What We Do in the Shadows`,
  img: `img/what-we-do-in-the-shadows.jpg`
},
{
  id: 7,
  title: `Revenant`,
  img: `img/revenant.jpg`
},
{
  id: 8,
  title: `Johnny English`,
  img: `img/shutter-island.jpg`
},
];

const DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`;
const descriptionSplit = DESCRIPTION.split(`.`);

const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomText = () => {
  let randomTextArray = [];
  // get a random length of array:
  const randomArrayLength = getRandomInteger(RANDOM_ARR_LENGTHS.MIN, RANDOM_ARR_LENGTHS.MAX);
  // get a copy of descriptionSplit:
  const descriptionSplitCopy = descriptionSplit.slice();
  randomTextArray.length = randomArrayLength;
  // get a random array from descriptionSplit:
  for (let i = 0; i < randomTextArray.length; i++) {
    const randomIndex = Math.floor(Math.random() * descriptionSplitCopy.length);
    const randomPhrase = descriptionSplitCopy[randomIndex];
    randomTextArray[i] = randomPhrase;
    descriptionSplitCopy.splice(randomIndex, 1);
  }
  randomTextArray = randomTextArray.join(`.`) + `.`;
  return randomTextArray;
};

export const getFilmsData = (movies) => {
  return (
    movies.map((film)=> {
      return (
        {
          id: film.id,
          title: film.title,
          poster: `img/the-grand-budapest-hotel-poster.jpg`,
          scoring: getRandomInteger(0, 10),
          description: getRandomText(),
          ratings: getRandomInteger(500, 1000),
          director: directors[getRandomInteger(0, directors.length - 1)],
          starring: actors[getRandomInteger(0, actors.length - 1)],
          genre: genres[getRandomInteger(0, actors.length - 1)],
          year: getRandomInteger(2000, 2019),
          cardImg: film.img
        }
      );
    })
  );
};

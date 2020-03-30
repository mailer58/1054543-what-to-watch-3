const RANDOM_ARR_LENGTHS = {
  MIN: 1,
  MAX: 3
};

const directors = [`Guy Ritchie`, `James Cameron`, `Ridley Scott`, `Quentin Tarantino`];
const actors = [`Keanu Reeves`,
  `Arnold Schwarzenegger`,
  `Naomi Scott`,
  `Emilia Clarke`,
  `Bill Murray`,
  `Edward Norton`,
  `Jude Law`,
  `Willem Dafoe`,
  `Saoirse Ronan`,
  `Tony Revoloru`,
  `Tilda Swinton`,
  `Tom Wilkinson`,
  `Owen Wilkinson`,
  `Adrien Brody`,
  `Ralph Fiennes`,
  `Jeff Goldblum`
];

const reviewers = [
  `Kate Muir`,
  `Matthew Lickona`,
  `Bill Goodykoontz`,
  `Paula Fleri-Soler`,
  `Amanda Greever`
];

const genres = [
  `Comedies`,
  `Crime`,
  `Documentary`,
  `Dramas`,
  `Horror`,
  `Kids & Family`,
  `Romance`,
  `Sci-Fi`,
  `Thrillers`];

const links = [`https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`];

export const films = [{
  id: 1,
  name: `Fantastic Beasts: The Crimes of Grindelwald`,
  img: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`
},
{
  id: 2,
  name: `Bohemian Rhapsody`,
  img: `img/bohemian-rhapsody.jpg`
},
{
  id: 3,
  name: `Macbeth`,
  img: `img/macbeth.jpg`
},
{
  id: 4,
  name: `Aviator`,
  img: `img/aviator.jpg`
},
{
  id: 5,
  name: `We need to talk about Kevin`,
  img: `img/we-need-to-talk-about-kevin.jpg`
},
{
  id: 6,
  name: `What We Do in the Shadows`,
  img: `img/what-we-do-in-the-shadows.jpg`
},
{
  id: 7,
  name: `Revenant`,
  img: `img/revenant.jpg`
},
{
  id: 8,
  name: `Johnny English`,
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
      const actorsCopy = actors.slice();
      const arrayLength = getRandomInteger(actorsCopy.length - 5, actorsCopy.length - 1);
      const randomActors = [];
      for (let i = 0; i < arrayLength; i++) {
        const randomInteger = getRandomInteger(0, actorsCopy.length - 1);
        randomActors.push(actorsCopy[randomInteger]);
        actorsCopy.splice(randomInteger, 1);
      }
      // get reviews:
      const randomReviews = [];
      const reviewersCopy = reviewers.slice();
      const reviewersArrLength = getRandomInteger(0, reviewersCopy.length - 1);
      if (reviewersArrLength > 0) {
        for (let i = 0; i < reviewersArrLength; i++) {
          const randomInteger = getRandomInteger(0, actorsCopy.length - 1);
          const randomReviewer = reviewersCopy[randomInteger];
          reviewersCopy.splice(randomInteger, 1);
          randomReviews.push({
            review: getRandomText(),
            author: randomReviewer,
            date: `December ` + getRandomInteger(1, 31) + `, 2016`,
            rating: getRandomInteger(0, 9) + `,` + getRandomInteger(0, 9),
          });
        }
      }
      return (
        {
          id: film.id,
          name: film.name,
          posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
          previewImage: film.img,
          backgroundImage: `img/bg-the-grand-budapest-hotel.jpg`,
          backgroundColor: `#ffffff`,
          videoLink: `http:`,
          previewVideoLink: links[getRandomInteger(0, 1)],
          description: getRandomText(),
          rating: getRandomInteger(0, 10),
          scoresCount: getRandomInteger(500, 1000),
          director: directors[getRandomInteger(0, directors.length - 1)],
          starring: randomActors,
          runTime: getRandomInteger(1, 2) + `h ` + getRandomInteger(10, 59) + ` m`,
          genre: genres[getRandomInteger(0, genres.length - 1)],
          released: getRandomInteger(2000, 2019),
          isVaforite: false,
          reviews: randomReviews,
        }
      );
    })
  );
};

export const getRandomComments = (movies) => {
  const comments = [];
  movies.map((film) => {
    const randomReviewers = [];
    const reviewersCopy = reviewers.slice();
    const arrayLength = getRandomInteger(0, reviewers.length - 1);
    for (let i = 0; i < arrayLength; i++) {
      const randomInteger = getRandomInteger(0, reviewersCopy.length - 1);
      randomReviewers.push(reviewersCopy[randomInteger]);
      reviewersCopy.splice(randomInteger, 1);
    }
    randomReviewers.forEach((randomReviewer) => {
      comments.push(
          {
            id: film.id,
            user: {
              id: getRandomInteger(0, 100),
              name: randomReviewer,
            },
            rating: getRandomInteger(0, 9) + `,` + getRandomInteger(0, 9),
            comment: getRandomText(),
            date: `December ` + getRandomInteger(1, 31) + `, 2016`,
          }
      );
    });
  });
  return comments;
};


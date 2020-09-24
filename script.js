'use strict';
const audioElement = document.querySelector('#audio');
const btn = document.querySelector('#btn');
const textContainer = document.querySelector('#textContainer');

// Disable/Enable Button
function toggleButton() {
  btn.disabled = !btn.disabled;
}

// Get Jokes from Joke API
async function getJoke() {
  let joke = '';
  const url =
    'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup}  ... ${data.delivery}`;
    } else {
      joke = `${data.joke}`;
    }
    // Text-to-Speech
    tellMe(joke);
    printJoke(joke);
    // Disable Button
    toggleButton();
  } catch (error) {
    console.log('whoops, error', error);
  }
}

// Passing Joke to VocieRsS API
function tellMe(joke) {
  VoiceRSS.speech({
    // TODO: server to hide key.
    key: 'd9ac162f101d44c7ad29d1d46a187ed8',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

// print Joke
function printJoke(joke) {
  textContainer.innerHTML = '';
  let index = 0;
  let timer = setInterval(function () {
    textContainer.innerHTML += joke.charAt(index);
    if (++index == joke.length) {
      clearInterval(timer);
    }
  }, 40);
}

btn.addEventListener('click', getJoke);
audioElement.addEventListener('ended', toggleButton);

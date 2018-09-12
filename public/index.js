(function () {
  'use strict';

  var basicOptions = ['rock', 'paper', 'scissors'];
  var advancedOptions = ['rock', 'spock', 'paper', 'lizard', 'scissors'];
  var gameOptions = [];
  var oddsNumbersCounter = [];
  var advancedLvl = false;
  var userChoice = '';
  var timer;
  var winner;

  var computerChoice = function () {
    return gameOptions[Math.floor(Math.random() * gameOptions.length)]
  }

  var enablePlayBtn = function (enable) {
    if (enable) {
      document.querySelector('.options .button').style.opacity = 1;
      document.querySelector('.options .button').addEventListener('click', play);
    } else {
      document.querySelector('.options .button').style.opacity = 0.5;
      document.querySelector('.options .button').removeEventListener('click', play);
    }
  }

  var changeLevel = function (e) {
    var isChecked = e.target.checked;
    advancedLvl = !!isChecked;

    if (isChecked) {
      document.querySelector('section section:first-of-type').className = 'selectedOption';
    }

    setUpOptions();
  }

  var changeMode = function (e) {
    var isChecked = e.target.checked;
    setLabels(isChecked);
    enablePlayBtn(isChecked);

    if (isChecked) {
      document.querySelector('section section:first-of-type').className = 'selectedOption';
      document.querySelector('ul').style.opacity = 0.5;
      document.querySelector('ul').removeEventListener('click', setUserChoice);
    } else {
      document.querySelector('ul').style.opacity = 1;
      document.querySelector('ul').addEventListener('click', setUserChoice);
    }
  }

  var restartGame = function () {
    var isChecked = document.querySelector('#btnMode').checked;
    oddsNumbersCounter = [];
    gameOptions = [];
    userChoice = '';
    document.querySelector('.modal').style.display = 'none';
    document.querySelector('section section:first-of-type').className = 'selectedOption';
    document.querySelector('section section:last-of-type').className = 'selectedOption';
    setLabels(isChecked);
    enablePlayBtn(isChecked);
    setUpOptions();
  }

  var setLabels = function (isChecked) {
    document.querySelector('section section:first-of-type').innerHTML = isChecked ? 'Computer 1' : 'Player';
    document.querySelector('section section:last-of-type').innerHTML = isChecked ? 'Computer 2' : 'Computer';
  }

  var setUserChoice = function (e) {
    if (e.target && e.target.nodeName === 'LI') {
      var className = e.target.className;
      userChoice = className;
      document.querySelector('section section:first-of-type').className = 'selectedOption ' + className;
      document.querySelector('section section:first-of-type').innerHTML = '';
      enablePlayBtn(userChoice);
    }
  }

  var setWinner = function () {
    clearTimeout(timer);
    document.querySelector('.modal').style.display = 'flex';
    document.querySelector('.modal span').innerHTML = winner;
  }

  var play = function () {
    var player1Choice = userChoice || computerChoice();
    var player1 = gameOptions.indexOf(player1Choice);

    var player2Choice = computerChoice();
    var player2 = gameOptions.indexOf(player2Choice);

    var getDifference = (player1 - player2) % gameOptions.length;

    if (!userChoice) {
      document.querySelector('section section:first-of-type').className = 'selectedOption ' + player1Choice;
      document.querySelector('section section:first-of-type').innerHTML = '';
    }
    document.querySelector('section section:last-of-type').className = 'selectedOption ' + player2Choice;
    document.querySelector('section section:last-of-type').innerHTML = '';

    if (getDifference === 0) {
      winner = userChoice ? 'Player and Computer' : 'Computer 1 and Computer 2';
      winner += ' Tie!!!'
    } else if (oddsNumbersCounter.includes(getDifference) || -(oddsNumbersCounter.length) > getDifference) {
      winner = userChoice ? 'Player' : 'Computer 1';
      winner += ' Wins!!!'
    } else {
      winner = userChoice ? 'Computer' : 'Computer 2';
      winner += ' Wins!!!'
    }

    timer = setTimeout(setWinner, 500);
  }

  var setUpOptions = function () {
    var initValue = 0;
    var items = '';

    gameOptions = advancedLvl ? advancedOptions : basicOptions;

    for (var i = 0; i < gameOptions.length; ++i) {
      items += '<li class="'+gameOptions[i]+'"></li>'
      if ((i % 2) !== 0) {
        initValue++;
        oddsNumbersCounter.push(initValue);
      }
    }

    document.querySelector('ul').innerHTML = items;
  }

  var setUpGame = function () {
    setUpOptions();
    document.querySelector('ul').addEventListener('click', setUserChoice);
    document.querySelector('#btnMode').addEventListener('click', changeMode);
    document.querySelector('#btnLevel').addEventListener('click', changeLevel);
    document.querySelector('.modal .button').addEventListener('click', restartGame);
    document.querySelector('.options .button').style.opacity = 0.5;
  }

  setUpGame();
})();
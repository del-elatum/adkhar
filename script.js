const adhkar = {
  morning: [
    {
      arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ',
      english:
        'We have entered the morning and the whole kingdom belongs to Allah.'
    },

    {
      arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا',
      english:
        'O Allah, by You we enter the morning and by You we enter the evening.'
    },

    {
      arabic: 'رَضِيتُ بِاللَّهِ رَبًّا وَبِالإِسْلَامِ دِينًا',
      english:
        'I am pleased with Allah as my Lord and with Islam as my religion.'
    }
  ],

  evening: [
    {
      arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ',
      english:
        'We have entered the evening and the whole kingdom belongs to Allah.'
    },

    {
      arabic: 'اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا',
      english:
        'O Allah, by You we enter the evening and by You we enter the morning.'
    },

    {
      arabic: 'رَضِيتُ بِاللَّهِ رَبًّا وَبِالإِسْلَامِ دِينًا',
      english:
        'I am pleased with Allah as my Lord and with Islam as my religion.'
    }
  ]
};


let currentTime = 'morning';
let currentLanguage = 'arabic';
let currentPage = 0;


document.querySelector('#app').innerHTML = `
  <main class="app-shell">

    <section class="adhkar-card">

      <div class="time-selector">

        <button class="time-button active" data-time="morning">
          <span class="time-icon">☀</span>
          <span class="time-label">Morning</span>
        </button>

        <button class="time-button" data-time="evening">
          <span class="time-icon">☾</span>
          <span class="time-label">Evening</span>
        </button>

      </div>


      <div class="audio-player">

        <button class="play-button" aria-label="Play audio">
          <span class="play-icon">▶</span>
        </button>

        <div class="audio-track">

          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>

          <div class="audio-time">
            <span>0:00</span>
            <span>0:24</span>
          </div>

        </div>

      </div>


      <section class="dhikr-content">

        <p class="dhikr-text arabic-text"></p>

      </section>


      <div class="language-selector">

        <button class="language-button active" data-language="arabic">
          Arabic
        </button>

        <button class="language-button" data-language="english">
          English
        </button>

      </div>


      <div class="navigation">

        <button class="nav-button previous" aria-label="Previous dhikr">
          ←
        </button>

        <span class="page-counter"></span>

        <button class="nav-button next" aria-label="Next dhikr">
          →
        </button>

      </div>

    </section>

  </main>
`;


const timeButtons = document.querySelectorAll('.time-button');
const languageButtons = document.querySelectorAll('.language-button');

const dhikrText = document.querySelector('.dhikr-text');

const previousButton = document.querySelector('.previous');
const nextButton = document.querySelector('.next');

const pageCounter = document.querySelector('.page-counter');


function updateContent() {
  const currentList = adhkar[currentTime];
  const currentDhikr = currentList[currentPage];

  dhikrText.textContent = currentDhikr[currentLanguage];

  pageCounter.textContent =
    `${currentPage + 1} / ${currentList.length}`;

  if (currentLanguage === 'arabic') {
    dhikrText.classList.add('arabic-text');
    dhikrText.classList.remove('secondary-text');
  } else {
    dhikrText.classList.remove('arabic-text');
    dhikrText.classList.add('secondary-text');
  }

  updateNavigationButtons();
}


function updateNavigationButtons() {
  const currentList = adhkar[currentTime];

  previousButton.disabled = currentPage === 0;

  nextButton.disabled =
    currentPage === currentList.length - 1;
}


timeButtons.forEach((button) => {
  button.addEventListener('click', () => {

    currentTime = button.dataset.time;

    currentPage = 0;

    timeButtons.forEach((btn) => {
      btn.classList.remove('active');
    });

    button.classList.add('active');

    updateContent();
  });
});


languageButtons.forEach((button) => {
  button.addEventListener('click', () => {

    currentLanguage = button.dataset.language;

    languageButtons.forEach((btn) => {
      btn.classList.remove('active');
    });

    button.classList.add('active');

    updateContent();
  });
});


previousButton.addEventListener('click', () => {

  if (currentPage > 0) {
    currentPage--;

    updateContent();
  }

});


nextButton.addEventListener('click', () => {

  const currentList = adhkar[currentTime];

  if (currentPage < currentList.length - 1) {
    currentPage++;

    updateContent();
  }

});


updateContent();

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const cardsContainer = document.querySelector('.cards');
    cardsContainer.innerHTML = ''; // Clear any existing cards

    data.forEach(extension => {
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <img src="${extension.logo}" alt="${extension.name}">
        <div class="card-title">${extension.name}</div>
        <div class="card-description">${extension.description}</div>
        <button class="remove-button">Remove</button>
        <div class="switch">
          <label class="toggle-wrapper">
            <input type="checkbox" ${extension.isActive ? 'checked' : ''}>
            <span class="slider round"></span>
          </label>
        </div>
      `;

      cardsContainer.appendChild(card);
    });
  })
  .catch(error => console.error('Error loading data:', error));


//.............Switch Toggle and Remove Button Functionality.............
let extensionsData = [];

function renderCards(filter = 'all') {
  const cardsContainer = document.querySelector('.cards');
  cardsContainer.innerHTML = '';

  let filteredData = extensionsData;
  if (filter === 'active') {
    filteredData = extensionsData.filter(ext => ext.isActive);
  } else if (filter === 'inactive') {
    filteredData = extensionsData.filter(ext => !ext.isActive);
  }

  filteredData.forEach(extension => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
  <div class="card-content">
    <div class="card-top">
      <img src="${extension.logo}" alt="${extension.name}">
      <div class="card-text">
        <div class="card-title">${extension.name}</div>
        <div class="card-description">${extension.description}</div>
      </div>
    </div>
    <div class="card-footer">
      <button class="remove-button">Remove</button>
      <div class="switch">
        <label class="toggle-wrapper">
          <input type="checkbox" ${extension.isActive ? 'checked' : ''}>
          <span class="slider round"></span>
        </label>
      </div>
    </div>
  </div>
`;

    cardsContainer.appendChild(card);
  });
}

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    extensionsData = data;
    renderCards('all');

    document.querySelector('.all').addEventListener('click', () => renderCards('all'));
    document.querySelector('.active').addEventListener('click', () => renderCards('active'));
    document.querySelector('.inactive').addEventListener('click', () => renderCards('inactive'));
  })
  .catch(error => console.error('Error loading data:', error));



//  ...........All, Active , Inactive Tabs...........

function setActiveTab(tabClass) {
  document.querySelectorAll('.filter div').forEach(tab => tab.classList.remove('selected'));
  document.querySelector(`.${tabClass}`).classList.add('selected');
}

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    extensionsData = data;
    renderCards('all');
    setActiveTab('all');

    document.querySelector('.all').addEventListener('click', () => {
      renderCards('all');
      setActiveTab('all');
    });
    document.querySelector('.active').addEventListener('click', () => {
      renderCards('active');
      setActiveTab('active');
    });
    document.querySelector('.inactive').addEventListener('click', () => {
      renderCards('inactive');
      setActiveTab('inactive');
    });
  })
  .catch(error => console.error('Error loading data:', error));

// ..............



// Theme Toggle Logic
const themeToggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function setTheme(mode) {
  if (mode === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.src = './assets/images/icon-moon.svg';
  } else {
    document.body.classList.remove('light-mode');
    themeIcon.src = './assets/images/icon-sun.svg';
  }
  localStorage.setItem('theme', mode);
}

// Initial theme (default: dark)
const savedTheme = localStorage.getItem('theme');
setTheme(savedTheme === 'light' ? 'light' : 'dark');

themeToggleBtn.addEventListener('click', () => {
  const isLight = document.body.classList.contains('light-mode');
  setTheme(isLight ? 'dark' : 'light');
});




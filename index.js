const date = new Date();

const returnMonth = (month) => {
  const mymonth = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return mymonth[month];
};

const returnDay = (day) => {
  const myday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return myday[day];
};

// elements
const dates = document.querySelector('.dates');

dates.innerHTML = `
<div class="day">${returnDay(date.getDay())}</div>
<div class="date">${returnMonth(
  date.getMonth()
)} ${date.getDate()}, ${date.getFullYear()}</div>
`;

const taskInput = document.querySelector('.task');
const circleBtn = document.querySelector('.button');

const list = document.querySelector('.list');

// Getting Item from LocalStorage on Document Load
document.addEventListener('DOMContentLoaded', function (e) {
  let tasks;
  tasks = localStorage.getItem('tasks');
  if (tasks) {
    tasks = JSON.parse(localStorage.getItem('tasks'));

    let item;
    // getting the all item class and getting length from that item
    item = document.querySelectorAll('.item').length;

    // create element

    tasks.forEach(function (task) {
      const li = document.createElement('li');
      li.classList.add('listItem');

      li.innerHTML = `
      <div class="whole-item">
        <div class="item" id="item-${item}">
          <input
            type="checkbox"
            class="checkboxes"
            name="checkbox${item}"
            id="checkbox${item}"
            checked
          />
          <label for="checkbox${item}">${task} </label>
        </div>
        <div class="btns">
          <button class="btn edit-btn" id="edit">
            Edit

            <svg
              class="edit"
              xmlns="http://www.w3.org/2000/svg"
              width="27.004"
              height="27.004"
              viewBox="0 0 27.004 27.004"
            >
              <path
                id="Icon_material-edit"
                data-name="Icon material-edit"
                d="M4.5,25.875V31.5h5.625l16.59-16.59L21.09,9.285ZM31.065,10.56a1.494,1.494,0,0,0,0-2.115l-3.51-3.51a1.494,1.494,0,0,0-2.115,0L22.695,7.68l5.625,5.625,2.745-2.745Z"
                transform="translate(-4.5 -4.496)"
                fill="#f23d55"
              />
            </svg>
          </button>
          
          <button class="btn deleteBtn" id="delete">
            Delete
            <svg
              class="done"
              xmlns="http://www.w3.org/2000/svg"
              width="36.739"
              height="36.55"
              viewBox="0 0 36.739 36.55"
            >
              <path
                id="Icon_material-done"
                data-name="Icon material-done"
                d="M16.79,37.313,8.022,25.857,5.1,29.675,16.79,44.95,41.839,12.219,38.917,8.4Z"
                transform="translate(-5.1 -8.4)"
                fill="#317678"
              />
            </svg>
          </button>
        </div>
      </div>
      `;
      item = item + 1;
      // console.log(li);

      // adding item from localstorage

      list.appendChild(li);
    });

    // list.appendChild(html);
  }
});

// Adding New Item
if (circleBtn) {
  circleBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (!taskInput.value) {
      alert('Enter your Tasks...');
    } else {
      // create element
      const li = document.createElement('li');
      li.classList.add('listItem');

      let item;
      // getting the all item class and getting length from that item
      item = document.querySelectorAll('.item').length;

      // console.log(item);

      //  store the value in localstorage
      let tasks;

      if (localStorage.getItem('tasks') === null) {
        tasks = [];
      } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
      }

      // adding item to localStorage
      tasks[item] = taskInput.value;

      // console.log(tasks);

      const newElement = `
      <div class="whole-item">
        <div class="item" id="item-${item + 1}">
          <input
            type="checkbox"
            class="checkboxes"
            name="checkbox${item + 1}"
            id="checkbox${item + 1}"
            checked
          />
          <label for="checkbox${item + 1}">${taskInput.value} </label>
        </div>
        <div class="btns">
          <button class="btn edit-btn" id="edit">
            Edit

            <svg
              class="edit"
              xmlns="http://www.w3.org/2000/svg"
              width="27.004"
              height="27.004"
              viewBox="0 0 27.004 27.004"
            >
              <path
                id="Icon_material-edit"
                data-name="Icon material-edit"
                d="M4.5,25.875V31.5h5.625l16.59-16.59L21.09,9.285ZM31.065,10.56a1.494,1.494,0,0,0,0-2.115l-3.51-3.51a1.494,1.494,0,0,0-2.115,0L22.695,7.68l5.625,5.625,2.745-2.745Z"
                transform="translate(-4.5 -4.496)"
                fill="#f23d55"
              />
            </svg>
          </button>
          
          <button class="btn deleteBtn" id="delete">
            Delete
            <svg
              class="done"
              xmlns="http://www.w3.org/2000/svg"
              width="36.739"
              height="36.55"
              viewBox="0 0 36.739 36.55"
            >
              <path
                id="Icon_material-done"
                data-name="Icon material-done"
                d="M16.79,37.313,8.022,25.857,5.1,29.675,16.79,44.95,41.839,12.219,38.917,8.4Z"
                transform="translate(-5.1 -8.4)"
                fill="#317678"
              />
            </svg>
          </button>
        </div>
      </div>
      `;

      li.innerHTML = newElement;

      list.appendChild(li);

      // push the Tasks array to localStorage
      localStorage.setItem('tasks', JSON.stringify(tasks));

      taskInput.value = '';
    }

    // append new item to the existing list
  });
}
// events

const geteditTextContainer = document.querySelector('.geteditTextContainer');

let editValue;

list.addEventListener('click', (e) => {
  e.preventDefault();

  // editBtn
  if (
    e.target.classList.contains('edit-btn') &&
    !e.target.parentElement.parentElement.classList.contains('complete')
  ) {
    editValue =
      e.target.parentElement.previousSibling.previousSibling.children[1]
        .innerText;

    geteditTextContainer.classList.add('active');
  }

  // completeBtn
  if (e.target.classList.contains('completeBtn')) {
    console.log(e.target.parentElement.parentElement.classList.add('complete'));
    e.target.parentElement.previousSibling.previousSibling.children[1].style.textDecoration =
      'line-through';
  }

  // deleteBtn
  let deleteTxt;
  if (e.target.classList.contains('deleteBtn')) {
    let tasks;
    let delId;
    if (localStorage.getItem('tasks') !== null) {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    deleteTxt =
      e.target.parentElement.previousSibling.previousSibling.children[1]
        .innerText;

    tasks.forEach((task) => {
      if (task === deleteTxt) {
        delId = tasks.indexOf(task);
      }
    });
    console.log(delId);

    if (delId > -1) {
      tasks.splice(delId, 1);
    }
    e.target.parentElement.parentElement.remove();
    // location.reload();
    // store the remaining item
    if (tasks !== null) {
      // tasks.filter((task) => task !== null);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }
});

// console.log(editValue);

const OkBtn = document.querySelector('#OkBtn');
const editInput = document.querySelector('.editInput');

if (OkBtn) {
  OkBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!editInput.value) {
      alert('Enter Some Value to Change');
    } else {
      //get All values from LocalStorage
      let tasks;

      if (localStorage.getItem('tasks') !== null) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
      }
      const findIndex = tasks.indexOf(editValue);

      // edit the value
      tasks[findIndex] = editInput.value;

      // store the changed value
      localStorage.setItem('tasks', JSON.stringify(tasks));

      setTimeout(() => {
        location.reload();
      }, 2000);
    }
  });
}

const CancelBtn = document.querySelector('#CancelBtn');

if (CancelBtn) {
  CancelBtn.addEventListener('click', function (e) {
    e.preventDefault();

    geteditTextContainer.classList.remove('active');
  });
}

// clear All

const clear = document.querySelector('.clear');

if (clear) {
  clear.addEventListener('click', (e) => {
    e.preventDefault();

    localStorage.clear();

    location.reload();
  });
}

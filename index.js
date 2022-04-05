const mydate = new Date();
const secdate = new Date().toTimeString().split(' ')[0];
const dates = document.querySelector('.dates');
// console.log(secdate);
const currentDay = (day) => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return days[day];
};

const currentMonth = (month) => {
  const months = [
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
  return months[month];
};

const returnHours = (hour) => {
  const myhour = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    12,
  ];

  return myhour[hour];
};

dates.innerHTML = `
<div class="day">${currentDay(mydate.getDay())}</div>
<div class="date">${mydate.getDate()} ${currentMonth(
  mydate.getMonth()
)} ${mydate.getFullYear()}</div>
`;

// create new tasks
const circleBtn = document.querySelector('.circleBtn');
const taskInput = document.querySelector('.task');
const list = document.querySelector('.list');
if (circleBtn) {
  let tasks;

  if (localStorage.getItem('tasks') == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  let mytask;
  circleBtn.addEventListener('click', (e) => {
    if (taskInput.value) {
      mytask = {
        id: tasks.length,
        content: taskInput.value,
        datestamp: `${mydate.getDate()}/${mydate.getMonth()}/${mydate.getFullYear()}`,
        hourstamp: `${returnHours(
          new Date().getHours() - 1
        )}:${new Date().getMinutes()}:${new Date().getSeconds()} ${
          new Date().getHours() >= 12 ? 'PM' : 'AM'
        }`,
        completed: false,
      };
      tasks.push(mytask);

      taskInput.value = ' ';

      localStorage.setItem('tasks', JSON.stringify(tasks));

      // appending the item to list
      let html = '';
      const li = document.createElement('li');
      li.classList.add('listItem');

      tasks.forEach(function (task) {
        const innerContent = `
        <li class="listItem">
          <div class="timehour">
              <div class="itemDate">${task.datestamp}</div>
              <div class="itemHour">${task.hourstamp}</div>
            </div>
            <div class="whole-item ${
              task.completed ? 'completed' : 'not-completed'
            } ">
              <div class="item" id="item-${task.id}">
                <input
                  type="checkbox"
                  class="checkboxes"
                  name="checkbox${task.id}"
                  id="checkbox${task.id}"
                  checked
                  ${task.completed && 'disabled'}
                />
                <label for="checkbox${task.id}">${task.content} </label>
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
                <button class="btn completeBtn">
                  Complete

                  <svg
                    class="done-all"
                    xmlns="http://www.w3.org/2000/svg"
                    width="43.912"
                    height="40.06"
                    viewBox="0 0 43.912 40.06"
                  >
                    <path
                      id="Icon_ionic-md-done-all"
                      data-name="Icon ionic-md-done-all"
                      d="M33.241,11.849,30.6,7.664,18.6,26.648l2.644,4.186Zm8.027-4.185L21.248,39.2,13.41,26.8l-2.644,4.185L21.248,47.724,43.912,11.849ZM0,30.983,10.577,47.724l2.644-4.185L2.739,26.8Z"
                      transform="translate(0 -7.664)"
                      fill="#0f148e"
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
            </li>
        `;
        html += innerContent;
      });
      list.innerHTML = html;
    } else {
      alert('please enter your tasks...');
    }
  });
}

// get values from localStorage
document.addEventListener('DOMContentLoaded', (e) => {
  let tasks;
  if (localStorage.getItem('tasks') == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  let html = '';

  tasks.forEach(function (task) {
    const innerContent = `
    <li class="listItem">
            <div class="timehour">
              <div class="itemDate">${task.datestamp}</div>
              <div class="itemHour">${task.hourstamp}</div>
            </div>
         <div class="whole-item ${
           task.completed ? 'completed' : 'not-completed'
         }">
           <div class="item" id="item-${task.id}">
             <input
               type="checkbox"
               class="checkboxes"
               name="checkbox${task.id}"
               id="checkbox${task.id}"
               checked
               ${task.completed && 'disabled'}
             />
             <label for="checkbox${task.id}">${task.content} </label>
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
             <button class="btn completeBtn">
               Complete

               <svg
                 class="done-all"
                 xmlns="http://www.w3.org/2000/svg"
                 width="43.912"
                 height="40.06"
                 viewBox="0 0 43.912 40.06"
               >
                 <path
                   id="Icon_ionic-md-done-all"
                   data-name="Icon ionic-md-done-all"
                   d="M33.241,11.849,30.6,7.664,18.6,26.648l2.644,4.186Zm8.027-4.185L21.248,39.2,13.41,26.8l-2.644,4.185L21.248,47.724,43.912,11.849ZM0,30.983,10.577,47.724l2.644-4.185L2.739,26.8Z"
                   transform="translate(0 -7.664)"
                   fill="#0f148e"
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
         </li>
     `;
    html += innerContent;
  });
  list.innerHTML = html;
});

const geteditTextContainer = document.querySelector('.geteditTextContainer');

let myid;

list.addEventListener('click', (e) => {
  // edit operation
  if (e.target.classList.contains('edit-btn')) {
    if (
      e.target.parentElement.previousSibling.previousSibling.children[0]
        .checked &&
      !e.target.parentElement.parentElement.classList.contains('completed')
    ) {
      // perform edit operation

      myid = Number(
        e.target.parentElement.previousSibling.previousSibling.id.split('-')[1]
      );

      geteditTextContainer.classList.add('active');
    } else {
      alert(
        'Please check the checkbox of your task and u can edit only if Not Completed...'
      );
    }
  }

  // complete operation
  if (
    e.target.classList.contains('completeBtn') &&
    e.target.parentElement.previousSibling.previousSibling.children[0]
      .checked &&
    !e.target.parentElement.parentElement.classList.contains('completed')
  ) {
    myid = Number(
      e.target.parentElement.previousSibling.previousSibling.id.split('-')[1]
    );

    let tasks;

    if (localStorage.getItem('tasks') == null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks[myid].completed = true;

    // reload the page to see the difference
    location.reload();
    // store the changes
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // delete Operation
  if (e.target.classList.contains('deleteBtn')) {
    // get the id to delete the element
    myid = Number(
      e.target.parentElement.previousSibling.previousSibling.id.split('-')[1]
    );

    // get the data from localStorage
    let tasks;
    if (localStorage.getItem('tasks')) {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    // remove the specific element
    tasks = tasks.filter((task) => task.id !== myid);

    // store the remaining
    localStorage.setItem('tasks', JSON.stringify(tasks));

    location.reload();
    // console.log(e.target.parentElement.parentElement);
  }
});

const OkBtn = document.getElementById('OkBtn');
const CancelBtn = document.querySelector('CancelBtn');

const editInput = document.querySelector('.editInput');

if (OkBtn) {
  OkBtn.addEventListener('click', (e) => {
    // get the item from localStorage
    let tasks;

    if (localStorage.getItem('tasks') == null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks[myid].content = editInput.value;

    // store the edit value

    localStorage.setItem('tasks', JSON.stringify(tasks));

    geteditTextContainer.classList.remove('active');

    location.reload();
  });
}
if (CancelBtn) {
  CancelBtn.addEventListener('click', (e) => {
    geteditTextContainer.classList.remove('active');
  });
}

const filtersOption = document.getElementById('filters-option');

if (filtersOption) {
  filtersOption.addEventListener('change', (e) => {
    // get data from lS
    let tasks;

    if (localStorage.getItem('tasks') == null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    if (e.target.value === 'All') {
      // tasks = JSON.parse(localStorage.getItem('tasks'));
      let html = '';

      tasks.forEach(function (task) {
        const innerContent = `
    <li class="listItem">
            <div class="timehour">
              <div class="itemDate">${task.datestamp}</div>
              <div class="itemHour">${task.hourstamp}</div>
            </div>
         <div class="whole-item ${
           task.completed ? 'completed' : 'not-completed'
         }">
           <div class="item" id="item-${task.id}">
             <input
               type="checkbox"
               class="checkboxes"
               name="checkbox${task.id}"
               id="checkbox${task.id}"
               checked
               ${task.completed && 'disabled'}
             />
             <label for="checkbox${task.id}">${task.content} </label>
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
             <button class="btn completeBtn">
               Complete

               <svg
                 class="done-all"
                 xmlns="http://www.w3.org/2000/svg"
                 width="43.912"
                 height="40.06"
                 viewBox="0 0 43.912 40.06"
               >
                 <path
                   id="Icon_ionic-md-done-all"
                   data-name="Icon ionic-md-done-all"
                   d="M33.241,11.849,30.6,7.664,18.6,26.648l2.644,4.186Zm8.027-4.185L21.248,39.2,13.41,26.8l-2.644,4.185L21.248,47.724,43.912,11.849ZM0,30.983,10.577,47.724l2.644-4.185L2.739,26.8Z"
                   transform="translate(0 -7.664)"
                   fill="#0f148e"
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
         </li>
     `;
        html += innerContent;
      });
      list.innerHTML = html;
    } else if (e.target.value === 'Completed') {
      tasks = tasks.filter((task) => task.completed);
      let html = '';

      tasks.forEach(function (task) {
        const innerContent = `
    <li class="listItem">
    <div class="timehour">
          <div class="itemDate">${task.datestamp}</div>
          <div class="itemHour">${task.hourstamp}</div>
    </div>
         <div class="whole-item ${
           task.completed ? 'completed' : 'not-completed'
         }">
           <div class="item" id="item-${task.id}">
             <input
               type="checkbox"
               class="checkboxes"
               name="checkbox${task.id}"
               id="checkbox${task.id}"
               checked
               ${task.completed && 'disabled'}
             />
             <label for="checkbox${task.id}">${task.content} </label>
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
             <button class="btn completeBtn">
               Complete

               <svg
                 class="done-all"
                 xmlns="http://www.w3.org/2000/svg"
                 width="43.912"
                 height="40.06"
                 viewBox="0 0 43.912 40.06"
               >
                 <path
                   id="Icon_ionic-md-done-all"
                   data-name="Icon ionic-md-done-all"
                   d="M33.241,11.849,30.6,7.664,18.6,26.648l2.644,4.186Zm8.027-4.185L21.248,39.2,13.41,26.8l-2.644,4.185L21.248,47.724,43.912,11.849ZM0,30.983,10.577,47.724l2.644-4.185L2.739,26.8Z"
                   transform="translate(0 -7.664)"
                   fill="#0f148e"
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
         </li>
     `;
        html += innerContent;
      });
      list.innerHTML = html;
    } else {
      tasks = tasks.filter((task) => !task.completed);
      let html = '';

      tasks.forEach(function (task) {
        const innerContent = `
    <li class="listItem">
    <div class="timehour">
          <div class="itemDate">${task.datestamp}</div>
          <div class="itemHour">${task.hourstamp}</div>
     </div>
         <div class="whole-item ${
           task.completed ? 'completed' : 'not-completed'
         }">
           <div class="item" id="item-${task.id}">
             <input
               type="checkbox"
               class="checkboxes"
               name="checkbox${task.id}"
               id="checkbox${task.id}"
               checked
               ${task.completed && 'disabled'}
             />
             <label for="checkbox${task.id}">${task.content} </label>
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
             <button class="btn completeBtn">
               Complete

               <svg
                 class="done-all"
                 xmlns="http://www.w3.org/2000/svg"
                 width="43.912"
                 height="40.06"
                 viewBox="0 0 43.912 40.06"
               >
                 <path
                   id="Icon_ionic-md-done-all"
                   data-name="Icon ionic-md-done-all"
                   d="M33.241,11.849,30.6,7.664,18.6,26.648l2.644,4.186Zm8.027-4.185L21.248,39.2,13.41,26.8l-2.644,4.185L21.248,47.724,43.912,11.849ZM0,30.983,10.577,47.724l2.644-4.185L2.739,26.8Z"
                   transform="translate(0 -7.664)"
                   fill="#0f148e"
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
         </li>
     `;
        html += innerContent;
      });
      list.innerHTML = html;
    }
  });
}

const clear = document.querySelector('.clear');

if (clear) {
  clear.addEventListener('click', (e) => {
    localStorage.clear();

    location.reload();
  });
}

// finalize that

// dont modify anything

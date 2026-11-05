// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here


(function () {
  'use strict';

  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');
  const errorMsg = document.getElementById('error-msg');
  const counter = document.getElementById('counter');

  const filterAll = document.getElementById('filter-all');
  const filterActive = document.getElementById('filter-active');
  const filterDone = document.getElementById('filter-done');

  let currentFilter = 'all';

  function updateCounter() {
    const itemsLeft = todoList.querySelectorAll(
      'li:not(.completed)'
    ).length;

    counter.textContent =
      `${itemsLeft} item${itemsLeft !== 1 ? 's' : ''} left`;
  }

  function applyFilter() {
    const items = todoList.querySelectorAll('li');

    items.forEach(function (item) {
      const isCompleted = item.classList.contains('completed');

      if (currentFilter === 'all') {
        item.style.display = '';
      } else if (currentFilter === 'active') {
        item.style.display = isCompleted ? 'none' : '';
      } else if (currentFilter === 'done') {
        item.style.display = isCompleted ? '' : 'none';
      }
    });
  }

  todoForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const taskText = todoInput.value.trim();

    if (taskText === '') {
      errorMsg.classList.remove('hidden');
      return;
    }

    errorMsg.classList.add('hidden');

    const li = document.createElement('li');

    const span = document.createElement('span');
    span.className = 'item-text';
    span.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = 'Delete';

    li.appendChild(span);
    li.appendChild(deleteButton);

    todoList.appendChild(li);

    todoInput.value = '';

    applyFilter();
    updateCounter();
  });

  // Event delegation: handle clicks on task items
  todoList.addEventListener('click', function (event) {
    const deleteButton = event.target.closest('.delete-btn');

    if (deleteButton && todoList.contains(deleteButton)) {
      deleteButton.closest('li').remove();

      applyFilter();
      updateCounter();
      return;
    }

    const itemText = event.target.closest('.item-text');

    if (itemText && todoList.contains(itemText)) {
      itemText.closest('li').classList.toggle('completed');

      applyFilter();
      updateCounter();
    }
  });

  filterAll.addEventListener('click', function () {
    currentFilter = 'all';
    applyFilter();
  });

  filterActive.addEventListener('click', function () {
    currentFilter = 'active';
    applyFilter();
  });

  filterDone.addEventListener('click', function () {
    currentFilter = 'done';
    applyFilter();
  });

  updateCounter();

})();


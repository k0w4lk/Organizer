import angular from 'angular';
import { organizerApp } from '../index.js';

const TASKS_GROUPS = {
  active: 'activeTasks',
  completed: 'completedTasks',
};

organizerApp.controller('todoController', ($scope) => {
  $scope.taskName = null;

  $scope.activeTasks = [];

  $scope.completedTasks = [];

  $scope.selectedTasksList = TASKS_GROUPS.active;

  $scope.initTasks = (type) => {
    const taskGroup = TASKS_GROUPS[type];

    const storedTasks = JSON.parse(localStorage.getItem(taskGroup));

    if (storedTasks) {
      $scope[taskGroup] = storedTasks;
    }
  };

  $scope.setTask = (taskName, taskForm) => {
    if (taskForm.$valid) {
      const task = {
        name: taskName,
      };

      $scope.activeTasks.push(task);

      const updatedTasks = angular.toJson($scope.activeTasks);

      localStorage.setItem(TASKS_GROUPS.active, updatedTasks);

      $scope.taskName = null;
    }
  };

  $scope.completeTask = (taskToComplete) => {
    $scope[TASKS_GROUPS.active] = $scope[TASKS_GROUPS.active].filter(
      (task) => task !== taskToComplete,
    );

    $scope[TASKS_GROUPS.completed] = [
      ...$scope[TASKS_GROUPS.completed],
      taskToComplete,
    ];

    const updatedActiveTasks = angular.toJson($scope.activeTasks);
    const updatedCompletedTasks = angular.toJson($scope.completedTasks);

    localStorage.setItem(TASKS_GROUPS.active, updatedActiveTasks);
    localStorage.setItem(TASKS_GROUPS.completed, updatedCompletedTasks);
  };

  $scope.deleteTask = (taskToDelete, type) => {
    const taskGroup = TASKS_GROUPS[type];

    $scope[taskGroup] = $scope[taskGroup].filter(
      (task) => task !== taskToDelete,
    );

    const updatedTasks = angular.toJson($scope[taskGroup]);

    localStorage.setItem(taskGroup, updatedTasks);
  };
});

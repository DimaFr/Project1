var app = angular.module('todolistApp', []);

function StorageService ($window) {

    this.saveTasks = function (data) {
       $window.localStorage.setItem('list', JSON.stringify(data));
    };

    this.loadTasks = function () {
        return JSON.parse($window.localStorage.getItem('list'));
    }
}

function ListController($scope, StorageService) {
    $scope.tasks = StorageService.loadTasks() || [];
    $scope.addTask = function (task) {
        if ($scope.tasks.indexOf(task) == -1) {
            $scope.tasks.push({
                title: task.title,
                description: task.description,
                completed: task.completed
            });
        }
        StorageService.saveTasks($scope.tasks);
        $scope.task = {};
    };

    $scope.removeTask = function (t) {
        $scope.tasks.splice($scope.tasks.indexOf(t), 1);
        StorageService.saveTasks($scope.tasks);
    };

    $scope.editTask = function (t) {
        $scope.task = $scope.tasks[$scope.tasks.indexOf(t)];
    };
}

app.controller('ListController', ListController);
app.service('StorageService', StorageService);

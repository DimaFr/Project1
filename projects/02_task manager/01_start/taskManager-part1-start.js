/**
 * Created by dimitry.friedman on 7/14/2014.
 */
(function (angular, window) {

    function mainController(scope) {
        scope.$on('addTask', function () {
            scope.$broadcast('newTask');
        });
        scope.$on('editTask', function (event, data) {
            scope.$broadcast('oldTask', data);
        });
        scope.$on('removeTask', function (event, data) {
            scope.$broadcast('deleteTask', data);
        });
    }

    function logController(scope,LogManager) {
        scope.logs = [];

        scope.refreshLogs=function(){
            scope.logs = LogManager.logs;
        };
        scope.$on('newTask', function () {
            var eventLog ={
                timeStamp: new Date(),
                msg: "task added"
            };
            LogManager.saveLogs(eventLog);
            scope.refreshLogs();

        });
        scope.$on('deleteTask', function () {
            var eventLog ={
                timeStamp: new Date(),
                msg: "task deleted"
            };
            LogManager.saveLogs(eventLog);
            scope.refreshLogs();
        });
        scope.deleteLogs = function () {
            scope.logs = [];
            console.log('logs were deleted')

        };

    }

    function addTaskController(scope, DataService) {

        scope.tasks = DataService.tasks;
        scope.addTask = function (task) {
            if (scope.tasks.indexOf(task) == -1) {
                scope.tasks.push({
                    title: task.title,
                    description: task.description,
                    checked: false
                });
                //TODO:should updata dataservice first?
                scope.$emit('addTask');
            }
            DataService.saveTasks(scope.tasks);
            scope.task = {};
        };
        scope.$on('oldTask', function (event, data) {
            scope.task = data;
        });
    }


    function taskTableController(scope, DataService) {
        scope.tasks = DataService.tasks;
        //listens to check box
        scope.updateWithTask = function (task) {
            var taskIndex = scope.tasks.indexOf(task);
            scope.tasks[taskIndex] = task;
            DataService.saveTasks(scope.tasks)
        };
        scope.removeTask = function (task) {
            scope.tasks.splice(scope.tasks.indexOf(task), 1);

            DataService.saveTasks(scope.tasks);
            scope.$emit('removeTask');
        };
        scope.editTask = function (task) {

            scope.$emit('editTask', task)
        };
        scope.$on('newTask', function (event, data) {
                scope.tasks = DataService.tasks;
            }
        );
    }


    /*
     SERVICES
     */

    /*
     ALTERNATIVE SERVICE
     */
//    function DataService() {
//        this.saveTasks = function (model) {
//            localStorage.dataService = angular.toJson(model);
//        };
//
//        this.loadTasks = function () {
//            return angular.fromJson(localStorage.dataService);
//        }
//
//        this.tasks = this.loadTasks() || [];
//    }



    angular.module('TaskManager', [])
//       .config(function(LogManager){
//            this.printToConsoleEnabled(true);
//       })
        .controller({
            'MainController': ['$scope', mainController],
            'TaskTableController': ['$scope', 'DataService', taskTableController],
            'AddTaskController': ['$scope', 'DataService', addTaskController],
            'LogController': ['$scope','LogManager', logController]
        })




})
(angular, window);
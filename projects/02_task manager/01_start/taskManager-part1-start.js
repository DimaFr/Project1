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

    function logController(scope) {
        scope.logs = [];
        scope.$on('newTask', function () {
            scope.logs.push({
                timeStamp: new Date(),
                msg: "task added"
            });
//            LogProvider.printLog(msg);
        });
        scope.$on('deleteTask', function () {
            scope.logs.push({
                timeStamp: new Date(),
                msg: "task removed"
            });
//            LogProvider.printLog(msg);
        });
        scope.deleteLogs = function () {
            scope.logs = [];
//            LogProvider.printLog("logs were deleted");
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
     FACTORY
     */

    function DataService() {
        var _model = _loadTasks() || [];
        var _saveTasks = function (model) {
            localStorage.dataService = angular.toJson(model);
        };

        function _loadTasks() {
            //return saved data or empty array
            _model = angular.fromJson(localStorage.dataService);
            return _model;
        }

        var DataService = {
            saveTasks: _saveTasks,
            tasks: _model
        };
        return DataService;
    }

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
    /*
     LOG FACTORY
     */
    function LogService() {
        var _model = _loadTasks() || [];
        var _saveLogs = function (model) {
            localStorage.dataService = angular.toJson(model);
        };

        function _loadLogs() {
            //return saved data or empty array
            _model = angular.fromJson(localStorage.dataService);
            return _model;
        };
        var LogService = {
            saveLogs: _saveLogs,
            logs: _model
        };
        return LogService;
    }


//    function LogProvider($log) {
//
//        this.printLogsFlag = true;
//        this.$get = function () {
//            var _printLogsFlag = this.printLogsFlag;
//            return {
//                printLog: function (msg) {
//                    if (_printLogsFlag) {
//                        var timeStamp = new Date();
//                        $log.debug(timeStamp + " - " + msg);
//                    }
//                }
//            }
//
//        }
//    }


    angular.module('TaskManager', [])
//        .config(function(LogServiceProvider){
//            this.printLogsFlag=true;
//        })
        .controller({
            'MainController': ['$scope', mainController],
            'TaskTableController': ['$scope', 'DataService', taskTableController],
            'AddTaskController': ['$scope', 'DataService', addTaskController],
            'LogController': ['$scope', logController]


        })
        .service('DataService', DataService)
       // .provider('$log','LogService', LogProvider)


})
(angular, window);
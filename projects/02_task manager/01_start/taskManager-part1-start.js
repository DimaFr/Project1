/**
 * Created by dimitry.friedman on 7/14/2014.
 */
(function (angular, window) {

    function mainController(scope) {
        scope.$on('addTask', function () {
            scope.$broadcast('newTask');
        })

        scope.$on('editTask', function (event, data) {
            scope.$broadcast('oldTask', data);
        })

        scope.$on('removeTask', function (event, data) {
            scope.$broadcast('deleteTask', data);
        })
    }

    function addTaskController(scope,DataService){
//        scope.tasks=DataService.RestoreState();
        scope.tasks = DataService.tasks;
        scope.addTask = function(task){
            if(scope.tasks.indexOf(task)==-1){
                scope.tasks.push(task);
                //TODO:should updata dataservice first?
                scope.$emit('addTask');
            }
           // DataService.SaveState(scope.tasks);
            DataService.saveTasks(scope.tasks);
            scope.task={};
        };
        scope.$on('oldTask',function(event,data){
            scope.task=data;
        });
    }


    function taskTableController(scope, DataService) {

//        scope.tasks = DataService.RestoreState();
        scope.tasks = DataService.tasks;
        //listens to check box
        scope.updateWithTask = function (task) {
            var taskIndex = scope.tasks.indexOf(task);
            scope.tasks[taskIndex] = task;
//            DataService.SaveState(scope.tasks);
            DataService.saveTasks(scope.tasks)
        }; //bind(this)
        scope.removeTask = function (task) {
            scope.tasks.splice(scope.tasks.indexOf(task),1);
//            DataService.SaveState(scope.tasks);
            DataService.saveTasks();
            scope.$emit('removeTask');

        }
        scope.editTask = function (task) {
            //TODO: replace task with task from scope.tasks?
            scope.$emit('editTask', task)
        };
        scope.$on('newTask',function(event,data){
                //TODO: data should be updated in add controller
//                scope.tasks = DataService.RestoreState();
                scope.tasks = DataService.tasks;
            }
        );

    }


    /*
     SERVICES
     */
//    function DataService() {
//        var _model = [];
//        var _saveState = function (model) {
//            localStorage.dataService = angular.toJson(model);
//        };
//        var _restoreState = function () {
//            //return saved data or empty array
//            _model = angular.fromJson(localStorage.dataService) || [];
//            return _model;
//        }
//        var DataService = {
//            model: _model,
//            SaveState: _saveState,
//            RestoreState: _restoreState
//        }
//        return DataService;
//    }
function DataService(){
    this.saveTasks = function (data) {
        localStorage.setItem('list', JSON.stringify(data));
    };

    this.loadTasks = function () {
        return JSON.parse(localStorage.getItem('list'));
    }

    this.tasks = this.loadTasks() || [];
}



    angular.module('TaskManager', [])
        .controller({
            'MainController': ['$scope', mainController],
            'TaskTableController': ['$scope', 'DataService', taskTableController],
            'AddTaskController':['$scope','DataService',addTaskController]


        })
        .service('DataService', DataService);


})(angular, window);
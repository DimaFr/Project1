(function(){
    angular.module("TaskManager")
        .factory({'DataService':DataService},
        {'LogService':LogService})
        .provider({'LogManager':LogManager})



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

    function LogService() {
        var _model = _loadTasks() || [];
        var _saveLogs = function (model) {
            localStorage.logService = angular.toJson(model);
        };

        function _loadLogs() {
            //return saved data or empty array
            _model = angular.fromJson(localStorage.logService);
            return _model;
        }
        var LogService = {
            saveLogs: _saveLogs,
            logs: _model
        };
        return LogService;
    }

    function LogManager(){
        var printEnabled=false;
        this.printToConsoleEnabled= function(flag){
            printEnabled=flag;
        }
/       this.$get=function(LogService){
//            return {
//               EventsLogs: LogService.logs,
//               logEvent: function(eventLog){
//                  this.EventsLogs.push(eventLog);
//                  if(printEnabled){
//                      console.log(eventLog);
//                  }
//                   LogService.saveLogs(this.EventsLogs);
//               }
//            }
            var _model = _loadTasks() || [];
            var _saveLogs = function (model) {
                if(printEnabled){
                  console.log("eventLog");
                 }
                localStorage.logService = angular.toJson(model);
            };

            function _loadLogs() {
                //return saved data or empty array
                _model = angular.fromJson(localStorage.logService);
                return _model;
            }
            return {
                saveLogs: _saveLogs,
                logs: _model
            };

      }

    }




}())
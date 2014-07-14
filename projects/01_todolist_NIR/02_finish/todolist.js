function ListController($scope) {
    $scope.tasks = [];
    $scope.addTask = function (task) {
        $scope.tasks.push({
            title: task.title,
            description: task.description,
            completed: task.completed
        });
        $scope.task = {};
    }
}
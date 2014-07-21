/**
 * Created by dimitry.friedman on 7/21/2014.
 */
(function(){

    function TruncateWordsFilter() {
        return function (input, maxLength) {

            if (maxLength <= 0) {
                return '...';
            }

            if (input) {
                var inputWords = input.split(/\s+/);
                if (inputWords.length > maxLength) {
                    input = inputWords.slice(0, maxLength).join(' ') + '...';
                }
            }

            return input;
        }
    }

    function TruncateCharsFilter(){
        return function(input,maxLength){
            if(maxLength<=0){
                return '...';
            }
            if(input){
                if(input.length>maxLength){
                    input = input.substring(0,maxLength)+'...';
                }
            }
            return input;
        }
    }

    angular.module('TaskManager')
        .filter('truncate',TruncateCharsFilter)

}());
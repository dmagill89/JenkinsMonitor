var jQuery = require('jquery');

(function(window, $) {

    function getJenkinsData() {
        $.get('/json', function(resp) {
            setTrafficLight(resp);
        });
    }

    $(document).ready(function(){

        var deferred = $.Deferred(function() {
            getJenkinsData();
        });
        deferred.done(function() {
            window.setInterval(getJenkinsData,10000);
        });
        deferred.resolve();
    });

    function setTrafficLight(jenkins) {

        if(jenkins.result === 'SUCCESS') {
            $('#green').addClass('active');
            $('#orange').removeClass('active');
            $('#red').removeClass('active');
            $.get('/saySuccess', function(resp){});
        } else if(jenkins.result === 'FAILURE'){
            $('#red').addClass('active');
            $('#orange').removeClass('active');
            $('#green').removeClass('active');
            $.get('/sayFailure', function(resp){});
        } else {
            $('#orange').addClass('active');
            $('#green').removeClass('active');
            $('#red').removeClass('active');
            $.get('/sayBuilding', function(resp){});
        }
    }

})(window, jQuery);
$(document).ready(function() {
    // Intercept the form submission
    $('#formQuiz').submit(function(event) {
        // Prevent the default form submission
        event.preventDefault();


        // Send the form data to the PHP script using AJAX
        $.ajax({
            type: 'GET',
            url: 'quizScript.php',
            
            data: {
                'answers': [
                    this.quizQ1.value, 
                    this.quizQ2.value, 
                    this.quizQ3.value, 
                    this.quizQ4.value, 
                    this.quizQ5.value
                ]
            },  
            
            success: function(response) {
                console.log(response);

                alert(response);
            },
            error: function(error) {
                console.log('An error occurred: ' + error);
            }            
        });
    });
});
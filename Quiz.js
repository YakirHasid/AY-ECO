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
            /*          
            data: {
                'quizQ1' : this.quizQ1.value,
                'quizQ2' : this.quizQ2.value,
                'quizQ3' : this.quizQ3.value,
                'quizQ4' : this.quizQ4.value,
                'quizQ5' : this.quizQ5.value
            },
            */
            success: function(response) {

            },
            error: function(error) {
                console.log('An error occurred: ' + error);
            }            
        });
    });
});
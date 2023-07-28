<?php    
    
    // usage of array
    $correctAnswer[0] = "Decades";
    $correctAnswer[1] = "Over a Million Years";
    $correctAnswer[2] = "Hundreds of Years";
    $correctAnswer[3] = "500 Years";
    $correctAnswer[4] = "A Year";

    $sumOfAnswers = 0 ; 
  
   $answers = $_GET['answers'];

   // usage of function
    function checkCorrect ($correctAnswer, $givenAnswerIndex, $givenAnswerVal) {   
        // usage of strings
        return strcmp($givenAnswerVal, $correctAnswer[$givenAnswerIndex]) == 0;
    }
    
    // usage of loop
    foreach($answers as $index => $answer) {
        if(checkCorrect ($correctAnswer, $index, $answer) == true) {
            $sumOfAnswers++;
        }
    }

    if($sumOfAnswers == 5) {
        echo "Well Done! You got all the questions right!";
    }
    else {
        // usage of calculation
        $numOfWrong = 5 -  $sumOfAnswers;
        echo "You got " . $sumOfAnswers . " right and ". $numOfWrong ." wrong, try again!";
    }
?>
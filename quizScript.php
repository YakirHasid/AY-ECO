<?php

    $CorectAnswer[0] = "Decades";
    $CorectAnswer[1] = "Over a million years";
    $CorectAnswer[2] = "500 Years";
    $CorectAnswer[3] = "A Year";
    $CorectAnswer[4] = "Hundreds of years";
  

    function checkCorrect ($givenAnswer, $correctAnswer) {
        return strcmp($givenAnswer, $correctAnswer) == 0;
    }
    
    $testing = "test";

    $answer = checkCorrect($testing);
    
    echo $answer;
?>
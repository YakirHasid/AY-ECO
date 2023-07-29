<?php
    $servername = "sql309.byethost17.com";
    $username = "b17_33864062";
    $password = "kTs6nN8a.Pvhi!X";
    $dbname = "b17_33864062_AY_ECO_Database";

    $formUsername = $_GET["Username"];
    $formPassword = $_GET["Password"];

    $conn = new mysqli($servername, $username, $password, $dbname);

    if($conn->connect_error) {
        echo NULL;
        return;
    }

    $sql = "SELECT username FROM User U 
            WHERE U.username = '".$formUsername."'
            and U.password = '".$formPassword."';";    
    
    $answer = $conn->query($sql);

    if($answer) {
        // check if username and password match was found
        if($row = $answer->fetch_assoc()) {
            echo json_encode($row);
        }
        // no matching username and password was found
        else {
            echo NULL;            
        }
    }
    else {
        echo NULL;        
    }

    $conn->close();
?>
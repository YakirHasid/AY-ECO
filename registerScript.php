<?php
    $servername = "sql309.byethost17.com";
    $username = "b17_33864062";
    $password = "kTs6nN8a.Pvhi!X";
    $dbname = "b17_33864062_AY_ECO_Database";

    $formUsername = $_POST["Username"];
    $formFirstName = $_POST["FirstName"];
    $formLastName = $_POST["LastName"];
    $formEmail = $_POST["Email"];
    $formPassword = $_POST["Password"];

    $conn = new mysqli($servername, $username, $password, $dbname);

    if($conn->connect_error) {
        die("Connection failed: ". $conn->connect_error);
    }

    $sql = "INSERT INTO User (username, password, firstname, lastname, email) 
    VALUES ('".$formUsername."', '".$formPassword."', '".$formFirstName."', '".$formLastName."', '".$formEmail."');";

    $answer = $conn->query($sql);

    if($answer) {
        $result = array("username"=>$formUsername,"message"=>"New record created successfully" );
    }
    else {
        $result = array("message"=>"Error: " . $conn->error );
    }
    echo json_encode($result);
    
    $conn->close();
?>
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

    if($conn->query($sql)) {
        echo "New record created successfully";
    }
    else {
        echo "Error: " .$sql . "<br>" . $conn->error;
    }
    
    $conn->close();
?>
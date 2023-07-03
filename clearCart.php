<?php
    $servername = "sql309.byethost17.com";
    $username = "b17_33864062";
    $password = "kTs6nN8a.Pvhi!X";
    $dbname = "b17_33864062_AY_ECO_Database";

    $usernameWeb = $_POST["username"];    

    $conn = new mysqli($servername, $username, $password, $dbname);

    if($conn->connect_error) {
        die("Connection failed: ". $conn->connect_error);
    }

    $sql = "DELETE FROM UserCart WHERE username = '".$usernameWeb."';";        

    if($conn->query($sql)) {
        echo "true";
    }
    else {
        echo "false";
    }
    
    $conn->close();
?>
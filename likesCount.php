<?php
    $servername = "sql309.byethost17.com";
    $username = "b17_33864062";
    $password = "kTs6nN8a.Pvhi!X";
    $dbname = "b17_33864062_AY_ECO_Database";
    
    $postIdWeb = $_GET["postId"]; 

    $conn = new mysqli($servername, $username, $password, $dbname);

    if($conn->connect_error) {
        die("Connection failed: ". $conn->connect_error);
    }

    $sql = "SELECT COUNT(username) FROM LikedBy WHERE postId = ".$postIdWeb.";";  
    
    $answer = $conn->query($sql);

    if($answer) {
        echo json_encode($answer->fetch_assoc());
    }
    else {
        echo "0";
    }            
    
    $conn->close();
?>
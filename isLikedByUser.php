<?php
    $servername = "sql309.byethost17.com";
    $username = "b17_33864062";
    $password = "kTs6nN8a.Pvhi!X";
    $dbname = "b17_33864062_AY_ECO_Database";
    
    $postIdWeb = $_GET["postId"]; 
    $usernameWeb = $_GET["username"]; 

    $conn = new mysqli($servername, $username, $password, $dbname);

    if($conn->connect_error) {
        die("Connection failed: ". $conn->connect_error);
    }

    $sql = "SELECT * FROM LikedBy WHERE postId = ".$postIdWeb." AND username = '".$usernameWeb."';";  
    
    $answer = $conn->query($sql);

    if($answer) {
        echo json_encode($answer->fetch_assoc());
    }
    else {
        echo "0";
    }            
    
    $conn->close();
?>
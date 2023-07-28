<?php    
    $servername = "sql309.byethost17.com";
    $username = "b17_33864062";
    $password = "kTs6nN8a.Pvhi!X";
    $dbname = "b17_33864062_AY_ECO_Database";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if($conn->connect_error) {
        die("Connection failed: ". $conn->connect_error);
    }

    $formPostId = $_POST["postId"];
    $formUsername = $_POST["username"];
    $formUpdatedText = $_POST["updatedText"];    

    date_default_timezone_set("Israel");
    
    $sql = "UPDATE Post SET text='".$formUpdatedText."' ,post_date='".date("Y-m-d H:i:s")."' WHERE username='".$formUsername."' AND Id='".$formPostId."'";    

    $answer = $conn->query($sql);               

    if($answer) {

        echo json_encode($answer);
    }
    else {
        echo json_encode("Error: " .$sql . "<br>" . $conn->error);
    }
    
    $conn->close();
?>
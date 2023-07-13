<?php
    $servername = "sql309.byethost17.com";
    $username = "b17_33864062";
    $password = "kTs6nN8a.Pvhi!X";
    $dbname = "b17_33864062_AY_ECO_Database";

    // Id is handled by automatically by database
    //$formId = $_POST["Id"];
    $formUsername = $_POST["Username"];
    $formText = $_POST["Text"];
    $formPostDate = $_POST["PostDate"];

    date_default_timezone_set("Israel");

    $conn = new mysqli($servername, $username, $password, $dbname);

    if($conn->connect_error) {
        die("Connection failed: ". $conn->connect_error);
    }

    $sql = "INSERT INTO Post (username, text, post_date) 
    VALUES ('".$formUsername."', '".$formText."', '". date("Y-m-d H:i:s")."');";

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
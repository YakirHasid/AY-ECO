<?php    
    $servername = "sql309.byethost17.com";
    $username = "b17_33864062";
    $password = "kTs6nN8a.Pvhi!X";
    $dbname = "b17_33864062_AY_ECO_Database";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if($conn->connect_error) {
        die("Connection failed: ". $conn->connect_error);
    }

    $sql = "SELECT Id,username,text,post_date FROM Post ORDER BY post_date DESC";

    $answer = $conn->query($sql);               

    if($answer) {

        $result = array();

        while($row = $answer->fetch_assoc()) {
            array_push($result, $row);           
        }        

        echo json_encode($result);          
    }
    else {
        echo "Error: " .$sql . "<br>" . $conn->error;        
    }
    
    $conn->close();
?>
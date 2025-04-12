<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

$firstName = $_POST['firstName'];
$section = $_POST['section'];

// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "examplan";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("<div style='color: red; font-weight: bold;'>Connection failed: " . $conn->connect_error . "</div>");
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exam Plan</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f9f9f9;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        h1 {
            text-align: center;
            color: #5c8aff;
        }
        .success {
            color: green;
            font-weight: bold;
            margin-bottom: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: center;
        }
        th {
            background-color: #f2f2f2;
        }
        .no-results {
            color: red;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Exam Plan</h1>
        <?php
        echo "<div class='success'>Connected successfully</div>";
        echo "<p><strong>First Name:</strong> " . htmlspecialchars($firstName) . "</p>";
        echo "<p><strong>Section:</strong> " . htmlspecialchars($section) . "</p>";

        // SQL query
        $sql = "SELECT ClassRoom, Section FROM sheet WHERE Name = '$firstName'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            echo "<table>";
            echo "<thead><tr><th>Class Room</th><th>Section</th></tr></thead>";
            echo "<tbody>";
            while ($row = $result->fetch_assoc()) {
                echo "<tr>";
                echo "<td>" . htmlspecialchars($row["ClassRoom"]) . "</td>";
                echo "<td>" . htmlspecialchars($row["Section"]) . "</td>";
                echo "</tr>";
            }
            echo "</tbody>";
            echo "</table>";
        } else {
            echo "<p class='no-results'>No records found</p>";
        }

        // Close the connection
        $conn->close();
        ?>
    </div>
</body>
</html>
<?php

// Logging function
function log_console($data, $context = 'Debug') {
    $output  = $context . ': ' . $data;
    $output .= "\n";
    error_log($output);
    echo "<script>console.log( '" . $output . "' );</script>";
}

// File upload
if (isset($_POST["password"]) && $_POST["password"] === "pass123") {
    if (isset($_FILES["image-file"])) {
        $fileError = $_FILES["image-file"]["error"];
        if ($fileError === UPLOAD_ERR_OK) {
            $fileTmpName = $_FILES["image-file"]["tmp_name"];
            $fileName = $_FILES["image-file"]["name"];
            if (is_uploaded_file($fileTmpName)) {
                $fileExt = pathinfo($fileName, PATHINFO_EXTENSION);
                $allowedExt = array("jpg", "jpeg", "png", "gif");
                if (in_array($fileExt, $allowedExt)) {
                    if (getimagesize($fileTmpName)) {
                        $fileName = uniqid() . "." . $fileExt;
                        $fileDestination = __DIR__ . '/uploads/' . $fileName;
                        if (move_uploaded_file($fileTmpName, $fileDestination)) {
                            log_console("File uploaded successfully to " . $fileDestination, "Info");
                            $response = ["status" => "success", "file_name" => $fileName];
                        } else {
                            log_console("Failed to move the uploaded file.", "Error");
                            $response = ["status" => "error", "message" => "Failed to move the uploaded file."];
                        }
                    } else {
                        log_console("Invalid file type, only image files are allowed.", "Error");
                        $response = ["status" => "error", "message" => "Invalid file type, only image files are allowed."];
                    }
             } else {
                    log_console("Invalid file type, only jpg, jpeg, png, gif are allowed.", "Error");
                    $response = ["status" => "error", "message" => "Invalid file type, only jpg, jpeg, png, gif are allowed."];
                }
            } else {
                log_console("File is not an uploaded file.", "Error");
                $response = ["status" => "error", "message" => "File is not an uploaded file."];
            }
        } else {
            log_console("File upload error: " . $fileError, "Error");
            $response = ["status" => "error", "message" => "File upload error: " . $fileError];
        }
    } else {
        log_console("No file uploaded.", "Error");
        $response = ["status" => "error", "message" => "No file uploaded."];
    }
} else {
    log_console("Incorrect password.", "Error");
    $response = ["status" => "error", "message" => "Incorrect password."];
}

// Return response
header("Content-type: application/json");
echo json_encode($response);

<?php
    $username = "";
	$email =""; 
	$errors = array();
	
	
     // connect to the database 
	 $db = mysql_connect ("localhost" , "root" , "KDtUd9froV14uqvb", "registracion" ); 
	 
	 // if the Registrar buttonn is clicked 
	 if (isset($_post["Registrar"])) {
		 $usurname = mysql_real_escape_string($_post["username"]); 
	     $email = mysql_real_escape_string($_post["email"]); 	 
	     $password_1 = mysql_real_escape_string($_post["password_1"]); 	 
	     $password_2 = mysql_real_escape_string($_post["password_2"]); 
		 
		 // ensure the  form fields are filled properly 
		 if (empty($usurname)) {
			 array_push($errors, "username is required");
	     } 
		 if (empty($email)) {
			 array_push($errors, "email is required");
	     } 
		 if (empty($password_1)) {
			 array_push($errors, "password is required");
	     } 
         
	     if ($password_1 != $password_2) {  
	     array_push($errors, "the two password do not match");
	     }
		 // if there a no errors, save user to database 
		 if (count($errors) == 0=) {
		     $password = md5($password_1); // encrypt password before storing in database (security)
			 $sql = "INSERT INTO  users (username, email, password)
			            VALUES ("$username", "$email, "$password")";
			mysqli_query($db, $sql);
		 }
	}
	 
?>

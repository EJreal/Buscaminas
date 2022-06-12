<?php
session_start();
include_once "conexion.php";
 
function verificar_login($user,$password,&$result) {
    $sql = "SELECT * FROM usuarios WHERE usuario = '$user' and password = '$password'";
    $rec = mysqli_query($sql);
    $count = 0;
 
    while($row = mysqli_fetch_object($rec))
    {
        $count++;
        $result = $row;
    }
 
    if($count == 1)
    {
        return 1;
    }
 
    else
    {
        return 0;
    }
}
 
if(!isset($_SESSION['userid']))
{
    if(isset($_POST['login']))
    {
        if(verificar_login($_POST['user'],$_POST['password'],$result) == 1)
        {
            $_SESSION['userid'] = $result->idusuario;
            header("location:index.php");
        }
        else
        {
            echo '<div class="error">Su usuario es incorrecto, intente nuevamente.</div>';
        }
    }
}
?>
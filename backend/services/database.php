<?php

namespace services;
use mysqli;

class DataBase {

    public $db_host = 'localhost';
    public $db_user = 'root';
    public $db_password = '';
    public $db_database = 'movie_website';


    public function dbConn() {

        $connection = new mysqli($this->db_host, $this->db_user, $this->db_password, 
        $this->db_database);

        if($connection->connect_errno) {
            
            die("Connection failed".$connection->connect_error);
            
        }

        return $connection;
    }
}
<?php

namespace controllers;
use services\DataBase; 

class MainController{
    public $conn = null;

    public function __construct(){
        $this->conn = (new DataBase())->dbConn();
    }

    public function index(){
        
        try {

            $this->getHeaders();

        //echo "<pre>";
        $perPage = $_GET["limit"] ?? 5;
        $pageNumber = $_GET["offset"] ?? 0;
        $moviesArr = [];
        
        $sql = "SELECT * FROM movies";
        $totalMovies = mysqli_num_rows(mysqli_query($this->conn, $sql));
        
        $sql = "SELECT * FROM movies ORDER BY id LIMIT $perPage OFFSET $pageNumber";
        $response = mysqli_query($this->conn, $sql);

        if($response) {

            while($row = mysqli_fetch_assoc($response)) {

                $moviesArr['movies'][] = $row;
            }

        } else {

            echo "Error ".$sql. "<br/>".mysqli_error($this->conn);
        }

        $moviesArr['count'] = $totalMovies;

        mysqli_close($this->conn);
        echo json_encode($moviesArr, JSON_PRETTY_PRINT);

    } catch(\Exception $e) {

        var_dump($e->getMessage());
    }

    }

    public function search() {

        try {

            $this->getHeaders();


            $moviesArr = [];
            $keyword = $_GET["keyword"] ?? null;
        
        
        $sql = "SELECT id, title FROM movies WHERE title LIKE '%$keyword%' LIMIT 5";
        $response = mysqli_query($this->conn, $sql);

        if($response) {

            while($row = mysqli_fetch_assoc($response)) {

                $moviesArr['movies'][] = $row;
            }

        } else {

            echo "Error ".$sql. "<br/>".mysqli_error($this->conn);
        }


        echo json_encode($moviesArr, JSON_PRETTY_PRINT);

    } catch(\Exception $e) {

        var_dump($e->getMessage());
    }
    }

    //get current movie

    public function getMovie(){
        try {

        $this->getHeaders();


            $currMovie = null;
            $id = $_GET["id"] ?? null;
        
        if($id) {
            $sql = "SELECT * FROM movies WHERE id='".$id."'";
            $response = mysqli_query($this->conn, $sql);

            if($response) {

                while($row = mysqli_fetch_assoc($response)) {

                    $currMovie = $row;
                }

            } else {

                echo "Error ".$sql. "<br/>".mysqli_error($this->conn);
            }
        }
        
        echo json_encode($currMovie, JSON_PRETTY_PRINT);

    } catch(\Exception $e) {

        var_dump($e->getMessage());
    }
    }



    // Get movies for third party api

    public function getMovies() {

        try {

            $url = "https://jsonplaceholder.typicode.com/posts";

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_AUTOREFERER, TRUE);
            curl_setopt($ch, CURLOPT_HEADER, 0);
            curl_setopt($ch, CURLOPT_ENCODING, 0);
            curl_setopt($ch, CURLOPT_MAXREDIRS, 10);
            curl_setopt($ch, CURLOPT_TIMEOUT, 30);
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

            $url = "https://jsonplaceholder.typicode.com/photos";

            $chImg = curl_init();
            curl_setopt($chImg, CURLOPT_AUTOREFERER, TRUE);
            curl_setopt($chImg, CURLOPT_HEADER, 0);
            curl_setopt($chImg, CURLOPT_ENCODING, 0);
            curl_setopt($chImg, CURLOPT_MAXREDIRS, 10);
            curl_setopt($chImg, CURLOPT_TIMEOUT, 30);
            curl_setopt($chImg, CURLOPT_CUSTOMREQUEST, "GET");
            curl_setopt($chImg, CURLOPT_RETURNTRANSFER, TRUE);
            curl_setopt($chImg, CURLOPT_URL, $url);
            curl_setopt($chImg, CURLOPT_FOLLOWLOCATION, TRUE);
            curl_setopt($chImg, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

            $responsData = json_decode(curl_exec($ch), true);
            $responsImg = json_decode(curl_exec($chImg), true);
            $newArr = [];

            // Combine data

            foreach ($responsData as $resData) {
                if(isset($responsImg[$resData['id']])){
                    $resData['image'] = $responsImg[$resData['id']]['url'];
                }

                $newArr[] = $resData;
            }

           $this->saveMovies($newArr);

        } catch(\Exception $e) {
            var_dump($e->getMessage());
            exit;
        }
    }

    // Save movies in db from api
    public function saveMovies($movies = null){
        foreach($movies as $movie) {
            $ins = "INSERT INTO movies(`userId`, `title`, `body`, `image`)
            VALUES (
                '".$movie['userId']."',
                '".$movie['title']."',
                '".$movie['body']."',
                '".$movie['image']."')";

                if(mysqli_query($this->conn, $ins)) {
                    echo "New record created successfully";
                } else {
                    echo "Error: ".$ins."<br/>".mysqli_error($this->conn);
                }
        }
        mysqli_close($this->conn);
    }

    public function getHeaders(){

        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400'); //cache for 1 day
        header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
        header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if($_SERVER['REQUEST_METHOD'] == 'OPTIONS'){
            echo"OPTIONS";
            
            if(isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])){

                header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
            }

            if(isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])){

                header('Access-Control-Allow-Headers: {$_SERVER["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"]}');
            }

            exit(0);
        }
    }

}
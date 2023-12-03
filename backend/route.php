<?php

namespace backend;

class Route{

    public static $URLS = [];

    static function start()
    {
        $route = substr($_SERVER['REQUEST_URI'], 1);
        if (strripos($route, "?") != NULL) {
            $route = strstr($route, "?", true);
        } 
        foreach (self::$URLS as $value) {
            if ($value["path"] ==  $route) {
                $contr = explode('@', $value["ctrl"]);
                $contrName = $contr[0];
                $method = $contr[1];
                $contrName = 'controllers\\' . $contrName;
                $controller = new $contrName;
                if (method_exists($controller, $method)) {
                    $controller->$method();
                } else {
                    echo("Method not found");
                }
            } 
        }
    }

    static function get(string $path, string $ctrl)
    {
        self::$URLS[] = [
            "path" => $path,
            "ctrl" => $ctrl
        ];
    }
}
<?php
class conversionMonth
{
    static function convertMonthToNumber($month)
    {
        switch ($month) {
            case "ianuarie":
                $month = 1;
                break;
            case "februarie":
                $month = 2;
                break;
            case "martie":
                $month = 3;
                break;
            case "aprilie":
                $month = 4;
                break;
            case "mai":
                $month = 5;
                break;
            case "iunie":
                $month = 6;
                break;
            case "iulie":
                $month = 7;
                break;
            case "august":
                $month = 8;
                break;
            case "septembrie":
                $month = 9;
                break;
            case "octombrie":
                $month = 10;
                break;
            case "noiembrie":
                $month = 11;
                break;
            case "decembrie":
                $month = 12;
                break;
        }
        return $month;
    }
}

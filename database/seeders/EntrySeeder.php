<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EntrySeeder extends Seeder
{
    private $times = [
        "1月前期",
        "1月後期",
        "2月前期",
        "2月後期",
        "3月前期",
        "3月後期",
        "4月前期",
        "4月後期",
        "5月前期",
        "5月後期",
        "6月前期",
        "6月後期",
        "7月前期",
        "7月後期",
        "8月前期",
        "8月後期",
        "9月前期",
        "9月後期",
        "10月前期",
        "10月後期",
        "11月前期",
        "11月後期",
        "12月前期",
        "12月後期",
    ];

    public function run()
    {
        foreach($this->times as $time) {
            DB::table("entries")->insert([
                "time" => $time,
            ]);
        }

    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    private $categories = [
        "Controller部門",
        "全体の流れ部門",
        "@foreach部門",
        "git部門",
        "PHP部門"
    ];

    public function run()
    {
        foreach($this->categories as $category) {
            DB::table("categories")->insert([
                "name" => $category
            ]);
        }
    }
}

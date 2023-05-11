<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use AjCastro\EagerLoadPivotRelations\EagerLoadPivotTrait; //Pivotのeager load用

class Category extends Model
{
    use EagerLoadPivotTrait; //Pivotのeager load用
    use HasFactory;

    public function events()
    {
        return $this->belongsToMany(Event::class, "decisions");
    }

    public function students()
    {
        return $this->belongsToMany(Student::class, "decisions")
        ->using(Decision::class)->withPivot(["event_id"]);;
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use AjCastro\EagerLoadPivotRelations\EagerLoadPivotTrait; //Pivotのeager load用

class Event extends Model
{
    use EagerLoadPivotTrait; //Pivotのeager load用
    use HasFactory;

    protected $fillable = ["date"];

    public function students()
    {
        return $this->belongsToMany(Student::class);
    }

    public function mentors()
    {
        return $this->belongsToMany(Mentor::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, "decisions")
        ->using(Decision::class)->withPivot(["student_id"]);
    }
}

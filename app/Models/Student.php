<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use AjCastro\EagerLoadPivotRelations\EagerLoadPivotTrait; //Pivotのeager load用

class Student extends Model
{
    use EagerLoadPivotTrait; //Pivotのeager load用
    use HasFactory;

    protected $fillable = ["name", "entry_id"];

    public function entry()
    {
        return $this->belongsTo(Entry::class);
    }

    public function events()
    {
        return $this->belongsToMany(Event::class, "decisions")
            ->using(Decision::class)->withPivot(["category_id"])->withTimeStamps();
    }
}

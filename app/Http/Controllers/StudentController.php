<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Student;
use App\Models\Entry;
use App\Models\Category;
use App\Models\Event;

class StudentController extends Controller
{
    public function index(Student $student, Entry $entry, Event $event)
    {
        return Inertia::render("Student/index", [
            "students" => $student->with('entry')->get(),
            "entries" => $entry->get(),
            "events" => $event->get()
        ]);
    }

    public function store(Request $request, Student $student)
    {
        $input = $request->only(["name","entry_id"]);
        $array = $request->possible_days;

        $student->fill($input)->save();

        $array = array_keys($array, true);
        foreach($array as $index => $arr) {
            $array[$index] += 1;
        }
        
        $student->events()->attach($array);

        return redirect(route("student.index"));
    }

    public function decision(Student $student, Event $event, Category $category)
    {
        return Inertia::render("Student/decision",[
            "students" => $student::with("entry", "events")->get(),
            "events" => $event->get(),
            "categories" => $category->get()
        ]);
    }

    public function decisionStore(Request $request)
    {
        $inputs = $request["array"];
        foreach($inputs as $index => $input) {
            $student = Student::find($input[0]);
            $search_array = [0,0];
            foreach ($input as $key => $value) {
                if ($value !== $search_array && $key !== 0) {
                    $student->events()->attach($value[0],["category_id" => $value[1]]);
                }
            }
        }
        return redirect(route("top"));
    }
}

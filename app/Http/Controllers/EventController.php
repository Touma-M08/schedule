<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Event;
use App\Models\Mentor;
use App\Models\Student;
use App\Models\Category;

class EventController extends Controller
{
    public function top(Category $category, Event $event)
    {
        return Inertia::render("top", [
            "events" => $event->with(["categories", "categories.pivot.student", "mentors",])->get(),
            "categories" => $category->with(["students", "events"])->get(),
        ]);
    }

    public function index(Event $event, Mentor $mentor)
    {
        return Inertia::render("Event/index", [
            "events" => $event->with("mentors")->get(),
            "mentors" => $mentor->get()
        ]);
    }

    public function store(Request $request, Event $event)
    {
        
        $input = $request->all();
        $event->fill($input)->save();

        $mentors_id = array_values(array_diff($input["mentors_id"], [0])); //メンター未選択の要素を削除

        $event->mentors()->attach($mentors_id);

        return redirect(route("event.index"));
    }
}

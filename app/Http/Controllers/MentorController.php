<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Mentor;

class MentorController extends Controller
{
    public function index(Mentor $mentor)
    {
        return Inertia::render("Mentor/index", ["mentors" => $mentor->get()]);
    }

    public function store(Request $request, Mentor $mentor)
    {
        $input = $request->all();
        $mentor->fill($input)->save();

        return redirect(route("mentor.index"));
    }
}

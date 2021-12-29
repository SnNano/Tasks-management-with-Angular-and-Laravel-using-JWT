<?php

namespace App\Http\Controllers;

use App\Models\Tasks;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;


class TasksController extends Controller
{
    function list(){
        return Tasks::all();
    }

    function add(Request $req){
        $validatedData = Validator::make($req->all(),[
            'description' =>'required|max:90|min:5'
        ]);
        if($validatedData->fails()){
            return $validatedData->errors();
        }else{
            $tasks = new Tasks();
            $tasks->description=$req->description;
            $results=$tasks->save();
            if($results){
                return "data is added successfully";
            }
            else{ return "there is a problem!";}
        }
    }
    function edit(Request $req){
        $tasks=Tasks::find($req->id);
        $tasks->id=$req->id;
        $tasks->description=$req->description;
        $results=$tasks->save();
        if($results){
            return "data is updated successfully";
        }
        else{
            return "there is a problem!";
        }
    }

    function delete($id){
        $tasks=Tasks::find($id);
        $results=$tasks->delete();
        if($results){
            return "data is deleted successfully";
        }
        else{
            return "there is a problem!";
        }
    }
    function search($word){
        return Tasks::where('description','like','%'.$word.'%')->get();
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\point;
use App\Http\Requests\StorepointRequest;
use App\Http\Requests\UpdatepointRequest;

class pointcontroller extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $points = point::all();
        return $points;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorepointRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorepointRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\point  $point
     * @return \Illuminate\Http\Response
     */
    public function show(point $point)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatepointRequest  $request
     * @param  \App\Models\point  $point
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatepointRequest $request, point $point)
    {
        //
    }


    public function points_operation($id){

        $points = point::where('etude_operation_id',$id)->get();
        return $points;

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\point  $point
     * @return \Illuminate\Http\Response
     */
    public function destroy(point $point)
    {
        $point->delete();
        return response()->json([
            'id' => $point->id,
            'message' => 'point Deleted Successfully',
             'errors' =>[]
        ]);
    }
}
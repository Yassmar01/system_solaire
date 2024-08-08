<?php

namespace App\Http\Controllers;

use App\Models\call;
use App\Models\call_center;
use Illuminate\Http\Request;

class callscontroller extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       // $calls = call::all();
        $calls = Call::orderBy('date', 'asc')->get();
        return response()->json($calls);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\call  $call
     * @return \Illuminate\Http\Response
     */
    public function show(call $call)
    {
        return $call;
    }


    public function client_calls()
    {
        // Fetch calls with the associated client data
        $calls = Call::with('client')->get();
        return response()->json($calls);
    }

    public function getCallById($id)
{
    // Fetch the call with the associated client data based on the given ID
    $call = call_center::with('call')->find($id);

    if ($call) {
        return response()->json($call);
    } else {
        return response()->json(['error' => 'Call not found'], 404);
    }
}
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\call  $call
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, call $call)
    {
        $call->update($request->validated());

    return response()->json([
        'callcenter' => $call,
        'message' =>  'Call Updated Successfully',
         'errors' =>[]
    ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\call  $call
     * @return \Illuminate\Http\Response
     */
    public function destroy(call $call)
    {
        $call->delete();
        return response()->json([
            'id' => $call->id,
            'message' => 'Call Deleted Successfully',
             'errors' =>[]
        ]);
    }
}
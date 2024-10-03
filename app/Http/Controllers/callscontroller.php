<?php

namespace App\Http\Controllers;

use App\Models\call;
use App\Models\call_center;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
        $validatedData = $request->validate([
            'call_center_id' => 'required',
            'client_id' => 'required',

        ]);
        return call::create($validatedData);
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
        $calls = Call::with(['client.columns'])->get();

        return response()->json($calls);
    }

    public function getCallById($id)
    {
        // Fetch the call with the associated client data based on the given ID
        $call = call::with('client.columns')
        ->where( 'call_center_id',$id)
        ->whereNot('statue', 'New')
        ->get();

        if ($call) {
            return response()->json($call);
        } else {
            return response()->json(['error' => 'Call not found'], 404);
        }
    }




    public function getCalls($id)
    {
        // Fetch the call with the associated client data based on the given ID
        $calls = call::with('client.columns')
        ->where('statue','New')

        ->where('call_center_id',$id)->get();

        if ($calls) {
            return response()->json($calls);
        } else {
            return response()->json(['error' => 'Call not found'], 404);
        }
    }


    public function message_callcenter($id)
    {
        // Fetch the call with the associated client data based on the given ID
        $calls = call::whereNot('statue','New')

        ->where('call_center_id',$id)->get();

        if ($calls) {
            return response()->json($calls);
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

        $validatedData = $request->validate([
            'call_center_id' => '',
            'client_id' => '',
            "statue" => 'required',
            "delivered" => '',
            "remarque" => 'required',
            "date" => '',
            "RDV_call" => ''



        ]);
        $call->update($validatedData);

        return response()->json([
            'call' => $call,
            'message' =>  'call Updated Successfully',
            'errors' => []
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
            'errors' => []
        ]);
    }
}

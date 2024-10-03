<?php

namespace App\Http\Controllers;

use App\Models\client;
use App\Http\Requests\StoreclientRequest;
use App\Http\Requests\UpdateclientRequest;
use App\Models\column;

class clientcontroller extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $clients = client::with('columns')->get();
        return response()->json($clients);
    }


    public function getclientinfo($id)
    {
        // Fetch the columns with the associated client data based on the given ID
        $column = column::where('client_id',$id)->get();

        if ($column) {
            return response()->json($column);
        } else {
            return response()->json(['error' => 'Call not found'], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreclientRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreclientRequest $request)
    {
        $formfields = $request->validated();
       $client = client::create($formfields);
       return $client;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\client  $client
     * @return \Illuminate\Http\Response
     */
    public function show(client $client)
    {
        return $client;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateclientRequest  $request
     * @param  \App\Models\client  $client
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateclientRequest $request, client $client)
    {
        $client->update($request->validated());

        return response()->json([
            'client' => $client,
            'message' =>  'client Updated Successfully',
             'errors' =>[]
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\client  $client
     * @return \Illuminate\Http\Response
     */
    public function destroy(client $client)
    {
        $client->delete();
        return response()->json([
            'id' => $client->id,
            'message' => 'client Deleted Successfully',
             'errors' =>[]
        ]);
    }
}
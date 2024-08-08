<?php

namespace App\Http\Controllers;

use App\Models\charge;
use App\Http\Requests\StorechargeRequest;
use App\Http\Requests\UpdatechargeRequest;
use App\Models\chef_equipe;

class chargescontroller extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $charge = charge::all();
        return response()->json($charge);
    }
    public function download($filename)
    {
        $filePath = storage_path("app/public/{$filename}");

    
        if (!file_exists($filePath)) {
            return response()->json(['error' => 'File not found.'], 404);
        }

        return response()->download($filePath, $filename, [
            'Content-Type' => mime_content_type($filePath)
        ]);
    }

    public function filteredcharges($id)
    {
        // Fetch the call with the associated client data based on the given ID
        $charges = chef_equipe::with('charges')->find($id);

        if ($charges) {
            return response()->json($charges);
        } else {
            return response()->json(['error' => 'Charges not found'], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorechargeRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorechargeRequest $request)
    {
        $formfields = $request->validated();

       return charge::create($formfields);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\charge  $charge
     * @return \Illuminate\Http\Response
     */
    public function show(charge $charge)
    {
        return $charge;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatechargeRequest  $request
     * @param  \App\Models\charge  $charge
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatechargeRequest $request, charge $charge)
    {
        $charge->update($request->validated());

    return response()->json([
        'callcenter' => $charge,
        'message' =>  'charge Updated Successfully',
         'errors' =>[]
    ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\charge  $charge
     * @return \Illuminate\Http\Response
     */
    public function destroy(charge $charge)
    {
        $charge->delete();
        return response()->json([
            'id' => $charge->id,
            'message' => 'charge Deleted Successfully',
             'errors' =>[]
        ]);
    }
}
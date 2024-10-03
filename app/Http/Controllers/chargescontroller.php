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
    // public function download($filename)
    // {
    //    // $filePath = storage_path("app/public/{$filename}");

    //     $filePath = public_path('storage/'.$filename);
    //     dd($filePath);
    //     if (!file_exists($filePath)) {
    //         return response()->json(['error' => 'File not found.'], 404);
    //     }

    //     return response()->download($filePath, $filename, [
    //         'Content-Type' => mime_content_type($filePath)
    //     ]);
    // }

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
        $formfields['invoice'] =  $request->file('invoice')->store('Invoices','public');

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




     public function update(UpdatechargeRequest $request, Charge $charge)
     {
         // Validate the request using the custom request class
         $formFields = $request->validated();

         // Handle file upload if present
         if ($request->hasFile('invoice')) {
             // Store the file and save the path in the formFields array
             $formFields['invoice'] = $request->file('invoice')->store('Invoices', 'public');
         }

         // Update the charge with the validated data
         $charge->update($formFields);

         // Return a success response
         return response()->json([
             'charge' => $charge,
             'message' => 'Charge updated successfully',
             'errors' => [],
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
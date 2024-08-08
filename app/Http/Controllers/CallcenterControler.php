<?php

namespace App\Http\Controllers;

use App\Models\call_center;
use App\Http\Requests\Storecall_centerRequest;
use App\Http\Requests\Updatecall_centerRequest;
use Illuminate\Support\Facades\Hash;

class CallcenterControler extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $callcenters = call_center::all();
        return response()->json($callcenters);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Storecall_centerRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Storecall_centerRequest $request)
    {

        $formfields = $request->validated();
        $formfields['password'] = Hash::make($request->password);
       return call_center::create($formfields);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\call_center  $call_center
     * @return \Illuminate\Http\Response
     */
    public function show(call_center $callcenter)
    {
        return $callcenter;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Updatecall_centerRequest  $request
     * @param  \App\Models\call_center  $call_center
     * @return \Illuminate\Http\Response
     */
    public function update(Updatecall_centerRequest $request, call_center $callcenter)
    {

  //  $callcenter->update($request->validated());
   // Get validated data
   $validatedData = $request->validated();

   // Check if password is being updated and hash it
   if (isset($validatedData['password'])) {
       $validatedData['password'] = bcrypt($validatedData['password']);
   }

   // Update the record
   $callcenter->update($validatedData);
    return response()->json([
        'callcenter' => $callcenter,
        'message' =>  $validatedData['fullname'] .' Updated Successfully',
         'errors' =>[]
    ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\call_center  $call_center
     * @return \Illuminate\Http\Response
     */
    public function destroy(call_center $callcenter)
    {
        //dd($call_center);
        $callcenter->delete();
        return response()->json([
            'id' => $callcenter->id,
            'message' =>  $callcenter->fullname .' Deleted Successfully',
             'errors' =>[]
        ]);
    }
}
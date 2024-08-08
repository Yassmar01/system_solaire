<?php

namespace App\Http\Controllers;

use App\Models\sysadmin;
use App\Http\Requests\StoresysadminRequest;
use App\Http\Requests\UpdatesysadminRequest;
use Illuminate\Support\Facades\Hash;

class SysadminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $sysadmins = sysadmin::all();
        return response()->json($sysadmins);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoresysadminRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoresysadminRequest $request)
    {
        $formfields = $request->validated();
        $formfields['password'] = Hash::make($request->password);
       return sysadmin::create($formfields);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\sysadmin  $sysadmin
     * @return \Illuminate\Http\Response
     */
    public function show(sysadmin $sysadmin)
    {
        return $sysadmin;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatesysadminRequest  $request
     * @param  \App\Models\sysadmin  $sysadmin
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatesysadminRequest $request, sysadmin $sysadmin)
    {
       // $sysadmin->update($request->validated());
 // Get validated data
 $validatedData = $request->validated();

 // Check if password is being updated and hash it
 if (isset($validatedData['password'])) {
     $validatedData['password'] = bcrypt($validatedData['password']);
 }

 // Update the record
 $sysadmin->update($validatedData);
        return response()->json([
            'sysadmin' => $sysadmin,
            'message' =>  $validatedData['fullname']  .' Updated Successfully',
             'errors' =>[]
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\sysadmin  $sysadmin
     * @return \Illuminate\Http\Response
     */
    public function destroy(sysadmin $sysadmin)
    {
        $sysadmin->delete();
        return $sysadmin;
    }
}
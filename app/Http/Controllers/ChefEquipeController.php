<?php

namespace App\Http\Controllers;

use App\Models\chef_equipe;
use App\Http\Requests\Storechef_equipeRequest;
use App\Http\Requests\Updatechef_equipeRequest;
use Illuminate\Support\Facades\Hash;

class ChefequipeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $chefquipe = chef_equipe::all();
        return response()->json($chefquipe);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Storechef_equipeRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Storechef_equipeRequest $request)
    {
        $formfields = $request->validated();
        $formfields['password'] = Hash::make($request->password);
       return chef_equipe::create($formfields);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\chef_equipe  $chef_equipe
     * @return \Illuminate\Http\Response
     */
    public function show(chef_equipe $chefequipe)
    {
        return $chefequipe;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Updatechef_equipeRequest  $request
     * @param  \App\Models\chef_equipe  $chef_equipe
     * @return \Illuminate\Http\Response
     */
    public function update(Updatechef_equipeRequest $request, chef_equipe $chefequipe)
    {
       // $chefequipe->update($request->validated());


        // Get validated data
    $validatedData = $request->validated();

    // Check if password is being updated and hash it
    if (isset($validatedData['password'])) {
        $validatedData['password'] = bcrypt($validatedData['password']);
    }

    // Update the record
    $chefequipe->update($validatedData);

    return response()->json([
        'chefequipe' => $chefequipe,
        'message' =>  $validatedData['fullname'] .' Updated Successfully',
         'errors' =>[]
    ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\chef_equipe  $chef_equipe
     * @return \Illuminate\Http\Response
     */
    public function destroy(chef_equipe $chefequipe)
    {
        $chefequipe->delete();
        return $chefequipe;
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\etude_operation;
use App\Http\Requests\Storeetude_operationRequest;
use App\Http\Requests\Updateetude_operationRequest;

class operationscontroller extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $operations = etude_operation::all();
        return $operations;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Storeetude_operationRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Storeetude_operationRequest $request)
    {
        //
    }


    public function operations_clients($id)
    {
      //  $call = call_center::with('call')->find($id);

        $operations = etude_operation::with(['client','point'])->where('chef_equipe_id', $id)->get();

        return response()->json($operations);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\etude_operation  $etude_operation
     * @return \Illuminate\Http\Response
     */
    public function show(etude_operation $etude_operation)
    {
      return $etude_operation;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Updateetude_operationRequest  $request
     * @param  \App\Models\etude_operation  $etude_operation
     * @return \Illuminate\Http\Response
     */
    public function update(Updateetude_operationRequest $request, etude_operation $etude_operation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\etude_operation  $etude_operation
     * @return \Illuminate\Http\Response
     */
    public function destroy(etude_operation $etude_operation)
    {
        //
    }
}
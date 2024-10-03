<?php

namespace App\Http\Controllers;

use App\Models\column;
use App\Http\Requests\StorecolumnRequest;
use App\Http\Requests\UpdatecolumnRequest;

class columnscontroller extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorecolumnRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorecolumnRequest $request)
    {
        $formfields = $request->validated();
       $column = column::create($formfields);
       return $column;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\column  $column
     * @return \Illuminate\Http\Response
     */
    public function show(column $column)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatecolumnRequest  $request
     * @param  \App\Models\column  $column
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatecolumnRequest $request, column $column)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\column  $column
     * @return \Illuminate\Http\Response
     */
    public function destroy(column $column)
    {
        $column->delete();
        return response()->json([
            'id' => $column->id,
            'message' => 'column Deleted Successfully',
             'errors' =>[]
        ]);
    }
}
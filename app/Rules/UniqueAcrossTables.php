<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\DB;
class UniqueAcrossTables implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    protected $tables;
    protected $ignoreId;
    public function __construct(array $tables, $ignoreId = null)
    {
        $this->tables = $tables;
        $this->ignoreId = $ignoreId;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        foreach ($this->tables as $table) {
            $query = DB::table($table)
            ->where($attribute, $value)
            ->whereNull('deleted_at'); // Ignore soft-deleted records
            if ($this->ignoreId) {
                $query->where('id', '!=', $this->ignoreId);
            }
            if ($query->exists()) {
                return false;
            }
        }
        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The :attribute has already been taken ';
    }
}
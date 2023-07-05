<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DonVi extends Model
{
    public $table ='donvi';
    use HasFactory;
    public function nhanViens()
    {
        return $this->hasMany('App\Models\NhanVien', 'dv_id', 'dv_id');
    }
}

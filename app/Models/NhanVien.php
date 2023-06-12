<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Foundation\Auth\User;

class NhanVien extends Model implements Authenticatable

{
    use \Illuminate\Auth\Authenticatable;
    
    protected $table = 'nhanvien';
    protected $fillable = [
        'nv_id',
        'nv_taikhoan',
        'nv_matkhau',
        'nv_quyen',
    ];


    use HasFactory;
}
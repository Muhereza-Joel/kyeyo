<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Searchable;
use Ramsey\Uuid\Uuid;

class ExperienceLevel extends Model
{
    use HasFactory, SoftDeletes, Searchable;

    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'uuid';

    protected $fillable = [
        'name'
    ];

    public function toSearchableArray()
    {
        return [
            'id' => $this->id, // Ensure this is included
            'name' => $this->name
        ];
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (!$model->id) {
                $model->id = Uuid::uuid4();
            }
        });

        static::created(function ($experience_level) {
            $experience_level->searchable();
        });

        static::updated(function ($experience_level) {
            $experience_level->searchable();
        });
    }
}

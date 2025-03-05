<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Searchable;
use Ramsey\Uuid\Uuid;
use Spatie\Tags\HasTags;

class Job extends Model
{
    use HasFactory, HasTags, SoftDeletes, Searchable;

    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'uuid';

    protected $fillable = [
        'title',
        'profession_id',
        'industry_id',
        'seniority_id',
        'description',
        'active',
        'creator'
    ];

    public function toSearchableArray()
    {
        return [
            'id' => $this->id, // Ensure this is included
            'title' => $this->title,
            'description' => $this->description,
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

        static::created(function ($job) {
            $job->searchable();
        });

        static::updated(function ($job) {
            $job->searchable();
        });
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator', 'id');
    }

    public function profession()
    {
        return $this->belongsTo(Profession::class);
    }

    public function industry()
    {
        return $this->belongsTo(Industry::class);
    }

    public function seniority()
    {
        return $this->belongsTo(ExperienceLevel::class, 'seniority_id', 'id');
    }

    public function companyProfile()
    {
        return $this->hasOneThrough(
            CompanyProfile::class, // Final model to retrieve
            Job::class, // Intermediate model
            'id', // Foreign key on users table (User ID)
            'user_id', // Foreign key on company_profiles table
            'id', // Local key on jobs table (user ID of the creator)
            'creator' // foreign key on jobs table (User ID)

        );
    }
}

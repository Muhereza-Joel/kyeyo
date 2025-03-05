<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Ramsey\Uuid\Uuid;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class CompanyProfile extends Model implements HasMedia
{
    use HasFactory, SoftDeletes, InteractsWithMedia;

    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'uuid';

    protected $fillable = [
        'user_id',
        'name',
        'industry',
        'phone',
        'email',
        'address',
        'country',
        'city',
        'website',
        'logo',
        'cover_image',
        'about',
        'founded_year',
        'company_size',
    ];


    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (!$model->id) {
                $model->id = Uuid::uuid4();
            }
        });
    }

    // Optionally define media collections
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('profile_images')
            ->singleFile(); // Ensures only one profile image

        $this->addMediaCollection('cover_image')
            ->singleFile(); // Ensures only one cover image
    }


    public function getFileName(Media $media): string
    {
        // You can customize the file name here by adding a timestamp or unique ID
        return uniqid('media_', true) . '.' . $media->extension();
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}

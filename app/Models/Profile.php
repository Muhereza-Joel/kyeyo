<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Ramsey\Uuid\Uuid;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Profile extends Model implements HasMedia
{
    use HasFactory, SoftDeletes, InteractsWithMedia;

    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'uuid';

    protected $fillable = [
        'fullname',
        'phone_number',
        'nin',
        'date_of_birth',
        'gender',
        'country',
        'district',
        'village',
        'user_id',
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
        $this->addMediaCollection('avator_images')
            ->singleFile(); // Ensures only one profile image

        $this->addMediaCollection('profile_cover_images')
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

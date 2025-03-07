<?php

namespace App\Models;

use Spatie\Tags\Tag as SpatieTag;

class Tag extends SpatieTag
{
    // Cast 'name' and 'slug' as arrays (or objects)
    protected $casts = [
        'name' => 'array',  // Cast 'name' as an array
        'slug' => 'array',  // Cast 'slug' as an array
    ];
}

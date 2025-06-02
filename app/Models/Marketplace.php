<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Propaganistas\LaravelPhone\PhoneNumber;

class Marketplace extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;

    protected $fillable = [
        'name',
        'type',
        'description',
        'size_length',
        'size_width',
        'price',
        'price_type',
        'kecamatan',
        'kelurahan',
        'phone_number',
        'address',
        'long',
        'lat',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected $appends = [
        'whatsapp_number',
    ];

    public function getWhatsappNumberAttribute(): ?string
    {
        $rawPhoneNumber = $this->attributes['phone_number'] ?? null;
        if ($rawPhoneNumber) {
            try {
                $phoneObj = PhoneNumber::make($rawPhoneNumber, config('phone.default_country', 'ID'));
                if ($phoneObj->isValid()) {
                    return $phoneObj->getCountryCode() . $phoneObj->getNationalNumber();
                }
            } catch (\Exception $e) {
                return ltrim(preg_replace('/[^\d+]/', '', $rawPhoneNumber), '+');
            }
            return ltrim(preg_replace('/[^\d+]/', '', $rawPhoneNumber), '+');
        }
        return null;
    }
}

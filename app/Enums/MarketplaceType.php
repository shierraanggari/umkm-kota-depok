<?php

namespace App\Enums;

enum MarketplaceType: string
{
    case Ruko = 'ruko';
    case Kios = 'kios';
    case Booth = 'booth';
    case Tenda = 'tenda';
    case MallTenant = 'malltenant';
    case Lainnya = 'lainnya';

    public static function labels(): array
    {
        return [
            self::Ruko->value => 'Ruko',
            self::Kios->value => 'Kios',
            self::Booth->value => 'Booth/Stand',
            self::Tenda->value => 'Tenda',
            self::MallTenant->value => 'Mall Tenant',
            self::Lainnya->value => 'Lainnya',
        ];
    }

    public static function options(): array
    {
        return array_map(
            fn($case) => ['value' => $case->value, 'label' => self::labels()[$case->value]],
            self::cases()
        );
    }

    public static function values(): array
    {
        return array_map(fn($case) => $case->value, self::cases());
    }
}
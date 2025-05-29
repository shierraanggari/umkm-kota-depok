<?php

namespace App\Enums;

enum Kecamatan: string
{
    case Beji = 'beji';
    case PancoranMas = 'pancoranmas';
    case Cipayung = 'cipayung';
    case Sukmajaya = 'sukmajaya';
    case Cimanggis = 'cimanggis';
    case Cilodong = 'cilodong';
    case Tapos = 'tapos';
    case Cinere = 'cinere';
    case Limo = 'limo';
    case Sawangan = 'sawangan';
    case Bojongsari = 'bojongsari';

    public static function labels(): array
    {
        return [
            self::Beji->value => 'Beji',
            self::PancoranMas->value => 'Pancoran Mas',
            self::Cipayung->value => 'Cipayung',
            self::Sukmajaya->value => 'Sukmajaya',
            self::Cimanggis->value => 'Cimanggis',
            self::Cilodong->value => 'Cilodong',
            self::Tapos->value => 'Tapos',
            self::Cinere->value => 'Cinere',
            self::Limo->value => 'Limo',
            self::Sawangan->value => 'Sawangan',
            self::Bojongsari->value => 'Bojongsari',
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


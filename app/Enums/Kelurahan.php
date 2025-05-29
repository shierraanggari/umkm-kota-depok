<?php

namespace App\Enums;

enum Kelurahan: string
{
    // Kecamatan Beji (6 Kelurahan)
    case Beji = 'beji';
    case BejiTimur = 'bejitimur';
    case KemiriMuka = 'kemirimuka';
    case Kukusan = 'kukusan';
    case PondokCina = 'pondokcina';
    case TanahBaru = 'tanahbaru';

    // Kecamatan Pancoran Mas (6 Kelurahan)
    case PancoranMas = 'pancoranmas';
    case Depok = 'depok';
    case DepokJaya = 'depokjaya';
    case Mampang = 'mampang';
    case RangkapanJaya = 'rangkapanjaya';
    case RangkapanJayaBaru = 'rangkapanjayabaru';

    // Kecamatan Cipayung (5 Kelurahan)
    case Cipayung = 'cipayung';
    case CipayungJaya = 'cipayungjaya';
    case RatuJaya = 'ratujaya';
    case PondokJaya = 'pondokjaya';
    case BojongPondokTerong = 'bojongpondokterong';

    // Kecamatan Sukmajaya (6 Kelurahan)
    case Sukmajaya = 'sukmajaya';
    case Abadijaya = 'abadijaya';
    case Baktijaya = 'baktijaya';
    case Mekarjaya = 'mekarjaya';
    case Tirtajaya = 'tirtajaya';
    case Cisalak = 'cisalak';

    // Kecamatan Cimanggis (6 Kelurahan)
    case Tugu = 'tugu';
    case Mekarsari = 'mekarsari';
    case Harjamukti = 'harjamukti';
    case CurugCimanggis = 'curugcimanggis';
    case CisalakPasar = 'cisalakpasar';
    case PasirGunungSelatan = 'pasirgunungselatan';

    // Kecamatan Cilodong (5 Kelurahan)
    case Cilodong = 'cilodong';
    case Jatimulya = 'jatimulya';
    case Kalibaru = 'kalibaru';
    case Kalimulya = 'kalimulya';
    case Sukamaju = 'sukamaju';

    // Kecamatan Tapos (7 Kelurahan)
    case Tapos = 'tapos';
    case Cilangkap = 'cilangkap';
    case Sukatani = 'sukatani';
    case Leuwinanggung = 'leuwinanggung';
    case SukamajuBaru = 'sukamajubaru';
    case Cimpaeun = 'cimpaeun';
    case Jatijajar = 'jatijajar';

    // Kecamatan Cinere (4 Kelurahan)
    case Cinere = 'cinere';
    case Gandul = 'gandul';
    case PangkalanJati = 'pangkalanjati';
    case PangkalanJatiBaru = 'pangkalanjatibaru';

    // Kecamatan Limo (4 Kelurahan)
    case Limo = 'limo';
    case Grogol = 'grogol';
    case Krukut = 'krukut';
    case Meruyung = 'meruyung';

    // Kecamatan Sawangan (7 Kelurahan)
    case Sawangan = 'sawangan';
    case SawanganBaru = 'sawanganbaru';
    case Bedahan = 'bedahan';
    case Cinangka = 'cinangka';
    case PasirPutih = 'pasirputih';
    case Pengasinan = 'pengasinan';
    case Kedaung = 'kedaung';

    // Kecamatan Bojongsari (7 Kelurahan)
    case Bojongsari = 'bojongsari';
    case BojongsariBaru = 'bojongsari_baru';
    case CurugBojongsari = 'curugbojongsari';
    case PondokPetir = 'pondokpetir';
    case Serua = 'serua';
    case DurenSeribu = 'durenseribu';
    case DurenMekar = 'durenmekar';

    public static function labels(): array
    {
        return [
            // Kecamatan Beji
            self::Beji->value => 'Beji',
            self::BejiTimur->value => 'Beji Timur',
            self::KemiriMuka->value => 'Kemiri Muka',
            self::Kukusan->value => 'Kukusan',
            self::PondokCina->value => 'Pondok Cina',
            self::TanahBaru->value => 'Tanah Baru',

            // Kecamatan Pancoran Mas
            self::PancoranMas->value => 'Pancoran Mas',
            self::Depok->value => 'Depok',
            self::DepokJaya->value => 'Depok Jaya',
            self::Mampang->value => 'Mampang',
            self::RangkapanJaya->value => 'Rangkapan Jaya',
            self::RangkapanJayaBaru->value => 'Rangkapan Jaya Baru',

            // Kecamatan Cipayung
            self::Cipayung->value => 'Cipayung',
            self::CipayungJaya->value => 'Cipayung Jaya',
            self::RatuJaya->value => 'Ratu Jaya',
            self::PondokJaya->value => 'Pondok Jaya',
            self::BojongPondokTerong->value => 'Bojong Pondok Terong',

            // Kecamatan Sukmajaya
            self::Sukmajaya->value => 'Sukmajaya',
            self::Abadijaya->value => 'Abadijaya',
            self::Baktijaya->value => 'Baktijaya',
            self::Mekarjaya->value => 'Mekarjaya',
            self::Tirtajaya->value => 'Tirtajaya',
            self::Cisalak->value => 'Cisalak',

            // Kecamatan Cimanggis
            self::Tugu->value => 'Tugu',
            self::Mekarsari->value => 'Mekarsari',
            self::Harjamukti->value => 'Harjamukti',
            self::CurugCimanggis->value => 'Curug',
            self::CisalakPasar->value => 'Cisalak Pasar',
            self::PasirGunungSelatan->value => 'Pasir Gunung Selatan',

            // Kecamatan Cilodong
            self::Cilodong->value => 'Cilodong',
            self::Jatimulya->value => 'Jatimulya',
            self::Kalibaru->value => 'Kalibaru',
            self::Kalimulya->value => 'Kalimulya',
            self::Sukamaju->value => 'Sukamaju',

            // Kecamatan Tapos
            self::Tapos->value => 'Tapos',
            self::Cilangkap->value => 'Cilangkap',
            self::Sukatani->value => 'Sukatani',
            self::Leuwinanggung->value => 'Leuwinanggung',
            self::SukamajuBaru->value => 'Sukamaju Baru',
            self::Cimpaeun->value => 'Cimpaeun',
            self::Jatijajar->value => 'Jatijajar',

            // Kecamatan Cinere
            self::Cinere->value => 'Cinere',
            self::Gandul->value => 'Gandul',
            self::PangkalanJati->value => 'Pangkalan Jati',
            self::PangkalanJatiBaru->value => 'Pangkalan Jati Baru',

            // Kecamatan Limo
            self::Limo->value => 'Limo',
            self::Grogol->value => 'Grogol',
            self::Krukut->value => 'Krukut',
            self::Meruyung->value => 'Meruyung',

            // Kecamatan Sawangan
            self::Sawangan->value => 'Sawangan',
            self::SawanganBaru->value => 'Sawangan Baru',
            self::Bedahan->value => 'Bedahan',
            self::Cinangka->value => 'Cinangka',
            self::PasirPutih->value => 'Pasir Putih',
            self::Pengasinan->value => 'Pengasinan',
            self::Kedaung->value => 'Kedaung',

            // Kecamatan Bojongsari
            self::Bojongsari->value => 'Bojongsari',
            self::BojongsariBaru->value => 'Bojongsari Baru',
            self::CurugBojongsari->value => 'Curug',
            self::PondokPetir->value => 'Pondok Petir',
            self::Serua->value => 'Serua',
            self::DurenSeribu->value => 'Duren Seribu',
            self::DurenMekar->value => 'Duren Mekar',
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

    public static function groupedByKecamatan(): array
    {
        return [
            'beji' => [
                ['value' => 'beji', 'label' => 'Beji'],
                ['value' => 'bejitimur', 'label' => 'Beji Timur'],
                ['value' => 'kemirimuka', 'label' => 'Kemiri Muka'],
                ['value' => 'kukusan', 'label' => 'Kukusan'],
                ['value' => 'pondokcina', 'label' => 'Pondok Cina'],
                ['value' => 'tanahbaru', 'label' => 'Tanah Baru'],
            ],
            'pancoranmas' => [
                ['value' => 'pancoranmas', 'label' => 'Pancoran Mas'],
                ['value' => 'depok', 'label' => 'Depok'],
                ['value' => 'depokjaya', 'label' => 'Depok Jaya'],
                ['value' => 'mampang', 'label' => 'Mampang'],
                ['value' => 'rangkapanjaya', 'label' => 'Rangkapan Jaya'],
                ['value' => 'rangkapanjayabaru', 'label' => 'Rangkapan Jaya Baru'],
            ],
            'cipayung' => [
                ['value' => 'cipayung', 'label' => 'Cipayung'],
                ['value' => 'cipayungjaya', 'label' => 'Cipayung Jaya'],
                ['value' => 'ratujaya', 'label' => 'Ratu Jaya'],
                ['value' => 'pondokjaya', 'label' => 'Pondok Jaya'],
                ['value' => 'bojongpondokterong', 'label' => 'Bojong Pondok Terong'],
            ],
            'sukmajaya' => [
                ['value' => 'sukmajaya', 'label' => 'Sukmajaya'],
                ['value' => 'abadijaya', 'label' => 'Abadijaya'],
                ['value' => 'baktijaya', 'label' => 'Baktijaya'],
                ['value' => 'mekarjaya', 'label' => 'Mekarjaya'],
                ['value' => 'tirtajaya', 'label' => 'Tirtajaya'],
                ['value' => 'cisalak', 'label' => 'Cisalak'],
            ],
            'cimanggis' => [
                ['value' => 'tugu', 'label' => 'Tugu'],
                ['value' => 'mekarsari', 'label' => 'Mekarsari'],
                ['value' => 'harjamukti', 'label' => 'Harjamukti'],
                ['value' => 'curugcimanggis', 'label' => 'Curug'],
                ['value' => 'cisalakpasar', 'label' => 'Cisalak Pasar'],
                ['value' => 'pasirgunungselatan', 'label' => 'Pasir Gunung Selatan'],
            ],
            'cilodong' => [
                ['value' => 'cilodong', 'label' => 'Cilodong'],
                ['value' => 'jatimulya', 'label' => 'Jatimulya'],
                ['value' => 'kalibaru', 'label' => 'Kalibaru'],
                ['value' => 'kalimulya', 'label' => 'Kalimulya'],
                ['value' => 'sukamaju', 'label' => 'Sukamaju'],
            ],
            'tapos' => [
                ['value' => 'tapos', 'label' => 'Tapos'],
                ['value' => 'cilangkap', 'label' => 'Cilangkap'],
                ['value' => 'sukatani', 'label' => 'Sukatani'],
                ['value' => 'leuwinanggung', 'label' => 'Leuwinanggung'],
                ['value' => 'sukamajubaru', 'label' => 'Sukamaju Baru'],
                ['value' => 'cimpaeun', 'label' => 'Cimpaeun'],
                ['value' => 'jatijajar', 'label' => 'Jatijajar'],
            ],
            'cinere' => [
                ['value' => 'cinere', 'label' => 'Cinere'],
                ['value' => 'gandul', 'label' => 'Gandul'],
                ['value' => 'pangkalanjati', 'label' => 'Pangkalan Jati'],
                ['value' => 'pangkalanjatibaru', 'label' => 'Pangkalan Jati Baru'],
            ],
            'limo' => [
                ['value' => 'limo', 'label' => 'Limo'],
                ['value' => 'grogol', 'label' => 'Grogol'],
                ['value' => 'krukut', 'label' => 'Krukut'],
                ['value' => 'meruyung', 'label' => 'Meruyung'],
            ],
            'sawangan' => [
                ['value' => 'sawangan', 'label' => 'Sawangan'],
                ['value' => 'sawanganbaru', 'label' => 'Sawangan Baru'],
                ['value' => 'bedahan', 'label' => 'Bedahan'],
                ['value' => 'cinangka', 'label' => 'Cinangka'],
                ['value' => 'pasirputih', 'label' => 'Pasir Putih'],
                ['value' => 'pengasinan', 'label' => 'Pengasinan'],
                ['value' => 'kedaung', 'label' => 'Kedaung'],
            ],
            'bojongsari' => [
                ['value' => 'bojongsari', 'label' => 'Bojongsari'],
                ['value' => 'bojongsari_baru', 'label' => 'Bojongsari Baru'],
                ['value' => 'curugbojongsari', 'label' => 'Curug'],
                ['value' => 'pondokpetir', 'label' => 'Pondok Petir'],
                ['value' => 'serua', 'label' => 'Serua'],
                ['value' => 'durenseribu', 'label' => 'Duren Seribu'],
                ['value' => 'durenmekar', 'label' => 'Duren Mekar'],
            ],
        ];
    }
}


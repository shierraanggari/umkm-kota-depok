<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Enums\Kecamatan;
use App\Enums\Kelurahan;
use App\Enums\MarketplaceType;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Arr;

class MarketplaceSeeder extends Seeder
{
    public function run()
    {
        $userIds = User::pluck('id')->toArray();
        if (empty($userIds)) {
            User::factory()->count(10)->create();
            $userIds = User::pluck('id')->toArray();
        }

        $kecamatanKelurahanMap = Kelurahan::groupedByKecamatan();
        $allMarketplaceTypes = MarketplaceType::values();
        $allKecamatanValues = Kecamatan::values();

        // Helper lists untuk deskripsi (lebih terstruktur)
        $list_kata_sifat_umum = ["strategis", "nyaman", "terawat", "baru", "modern", "minimalis", "ramai pengunjung", "prospektif", "ideal", "bersih", "terang", "akses mudah"];
        $list_objek_dekat = ["pasar tradisional", "kampus UI", "stasiun KRL Depok Baru", "terminal Jatijajar", "jalan raya Margonda", "ITC Depok", "Margo City Mall", "sekolah", "rumah sakit", "pintu tol Cijago", "area perkantoran GDC", "pusat kuliner"];
        $list_fasilitas_dasar = ["listrik 900W token", "listrik 1300W", "listrik 2200W", "air PAM", "jetpump", "kamar mandi dalam", "area parkir motor", "area parkir mobil luas"];
        $list_fasilitas_tambahan = ["rolling door", "pintu kaca", "AC terpasang", "bebas banjir", "keamanan 24 jam", "hadap jalan utama", "ventilasi baik", "etalase", "meja kasir", "rak display"];
        $list_kondisi = ["baru direnovasi", "siap pakai", "kondisi sangat baik", "bangunan baru", "semi furnished", "kosongan"];
        $list_seruan = ["harga nego", "peluang usaha bagus", "disewakan cepat", "hubungi segera untuk survei"];

        // Peruntukan berdasarkan tipe lapak
        $peruntukan_map = [
            MarketplaceType::Kios->value => ["toko kelontong", "warung sembako", "agen pulsa & PPOB", "jajanan ringan", "fotokopi & ATK", "laundry", "pangkas rambut", ],
            MarketplaceType::Ruko->value => ["kantor cabang", "bank", "klinik dokter", "apotek", "restoran", "kafe", "bimbel", "toko retail besar", "showroom mini", "ekspedisi", "bimbel", "minimarket", "bank"],
            MarketplaceType::Booth->value => ["jualan minuman kekinian", "stand makanan ringan", "pameran produk UKM", "merchandise event", "informasi produk"],
            MarketplaceType::Tenda->value => ["warung tenda pecel lele", "soto mie", "nasi goreng", "jualan buah segar", "angkringan kopi"],
            MarketplaceType::MallTenant->value => ["gerai fashion", "toko aksesoris", "food court tenant", "gerai elektronik", "toko buku/mainan"],
            MarketplaceType::Lainnya->value => ["gudang penyimpanan", "workshop kreatif", "studio mini", "tempat kursus", "dapur bersama (cloud kitchen)"]
        ];

        // Perkiraan ukuran (panjang, lebar) berdasarkan tipe lapak (min_p, max_p, min_l, max_l)
        $size_map = [
            MarketplaceType::Kios->value => [2.5, 5.0, 2.0, 4.0],
            MarketplaceType::Ruko->value => [4.0, 8.0, 10.0, 20.0], // Lebar x Panjang (untuk ruko biasanya panjang ke belakang)
            MarketplaceType::Booth->value => [1.5, 3.0, 1.5, 3.0],
            MarketplaceType::Tenda->value => [2.0, 4.0, 2.0, 4.0],
            MarketplaceType::MallTenant->value => [3.0, 10.0, 3.0, 10.0],
            MarketplaceType::Lainnya->value => [5.0, 20.0, 5.0, 30.0] // Misal gudang
        ];
        
        // Perkiraan harga berdasarkan tipe dan periode
        // [min_monthly, max_monthly, min_yearly, max_yearly, min_other, max_other]
        $price_guide = [
            MarketplaceType::Kios->value => [500000, 2000000, 5000000, 20000000, 1000000, 15000000],
            MarketplaceType::Ruko->value => [3000000, 20000000, 30000000, 250000000, 20000000, 150000000],
            MarketplaceType::Booth->value => [300000, 3000000, 3000000, 25000000, 500000, 10000000], // Booth tahunan mungkin di mall
            MarketplaceType::Tenda->value => [200000, 1500000, 2000000, 15000000, 300000, 5000000],
            MarketplaceType::MallTenant->value => [2000000, 25000000, 20000000, 200000000, 10000000, 100000000],
            MarketplaceType::Lainnya->value => [1000000, 15000000, 10000000, 150000000, 5000000, 100000000]
        ];


        $lapaksArray = [];
        // Misalkan nama kolom untuk periode harga adalah 'billing_period'
        $namaKolomPeriodeHarga = 'price_type'; // GANTI INI JIKA NAMA KOLOMMU BEDA

        for ($i = 1; $i <= 100; $i++) {
            $typeEnum = MarketplaceType::from(Arr::random($allMarketplaceTypes));
            $typeLabel = MarketplaceType::labels()[$typeEnum->value] ?? $typeEnum->value;

            $kecamatanEnum = Kecamatan::from(Arr::random($allKecamatanValues));
            $kecamatanLabel = Kecamatan::labels()[$kecamatanEnum->value] ?? $kecamatanEnum->value;
            
            $kelurahanOptions = $kecamatanKelurahanMap[$kecamatanEnum->value];
            $selectedKelurahan = Arr::random($kelurahanOptions);
            $kelurahanEnumVal = $selectedKelurahan['value'];
            $kelurahanLabel = $selectedKelurahan['label'];

            $name_prefixes = ["Disewakan", "Sewa Tempat", "Lapak Usaha", "Ruang Komersial"];
            if (rand(1,10) > 8) $name_prefixes[] = "Over Kontrak"; // Sesekali ada over kontrak
            $name = Arr::random($name_prefixes) . " " . $typeLabel . " " . $kecamatanLabel;

            // Ukuran berdasarkan tipe
            $s_map = $size_map[$typeEnum->value];
            $size_length = round(rand($s_map[0]*10, $s_map[1]*10) / 10, 1);
            $size_width = round(rand($s_map[2]*10, $s_map[3]*10) / 10, 1);

            // Logika untuk price dan billing_period
            $possibleBillingPeriods = ['monthly', 'yearly', 'other'];
            $billingPeriodValue = Arr::random($possibleBillingPeriods);
            
            $price = 0.0;
            $current_price_guide = $price_guide[$typeEnum->value];
            $deskripsiHargaDanPeriode = "";

            if ($billingPeriodValue == 'yearly') {
                $price = (float) random_int($current_price_guide[2], $current_price_guide[3]);
                $deskripsiHargaDanPeriode = "Harga sewa sekitar " . number_format($price) . " per tahun.";
            } elseif ($billingPeriodValue == 'monthly') {
                $price = (float) random_int($current_price_guide[0], $current_price_guide[1]);
                $deskripsiHargaDanPeriode = "Harga sewa sekitar " . number_format($price) . " per bulan.";
            } else { // 'other'
                $price = (float) random_int($current_price_guide[4], $current_price_guide[5]);
                $skenarioHargaLainnya = [
                    "total biaya oper alih hak pakai untuk sisa periode " . random_int(3, 18) . " bulan kedepan",
                    "untuk sewa selama periode event spesial " . random_int(3, 10) . " hari",
                    "harga paket khusus dan fleksibel, silakan hubungi untuk diskusi periode dan negosiasi lebih lanjut",
                    "biaya borongan untuk keseluruhan sisa masa sewa yang ada, sangat cocok untuk yang ingin langsung masuk"
                ];
                $deskripsiHargaDanPeriode = "Info harga: Rp " . number_format($price) . ". Keterangan: " . Arr::random($skenarioHargaLainnya) . ". Detail lengkap bisa ditanyakan langsung.";
                if (Str::contains($name, "Over Kontrak")) { // Jika namanya ada over kontrak, deskripsi lebih spesifik
                     $deskripsiHargaDanPeriode = "OVER KONTRAK: Harga Rp " . number_format($price) . " untuk sisa periode " . random_int(4,15) . " bulan. Peralatan " . Arr::random(['lengkap disertakan', 'sebagian disertakan', 'tidak termasuk']) . ". Nego.";
                }
            }

            // Generate deskripsi utama yang lebih relevan
            $cocok_untuk_list = $peruntukan_map[$typeEnum->value];
            $cocok_untuk_text = Arr::random($cocok_untuk_list);
            if (count($cocok_untuk_list) > 1 && rand(1,3) == 1) { // Sesekali tambahkan peruntukan kedua
                $cocok_untuk_text .= " atau " . Arr::random(array_diff($cocok_untuk_list, [$cocok_untuk_text]));
            }

            $desc_parts = [
                "{$typeLabel} ini berlokasi sangat ". Arr::random($list_kata_sifat_umum) . " di " . $kecamatanLabel . ", tepatnya di wilayah " . $kelurahanLabel . ", dekat dengan " . Arr::random($list_objek_dekat) . ".",
                "Dengan ukuran sekitar {$size_length}m x {$size_width}m dan kondisi " . Arr::random($list_kondisi) . ", tempat ini sangat ideal untuk " . $cocok_untuk_text . ".",
                "Fasilitas utama yang tersedia antara lain " . Arr::random($list_fasilitas_dasar) . " dan " . Arr::random($list_fasilitas_tambahan) . ".",
                $deskripsiHargaDanPeriode,
                Arr::random($list_seruan) . "! " . Arr::random(["Segera amankan unit ini!", "Jangan sampai keduluan!", "Unit terbatas!"])
            ];
            shuffle($desc_parts);
            $description = implode(" ", array_slice($desc_parts, 0, random_int(3, 5))); // Ambil 3-5 kalimat acak

            $lapaksArray[] = [
                'name' => $name,
                'type' => $typeEnum->value,
                'description' => $description,
                'size_length' => $size_length,
                'size_width' => $size_width,
                'price' => $price,
                $namaKolomPeriodeHarga => $billingPeriodValue,
                'kecamatan' => $kecamatanEnum->value,
                'kelurahan' => $kelurahanEnumVal,
                'address' => 'Jl. ' . Str::title(Arr::random(['Cendana', 'Boulevard', 'Merpati', 'Elang', 'Pendidikan', 'Merdeka', 'Nusantara'])) . ' No. ' . random_int(1, 150) . ', RW '.rand(1,15).'/RT '.rand(1,10).', ' . $kelurahanLabel . ', ' . $kecamatanLabel . ', Depok',
                'phone_number' => '+6281' . random_int(10000000, 999999999), // 9 digit setelah 6281
                'long' => null,
                'lat' => null,
                'lat' => 'available',
                'user_id' => Arr::random($userIds),
                'created_at' => now()->subDays(random_int(0, 300)),
                'updated_at' => now()->subDays(random_int(0, 25)),
            ];
        }

        foreach (array_chunk($lapaksArray, 50) as $chunk) {
            DB::table('marketplaces')->insert($chunk);
        }
        
        $this->command->info('Marketplace table seeded with 100 improved entries!');
    }
}
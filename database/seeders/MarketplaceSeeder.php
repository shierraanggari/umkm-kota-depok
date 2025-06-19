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

        // if (empty($userIds)) {
        //     User::factory()->count(10)->create();
        //     $userIds = User::pluck('id')->toArray();
        // }

        $kecamatanKelurahanMap = Kelurahan::groupedByKecamatan();
        $allMarketplaceTypes = MarketplaceType::values();
        $allKecamatanValues = Kecamatan::values();
        
        $list_kata_sifat_umum = ["strategis", "nyaman", "terawat", "baru", "modern", "minimalis", "rame pengunjung", "prospektif", "ideal", "bersih", "terang", "akses mudah"];
        $list_objek_dekat = ["pasar tradisional", "kampus", "universitas", "stasiun KRL", "terminal Jatijajar", "jalan raya Margonda", "mall", "sekolah", "rumah sakit", "pintu tol Cijago", "area perkantoran GDC", "pusat kuliner"];
        $list_fasilitas_dasar = ["listrik 900W token", "listrik 1300W", "listrik 2200W", "air PAM", "jetpump", "kamar mandi dalam", "area parkir motor", "area parkir mobil luas"];
        $list_fasilitas_tambahan = ["rolling door", "pintu kaca", "AC", "ada kamar mandi", "bebas banjir", "keamanan 24 jam", "hadap jalan utama", "ventilasi baik", "etalase", "meja kasir", "rak display"];
        $list_kondisi = ["baru direnovasi", "siap pakai", "kondisi baik", "kondisi sangat baik", "bangunan baru", "semi furnished", "kosongan"];
        $list_seruan = ["harga nego", "peluang usaha bagus", "disewakan cepat", "hubungi segera untuk survei"];
        
        $peruntukan_map = [
            MarketplaceType::Kios->value => ["toko kelontong", "warung sembako", "agen pulsa", "jajanan ringan", "fotokopi & ATK", "laundry", "pangkas rambut", ],
            MarketplaceType::Ruko->value => ["kantor cabang", "bank", "klinik dokter", "apotek", "restoran", "kafe", "bimbel", "toko retail besar", "showroom mini", "ekspedisi", "bimbel", "minimarket", "bank"],
            MarketplaceType::Booth->value => ["jualan minuman kekinian", "stand makanan ringan", "pameran produk", "merchandise event", "informasi produk", "jajanan viral"],
            MarketplaceType::Tenda->value => ["warung tenda pecel lele", "soto mie", "nasi goreng", "jualan buah segar", "angkringan kopi"],
            MarketplaceType::MallTenant->value => ["toko baju", "toko aksesoris", "food court tenant", "toko parfum", "toko elektronik", "toko buku/mainan"],
            MarketplaceType::Lainnya->value => ["gudang penyimpanan", "gudang", "workshop kreatif", "studio mini", "tempat kursus", "dapur bersama (cloud kitchen)"]
        ];
        
        $size_map = [
            MarketplaceType::Kios->value => [2.5, 5.0, 2.0, 4.0],
            MarketplaceType::Ruko->value => [4.0, 8.0, 10.0, 20.0], 
            MarketplaceType::Booth->value => [1.5, 3.0, 1.5, 3.0],
            MarketplaceType::Tenda->value => [2.0, 4.0, 2.0, 4.0],
            MarketplaceType::MallTenant->value => [3.0, 10.0, 3.0, 10.0],
            MarketplaceType::Lainnya->value => [5.0, 20.0, 5.0, 30.0] 
        ];
        
        $price_guide = [
            MarketplaceType::Kios->value => [500000, 3000000, 5000000, 50000000, 1000000, 15000000],
            MarketplaceType::Ruko->value => [3000000, 20000000, 75000000, 250000000, 20000000, 150000000],
            MarketplaceType::Booth->value => [150000, 3000000, 3000000, 25000000, 500000, 10000000], 
            MarketplaceType::Tenda->value => [150000, 1500000, 2000000, 15000000, 300000, 5000000],
            MarketplaceType::MallTenant->value => [2000000, 10000000, 20000000, 200000000, 10000000, 100000000],
            MarketplaceType::Lainnya->value => [1000000, 15000000, 10000000, 150000000, 5000000, 100000000]
        ];

        $lapaksArray = [];
        
        $namaKolomPeriodeHarga = 'price_type'; 

        for ($i = 1; $i <= 100; $i++) {
            $typeEnum = MarketplaceType::from(Arr::random($allMarketplaceTypes));
            $typeLabel = MarketplaceType::labels()[$typeEnum->value] ?? $typeEnum->value;

            $kecamatanEnum = Kecamatan::from(Arr::random($allKecamatanValues));
            $kecamatanLabel = Kecamatan::labels()[$kecamatanEnum->value] ?? $kecamatanEnum->value;
            
            $kelurahanOptions = $kecamatanKelurahanMap[$kecamatanEnum->value];
            $selectedKelurahan = Arr::random($kelurahanOptions);
            $kelurahanEnumVal = $selectedKelurahan['value'];
            $kelurahanLabel = $selectedKelurahan['label'];

            $name_prefixes = ["Disewakan", "Sewa Tempat", "Lapak Usaha", "Space Lapak"];
            if (rand(1,10) > 8) $name_prefixes[] = "Over Kontrak";
            $name = Arr::random($name_prefixes) . " " . $typeLabel . " " . $kecamatanLabel;
            
            $s_map = $size_map[$typeEnum->value];
            $size_length = round(rand($s_map[0]*10, $s_map[1]*10) / 10, 1);
            $size_width = round(rand($s_map[2]*10, $s_map[3]*10) / 10, 1);
            
            $possibleBillingPeriods = ['monthly', 'yearly', 'other'];
            $billingPeriodValue = Arr::random($possibleBillingPeriods);
            
            $price = 0.0;
            $current_price_guide = $price_guide[$typeEnum->value];
            $deskripsiHargaDanPeriode = "";

            if ($billingPeriodValue == 'yearly') {
                $price = (float) random_int($current_price_guide[2], $current_price_guide[3]);
                $deskripsiHargaDanPeriode = "Harga sewa " . number_format($price) . " per tahun.";
            } elseif ($billingPeriodValue == 'monthly') {
                $price = (float) random_int($current_price_guide[0], $current_price_guide[1]);
                $deskripsiHargaDanPeriode = "Harga sewa " . number_format($price) . " per bulan.";
            } else { 
                $price = (float) random_int($current_price_guide[4], $current_price_guide[5]);
                $skenarioHargaLainnya = [
                    "total biaya oper alih hak pakai untuk sisa periode " . random_int(3, 18) . " bulan ke depan",
                    "untuk sewa selama periode event spesial " . random_int(3, 10) . " hari",
                    "harga paket khusus dan fleksibel, silakan hubungi untuk diskusi periode dan negosiasi lebih lanjut",
                    "biaya borongan untuk keseluruhan sisa masa sewa yang ada, sangat cocok untuk yang ingin langsung masuk"
                ];
                $deskripsiHargaDanPeriode = "Info harga: Rp " . number_format($price) . ". Keterangan: " . Arr::random($skenarioHargaLainnya) . ". Detail lengkap bisa ditanyakan langsung.";
                if (Str::contains($name, "Over Kontrak")) { 
                     $deskripsiHargaDanPeriode = "Over kontrak Rp " . number_format($price) . " untuk sisa periode " . random_int(4,15) . " bulan. Peralatan " . Arr::random(['lengkap disertakan', 'sebagian disertakan', 'tidak termasuk']) . ". Nego.";
                }
            }
            
            $cocok_untuk_list = $peruntukan_map[$typeEnum->value];
            $cocok_untuk_text = Arr::random($cocok_untuk_list);
            if (count($cocok_untuk_list) > 1 && rand(1,3) == 1) { 
                $cocok_untuk_text .= " atau " . Arr::random(array_diff($cocok_untuk_list, [$cocok_untuk_text]));
            }

            $desc_parts = [
                "{$typeLabel} ini ". Arr::random($list_kata_sifat_umum) . " di " . $kecamatanLabel . ", tepatnya di " . $kelurahanLabel . ", dekat dengan " . Arr::random($list_objek_dekat) . ".",
                "Dengan ukuran sekitar {$size_length}m x {$size_width}m dan kondisi " . Arr::random($list_kondisi) . ", tempat ini bagus untuk " . $cocok_untuk_text . ".",
                "Fasilitas utama yang tersedia antara lain " . Arr::random($list_fasilitas_dasar) . " dan " . Arr::random($list_fasilitas_tambahan) . ".",
                $deskripsiHargaDanPeriode,
                Arr::random($list_seruan)
            ];
            
            shuffle($desc_parts);
            $description = implode(" ", array_slice($desc_parts, 0, random_int(3, 5)));

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
                'address' => 'Jl. ' . Str::title(Arr::random(['Nuri', 'Mangga', 'Akses Utama', 'Cendana', 'Kemiri', 'Merpati', 'Elang', 'Pendidikan', 'Merdeka', 'Nusantara'])) . ' No. ' . random_int(1, 150) . ', RW '.rand(1,15).'/RT '.rand(1,10).', ' . $kelurahanLabel . ', ' . $kecamatanLabel . ', Depok',
                'phone_number' => '+6281' . random_int(10000000, 999999999),
                'long' => null,
                'lat' => null,
                'status' => 'available',
                'user_id' => Arr::random($userIds),
                'created_at' => now()->subDays(random_int(0, 300)),
                'updated_at' => now()->subDays(random_int(0, 25)),
            ];
        }

        foreach (array_chunk($lapaksArray, 50) as $chunk) {
            DB::table('marketplaces')->insert($chunk);
        }
        
        $this->command->info('Berhasil menambahkan 100 data ke table marketplace.');
    }
}
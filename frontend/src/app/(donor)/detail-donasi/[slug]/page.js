import { dataKampanye } from "@/data/campaign";
import Image from "next/image";

const generateSlug = (judul) => judul.toLowerCase().replace(/\s+/g, "-");

export default function DetailDonasi({ params }) {
  const { slug } = params;

  const kampanye = dataKampanye.find(
    (item) => generateSlug(item.judulCampaign) === slug
  );

  if (!kampanye) {
    return <div className="p-10">Donasi tidak ditemukan.</div>;
  }

  return (
    <div className="px-6 md:px-[110px] py-8">
      <div className="mb-4">
        <p className="text-gray-500">
          <span className="font-semibold text-black">Donasi</span> / Informasi
          Donasi / <span className="text-blue-600">{slug}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Image
            src={kampanye.gambarBuktiCampaign}
            alt={kampanye.judulCampaign}
            width={800}
            height={500}
            className="w-full rounded-md object-cover"
          />

          <div className="mt-6 border-b pb-2">
            <p className="text-lg font-semibold mb-2">Tentang Program</p>
          </div>

          <div className="mt-4 text-sm text-gray-700 space-y-4">
            <p>{kampanye.deskripsi}</p>
            <a
              href={kampanye.proposal}
              target="_blank"
              className="text-blue-600 underline"
            >
              Lihat Proposal Donasi
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold">{kampanye.judulCampaign}</h2>
            <p className="text-sm mt-1 text-gray-600">{kampanye.deskripsi}</p>

            <div className="mt-3 text-sm font-semibold">
              <span>{kampanye.targetDonasi}</span>
            </div>

            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded">
              Donasi Sekarang
            </button>
          </div>

          <div className="p-4 bg-white rounded shadow text-sm space-y-3">
            <div>
              <p className="font-semibold">📍 Lokasi</p>
              <p>{kampanye.alamat}</p>
            </div>
            <div>
              <p className="font-semibold">📅 Durasi Donasi</p>
              <p>
                {kampanye.durasiAwal} sampai {kampanye.durasiAkhir}
              </p>
            </div>
            <div>
              <p className="font-semibold">☎️ Kontak</p>
              <p>{kampanye.nomorTelepon}</p>
            </div>
            <div>
              <p className="font-semibold">🏢 Campaign Organizer</p>
              <p>{kampanye.namaCampaign}</p>
            </div>
          </div>

          <div className="p-4 bg-white rounded shadow text-sm">
            <p className="font-semibold mb-2">🔗 Bagi Donasi Ini</p>
            <a
              href={`https://donasi-program/${slug}`}
              className="text-blue-600 underline break-words"
            >
              https://donasi-program/{slug}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

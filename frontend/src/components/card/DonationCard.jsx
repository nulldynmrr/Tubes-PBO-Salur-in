import Image from "next/image";
import ProgressBar from "./Progressbar";
import { hitungPersentaseDonasi } from "@/lib/utils/campaign-helpers";
import Link from "next/link";

export default function DonationCard({ idDonasi, dataCampaign, userDonasi }) {
  const persentase = hitungPersentaseDonasi(idDonasi, dataCampaign, userDonasi);

  const campaign = dataCampaign.find((c) =>
    c.pengajuanDonasi.some((d) => d.id_donasi === idDonasi)
  );
  if (!campaign) return <p>Campaign tidak ditemukan</p>;

  const campaignDetail = campaign.pengajuanDonasi.find(
    (donasi) => donasi.id_donasi === idDonasi
  );

  const namaCampaignSlug = campaign.namaCampaign
    .toLowerCase()
    .replace(/\s+/g, "-");
  const namaDonasiSlug = campaignDetail.judulCampaign
    .toLowerCase()
    .replace(/\s+/g, "-");

  return (
    <div className="max-w-sm rounded-lg shadow-md overflow-hidden border border-gray-200 bg-white">
      <div className="h-48 w-full relative">
        <Image
          src={campaignDetail?.gambarBuktiCampaign}
          alt={campaign.nama || "Campaign"}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold">
          {campaignDetail?.judulCampaign}
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          {campaignDetail?.deskripsi || "Deskripsi tidak tersedia"}
        </p>

        <ProgressBar percentage={persentase} />

        <Link
          href={`/detail-donasi/${namaCampaignSlug}/${namaDonasiSlug}`}
          className="mt-4 block w-full bg-blue-600 text-white py-2 rounded-md text-center hover:bg-blue-700 transition duration-200"
        >
          Donasi Sekarang
        </Link>
      </div>
    </div>
  );
}

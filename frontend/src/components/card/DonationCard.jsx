import Image from "next/image";
import ProgressBar from "./Progressbar";
import Link from "next/link";

export default function DonationCard({ campaign }) {
  if (!campaign) return <p>Campaign tidak ditemukan</p>;

  const namaCampaignSlug = campaign.namaCampaign
    .toLowerCase()
    .replace(/\s+/g, "-");

  return (
    <div className="max-w-sm rounded-lg shadow-md overflow-hidden border border-gray-200 bg-white">
      <div className="h-48 w-full relative">
        <Image
          src={campaign.gambarBuktiCampaign || "/images/default-campaign.jpg"}
          alt={campaign.namaCampaign || "Campaign"}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold">{campaign.namaCampaign}</h2>
        <p className="text-sm text-gray-600 mb-4">
          {campaign.deskripsi || "Deskripsi tidak tersedia"}
        </p>

        <ProgressBar percentage={campaign.progress || 0} />

        <Link
          href={`/detail-donasi/${namaCampaignSlug}`}
          className="mt-4 block w-full bg-blue-600 text-white py-2 rounded-md text-center hover:bg-blue-700 transition duration-200"
        >
          Donasi Sekarang
        </Link>
      </div>
    </div>
  );
}

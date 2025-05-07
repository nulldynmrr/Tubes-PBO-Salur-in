import Image from "next/image";
import ProgressBar from "./Progressbar";

export default function DonationCard() {
  const percentage = 72;

  return (
    <div className="max-w-sm rounded-lg shadow-md overflow-hidden border border-gray-200 bg-white">
      <div className="h-48 w-full relative">
        <Image
          src="/img/cleaning-beach.png"
          alt="Cleaning Beach"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold">Program Air Bersih</h2>
        <p className="text-sm text-gray-600 mb-4">
          Membantu kelurahan desa bojongsoang untuk menemukan air bersih
        </p>
        
        <ProgressBar percentage={10} />

        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
          Donasi Sekarang
        </button>
      </div>
    </div>
  );
}

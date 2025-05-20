// ubah "Rp 2.000.000" → 2000000
function parseRupiahToNumber(rupiah) {
  if (typeof rupiah !== "string") return 0;
  return Number(rupiah.replace(/[^0-9]/g, ""));
}

//main
export function hitungPersentaseDonasi(
  idDonasi,
  dataCampaign = [],
  userDonasi = []
) {
  let target = 0;

  // Cari campaign dengan ID yang cocok
  for (const campaign of dataCampaign) {
    const donasi = campaign.pengajuanDonasi.find(
      (d) => d.id_donasi === idDonasi
    );
    if (donasi) {
      target = parseRupiahToNumber(donasi.targetDonasi || "0");
      break;
    }
  }

  if (target === 0) return 0;

  // Hitung total donasi user untuk campaign ini
  let totalDonasi = 0;
  userDonasi.forEach((user) => {
    user.donasi?.forEach((don) => {
      if (don.id_donasi === idDonasi) {
        totalDonasi += Number(don.total_donasi) || 0;
      }
    });
  });

  const persentase = Math.min((totalDonasi / target) * 100, 100);
  return Math.round(persentase);
}

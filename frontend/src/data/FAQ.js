import FaqItem from "../components/FaqItem";

export default function FAQPage() {
  const faqs = [
    {
      question: "Apa itu Salur.in?",
      answer:
        "Salur.in adalah platform donasi online yang mempertemukan para donatur dengan badan amal terpercaya. Kami memudahkan proses donasi dan memastikan transparansi dalam penggunaan dana.",
    },
    {
      question:
        "Apakah donasi saya dapat dikurangkan dari pajak, dan bagaimana cara mengklaimnya di pajak saya?",
      answer:
        "Ya, donasi yang Anda berikan dapat dikurangkan dari pajak penghasilan Anda. Untuk mengklaimnya, Anda perlu menyimpan bukti donasi dan melaporkannya dalam SPT tahunan Anda.",
    },
    {
      question: "Bisakah saya berdonasi secara anonim?",
      answer:
        "Ya, Anda dapat memilih untuk berdonasi secara anonim. Pilihan ini tersedia saat Anda melakukan donasi, dan informasi Anda akan tetap terjaga kerahasiaannya.",
    },
    {
      question:
        "Berapa persen dari donasi saya yang sebenarnya digunakan oleh badan amal untuk keperluan administratif?",
      answer:
        "Kami berkomitmen untuk menggunakan minimal 90% dari setiap donasi untuk program dan bantuan langsung. Maksimal 10% digunakan untuk biaya operasional dan administratif.",
    },
    {
      question: "Bisakah saya menyumbangkan barang atau jasa alih-alih uang?",
      answer:
        "Ya, kami menerima donasi dalam bentuk barang dan jasa. Silakan hubungi tim kami untuk mendiskusikan jenis bantuan yang Anda ingin berikan.",
    },
  ];

  return (
    <div className="min-h-screen bg-white py-16 md:px-[110px]">
      <div className="max-w-3xl mx-auto text-center">
        <img src="/img/FAQ.png" alt="FAQ" className="mx-auto mb-6 w-80" />
        <h1 className="text-2xl font-bold mb-2">Frequently Asked Question</h1>
        <p className="text-gray-600 text-sm mb-10">
          Ada pertanyaan lain? hubungi kita di rinopler@gmail.com
        </p>
        <div className="text-left">
          {faqs.map((faq, index) => (
            <FaqItem key={index} {...faq} />
          ))}
        </div>
      </div>
    </div>
  );
}

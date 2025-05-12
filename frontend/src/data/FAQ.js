import FaqItem from "../components/FaqItem";

export default function FAQPage() {
  const faqs = [
    {
      question: "Jenis amal apa yang bisa saya donasikan, dan bagaimana cara menemukannya?",
      answer:
        "Ada banyak jenis badan amal, mulai dari organisasi lokal hingga organisasi internasional besar. Anda bisa berdonasi kepada badan amal yang fokus pada tujuan tertentu, seperti kesejahteraan hewan.",
    },
    {
      question: "Apakah donasi saya dapat dikurangkan dari pajak, dan bagaimana cara mengklaimnya di pajak saya?",
      answer: "",
    },
    {
      question: "Bisakah saya berdonasi secara anonim?",
      answer: "",
    },
    {
      question: "Berapa persen dari donasi saya yang sebenarnya digunakan oleh badan amal untuk keperluan administratif?",
      answer: "",
    },
    {
      question: "Bisakah saya menyumbangkan barang atau jasa alih-alih uang?",
      answer: "",
    },
  ];

  return (
    <div className="min-h-screen bg-white px-4 py-12 md:px-20">
      <div className="max-w-3xl mx-auto text-center">
        <img src="/img/FAQ.png" alt="FAQ" className="mx-auto mb-6 w-40" />
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
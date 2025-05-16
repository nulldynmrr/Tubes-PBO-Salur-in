import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="cursor-pointer border-b py-4"
    >
      <div className="flex justify-between items-center text-blue-600 font-medium">
        {question}
        {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </div>
      {isOpen && <p className="mt-2 text-sm text-gray-600">{answer}</p>}
    </div>
  );
}
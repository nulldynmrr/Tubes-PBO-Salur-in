'use client';
import { useState } from 'react';

export const Accordion = ({ children }) => {
  return <div className="space-y-4">{children}</div>;
};

export const AccordionItem = ({ value, title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-xl p-4 shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left font-semibold text-lg"
      >
        {title}
      </button>
      {open && <div className="mt-2 text-gray-700">{children}</div>}
    </div>
  );
};

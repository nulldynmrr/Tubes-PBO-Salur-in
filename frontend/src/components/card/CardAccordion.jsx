"use client";
import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const CardAccordion = ({ question, answer }) => {
  const [animationParent] = useAutoAnimate();
  const [isAccordionOpen, setAccordion] = useState(false);
  function toggleAccordion() {
    setAccordion(!isAccordionOpen);
  }
  return (
    <div ref={animationParent} className="flex flex-col py-4">
      <p
        onClick={toggleAccordion}
        className="flex justify-between gap-2 sm:text-lg font-semibold cursor-pointer text-[#1962F8]"
      >
        <span>{question}</span>
        {isAccordionOpen ? (
          <FaMinus className="text-mainGreen-300" />
        ) : (
          <FaPlus className="text-mainGreen-300" />
        )}
      </p>
      {isAccordionOpen && (
        <p className="text-sm sm:text-base text-black">{answer}</p>
      )}
    </div>
  );
};

export default CardAccordion;

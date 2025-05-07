"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import FAQ from "@/data/FAQ";
import CardAccordion from "@/components/card/CardAccordion";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div>
        {FAQ.map((data, index) => (
          <CardAccordion
            key={index}
            question={data.question}
            answer={data.answer}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

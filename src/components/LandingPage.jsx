import React from "react";
import BugCanvas from "./Bug";

export default function LandingPage() {
  return (
    <div className="bg-hero-pattern bg-cover w-full h-full bg-no-repeat bg-top ">
      <div className="px-5 items-center pt-20">
        <div className="pt-0 lg:text-[80px] sm:text-[60px]  xs:text-[40px] text-[30px] lg:leading-[98px] mt-2 text-center font-extrabold text-dark-text">
          <h1>Welcome to bugger</h1>
        </div>
        <div className="pt-2 text-center lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] font-extrabold text-dark-text">
          <h4>bug them bugs!</h4>
        </div>
      </div>
      <div className="lg:h-[760px] sm:h-[245px] xs:h-[90px]">
        <BugCanvas />
      </div>
      <div className="px-10">hello</div>
    </div>
  );
}

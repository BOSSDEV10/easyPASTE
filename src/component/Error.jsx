import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";
import { NavLink } from "react-router-dom";

const Error = () => {
  useGSAP(() => {
    gsap.from(".animation-div h2,h4,p,div", {
      opacity: 0,
      y: -10,
      x: -5,
      duration: 1.5,
      stagger: 0.105,
      ease: "power4",
    });
  });

  return (
    <>
      <section className="relative z-10 bg-primary min-h-screen w-full flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="-mx-4 flex">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[400px] text-center animation-div">
                <h2 className="mb-2 text-[50px] font-bold leading-none text-white sm:text-[80px] md:text-[100px]">
                  404
                </h2>
                <h4 className="mb-3 text-[22px] font-semibold leading-tight text-white">
                  Oops! That page can't be found
                </h4>
                <p className="mb-8 text-lg text-white">
                  The page you are looking for may have been deleted or moved
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <NavLink
                    to="/paste"
                  className="inline-block rounded-lg border-3 border-white/50 px-8 py-3 text-center text-base font-semibold text-white transition hover:bg-white hover:text-black"
                  >
                    Go To Paste
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Error;

"use client";
import React from "react";

const HomePage = () => {
  const scrollToFeatures = (event) => {
    event.preventDefault(); // Prevent default anchor behavior
    window.scrollBy({
      top: window.innerHeight, // Scroll down by the height of the viewport (100vh)
      behavior: "smooth", // Enable smooth scrolling
    });
  };

  return (
    <main className="dark:bg-gray-800 bg-white relative overflow-hidden h-full md:h-screen flex flex-col md:justify-around">
      <header className="h-20 sm:max-h-20 flex items-center z-30 w-full">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="uppercase text-gray-800 dark:text-white font-black text-3xl transition-all duration-500 tracking-widest hover:tracking-tighter">
            Diabe-Tasty
          </div>
          <div className="flex items-center">
            <nav className="font-sen text-gray-800 dark:text-white uppercase text-lg lg:flex items-center hidden">
              <a href="#" className="py-2 px-6 flex opacity-70 text-lime-700">
                Home
              </a>
              <div
                className="py-2 px-6 flex hover:opacity-70 hover:text-lime-700 cursor-pointer"
                onClick={scrollToFeatures}
              >
                Features
              </div>
              {/* <a
                href="#"
                className="py-2 px-6 flex hover:opacity-70 hover:text-lime-700"
              >
                Product
              </a>
              <a
                href="#"
                className="py-2 px-6 flex hover:opacity-70 hover:text-lime-700"
              >
                Contact
              </a>
              <a
                href="#"
                className="py-2 px-6 flex hover:opacity-70 hover:text-lime-700"
              >
                Career
              </a> */}
            </nav>
            <button className="lg:hidden flex flex-col ml-4">
              <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
              <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
              <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
            </button>
          </div>
        </div>
      </header>

      <div className="bg-white dark:bg-gray-800 flex flex-col md:flex-row relative z-20 items-center overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row relative py-6">
          <div className="sm:w-full md:w-3/5 flex flex-col relative z-20">
            <div className="group h-2 flex items-center gap-40 mb-12 ">
              <div className="w-20 h-full bg-gray-800 dark:bg-white hover:w-40 transition-all hover:scale-x-150 hover:translate-x-12 duration-500"></div>
              <div className="text-[0rem]   group-hover:text-sm font-bold transition-all delay-500 text-lime-500">
                {/* A Pranay Parikh Product */}
                By Nitya and Sreelasya
              </div>
            </div>
            <h1 className="font-bebas-neue uppercase text-3xl sm:text-5xl font-black flex flex-col leading-none dark:text-white text-gray-800 mb-4">
              Don&apos;t let your <br />{" "}
              <span className="text-lime-600  transition-all duration-500 hover:tracking-widest">
                Diabetes
              </span>
              <span className="text-2xl sm:text-4xl my-4">
                {" "}
                stop you From eating <br />{" "}
                <span className="text-lime-500  transition-all duration-500 hover:tracking-widest">
                  Tasty
                </span>
              </span>
            </h1>
            <p className="text-sm sm:text-base text-gray-700 dark:text-white">
              Using the power of Machine Learning, we customize each recipe to
              fit your specific condition, dietary goals, and taste preferences.
              No more one-size-fits-all solutions—every meal suggestion is
              designed to keep your blood sugar levels in check while satisfying
              your cravings.
            </p>

            <div className="flex mt-8">
              <a
                href="#"
                className="uppercase py-2 px-4 rounded-lg bg-lime-500 border-2 border-transparent text-white text-md mr-4 hover:bg-lime-400"
              >
                Get started
              </a>
              <a
                href="#"
                className="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-lime-500 text-lime-500 dark:text-white hover:bg-lime-500 hover:text-white text-md"
              >
                Read more
              </a>
            </div>
          </div>
          <div className="block w-full md:w-2/5 relative">
            <img
              src="https://img.freepik.com/free-vector/hand-drawn-flat-design-people-eating-collection_23-2149208641.jpg?ga=GA1.1.1743443563.1726294680&semt=ais_hybrid"
              className="max-w-xs my-12 md:max-w-sm m-auto hover:scale-110 rotate-12 hover:rotate-0 transition-all duration-200"
              alt="Image"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;

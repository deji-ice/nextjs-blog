import React from "react";

const Banner = () => {
  return <div className="flex flex-col lg:flex-row lg:space-x-5 lg:justify-between font-bold px-10 py-5 mb-10 ">
    <div>
<h1 className="text-7xl">The Daily Blog</h1>
<h2 className="mt-5 lg:mt-2">
  welcome to {" "} <span className="underline decoration-4 decoration-yellow-400">Every developers</span> {" "} favorite blog
</h2>
    </div>
    <p className="mt-5 text-gray-400 max-w-sm">
      New products | The latest fashion trends | more and more and more!
    </p>
  </div>;
};

export default Banner;

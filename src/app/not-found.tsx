
import Link from "next/link";

export default function NotFound() {

  return (
    <main
      style={{
        backgroundImage: `url("https://plus.unsplash.com/premium_photo-1668110864450-48a6591c3a22?q=80&w=1004&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Content */}
      <div
        className={`relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 opacity-0 translate-y-10
        }`}
      >
        {/* 404 Number */}
        <div className="relative mb-4">
          <h1 className="text-[12rem] sm:text-[16rem] lg:text-[18rem] font-bold font-heading leading-none text-white tracking-tighter shadow-2xl">
            404
          </h1>
        </div>

        {/* Message */}
        <div className="space-y-4 mb-10">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold text-white uppercase tracking-tight">
            {`Oops! Page Not Found`}
          </h2>
          <p className="text-lg sm:text-xl text-gray-200 max-w-xl mx-auto leading-relaxed font-body">
            {`The page you're looking for has drifted beyond our reach. Let's get
            you back to the transmission.`}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Link
            href="/"
            className="group relative inline-flex items-center gap-1 px-6 py-2 bg-white text-slate-950 font-bold rounded-[12px] hover:bg-gray-100 transition-all duration-300 hover:scale-105"
          >
            {/* <HomeIcon className="w-5 h-5" /> */}

            <span className="font-heading">Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

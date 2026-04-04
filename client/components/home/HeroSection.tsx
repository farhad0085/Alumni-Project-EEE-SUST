"use client";

export default function HeroSection() {
  const scrollToExplore = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("explore");
    if (!el) return;
    const headerOffset = 80;
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementPosition - headerOffset,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="bg-cover bg-center bg-no-repeat text-white h-[450px] flex items-center justify-center text-center px-4"
      style={{
        backgroundImage: `linear-gradient(45deg, rgba(6, 90, 146, 0.8), rgba(10, 160, 255, 0.7)), url('https://www.sust.edu/storage/images/slider/1685368417.jpg')`,
      }}
    >
      <div className="max-w-[800px]">
        <h1 className="text-[2.5rem] max-md:text-[2rem] mb-4 font-bold [text-shadow:0_2px_10px_rgba(0,0,0,0.2)]">
          Department of Electrical and Electronic Engineering
        </h1>
        <p className="text-lg max-md:text-base mb-8 font-normal">
          Pioneering the future of technology and innovation.
        </p>
        <a
          href="#explore"
          onClick={scrollToExplore}
          className="bg-[#0fb2ff] text-white px-6 py-3 rounded-lg no-underline font-semibold transition-all duration-200 hover:bg-[#0da0e8] hover:-translate-y-0.5"
        >
          Explore now
        </a>
      </div>
    </section>
  );
}


import { Link } from "react-router-dom";

function About() {
  const principles = [
    {
      number: "01",
      title: "Transparent Botanicals",
      description:
        "Every note is ethically harvested and carefully distilled. We believe in ingredients that are authentic and traceable.",
    },
    {
      number: "02",
      title: "Slow Maceration",
      description:
        "Each batch rests for its own length, allowing a deeper balance to develop and giving the scent its lasting warmth and richness.",
    },
    {
      number: "03",
      title: "Intimate Sillage",
      description:
        "Our compositions are designed to feel close to the skin, responding to your natural warmth rather than overwhelming the room.",
    },
    {
      number: "04",
      title: "Conscious Vessel",
      description:
        "Substantial, recyclable bottles feel good and purposeful. Considered packaging made with respect for the earth.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#30251F]">

      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10">

        {/* PAGE HEADING */}
        <section className="border-b border-[#D8D0C4] pb-9">
          <p className="mb-3 text-[10px] uppercase tracking-[3px] text-[#806B57]">
            THE MAISON
          </p>

          <h1 className="font-serif text-4xl font-light leading-tight md:text-[56px]">
            Quiet luxury, distilled.
          </h1>

          <p className="mt-4 max-w-xl font-serif text-sm leading-7 text-[#806052] md:text-base">
            Aurélia Parfums was founded on a simple premise:
            fragrance should be an intimate personal landscape,
            not an aggressive announcement.
          </p>
        </section>

        {/* OUR ORIGINS */}
        <section className="grid grid-cols-1 items-center gap-10 py-14 md:grid-cols-2">

          {/* IMAGE */}
          <div className="aspect-[1.12/1] overflow-hidden border border-[#D8D0C4] bg-[#F2EEE6]">
            <img
              src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=85"
              alt="Luxury perfume with flowers"
              className="h-full w-full object-cover"
            />
          </div>

          {/* TEXT */}
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[3px] text-[#806B57]">
              OUR ORIGINS
            </p>

            <h2 className="mb-5 font-serif text-3xl md:text-4xl">
              Born from memory and restraint.
            </h2>

            <div className="space-y-4 text-sm leading-7 text-[#806052]">
              <p>
                In a market dominated by overpowering projection,
                we looked back to the golden era of artisanal
                perfumery—when scents were crafted with patience,
                natural materials, and an understanding of human warmth.
              </p>

              <p>
                Established between Grasse and Mumbai, Aurélia
                blends classical French formulation with new
                Eastern botanical narratives drawn from lavender,
                rose, cardamom, and creamy Mysore sandalwood.
              </p>

              <p>
                We do not produce seasonal trends. Each creation
                is permanent, timeless, and crafted to evolve
                naturally with your personal chemistry throughout
                the day.
              </p>
            </div>
          </div>
        </section>

        {/* PHILOSOPHY */}
        <section className="border border-[#D8D0C4] bg-[#FFFEFC] px-6 py-12 text-center md:px-14">

          <p className="mb-5 text-[10px] uppercase tracking-[3px] text-[#806B57]">
            OUR PHILOSOPHY
          </p>

          <h2 className="mx-auto max-w-3xl font-serif text-2xl font-light leading-relaxed md:text-3xl">
            “Fragrance should never enter the room before you do.
            It should be discovered only by those you allow close.”
          </h2>

          <p className="mt-6 text-[9px] uppercase tracking-[2px] text-[#9B8066]">
            — ÉLISE LAURENT & KABIR MEHTA, CO-FOUNDERS
          </p>

        </section>

        {/* PRINCIPLES */}
        <section className="py-14">

          <p className="mb-2 text-[10px] uppercase tracking-[3px] text-[#806B57]">
            OUR PROMISE
          </p>

          <h2 className="border-b border-[#D8D0C4] pb-6 font-serif text-3xl md:text-[32px]">
            Principles that guide our atelier
          </h2>

          <div className="mt-7 grid grid-cols-1 gap-6 min-[425px]:grid-cols-2 md:grid-cols-4">

            {principles.map((item) => (
              <div
                key={item.number}
                className="min-h-48 min-w-0 border border-[#D8D0C4] bg-[#FFFEFC] p-5"
              >
                <p className="mb-7 text-[10px] text-[#9B8066]">
                  {item.number}
                </p>

                <h3 className="mb-3 font-serif text-lg">
                  {item.title}
                </h3>

                <p className="text-xs leading-6 text-[#806052]">
                  {item.description}
                </p>
              </div>
            ))}

          </div>
        </section>

        {/* INGREDIENTS */}
        <section className="grid grid-cols-1 items-center gap-10 border-b border-[#D8D0C4] pb-14 md:grid-cols-2">

          {/* TEXT */}
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[3px] text-[#806B57]">
              THE INGREDIENTS
            </p>

            <h2 className="mb-5 font-serif text-3xl md:text-4xl">
              Sourced with reverence.
            </h2>

            <p className="max-w-lg text-sm leading-7 text-[#806052]">
              We partner exclusively with multi-generational
              growers who cultivate flowers, herbs, and resins
              without synthetic fertilizers. From sunlit
              Italian citrus groves to ethically-harvested
              Indian oud, every drop respects the rhythm of
              the soil.
            </p>

            <Link
              to="/products"
              className="mt-7 inline-block border-b border-[#30251F] pb-2 text-[10px] uppercase tracking-widest hover:text-[#806052]"
            >
              EXPLORE OUR COMPOSITIONS →
            </Link>
          </div>

          {/* IMAGE */}
          <div className="aspect-[1.24/1] overflow-hidden bg-[#F2EEE6]">
            <img
              src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1000&q=85"
              alt="Perfume ingredients and fragrance"
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="py-14 text-center">

          <h2 className="font-serif text-3xl md:text-4xl">
            Find your signature scent
          </h2>

          <p className="mt-3 text-xs text-[#806052]">
            Sample our discovery set or browse our permanent
            library of eau de parfums.
          </p>

          <Link
            to="/products"
            className="mt-6 inline-flex items-center gap-5 bg-[#30251F] px-6 py-3 text-[10px] uppercase tracking-wider text-white transition hover:bg-[#49382F]"
          >
            DISCOVER THE LIBRARY
            <span>→</span>
          </Link>

        </section>

      </div>
    </div>
  );
}

export default About;

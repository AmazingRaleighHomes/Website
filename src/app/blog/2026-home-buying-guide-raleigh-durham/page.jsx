import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthorCard from "@/components/AuthorCard"; 

export const metadata = {
  title: "What Salary Do You Need to Buy a House in Raleigh–Durham, NC?",
  description:
    "A practical, homeowner-focused guide to affordability, neighborhoods, and timing — tailored for buyers in the Triangle.",
};

export default function RaleighDurhamHomebuyingBlog() {
  return (
    <div className="bg-white">
      <Navbar />

      {/* Breadcrumbs, categories, title */}
      <div className="max-w-7xl mx-auto px-6 pt-32">
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:underline">Home</Link> {" > "} 
          <span className="text-gray-700 font-semibold">
            What Salary Do You Need to Buy a House in Raleigh–Durham, NC?
          </span>
        </nav>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">Buying</span>
          <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-medium">Life in Raleigh</span>
          <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">Moving to</span>
        </div>

       <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-snug mb-2">
  What Salary Do You Need to Buy a House in Raleigh–Durham, NC [2026]?
</h1>

<div className="text-sm text-gray-500 mb-8">
  <span>November 5, 2025</span> • <span>7 min read</span>
</div>
      </div>



      {/* Header image */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <Image
          src="/images/raleigh-1.jpg"
          alt="Raleigh skyline and neighborhood"
          width={1920}
          height={400}
          className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-2xl"
        />
      </div>

      {/* Two-column layout */}
      <div className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left column: Blog content */}
        <article className="lg:col-span-2 prose lg:prose-xl">

            {/* Intro Synopsis */}
  <section className="mb-12">
    <p className="text-xl text-gray-800 leading-relaxed">
      Thinking about buying a home in the Raleigh–Durham area? Prices are rising, neighborhoods vary widely, and knowing what salary you need can make or break your homebuying journey. 
      In this guide, we’ll break down income requirements, compare Raleigh and Durham, highlight top suburbs, and give practical next steps — so you can make smart decisions before taking the plunge.
      <strong className="text-gray-900"> Keep reading to find out if your paycheck matches your dream home.</strong>
    </p>
  </section>

 <section id="section1" className="mb-16">
  {/* Section Title */}
  <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
    How much income do you need to buy in Raleigh?
  </h2>

  {/* Intro Paragraph */}
  <p className="text-lg text-gray-700 leading-relaxed mb-4">
    The Raleigh–Durham region remains one of North Carolina’s strongest housing markets thanks to tech, healthcare, and university-driven job growth. 
    That demand affects prices — and it’s the reason many buyers ask the same practical question: 
    <strong className="text-gray-900"> how much income do you need to buy a house in Raleigh?</strong>
  </p>

  {/* Key Details Paragraph */}
  <p className="text-lg text-gray-700 leading-relaxed mb-4">
    As of 2025, a typical single-family home in Raleigh will often list in the low-to-mid $400,000s. 
    Using industry rules of thumb (a 10% down payment and keeping your mortgage payment to roughly 28% of gross income), 
    a comfortable qualifying income usually sits between <strong className="text-gray-900">$85,000 and $110,000 per year</strong> for a median-priced house. 
    Exact qualification depends on your credit score, debts, and current mortgage rates.
  </p>

  {/* Quick Estimate */}
  <p className="text-lg text-gray-700 leading-relaxed mb-6">
    If you want a quick estimate, work with the <strong className="text-gray-900">28/36 rule</strong>: mortgage payments (principal, interest, taxes, insurance) shouldn’t exceed 28% of your gross pay, and total debt payments should be under 36%.
  </p>

  {/* Image */}
  <div className="my-8">
    <Image
      src="/images/B.jpg"
      alt="Family walking in suburban Raleigh neighborhood"
      width={1200}
      height={675}
      className="w-full rounded-xl shadow-md"
    />
  </div>
</section>


          <section id="section2" className="mb-16">
  {/* Section Title */}
  <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
    What can different salaries actually afford?
  </h2>

  {/* Intro Paragraph */}
  <p className="text-lg text-gray-700 leading-relaxed mb-4">
    Translating salaries to price ranges makes planning easier:
  </p>

  {/* Salary List */}
  <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed mb-6 space-y-2">
    <li>
      <strong className="text-gray-900">$50,000/year</strong> — You may comfortably target homes in the <em>$200k–$260k</em> range, especially with low debts and a 10–20% down payment.
    </li>
    <li>
      <strong className="text-gray-900">$70,000/year</strong> — You could qualify for homes around <em>$300k–$360k</em>, depending on down payment and other obligations.
    </li>
    <li>
      <strong className="text-gray-900">$90k–$110k/year</strong> — This bracket opens up the market to median Raleigh homes and many desirable suburbs (Cary, North Raleigh, Apex).
    </li>
  </ul>

  {/* Example Paragraph */}
  <p className="text-lg text-gray-700 leading-relaxed">
    For example, a $400,000 mortgage typically requires household income roughly in the <strong className="text-gray-900">$85,000–$100,000</strong> range, 
    assuming conventional loan underwriting, a reasonable down payment, and typical monthly debt obligations.
  </p>
</section>


          {/* Section 3 */}
<section id="section3" className="mb-16">
  <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
    Raleigh vs. Durham: where is it cheaper, and which should you choose?
  </h2>

  <p className="text-lg text-gray-700 leading-relaxed mb-4">
    Raleigh and Durham sit inside the same regional economy but offer different lifestyles. 
    Raleigh is often viewed as more planned and family-oriented, while Durham leans creative and historically rooted, with a strong university presence.
  </p>

  <p className="text-lg text-gray-700 leading-relaxed mb-4">
    In general, <strong className="text-gray-900">Durham has been slightly more affordable</strong> than Raleigh — with median home prices typically a bit lower and rental rates a touch cheaper. 
    That said, pockets of Durham (especially close to downtown and research corridors) have seen fast appreciation and investor interest.
  </p>

  <p className="text-lg text-gray-700 leading-relaxed mb-4">
    Which is better? If you value top-rated public schools and quieter suburbs, Raleigh (or Cary and Apex) may be the better fit. 
    If you prefer urban character, shorter commute times to downtown Durham, or investment opportunities near Duke/Research Triangle Park, Durham could be ideal.
  </p>

  <Image
    src="/images/A.jpg"
    alt="Historic Durham street and homes"
    width={1200}
    height={675}
    className="my-6 rounded-xl"
  />
</section>

{/* Section 4 */}
<section id="section4" className="mb-16">
  <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
    Best suburbs and richest neighborhoods
  </h2>

  <p className="text-lg text-gray-700 leading-relaxed mb-4">
    If you’re searching for higher-end living, these areas are consistently top-ranked in the Triangle:
  </p>

  <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed mb-6 space-y-2">
    <li><strong className="text-gray-900">Cary</strong> — Known for safety, schools, and upscale subdivisions.</li>
    <li><strong className="text-gray-900">North Raleigh (27614 and nearby ZIPs)</strong> — Larger lots, golf communities, and established neighborhoods.</li>
    <li><strong className="text-gray-900">Apex & Holly Springs</strong> — Family-focused with newer build communities.</li>
  </ul>

  <p className="text-lg text-gray-700 leading-relaxed">
    These neighborhoods command premium pricing, but they also offer long-term appreciation and strong community amenities. 
    If you want local neighborhood guides, see <Link href="/neighborhoods">our neighborhoods page</Link>.
  </p>
</section>

{/* Section 5 */}
<section id="section5" className="mb-16">
  <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
    Market direction: are prices dropping? Is now a bad time to buy?
  </h2>

  <p className="text-lg text-gray-700 leading-relaxed mb-4">
    After the rapid price growth during 2020–2023, the market entered a phase of stabilization. 
    In some micro-markets you may see slight downward pressure (2–4%) as higher mortgage rates reduce buyer demand. 
    However, long-term fundamentals — job growth, strong universities, and constrained land supply — keep the Triangle attractive.
  </p>

  <p className="text-lg text-gray-700 leading-relaxed">
    Buying becomes risky if you plan to flip within months, but for buyers with a 5+ year horizon, purchasing now can still be a good financial decision. 
    If you’re unsure about timing, talk to a local lender or agent to run numbers against current interest rates and your financial profile.
  </p>
</section>

{/* Section 6 */}
<section id="section6" className="mb-16">
  <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
    Planning your purchase: practical next steps
  </h2>

  <ol className="list-decimal list-inside text-lg text-gray-700 leading-relaxed mb-6 space-y-2">
    <li>Check your credit score and reduce outstanding debt where possible.</li>
    <li>Save for a 10–20% down payment to improve mortgage options.</li>
    <li>Get pre‑approved — lenders will tell you exactly what price you can afford.</li>
    <li>Explore neighborhoods and set realistic trade-offs (commute vs. schools vs. lot size).</li>
  </ol>

  <p className="text-lg text-gray-700 leading-relaxed">
    Ready to find homes that match your budget? Browse current listings on our <Link href="/listings">Listings page</Link>, 
    or <Link href="/contact">contact an agent</Link> for a free affordability review.
  </p>
</section>

        </article>

        {/* Right column: Table of contents */}
        <aside className="hidden lg:block sticky top-32 h-max">

          <AuthorCard />
          <div className="bg-gray-50 p-6 rounded-xl shadow-md">
            <h3 className="font-semibold text-gray-700 mb-4">Jump to Section</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#section1" className="text-blue-600 hover:underline">How much income do you need to buy in Raleigh?</a></li>
              <li><a href="#section2" className="text-blue-600 hover:underline">What can different salaries actually afford?</a></li>
              <li><a href="#section3" className="text-blue-600 hover:underline">Raleigh vs. Durham: where is it cheaper?</a></li>
              <li><a href="#section4" className="text-blue-600 hover:underline">Best suburbs and richest neighborhoods</a></li>
              <li><a href="#section5" className="text-blue-600 hover:underline">Market direction: are prices dropping?</a></li>
              <li><a href="#section6" className="text-blue-600 hover:underline">Planning your purchase: practical next steps</a></li>
            </ul>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}

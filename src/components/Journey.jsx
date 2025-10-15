"use client";

import { motion } from "framer-motion";

export default function JourneySection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl px-6 mx-auto text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
         <h2 className="text-4xl sm:text-5xl font-regular text-gray-800 leading-snug">
  Your Journey To The Perfect <br /> Home{" "}
  <span
    className="font-serif italic text-[#ebcc65]"
    style={{ fontWeight: "200" }}
  >
    Starts With Us
  </span>
</h2>

        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="text-gray-600 max-w-2xl mx-auto mb-16 text-lg"
        >
          With a proven track record and in-depth market knowledge, we're here to make your
          real estate journey smooth and stress-free. Whether buying, selling, or investing,
          you can count on our team to deliver results with integrity.
        </motion.p>

{/* Image Section */}
<div className="relative w-full flex justify-center">
  <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
    <img
      src="https://degbfm0bobp7.cloudfront.net/storage/56df3875-1b80-480e-953d-763faa4fc182/delivery/f8a6ed51-b4ac-4177-d762-08dde1a82257/images/web/016_B56S.jpg"
      alt="Luxury Home"
      className="w-full h-full object-cover"
    />

    {/* Stats Overlay */}
    <div className="absolute bottom-6 w-full flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 px-4">
      {/* Box 1 */}
      <div className="bg-white bg-opacity-95 rounded-2xl shadow-md p-6 flex-1">
        <h3 className="text-3xl font-bold text-[#ebcc65] mb-1">1,500</h3>
        <p className="text-gray-700 text-sm">
          Total Properties Sold. Helping Families Find Their Dream Homes For Over A Decade.
        </p>
      </div>

      {/* Box 2 */}
      <div className="bg-white bg-opacity-95 rounded-2xl shadow-md p-6 flex-1">
        <h3 className="text-3xl font-bold text-[#ebcc65] mb-1">30+</h3>
        <p className="text-gray-700 text-sm">
          Strong Partnerships With Local Businesses To Enhance Our Services.
        </p>
      </div>

      {/* Box 3 */}
      <div className="bg-white bg-opacity-95 rounded-2xl shadow-md p-6 flex-1">
        <h3 className="text-3xl font-bold text-[#ebcc65] mb-1">98%</h3>
        <p className="text-gray-700 text-sm">
          Client Satisfaction Rate, Reflecting Our Commitment To Exceptional Service.
        </p>
      </div>
          </div>
            </div>
        </div>
      </div>
    </section>
  );
}

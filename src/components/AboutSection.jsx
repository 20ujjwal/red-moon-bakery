import React from "react";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-16 bg-gradient-to-b from-white to-red-50 border-t border-red-100"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-extrabold text-red-700 mb-4 text-center"
        >
          About Redmoon Bakery & Café
        </motion.h2>

        {/* Subheading / Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="text-center text-sm md:text-base text-red-600 mb-6"
        >
          Eggless cakes, desi flavours, and a growing legacy in the heart of Brampton.
        </motion.p>

        {/* Card with background image inside */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-3xl shadow-xl overflow-hidden border border-red-100"
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/about/about-bg.jpg')",
            }}
          />

          {/* Soft white overlay */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />

          {/* Content */}
          <div className="relative p-5 md:p-7 lg:p-8">
            <p className="text-base md:text-lg leading-relaxed text-gray-700 text-justify">
              <span className="font-semibold">Redmoon Bakery & Café by Jaskar Sandhu</span>{" "}
              is a trusted destination in Brampton for fresh, high-quality eggless baked
              goods and authentic Indian flavours. Originally opened in November 2021 at
              the McLaughlin and Queen intersection, the bakery quickly became known as
              one of the first in Brampton to offer a wide range of completely eggless
              cakes in every flavour, along with fast, same-day customizations.
              <br />
              <br />
              Redmoon proudly reopened at its new home in{" "}
              <span className="font-semibold">
                Karol Bagh Plaza, 1098 Peter Robertson Blvd
              </span>
              , at the Torbram and Peter Robertson intersection. Today, we continue to
              serve customers across Brampton and provide reliable delivery throughout
              the GTA.
              <br />
              <br />
              Along with our signature cakes, we offer freshly baked patties, homemade
              desi biscuits such as sugar, sugar-free, and sakkar varieties loved by
              every Indian family, and a full spread of authentic Indian street food
              prepared with traditional flavours.
              <br />
              <br />
              At Redmoon Bakery & Café, our mission remains simple —{" "}
              <span className="font-semibold">
                bringing fresh taste, quick service, and the true essence of desi baking
              </span>{" "}
              to our community every day — and we’re excited to announce that more
              Redmoon locations will be opening soon as we continue to grow.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

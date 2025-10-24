import React from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <section id="contact" className="relative py-20 bg-gradient-to-b from-white to-red-50">
      {/* Decorative Background Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,_rgba(255,200,200,0.25),_transparent_70%)]"></div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
        {/* LEFT SIDE - Contact Info */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center"
        >
          <h2 className="text-4xl font-extrabold text-red-700 mb-4">Contact & Location</h2>
          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
            We'd love to welcome you to <span className="text-red-600 font-semibold">Red Moon Bakery & Cafe</span> —
            where every visit is a taste of happiness.
          </p>

          <div className="space-y-3 text-gray-800">
            <div className="flex items-center gap-3">
              <span className="text-red-600 text-xl">📞</span>
              <p className="font-medium">
                Phone:&nbsp;
                <a href="tel:+19058740003" className="text-red-700 hover:underline">(905) 874-0003</a>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-red-600 text-xl">📧</span>
              <p className="font-medium">
                Email:&nbsp;
                <a href="mailto:info@redmoonbakery.ca" className="text-red-700 hover:underline">info@redmoonbakery.ca</a>
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-red-600 text-xl mt-1">📍</span>
              <p className="font-medium">
                Address:<br />
                <span className="text-gray-700">
                  1098 Peter Robertson Blvd #23,<br />
                  Brampton, ON L6R 1G6
                </span>
              </p>
            </div>

            {/* 🌐 Instagram */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-red-600 text-xl">📸</span>
              <p className="font-medium">
                Follow us:&nbsp;
                <a
                  href="https://www.instagram.com/redmoonbrampton?igsh=MXRqb2h4YWJxd3oxOQ%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-700 hover:text-red-800 transition-colors font-semibold flex items-center gap-2"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png"
                    alt="Instagram"
                    className="w-5 h-5"
                  />
                  @redmoonbakerycanada
                </a>
              </p>
            </div>

            <div className="pt-4">
              <a
                href="https://www.google.com/maps?q=Red+Moon+Bakery,+1098+Peter+Robertson+Blvd+%2323,+Brampton,+ON+L6R+1G6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 mt-3 bg-red-600 text-white font-semibold rounded-full shadow-md hover:bg-red-700 hover:shadow-lg transition-all duration-300"
              >
                View on Google Maps
              </a>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE - Map */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl ring-4 ring-red-200 hover:ring-red-300 transition-all duration-500">
            <iframe
              title="Red Moon Bakery Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.6764846756344!2d-79.73941448450077!3d43.74725597911886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b3d2bbf5d5ded%3A0xca0235762a1785e8!2sRed%20Moon%20Bakery!5e0!3m2!1sen!2sca!4v1730425090000!5m2!1sen!2sca"
              width="100%"
              height="400"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

import React from "react";
import { MapPin, Phone, Mail, Globe, Facebook, Twitter, Linkedin } from "lucide-react";

function Contact({ contact = {} }) {
  const {
    address, phone1, phone2,
    email1, email2, website,
    facebook, twitter, linkedin,
  } = contact;

  // Don't render the section if no contact info is set at all
  const hasAny = address || phone1 || phone2 || email1 || email2 || website || facebook || twitter || linkedin;
  if (!hasAny) return null;

  return (
    <section id="contact" className="relative bg-white py-20 overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 -z-10" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-yellow-50 rounded-full blur-3xl opacity-50 -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold tracking-wider mb-4 uppercase">
            Get in Touch
          </span>
          <h3 className="text-3xl md:text-4xl font-bold text-[#002147] mb-4">Contact Info</h3>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Have questions or want to visit our campus? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Address */}
          {address && (
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-[#002147] mb-6 group-hover:bg-[#002147] group-hover:text-white transition-colors duration-300">
                <MapPin className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Visit Us</h4>
              <p className="text-gray-600">{address}</p>
            </div>
          )}

          {/* Phone */}
          {(phone1 || phone2) && (
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-[#002147] mb-6 group-hover:bg-[#002147] group-hover:text-white transition-colors duration-300">
                <Phone className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Call Us</h4>
              {phone1 && <p className="text-gray-600 mb-1"><a href={`tel:${phone1}`} className="hover:text-blue-600 transition-colors">{phone1}</a></p>}
              {phone2 && <p className="text-gray-600"><a href={`tel:${phone2}`} className="hover:text-blue-600 transition-colors">{phone2}</a></p>}
            </div>
          )}

          {/* Email */}
          {(email1 || email2) && (
            <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-[#002147] mb-6 group-hover:bg-[#002147] group-hover:text-white transition-colors duration-300">
                <Mail className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Email Us</h4>
              {email1 && <p className="text-gray-600 mb-1"><a href={`mailto:${email1}`} className="hover:text-blue-600 transition-colors">{email1}</a></p>}
              {email2 && <p className="text-gray-600"><a href={`mailto:${email2}`} className="hover:text-blue-600 transition-colors">{email2}</a></p>}
            </div>
          )}
        </div>

        {/* Website + Social */}
        {(website || facebook || twitter || linkedin) && (
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            {website && (
              <a href={website} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 rounded-full text-sm font-semibold transition-all">
                <Globe size={16} /> Website
              </a>
            )}
            {facebook && (
              <a href={facebook} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 rounded-full text-sm font-semibold transition-all">
                <Facebook size={16} /> Facebook
              </a>
            )}
            {twitter && (
              <a href={twitter} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-800 hover:text-white text-slate-700 rounded-full text-sm font-semibold transition-all">
                <Twitter size={16} /> Twitter
              </a>
            )}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-blue-700 hover:text-white text-slate-700 rounded-full text-sm font-semibold transition-all">
                <Linkedin size={16} /> LinkedIn
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Contact;

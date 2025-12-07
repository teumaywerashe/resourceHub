import React from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
 
} from "lucide-react"; // npm install lucide-react

function Contact() {
  return (
    <section id="contact" className="relative bg-white py-20 overflow-hidden">
  
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-yellow-50 rounded-full blur-3xl opacity-50 -z-10"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
     
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold tracking-wider mb-4 uppercase">
            Get in Touch
          </span>
          <h3 className="text-3xl md:text-4xl font-bold text-[#002147] mb-4">
            Contact Info
          </h3>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Have questions or want to visit our campus? We’d love to hear from you!
            Reach out through any of the channels below.
          </p>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
     
          <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-[#002147] mb-6 group-hover:bg-[#002147] group-hover:text-white transition-colors duration-300">
              <MapPin className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">Visit Us</h4>
            <p className="text-gray-600">
              Main Campus, Building A <br />
              Addis Ababa, Ethiopia
            </p>
          </div>

          {/* Card 2: Phone */}
          <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-[#002147] mb-6 group-hover:bg-[#002147] group-hover:text-white transition-colors duration-300">
              <Phone className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">Call Us</h4>
            <p className="text-gray-600 mb-1">
              <a href="tel:+251911000000" className="hover:text-blue-600 transition-colors">+251 911 00 00 00</a>
            </p>
            <p className="text-gray-600">
              <a href="tel:+251911000000" className="hover:text-blue-600 transition-colors">+251 111 22 33 44</a>
            </p>
          </div>

          {/* Card 3: Email */}
          <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-[#002147] mb-6 group-hover:bg-[#002147] group-hover:text-white transition-colors duration-300">
              <Mail className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">Email Us</h4>
            <p className="text-gray-600 mb-1">
              <a href="mailto:info@university.edu.et" className="hover:text-blue-600 transition-colors">info@university.edu.et</a>
            </p>
            <p className="text-gray-600">
              <a href="mailto:admissions@university.edu.et" className="hover:text-blue-600 transition-colors">admissions@uni.edu.et</a>
            </p>
          </div>
        </div>

     

      </div>
    </section>
  );
}


export default Contact;
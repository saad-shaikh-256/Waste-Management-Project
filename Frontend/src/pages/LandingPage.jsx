import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- Icon Components ---
const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-green-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-yellow-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const LandingPage = () => {
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- General Animation for Sections ---
      const sections = gsap.utils.toArray("section");
      sections.forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });

      // --- Specific Animations ---
      gsap.from(".hero-content > *", {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        delay: 0.2,
      });

      // Stats counter animation
      gsap.utils.toArray(".stat-number").forEach((elem) => {
        gsap.from(elem, {
          textContent: 0,
          duration: 2,
          ease: "power1.inOut",
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: elem,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      // Staggered card animations
      gsap.utils.toArray(".stagger-card").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.5,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          delay: i * 0.1,
        });
      });

      // Gallery animation
      gsap.from(".gallery-image", {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".image-gallery",
          start: "top 80%",
        },
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef}>
      {/* 1. Hero Section */}
      <section className="bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 items-center gap-12">
          <div className="hero-content text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Turn Waste into Worth
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-lg mx-auto md:mx-0">
              The #1 digital platform connecting waste producers with certified
              recyclers. Join us to build a sustainable future and unlock the
              hidden value in scrap.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="#contact"
                className="bg-green-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-green-600 transition-all transform hover:scale-105 duration-300 shadow-lg"
              >
                Post Your Waste
              </a>
              <a
                href="#features"
                className="bg-white text-green-500 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition-all transform hover:scale-105 duration-300 border-2 border-gray-200 shadow-lg"
              >
                Discover Features
              </a>
            </div>
          </div>
          <div>
            <img
              src="https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Recycling process"
              className="rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* 2. Why Choose Us Section */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2670&auto=format&fit=crop"
              alt="Team working for sustainability"
              className="rounded-xl shadow-xl"
            />
          </div>
          <div>
            <h2 className="section-title">
              Why EcoConnect is Your Best Choice
            </h2>
            <p className="mt-4 text-gray-600">
              We are more than a platform; we are a partner in sustainability.
              Our technology, network, and dedication are unparalleled,
              providing you with a seamless and impactful recycling experience.
            </p>
            <ul className="mt-8 space-y-4">
              <li className="flex items-start">
                <CheckCircleIcon />
                <span className="ml-3">
                  <b>Vetted Network:</b> Access thousands of verified and
                  trusted recycling partners.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon />
                <span className="ml-3">
                  <b>Data-Driven Insights:</b> Utilize our dashboard to track
                  your environmental impact and earnings.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon />
                <span className="ml-3">
                  <b>Seamless Transactions:</b> Enjoy a secure, fast, and
                  transparent process from listing to payment.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Stats Section */}
      <section className="bg-green-700 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-5xl font-bold mb-2">
                <span className="stat-number">10250</span>+
              </h3>
              <p className="text-lg font-light text-green-200">
                Tons of Waste Diverted
              </p>
            </div>
            <div>
              <h3 className="text-5xl font-bold mb-2">
                <span className="stat-number">1500</span>+
              </h3>
              <p className="text-lg font-light text-green-200">
                Verified Eco-Partners
              </p>
            </div>
            <div>
              <h3 className="text-5xl font-bold mb-2">
                <span className="stat-number">98</span>%
              </h3>
              <p className="text-lg font-light text-green-200">
                Positive User Rating
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works (Enhanced Steps) */}
      <section id="how-it-works" className="py-20 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Simple & Powerful Process</h2>
            <p className="section-subtitle">
              Transforming waste into resources has never been easier. Follow
              our streamlined four-step journey.
            </p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-12 left-1/2 w-0.5 h-[calc(100%-6rem)] bg-green-200"></div>
            <div className="space-y-16">
              {[
                {
                  title: "Create Your Profile",
                  desc: "Sign up in minutes as a waste generator or a recycler. It’s free, simple, and secure.",
                  align: "left",
                },
                {
                  title: "Post or Discover",
                  desc: "Generators can list their scrap materials with photos and details. Recyclers can browse and filter listings to find exactly what they need.",
                  align: "right",
                },
                {
                  title: "Connect & Schedule",
                  desc: "Use our real-time messaging to communicate, negotiate, and schedule a convenient pickup or delivery time.",
                  align: "left",
                },
                {
                  title: "Transact & Track",
                  desc: "Complete the exchange through our secure system. Get paid and watch your positive environmental impact grow on your personal dashboard.",
                  align: "right",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className={`md:flex items-center w-full ${
                    step.align === "left" ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="md:w-5/12">
                    <img
                      src={` https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
                      className="rounded-xl shadow-lg"
                      alt={step.title}
                    />
                  </div>
                  <div className="relative md:w-2/12 flex justify-center">
                    <div className="bg-green-500 text-white rounded-full h-24 w-24 flex items-center justify-center font-bold text-4xl z-10">
                      {index + 1}
                    </div>
                  </div>
                  <div className="md:w-5/12 mt-4 md:mt-0">
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                    <p className="text-gray-600 mt-2">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Features Section */}
      <section id="features" className="py-20 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="section-title">Platform Features</h2>
            <p className="section-subtitle">
              Everything you need for efficient and effective waste management,
              all in one place.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Advanced Search & Filtering",
              "Real-Time Messaging",
              "Secure Transaction System",
              "Impact Analytics Dashboard",
              "Automated Pickup Scheduling",
              "User Verification & Ratings",
            ].map((feature, i) => (
              <div
                key={i}
                className="stagger-card bg-white p-6 rounded-lg shadow-md border border-gray-100"
              >
                <CheckCircleIcon />
                <h3 className="text-lg font-semibold mt-4">{feature}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Blog Section */}
      <section id="blog" className="py-20 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="section-title">From Our Blog</h2>
            <p className="section-subtitle">
              Stay informed with the latest news in sustainability, recycling
              tips, and success stories from our community.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "The Ultimate Guide to Sorting Recyclables",
                category: "Sustainability",
                img: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=800",
              },
              {
                title: "Why E-Waste Recycling is More Important Than Ever",
                category: "E-Waste",
                img: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=800",
              },
              {
                title: "EcoConnect Partner Spotlight: GreenCycle Inc.",
                category: "Community",
                img: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=800",
              },
            ].map((post, i) => (
              <div
                key={i}
                className="stagger-card bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100 group"
              >
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <span className="text-sm text-green-500 font-semibold">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-semibold my-2 text-gray-900">
                    {post.title}
                  </h3>
                  <a
                    href="#"
                    className="text-green-600 font-semibold hover:underline"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Feedback / Testimonials */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="section-title">What Our Partners Say</h2>
            <p className="section-subtitle">
              We're proud to have earned the trust of industry leaders and local
              businesses alike.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "EcoConnect revolutionized our waste stream. We've increased our recycling rate by 40% and found new revenue sources.",
                name: "John Doe",
                title: "Facility Manager, TechCorp",
              },
              {
                quote:
                  "As a recycler, finding consistent, quality materials was always a challenge. This platform is a game-changer for our supply chain.",
                name: "Jane Smith",
                title: "Owner, GreenCycle Recyclers",
              },
              {
                quote:
                  "The transparency and tracking features are incredible. I can finally show concrete data on our company's sustainability efforts.",
                name: "Samuel Green",
                title: "Sustainability Officer, BuildWell",
              },
            ].map((fb, i) => (
              <div
                key={i}
                className="stagger-card bg-gray-50 p-8 rounded-xl shadow-md"
              >
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <p className="text-gray-600 italic">"{fb.quote}"</p>
                <div className="mt-4">
                  <p className="font-bold">{fb.name}</p>
                  <p className="text-sm text-gray-500">{fb.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Image Gallery */}
      <section className="py-20 md:py-24 bg-gray-50 image-gallery">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="section-title">A Glimpse of Our Impact</h2>
            <p className="section-subtitle">
              Visual stories from our community, showcasing the real-world
              results of our collective efforts.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="grid gap-4">
              <img
                className="gallery-image h-auto max-w-full rounded-lg shadow-md"
                src="https://source.unsplash.com/random/800x600?recycling,factory&sig=10"
                alt=""
              />
              <img
                className="gallery-image h-auto max-w-full rounded-lg shadow-md"
                src="https://source.unsplash.com/random/800x1200?waste,management&sig=11"
                alt=""
              />
            </div>
            <div className="grid gap-4">
              <img
                className="gallery-image h-auto max-w-full rounded-lg shadow-md"
                src="https://source.unsplash.com/random/800x1200?green,energy&sig=12"
                alt=""
              />
              <img
                className="gallery-image h-auto max-w-full rounded-lg shadow-md"
                src="https://source.unsplash.com/random/800x600?sustainability,people&sig=13"
                alt=""
              />
            </div>
            <div className="grid gap-4">
              <img
                className="gallery-image h-auto max-w-full rounded-lg shadow-md"
                src="https://source.unsplash.com/random/800x600?plastic,bottles&sig=14"
                alt=""
              />
              <img
                className="gallery-image h-auto max-w-full rounded-lg shadow-md"
                src="https://source.unsplash.com/random/800x1200?metal,scrap&sig=15"
                alt=""
              />
            </div>
            <div className="grid gap-4">
              <img
                className="gallery-image h-auto max-w-full rounded-lg shadow-md"
                src="https://source.unsplash.com/random/800x1200?community,environment&sig=16"
                alt=""
              />
              <img
                className="gallery-image h-auto max-w-full rounded-lg shadow-md"
                src="https://source.unsplash.com/random/800x600?solar,panel,recycling&sig=17"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      {/* 9. Contact Section */}
      <section id="contact" className="py-20 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="section-title">Get in Touch</h2>
            <p className="section-subtitle">
              Have a question or want to get started? Our team is ready to help
              you on your sustainability journey.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-16">
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <textarea
                placeholder="Your Message"
                rows="5"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-green-500 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-600 transition-all shadow-lg"
              >
                Send Message
              </button>
            </form>
            <div>
              <img
                src="https://source.unsplash.com/random/800x600?map,city&sig=20"
                alt="Map"
                className="rounded-lg shadow-lg w-full h-64 object-cover"
              />
              <div className="mt-8 text-gray-600 space-y-4">
                <p>
                  <strong>Address:</strong> 123 Green Way, Sustainability City,
                  12345
                </p>
                <p>
                  <strong>Email:</strong> contact@ecoconnect.com
                </p>
                <p>
                  <strong>Phone:</strong> (123) 456-7890
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

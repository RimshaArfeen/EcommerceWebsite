import React from 'react';

// The data structure for the Table of Contents and Sections
// NOTE: In a real-world app, you might map over a JSON or Markdown source for this content.

const termsData = [
  {
    id: 'intro',
    title: '1. Introduction',
    content:
      'These Terms & Conditions govern your use of our ecommerce platform. By browsing or purchasing products, you acknowledge your acceptance of these terms.',
  },
  {
    id: 'eligibility',
    title: '2. Eligibility',
    content:
      'You must be of legal age to purchase items from our store. By placing an order, you confirm that the information provided is accurate.',
  },
  {
    id: 'product',
    title: '3. Product Information',
    content:
      'We aim to ensure that all product details, descriptions, and pricing are accurate. However, occasional updates or corrections may occur if errors are found.',
  },
  {
    id: 'orders',
    title: '4. Orders & Payments',
    list: [
      'All orders are subject to acceptance and availability.',
      'Prices may change without prior notice.',
      'Payment must be completed before order processing begins.',
    ],
  },
  {
    id: 'shipping',
    title: '5. Shipping & Delivery',
    content:
      'Delivery times are estimates based on your location. Once shipped, tracking information will be provided when available.',
  },
  {
    id: 'returns',
    title: '6. Returns & Refunds',
    content:
      'Items may be eligible for return depending on condition and timeframe. Please review our Return Policy for detailed instructions.',
  },
  {
    id: 'responsibility',
    title: '7. User Responsibilities',
    content:
      'You agree not to misuse our website or engage in activities that could harm our platform or violate applicable laws.',
  },
  {
    id: 'liability',
    title: '8. Limitation of Liability',
    content:
      'We are not responsible for damages caused by product misuse or delays beyond our control. Use all spicy products responsibly.',
  },
  {
    id: 'privacy',
    title: '9. Privacy Policy',
    content:
      'We respect your privacy and are committed to protecting your personal information. Data collected is used only to process orders, improve services, and comply with legal requirements.',
  },
  {
    id: 'cookies',
    title: '10. Cookie Policy',
    content:
      'Our website uses cookies to enhance user experience, analyze traffic, and personalize content. By using our site, you consent to the use of cookies.',
  },
  {
    id: 'updates',
    title: '11. Updates to Terms',
    content:
      'These Terms may be updated periodically. Continued use of the site indicates acceptance of revised policies.',
  },
];


export default function Page() {
  return (
    <div className="min-h-screen py-12 md:py-16">
      < div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl" >

        {/* --- Header --- */}
        < header className="mb-12 md:mb-16" >
          <h1 className="text-5xl font-extrabold mb-4 text-center tracking-tight" >
            Terms & Conditions
          </h1 >
          <p className="text-center text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-400 leading-normal" >
            Please read these terms carefully before using our services.By accessing our website,
            you agree to the policies outlined below.
          </p >
        </header >

        {/* --- Main Content Layout: Grid for TOC and Content --- */}
        < div className="grid lg:grid-cols-12 gap-12" >

          {/* --- Left Column: Sticky Table of Contents (TOC) for Desktop --- */}
          < aside className=" lg:col-span-3 hidden lg:block" >
            <div className="primary_bg  sticky top-20 p-5" > {/* Sticky position for TOC */}
              < h3 className="text-lg font-bold mb-4 uppercase tracking-wider text-gray-500 dark:text-gray-400" >
                Table of Contents
              </h3 >
              <nav className="space-y-2" >
                {
                  termsData.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-base dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors pl-2 border-l-2 border-transparent hover:border-red-600 dark:hover:border-red-400"
                    >
                      {item.title}
                    </a>
                  ))
                }
              </nav >
            </div >
          </aside >

          {/* --- Right Column: Main Terms Content --- */}
          < main className="lg:col-span-9 p-6 sm:p-8 rounded-2xl border shadow-xl dark:bg-gray-800 space-y-10" >

            {
              termsData.map((section, index) => (
                <section key={section.id} id={section.id} className={index < termsData.length - 1 ? "pb-8 border-b dark:border-gray-700" : ""}>
                  <h2 className="text-3xl font-extrabold mb-4 pt-4 -mt-4">
                    {section.title}
                  </h2>

                  {
                    section.content && (
                      <p className="text-lg leading-relaxed dark:text-gray-300">
                        {section.content}
                      </p>
                    )
                  }

                  {
                    section.list && (
                      <ul className="list-disc ml-6 space-y-3 text-lg leading-relaxed dark:text-gray-300">
                        {
                          section.list.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))
                        }
                      </ul >
                    )
                  }
                </section >
              ))
            }

            {/* --- Footer Note --- */}
            <section className="pt-8 mt-4 border-t dark:border-gray-700">
              <p className="text-md text-center leading-relaxed italic text-gray-500 dark:text-gray-400">
                If you have any questions regarding these Terms & Conditions,
                please contact our support team before continuing to use our services.
              </p >
            </section >

          </main >
        </div >
      </div >
    </div >
  );
}
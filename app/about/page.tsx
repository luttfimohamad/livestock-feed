import Image from 'next/image';

export const metadata = {
  title: 'About Us - FarmFeed Pro',
  description:
    'Learn about our company, our mission, and our commitment to providing high-quality livestock feed products.',
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f8f9f4]">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                About FarmFeed Pro
              </h1>
              <p className="text-gray-500 md:text-xl dark:text-gray-400">
                We're dedicated to providing the highest quality livestock feed
                products to help farmers and ranchers achieve optimal animal
                health, growth, and productivity.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full max-w-[600px] aspect-[3/2] overflow-hidden rounded-lg bg-gray-100 shadow-lg">
                <Image
                  src="/images/farm-facility.jpg"
                  alt="Our farm feed production facility"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Our Story</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Founded in 1985, FarmFeed Pro began as a small family-owned
                business with a simple mission: to provide local farmers with
                nutritious feed for their livestock. Over the decades, we've
                grown into a trusted supplier of premium animal nutrition
                products across the country.
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                Our journey has been guided by a commitment to quality,
                innovation, and customer satisfaction. We've continuously
                invested in research and development to create feed formulations
                that meet the evolving needs of modern farming operations.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Our Mission</h2>
              <p className="text-gray-500 dark:text-gray-400">
                At FarmFeed Pro, our mission is to enhance the health and
                productivity of livestock through superior nutrition solutions.
                We believe that well-nourished animals lead to more profitable
                and sustainable farming operations.
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                We're committed to supporting the agricultural community by
                providing not just quality products, but also education,
                resources, and exceptional customer service to help farmers
                succeed.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f8f9f4]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Our Values
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              The principles that guide everything we do at FarmFeed Pro.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-white">
              <h3 className="text-xl font-bold">Quality</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                We never compromise on the quality of our ingredients or
                manufacturing processes. Every batch of feed is tested to ensure
                it meets our rigorous standards.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-white">
              <h3 className="text-xl font-bold">Innovation</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                We continuously research and develop new formulations to improve
                animal nutrition, health, and performance based on the latest
                scientific findings.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-white">
              <h3 className="text-xl font-bold">Sustainability</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                We're committed to environmentally responsible practices in our
                operations and helping farmers implement sustainable livestock
                management.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Our Team
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              Meet the experts behind our premium livestock feed products.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-48 h-48 mx-auto overflow-hidden rounded-full bg-gray-100">
                <Image
                  src="/images/team-member-1.jpg"
                  alt="Dr. Robert Johnson - Chief Nutritionist"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Dr. Robert Johnson</h3>
              <p className="text-green-700">Chief Nutritionist</p>
            </div>
            {/* <div className="flex flex-col items-center space-y-2">
              <div className="w-48 h-48 mx-auto overflow-hidden rounded-full bg-gray-100">
                <Image
                  src="/images/team-member-2-fixed.png"
                  alt="Emily Williams - Operations Director"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Emily Williams</h3>
              <p className="text-green-700">Operations Director</p>
            </div> */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-48 h-48 mx-auto overflow-hidden rounded-full bg-gray-100">
                <Image
                  src="/images/team-member-3.jpg"
                  alt="Michael Chen - Research Lead"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Michael Chen</h3>
              <p className="text-green-700">Research Lead</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-48 h-48 mx-auto overflow-hidden rounded-full bg-gray-100">
                <Image
                  src="/images/team-member-4.jpg"
                  alt="Sarah Thompson - Customer Relations"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Sarah Thompson</h3>
              <p className="text-green-700">Customer Relations</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

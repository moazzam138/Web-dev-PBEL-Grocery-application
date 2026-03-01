import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="py-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg px-8 md:px-16 py-16 mb-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            About GreenBasket
          </h1>
          <p className="text-lg text-gray-600">
            Your trusted partner for fresh, quality groceries delivered straight to your doorstep.
          </p>
        </div>
      </div>

      {/* Company Introduction */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Who We Are</h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-4">
          GreenBasket is a modern online grocery shopping platform dedicated to making healthy eating accessible and convenient. Founded with the belief that everyone deserves access to fresh, quality products, we've built a seamless shopping experience that brings farm-fresh groceries directly to your kitchen.
        </p>
        <p className="text-gray-600 text-lg leading-relaxed">
          With our curated selection of fresh produce, organic items, and essential groceries, we're revolutionizing how people shop for their daily needs. We partner with trusted local farmers and suppliers to ensure the highest quality products reach your doorstep.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Mission */}
        <div className="bg-blue-50 rounded-lg p-8 border border-blue-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-500 p-3 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 6v6h6v-6h-6zM3 13h6v6H3v-6zm7-7h6V3h-6v3zm0 7v6h6v-6h-6zM3 3v6h6V3H3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            To make fresh, quality groceries accessible to everyone by combining technology with a passion for excellence. We strive to eliminate the hassle of grocery shopping while maintaining the highest standards of freshness and quality.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-green-50 rounded-lg p-8 border border-green-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-500 p-3 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            To become the most trusted and convenient grocery platform globally, setting new standards for freshness, delivery speed, and customer satisfaction. We envision a world where quality groceries are just a few clicks away.
          </p>
        </div>
      </div>

      {/* Why Trust GreenBasket */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Why Customers Trust Us</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Trust Point 1 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Guaranteed Freshness</h3>
              <p className="text-gray-600">We source directly from farms and suppliers, ensuring all products maintain peak freshness with rigorous quality checks at every step.</p>
            </div>
          </div>

          {/* Trust Point 2 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Transparent Pricing</h3>
              <p className="text-gray-600">No hidden charges. What you see is what you pay. Free delivery on orders above 100, with clear breakdowns of all costs.</p>
            </div>
          </div>

          {/* Trust Point 3 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 9h-5V4H9v5H4v2h5v5h2v-5h5z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Expert Team</h3>
              <p className="text-gray-600">Our dedicated team of grocery experts carefully selects every product to meet our high standards of quality and freshness.</p>
            </div>
          </div>

          {/* Trust Point 4 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1m0 20c-4.95 0-9-4.05-9-9s4.05-9 9-9 9 4.05 9 9-4.05 9-9 9m.5-5h-1v-6h1v6m0-8h-1V7h1v1" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Customer Support 24/7</h3>
              <p className="text-gray-600">Have questions or concerns? Our dedicated support team is available round the clock to assist you with any queries.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Services</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Service 1 */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Fresh Groceries</h3>
            <p className="text-gray-600">Hand-picked fresh produce, organic items, and everyday essentials. From fruits and vegetables to pantry staples, we have everything you need for healthy living.</p>
          </div>

          {/* Service 2 */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11 17h2v2h-2zm6-9h-3V5h-2v3H8v2h6zM3 13h2v8H3zm6 0h2v8H9zm6 0h2v8h-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Fast Delivery</h3>
            <p className="text-gray-600">Quick and reliable delivery to your doorstep. We ensure timely delivery with careful handling to maintain product quality from warehouse to your kitchen.</p>
          </div>

          {/* Service 3 */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1C5.927 1 1 5.927 1 12s4.927 11 11 11 11-4.927 11-11S18.073 1 12 1m0 2c4.968 0 9 4.032 9 9s-4.032 9-9 9-9-4.032-9-9 4.032-9 9-9m3.5 9c0 1.933-1.567 3.5-3.5 3.5S8.5 13.933 8.5 12 10.067 8.5 12 8.5s3.5 1.567 3.5 3.5" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Secure Payment</h3>
            <p className="text-gray-600">Multiple payment options with encrypted security. Choose Cash on Delivery or online payment methods. Your financial information is always protected with industry-standard encryption.</p>
          </div>

          {/* Service 4 */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 8h-3V7c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1v1H9V7c0-.55-.45-1-1-1H6c-.55 0-1 .45-1 1v1H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10h2v-2zm-2 12H4V10h14v10zm-7-7h-2v5h2v-5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Quality Guarantee</h3>
            <p className="text-gray-600">100% satisfaction guaranteed. If you're not happy with any product, we'll refund or replace it. Your trust is our priority.</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-indigo-50 rounded-lg p-12 text-center border border-indigo-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Experience Fresh Groceries?</h2>
        <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
          Join thousands of satisfied customers who trust GreenBasket for their daily grocery needs.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg transition"
        >
          Start Shopping
        </button>
      </div>
    </div>
  );
};

export default About;

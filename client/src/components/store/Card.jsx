import { Link as ScrollLink } from 'react-scroll';

export default function Example() {
  return (
    <div className="bg-white p-5 pb-20">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Your Local Source for Seamless Solutions:
            <br />
            Sales, Repair, and Beyond!
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
          Top-notch computer shop for sales and repairs, offering expert service and tailored solutions. Experience seamless performance and personalized assistance in one convenient location.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
          <ScrollLink to="searchSection" smooth={true} duration={500}>
            
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Shop Now
            </a>
            </ScrollLink>
            {/* <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Learn more <span aria-hidden="true">→</span>
            </a> */}
          </div>
        </div>
      </div>
    </div>
  )
}

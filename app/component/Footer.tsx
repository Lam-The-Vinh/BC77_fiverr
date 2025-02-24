import Link from "next/link";

export default function Footer() {
  return (
    <footer className="container border-t bg-white py-8 text-sm text-gray-600">
      <div className=" max-w-7xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:grid-cols-5">
          <div>
            <h3 className="mb-4 font-semibold text-gray-800">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#">Graphics & Design</Link>
              </li>
              <li>
                <Link href="#">Digital Marketing</Link>
              </li>
              <li>
                <Link href="#">Writing & Translation</Link>
              </li>
              <li>
                <Link href="#">Video & Animation</Link>
              </li>
              <li>
                <Link href="#">Music & Audio</Link>
              </li>
              <li>
                <Link href="#">Business</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-gray-800">For Clients</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#">How Fiverr Works</Link>
              </li>
              <li>
                <Link href="#">Customer Success Stories</Link>
              </li>
              <li>
                <Link href="#">Trust &amp; Safety</Link>
              </li>
              <li>
                <Link href="#">Quality Gigs</Link>
              </li>
              <li>
                <Link href="#">Fiverr Learn</Link>
              </li>
              <li>
                <Link href="#">Online Courses</Link>
              </li>
              <li>
                <Link href="#">Fiverr Guides</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-gray-800">
              For Freelancers
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#">Become a Fiverr Freelancer</Link>
              </li>
              <li>
                <Link href="#">Become a Fiverr Pro</Link>
              </li>
              <li>
                <Link href="#">Kickstart</Link>
              </li>
              <li>
                <Link href="#">Community Hub</Link>
              </li>
              <li>
                <Link href="#">Forum</Link>
              </li>
              <li>
                <Link href="#">Events</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-gray-800">
              Business Solutions
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#">Project Management Service</Link>
              </li>
              <li>
                <Link href="#">ClearVoice</Link>
              </li>
              <li>
                <Link href="#">Working Not Working</Link>
              </li>
              <li>
                <Link href="#">AutoDS</Link>
              </li>
              <li>
                <Link href="#">Dropshipping Tool</Link>
              </li>
              <li>
                <Link href="#">Fiverr Logo Maker</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-gray-800">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#">About Fiverr</Link>
              </li>
              <li>
                <Link href="#">Press &amp; Support</Link>
              </li>
              <li>
                <Link href="#">Social Impact</Link>
              </li>
              <li>
                <Link href="#">Careers</Link>
              </li>
              <li>
                <Link href="#">Terms of Service</Link>
              </li>
              <li>
                <Link href="#">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#">Investor Relations</Link>
              </li>
              <li>
                <Link href="#">Creator Network</Link>
              </li>
              <li>
                <Link href="#">Affiliates</Link>
              </li>
              <li>
                <Link href="#">Invite a Friend</Link>
              </li>
              <li>
                <Link href="#">Apps &amp; More</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-4 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Fiverr. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

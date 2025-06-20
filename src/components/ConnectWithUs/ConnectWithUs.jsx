

import {   Globe } from "lucide-react";


const YouTubeSVG = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width="18"
    height="18"
    className="text-black"
  >
    <path d="M10 15l5-3-5-3v6zm12-3c0-2.21-.2-4.1-.55-5.34a2.38 2.38 0 0 0-1.66-1.67C18.1 5.2 12 5.2 12 5.2s-6.1 0-7.79.79a2.38 2.38 0 0 0-1.66 1.67C2.2 7.9 2 9.79 2 12s.2 4.1.55 5.34c.22.72.79 1.3 1.66 1.67C5.9 18.8 12 18.8 12 18.8s6.1 0 7.79-.79a2.38 2.38 0 0 0 1.66-1.67c.35-1.24.55-3.13.55-5.34z" />
  </svg>
);


const LinkedInSVG = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width="18"
    height="18"
    className="text-black"
  >
    <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.3c-.97 0-1.5-.64-1.5-1.4 0-.78.55-1.4 1.54-1.4.98 0 1.5.62 1.51 1.4 0 .76-.53 1.4-1.55 1.4zm13.5 11.3h-3v-5.6c0-1.4-.51-2.36-1.79-2.36-0.97 0-1.55.66-1.81 1.3-.09.22-.11.52-.11.82v5.84h-3v-10h3v1.34c.39-.6 1.09-1.45 2.66-1.45 1.94 0 3.41 1.26 3.41 3.97v6.14z" />
  </svg>
);

// Icon map
const iconMap = {
  
  youtube: YouTubeSVG,
  linkedin: LinkedInSVG,
  website: Globe,
};

const ConnectWithUs = ({ socialMediaLinks = [], contactData = {} }) => {
  const { talk_to_us, write_to_us } = contactData || {};

  return (
    <div data-widget="ConnectWithUs">
      <h3 className="text-16 uppercase mb-5">Connect with us</h3>

      <div className="flex flex-wrap gap-y-8 justify-between">
        {socialMediaLinks.length > 0 && (
          <div>
            <h4 className="text-14 text-light-gray mb-2">Follow us</h4>
            <div className="flex items-center gap-x-2 flex-wrap">
              {socialMediaLinks.map((item) => {
                const iconKey = item?.icon?.toLowerCase();
                const IconComponent = iconMap[iconKey];
                return (
                  IconComponent && (
                    <a
                      key={iconKey}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow us on ${iconKey}`}
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-light-gray-100/40"
                    >
                      <IconComponent />
                    </a>
                  )
                );
              })}
            </div>
          </div>
        )}

        {talk_to_us && (
          <div>
            <h4 className="text-14 text-light-gray mb-1">Talk to us</h4>
            <a
              href={`tel:${talk_to_us}`}
              className="text-16 font-light"
              aria-label="Call us"
            >
              {talk_to_us}
            </a>
          </div>
        )}

        {write_to_us && (
          <div>
            <h4 className="text-14 text-light-gray mb-1">Write to us</h4>
            <a
              href={`mailto:${write_to_us}`}
              className="text-16 font-light line-clamp-1"
              aria-label="Email us"
            >
              {write_to_us}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectWithUs;

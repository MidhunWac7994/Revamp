import { Clock } from "lucide-react";
import { Link } from "react-router-dom";

const RecentSearch = () => {
  return (
    <div data-widget="RecentSearch" className="mb-6">
      <div className="flex flex-col gap-y-7">
        {content?.map((item) => (
          <Link 
            to={item?.link}
            key={item?.id}
            className="text-[#B3B3B3] text-16 leading-4 flex items-center gap-2 justify-start"
          >
            <Clock size={26} color="#6F6F6F" />
            {item?.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentSearch;

const content = [
  {
    id: 1,
    label: "Chairs",
    link: "Chairs",
  },
  {
    id: 2,
    label: "Dining Tables",
    link: "Dining Tables",
  },
  {
    id: 3,
    label: "Sofas",
    link: "Sofas",
  },
  {
    id: 4,
    label: "Beds",
    link: "Beds",
  },
  {
    id: 5,
    label: "Mirrors",
    link: "Mirrors",
  },
  {
    id: 6,
    label: "Lights",
    link: "Lights",
  },
];

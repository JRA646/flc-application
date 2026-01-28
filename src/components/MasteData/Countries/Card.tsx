import { getCountyImageUrl } from "@/services/country"
import { PhoneIcon,PencilIcon } from "@/config/icon"
import Badge from "./Badge";
type CountryCardProps = {
  country: {
    id: number | string;
    name: string;
    officialName: string;
    capital: string;
    phoneCode: string;
    iso2: string;
    iso3: string;
    numeric: string;
    flagUrl: string;
    is_active: boolean;
  };
};

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <div className="rounded-xl 
    gap-4 
    border-2 
    border-gray-200 
    bg-white px-5 py-4 
    shadow-lg 
    shadow-gray-200/60 
    transition-all 
    duration-1000 ease-out
    hover:-translate-y-2 
    hover:shadow-xl 
    hover:shadow-gray-300/60
    cursor-pointer">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <img
            src={getCountyImageUrl(country.image_path)}
            alt={country.name}
            className="h-16 w-25 rounded-md object-cover"
          />

          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900 leading-tight">
              {country.name}
            </h3>

            <p className="text-sm text-gray-500 leading-tight">
              {country.official_name}
            </p>

            <p className="text-sm text-gray-500 leading-tight">
              {country.capital}
            </p>
          </div>
        </div>

        {/* Status */}
        <span
          className={`rounded-full px-4 py-1 text-sm font-medium ${country.is_active
            ? "bg-emerald-500 text-white"
            : "bg-gray-300 text-gray-700"
            }`}
        >
          {country.is_active ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Bottom row */}
      <div className="mt-3 flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-4 py-1">
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
          <Badge icon={<PhoneIcon className="h-4 w-4 text-emerald-600" />} color="gray">
            {country.phone_code}
          </Badge>

          <Badge>
            {country.iso_alpha2}
          </Badge>

          <Badge>
            {country.iso_alpha3}
          </Badge>

          <Badge color="gray">
            {country.iso_numeric}
          </Badge>
        </div>

        <button
          onClick={()=> console.log("dsa")}
          className="cursor-pointer rounded-md p-1.5 text-gray-400 hover:text-gray-700"
          title={"Edit " + name}
        >
          <PencilIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

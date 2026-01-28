import { LocationIcon, MembersGroupIcon, CountryIcon } from "@/config/icon";
import { getCampusImageUrl } from "@/services/campus";
import { Link } from "react-router-dom";
type Props = { campus: any }
export default function CampusCard({
  campus
}: Props) {
  return (
    <div
      className="
        overflow-hidden rounded-2xl bg-white
        shadow-lg shadow-gray-200/60
        transform-gpu
        transition-all 
    duration-1000 ease-out
        hover:-translate-y-2 hover:shadow-xl hover:shadow-gray-300/60
        cursor-pointer
      "
    >
      <Link to={`/campuses/${campus.id}`}>
      <div className="relative h-40">
        <img
          src={getCampusImageUrl(campus?.image_path)}
          className="h-full w-full object-cover"
          title={campus?.name+" Campus"}
        />

        {campus?.is_active && (
          <span className="absolute top-3 right-3 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
            active
          </span>
        )}

        <h3 className="absolute bottom-3 left-4 text-xl font-bold text-white drop-shadow">
          {campus?.name}
        </h3>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2 text-gray-600 text-sm" title={"Country : "+campus?.city?.state?.country?.name}>
          <CountryIcon className="w-4 h-4 text-indigo-500" />
          <span>{campus?.city?.state?.country?.name}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600 text-sm" title={"City : "+campus?.city?.name}>
          <LocationIcon className="w-4 h-4 text-indigo-500" />
          <span>{campus?.city?.name}</span>
        </div>

        <div className="my-4 border-t border-gray-200" />

        <div className="flex items-center justify-between text-sm" title={"Capacity: "+campus?.capacity}>
          <div className="flex items-center gap-2 text-gray-700">
            <MembersGroupIcon className="w-4 h-4 text-indigo-500" />
            Capacity: {campus?.capacity}
          </div>

          <span className="font-semibold text-indigo-600">
            0 this week
          </span>
        </div>
      </div>
      </Link>
    </div>
  );
}

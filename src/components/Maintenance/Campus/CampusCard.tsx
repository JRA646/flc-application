import {
    PencilIcon,
    TrashIcon,
    LocationIcon,
    MembersGroupIcon,
} from "@/config/icon";
import { getCampusImageUrl } from "@/services/campus";

type CampusStatus = "Active" | "Inactive";

type CampusCardProps = {
    name: string;
    address: string;
    capacity: number;
    imageUrl: string;
    status: CampusStatus;
    onEdit?: () => void;
    onDelete?: () => void;
};

export default function CampusCard({
    name,
    address,
    capacity,
    imageUrl,
    status,
    onEdit,
    onDelete,
}: CampusCardProps) {
    const isActive = status === "Active";

    return (
        <div className="overflow-hidden rounded-2xl bg-white
        shadow-lg shadow-gray-200/60
        transition-all duration-1000 ease-out
        hover:-translate-y-2 hover:shadow-xl hover:shadow-gray-300/60 cursor-pointer">
            {/* Image */}
            <div className="relative">
                <img
                    src={getCampusImageUrl(imageUrl)}
                    alt={name}
                    className="h-48 w-full object-cover"
                    title={name+" Campus"}
                />

                {/* Status badge */}
                <span
                    className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-medium text-white ${isActive ? "bg-emerald-500" : "bg-gray-400"
                        }`}
                >
                    {status}
                </span>
            </div>

            <div className="p-5 space-y-4">
                <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {name}
                </h3>

                <button
                    onClick={onEdit}
                    className="cursor-pointer rounded-md p-1.5 text-gray-400 hover:text-gray-700"
                    title={"Edit "+name}
                >
                    <PencilIcon className="h-4 w-4" />
                </button>
                </div>
                <div className="flex gap-2 text-sm text-gray-600" title={"Address : "+address}>
                    <LocationIcon className="h-4 w-4 mt-0.5 shrink-0 text-indigo-500" />
                    <p className="line-clamp-2">{address}</p>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600" title={"Capacity : "+capacity}>
                    <MembersGroupIcon className="h-4 w-4 text-amber-500" />
                    Capacity : {capacity}
                </div>
            </div>
        </div>
    );
}

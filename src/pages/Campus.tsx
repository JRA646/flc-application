import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";


import {
    CountryIcon,
    LocationIcon,
    SquarePenIcon,
    ClockIcon,
    MembersGroupIcon,
    ProfileIcon,
    PlusIcon,
    TrashIcon
} from "@/config/icon";
import type { CampusListItem } from "@/types/campus";
import { fetchCampuses } from "@/services/campus";
import LoadingState from "@/components/LoadingState";

export default function CampusDetails() {
    const { id } = useParams<{ id: string }>();

    const [campus, setCampus] = useState<CampusListItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const loadCampus = async () => {
            try {
                const data = await fetchCampuses({ ids: [id] });
                if (!data) {
                    setCampus(null);
                    return;
                }
                setCampus(data[0]);
            } finally {
                setLoading(false);
            }
        };

        loadCampus();
    }, [id]);

    if (loading) {
        return (
            <PageLayout title="Campus">
                <LoadingState label="Loading campus…" />
            </PageLayout>
        );
    }

    if (!campus) {
        return (
            <PageLayout title="Campus">
                <div className="text-red-500">Campus not found</div>
            </PageLayout>
        );
    }

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <Link to="/dashboard">
                        <button className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md hover:bg-gray-100 transition">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-5 h-5"
                            >
                                <path d="m12 19-7-7 7-7" />
                                <path d="M19 12H5" />
                            </svg>
                        </button>
                    </Link>

                    <div className="flex-1">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold text-gray-900">
                                {campus?.name}
                            </h1>
                            <span className="rounded-md bg-emerald-500 px-2.5 py-0.5 text-xs font-semibold text-white">
                                {campus?.is_active ? "Active" : "Inactive"}
                            </span>
                        </div>

                        <div className="flex items-center gap-4 mt-2 text-gray-500 text-sm">
                            <span className="flex items-center gap-1">
                                <CountryIcon className="w-4 h-4" /> {campus?.city?.[0]?.state?.[0]?.country?.name}
                            </span>
                            <span className="flex items-center gap-1">
                                <LocationIcon className="w-4 h-4" /> {campus?.city?.[0]?.name}
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="
                            inline-flex items-center gap-2
                            rounded-lg
                            border border-slate-200
                            bg-white
                            px-4 py-2
                            text-sm font-medium text-slate-900
                            shadow-sm

                            cursor-pointer
                            transition-colors
                            hover:bg-slate-50

                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-slate-200

                            disabled:pointer-events-none
                            disabled:opacity-50

                            [&_svg]:size-4
                            [&_svg]:text-slate-900
                        "
                    >
                        <SquarePenIcon />
                        Edit
                    </button>

                </div>

                <div className="rounded-xl bg-white shadow-lg shadow-gray-200/50 mb-8">
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <InfoItem label="Address" value={campus?.address_line1 + " " + (campus?.address_line2 ?? "") + ", " + campus?.city?.[0].name
                                + " " + campus?.city?.[0]?.state?.[0].name
                            } icon={<LocationIcon className="w-4 h-4 text-indigo-500" />} />

                            <InfoItem label="Timezone" value={campus?.city?.[0].name
                                + "/" + campus?.city?.[0].state?.[0].name
                            } bgcolor="bg-amber-50" icon={<ClockIcon className="w-4 h-4 text-amber-600" />} />

                            <InfoItem label="Capacity" value={campus?.capacity.toString()}
                                bgcolor="bg-emerald-50" icon={<MembersGroupIcon className="w-4 h-4 text-emerald-600" />} />

                            <InfoItem label="Lead Pastor" value={campus?.capacity.toString()}
                                bgcolor="bg-violet-50" icon={<ProfileIcon className="w-4 h-4 text-violet-600" />} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <StatCard label="Present Today" value="100" color="text-indigo-600" />
                    <StatCard label="First-time Visitors" value="0" color="text-emerald-600" />
                    <StatCard label="This Week Total" value="0" color="text-amber-600" />
                </div>

                <div className="rounded-xl bg-white shadow-lg shadow-gray-200/50 mb-8">
                    <div className="p-6 border-b border-gray-200 font-semibold">
                        Attendance Trends (Last 30 Days)
                    </div>
                    <div className="h-72 flex items-center justify-center text-gray-400">
                        📈 Chart goes here
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Service />
                    <RecentAttendance />
                </div>
            </div>
        </>
    );
}

function AttendanceRow({
    date,
    service,
    count,
}: {
    date: string;
    service: string;
    count: number;
}) {
    return (
        <tr className="hover:bg-slate-50 transition-colors">
            <td className="px-6 py-4 text-slate-700">
                {date}
            </td>
            <td className="px-6 py-4 text-slate-900">
                {service}
            </td>
            <td className="px-6 py-4 text-right font-semibold text-slate-900">
                {count}
            </td>
        </tr>
    );
}

function RecentAttendance() {
    return (
        <div className="w-full rounded-xl bg-white shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">
                    Recent Attendance
                </h2>

                <button
                    type="button"
                    className="
            inline-flex items-center gap-2
            rounded-lg bg-indigo-600
            px-4 py-2
            text-sm font-medium text-white
            shadow-sm
            hover:bg-indigo-700
            transition-colors
          "
                >
                    <PlusIcon className="w-4 h-4" />
                    Record
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-200 text-left text-slate-500">
                            <th className="px-6 py-3 font-medium">Date</th>
                            <th className="px-6 py-3 font-medium">Service</th>
                            <th className="px-6 py-3 font-medium text-right">
                                Attendance
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200">
                        <AttendanceRow
                            date="Jan 19, 2026"
                            service="Sunday Worship"
                            count={520}
                        />
                        <AttendanceRow
                            date="Jan 19, 2026"
                            service="Kids Church"
                            count={95}
                        />
                        <AttendanceRow
                            date="Jan 12, 2026"
                            service="Sunday Worship"
                            count={485}
                        />
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function Service() {
    return (
        <div className="w-full rounded-xl bg-white shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-slate-700">
                    Services
                </h2>

                <button
                    type="button"
                    className="
            inline-flex items-center gap-1.5
            rounded-lg bg-indigo-600
            px-4 py-2
            text-sm font-medium text-white
            shadow-sm
            hover:bg-indigo-700
            transition-colors
          "
                >
                    <PlusIcon className="w-4 h-4" />
                    Add
                </button>
            </div>
            <div className="max-h-80 overflow-y-auto divide-y divide-slate-200">
                <ServiceItem
                    title="Sunday Worship"
                    time="Sunday at 10:00"
                    tag="main service"
                />

                <ServiceItem
                    title="Kids Church"
                    time="Sunday at 10:00"
                    tag="children"
                />

                <ServiceItem
                    title="Kids Church"
                    time="Sunday at 10:00"
                    tag="children"
                />
                <ServiceItem
                    title="Kids Church"
                    time="Sunday at 10:00"
                    tag="children"
                />
            </div>
        </div>
    )
}

function ServiceItem({
    title,
    time,
    tag,
}: {
    title: string;
    time: string;
    tag: string;
}) {
    return (
        <div className="flex items-center justify-between px-6 py-3 hover:bg-slate-50 transition-colors">
            <div>
                <div className="font-medium text-slate-900 leading-tight">
                    {title}
                </div>
                <div className="text-sm text-slate-500 leading-tight">
                    {time}
                </div>
            </div>

            <div className="flex items-center gap-3">
                <span className="
                    rounded-md border border-slate-200
                    px-2.5 py-0.5
                    text-xs font-medium text-slate-900
                    bg-white
                ">
                    {tag}
                </span>

                <button className="text-slate-600 hover:text-slate-900 transition-colors">
                    <SquarePenIcon className="w-4 h-4" />
                </button>

                <button className="text-red-500 hover:text-red-600 transition-colors">
                    <TrashIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}


function InfoItem({
    icon,
    label,
    value,
    bgcolor
}: {
    icon?: React.ReactNode;
    label: string;
    value?: string;
    bgcolor?: string;
}) {
    return (
        <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${bgcolor || 'bg-indigo-50'}`}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="font-medium">{value}</p>
            </div>
        </div>
    );
}

function StatCard({
    label,
    value,
    color,
}: {
    label: string;
    value: string;
    color: string;
}) {
    return (
        <div className="rounded-xl bg-white shadow-lg shadow-gray-200/50 p-6 text-center">
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
            <p className="text-sm text-gray-500">{label}</p>
        </div>
    );
}
import { ChevronRight, Bell, MoreVertical } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/components/utils";
import { notifications } from "@/types/employee";

export default function Notification({ className }: { className?: string }) {
    return (
        <Card className={cn(
            "group relative bg-gradient-to-br from-slate-50 to-gray-50 border border-gray-200/60 hover:border-gray-300/80 hover:shadow-2xl transition-all duration-500 overflow-hidden h-full min-h-0 flex flex-col hide-scrollbar",
            className
        )}>
            <CardContent className="relative p-5 border-b border-gray-200/50 bg-white/40 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Bell className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
                            <p className="text-xs text-gray-500">4 new updates</p>
                        </div>
                    </div>
                    <button className="p-2.5 hover:bg-white/60 rounded-xl transition-all duration-200 shadow-sm">
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </CardContent>

            {/* Notifications List - Scrollable */}
            <CardContent className="relative flex-1 p-0 overflow-hidden min-h-0">
                <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    <div className="p-4 space-y-3">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className="group/item bg-white rounded-2xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-indigo-200 hover:scale-[1.02]"
                            >
                                <div className="flex gap-3">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
                                            {notification.avatar}
                                        </div>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900 text-sm group-hover/item:text-indigo-700 transition-colors">
                                                    {notification.author}
                                                </h3>
                                                <p className="text-xs text-gray-500 mt-0.5">{notification.date}</p>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
                                            {notification.content}
                                        </p>

                                        <button className="inline-flex items-center gap-1.5 text-indigo-600 font-medium text-xs hover:text-indigo-700 transition-all group-hover/item:gap-2 cursor-pointer">
                                            Read More
                                            <ChevronRight className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
import { Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/components/utils";

export default function WelcomeBanner({ className, employeeName = "Sumiran" }: { className?: string, employeeName?: string }) {
    return (
        <Card className={cn(
            "group relative bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50 border border-purple-100/50 hover:border-purple-200/70 hover:shadow-xl transition-all duration-300 overflow-hidden backdrop-blur-sm cursor-pointer h-48 sm:h-48 md:h-48 lg:h-54 xl:h-52 2xl:h-52",
            className
        )}>
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-2xl animate-pulse"></div>
                <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-gradient-to-br from-amber-200 to-rose-200 rounded-full mix-blend-multiply filter blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-0 left-1/3 w-24 h-24 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full mix-blend-multiply filter blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            <div className="absolute top-2 right-2 opacity-20">
                <div className="grid grid-cols-3 gap-1">
                    {[...Array(9)].map((_, i) => (
                        <div key={i} className="w-1 h-1 bg-purple-400 rounded-full"></div>
                    ))}
                </div>
            </div>

            <CardContent className="relative p-4 md:p-5">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 mt-2">
                            <p className="text-sm font-medium text-purple-600">
                                Welcome Back
                            </p>
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        </div>
                        <h1 className="text-xl md:text-2xl font-bold text-gray-800 group-hover:scale-105 transition-transform duration-200 origin-left">
                            {employeeName}
                        </h1>
                        <div className="h-0.5 w-8 bg-gradient-to-r from-purple-400/60 to-transparent rounded-full group-hover:w-12 transition-all duration-300" />
                    </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 max-w-md">
                    Ready to make today productive? Check out your tasks and updates.
                </p>

                <button className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-5 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg hover:scale-105 text-sm">
                    Explore Dashboard
                </button>

            </CardContent>
        </Card>
    );
}
export default function VersionsPage() {
    return (
        <div className="p-3">
            <div className="space-y-5">
                <div className="border rounded-2xl p-3 w-full">
                    <div className="flex justify-between mb-2">
                        <div>
                            <h2 className="text-red-500 text-2xl font-bold">نسخه 3.2</h2>
                            <p className="text-gray-400">1404/02/25</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="relative flex size-3">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
                            </span>
                            <p className="text-green-500 font-bold mt-1">نسخه شما</p>
                        </div>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-2xl space-y-3">
                        <div className="flex items-center text-gray-400 text-sm font-bold gap-1">
                            <div className="size-2 bg-gray-400 rounded-full">
                            </div>
                            <p className="mt-0.5">تغییر در زیر ساخت های نرم افزار</p>
                        </div>
                        <div className="flex items-center text-gray-400 text-sm font-bold gap-1">
                            <div className="size-2 bg-gray-400 rounded-full">
                            </div>
                            <p className="mt-0.5">رابط کاربری جدید</p>
                        </div>
                        <div className="flex items-center text-gray-400 text-sm font-bold gap-1">
                            <div className="size-2 bg-gray-400 rounded-full">
                            </div>
                            <p className="mt-0.5">عملکرد بهتر پایگاه داده</p>
                        </div>
                        <div className="flex items-center text-gray-400 text-sm font-bold gap-1">
                            <div className="size-2 bg-gray-400 rounded-full">
                            </div>
                            <p className="mt-0.5">بهبود بخش مکاتبات</p>
                        </div>
                        <div className="flex items-center text-gray-400 text-sm font-bold gap-1">
                            <div className="size-2 bg-gray-400 rounded-full">
                            </div>
                            <p className="mt-0.5">نسخه موبایل بهبود یافته</p>
                        </div>
                        <div className="flex items-center text-gray-400 text-sm font-bold gap-1">
                            <div className="size-2 bg-gray-400 rounded-full">
                            </div>
                            <p className="mt-0.5">بهبود مدیریت پرسنل</p>
                        </div>
                        <div className="flex items-center text-gray-400 text-sm font-bold gap-1">
                            <div className="size-2 bg-gray-400 rounded-full">
                            </div>
                            <p className="mt-0.5">بخش دپارتمان ها</p>
                        </div>
                        <div className="flex items-center text-gray-400 text-sm font-bold gap-1">
                            <div className="size-2 bg-gray-400 rounded-full">
                            </div>
                            <p className="mt-0.5">پشتیبانی آنلاین</p>
                        </div>
                        <div className="flex items-center text-gray-400 text-sm font-bold gap-1">
                            <div className="size-2 bg-gray-400 rounded-full">
                            </div>
                            <p className="mt-0.5">بهبود سیستم امنیتی</p>
                        </div>
                    </div>
                </div>
                <div className="border rounded-2xl p-3 w-full">
                    <div className="flex justify-between mb-2">
                        <div>
                            <h2 className="text-red-500 text-2xl font-bold">نسخه 3.0</h2>
                            <p className="text-gray-400">1403/07/16</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="relative flex size-3">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gray-400 opacity-75"></span>
                                <span className="relative inline-flex size-3 rounded-full bg-gray-300"></span>
                            </span>
                            <p className="text-gray-300 font-bold mt-1">خارج از دسترس</p>
                        </div>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-2xl space-y-3">
                        <div className="flex items-center text-gray-400 text-sm font-bold gap-1">
                            <div className="size-2 bg-gray-400 rounded-full">
                            </div>
                            <p className="mt-0.5">بهبود رابط کاربری</p>
                        </div>
                        <div className="flex items-center text-gray-400 text-sm font-bold gap-1">
                            <div className="size-2 bg-gray-400 rounded-full">
                            </div>
                            <p className="mt-0.5">بخش مکاتبات</p>
                        </div>
                        <div className="flex items-center text-gray-400 text-sm font-bold gap-1">
                            <div className="size-2 bg-gray-400 rounded-full">
                            </div>
                            <p className="mt-0.5">پایگاه جدید</p>
                        </div>
                        <div className="flex items-center text-gray-400 text-sm font-bold gap-1">
                            <div className="size-2 bg-gray-400 rounded-full">
                            </div>
                            <p className="mt-0.5">بهبود سیستم امنیتی</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
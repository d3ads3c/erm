import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RequestTab() {
  return (
    <Tabs
      defaultValue="account"
      className="w-full border rounded-xl p-5 max-h-[400px] h-[400px] bg-white dark:bg-[#121212]"
      dir="rtl"
    >
      <div className="mb-3">
        <h2 className="font-bold">درخواست های سازمان</h2>
      </div>
      <TabsList className="w-full">
        <TabsTrigger value="vacation">مرخصی</TabsTrigger>
        <TabsTrigger value="imprest">مساعده</TabsTrigger>
      </TabsList>
      <TabsContent
        value="vacation"
        className="space-y-3 max-h-[270px] overflow-auto hide-scroll"
      >
        <div className="border rounded-2xl p-3 space-y-3">
          <div className="flex  items-center w-full">
            <div className="w-3/4 flex items-center gap-3">
              <div className="size-12 rounded-xl bg-gray-100 dark:bg-[#212121]"></div>
              <div className="">
                <h3 className="text-gray-700 dark:text-white">نیما نیک عمل</h3>
                <p className="text-xs text-gray-400">مدیر ارشد فناوری</p>
              </div>
            </div>
            <div className="w-1/4">
              <div className="flex items-center justify-center gap-5 mt-1">
                <div className="w-1/2">
                  <button className="text-emerald-400 text-center">
                    <i className="fi fi-sr-check-circle"></i>
                    <p className="text-xs -mt-1">تایید</p>
                  </button>
                </div>
                <div className="w-1/2">
                  <button className="text-red-500 text-center">
                    <i className="fi fi-sr-cross-circle"></i>
                    <p className="text-xs -mt-1">رد</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mt-3 bg-orange-100 rounded-full w-fit py-1 px-3">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex size-2.5 rounded-full bg-orange-400"></span>
              </span>
              <p className="text-sm text-orange-400 mt-0.5">
                در انتظار تایید سرپرست | هادی فتحی
              </p>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-[#212121] text-center py-1 rounded-lg flex">
            <div className="w-1/2 text-xs">
              <p className=" text-gray-400">از تاریخ</p>
              <p>1403/10/05 | 09:00</p>
            </div>
            <div className="w-1/2 text-xs">
              <p className=" text-gray-400">تا تاریخ</p>
              <p>1403/10/05 | 09:00</p>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="imprest">
        <div className="w-full bg-gray-100 rounded-2xl h-[100px] text-center p-5 flex items-center justify-center text-gray-400">
          <div>
            <i className="fi fi-sr-drawer-empty text-2xl"></i>
            <p>هیج درخواستی وجود ندارد</p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}

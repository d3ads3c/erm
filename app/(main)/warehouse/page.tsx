export default function WareHousePage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1>داشبورد انبار</h1>
      </div>
      <div className="flex items-center gap-5">
        <div className="w-2/6 p-5 rounded-xl bg-gradient-to-l from-red-600 to-red-500 flex items-center justify-center gap-10">
          <div className="mt-5">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-red-100 text-red-500 flex items-center justify-center">
                <i className="fi fi-sr-square-minus mt-2.5"></i>
              </div>
              <p className="text-white text-sm -mb-1">کالای خروج شده</p>
            </div>
            <h2 className="font-bold text-[60px] text-white">1,325</h2>
          </div>
          <div className="bg-white h-[70px] w-[1px]"></div>
          <div className="mt-5">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-red-100 text-red-500 flex items-center justify-center">
                <i className="fi fi-sr-square-plus mt-2.5"></i>
              </div>
              <p className="text-white text-sm -mb-1">کالای وارد شده</p>
            </div>
            <h2 className="font-bold text-[60px] text-white">3,256</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

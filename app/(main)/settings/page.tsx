export default function SettingPage() {
  return (
    <div className="space-y-5">
      <div className="border p-3 rounded-xl">
        <div>
          <h2>اطاعات شرکت</h2>
          <p className="text-sm text-gray-400">
            تمامی اطلاعات به صورت رمز نگاری و غیرقابل مشاهده ذخیره می شوند.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-5 mt-5">
          <div className="w-full">
            <p className="text-sm mb-1">نام شرکت</p>
            <input
              type="text"
              value={"آرمان همراه ارتباطات آریا"}
              className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
            />
          </div>
          <div className="w-full">
            <p className="text-sm mb-1">شناسه ملی</p>
            <input
              type="text"
              value={"0606516790"}
              className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
            />
          </div>
          <div className="w-full">
            <p className="text-sm mb-1">کد اقتصادی</p>
            <input
              type="text"
              value={"4114818157"}
              className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
            />
          </div>
          <div className="w-full">
            <p className="text-sm mb-1">شماره ثبت</p>
            <input
              type="text"
              value={"264845"}
              className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
            />
          </div>
          <div className="w-full">
            <p className="text-sm mb-1">تاریخ تاسیس</p>
            <input
              type="text"
              value={"1403/04/18"}
              className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
            />
          </div>
          <div className="w-full">
            <p className="text-sm mb-1">کدپستی</p>
            <input
              type="text"
              value={"158415681"}
              className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
            />
          </div>
        </div>
        <div className="mt-5">
          <p className="text-sm mb-1">آدرس</p>
          <textarea
            name=""
            id=""
            className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
          ></textarea>
        </div>
        <div className="flex items-center justify-end mt-3">
          <button className="bg-emerald-400 text-white w-fit py-2 px-5 rounded-xl hover:shadow-xl hover:shadow-emerald-200 duration-150">
            ثبت مشخصات
          </button>
        </div>
      </div>
    </div>
  );
}

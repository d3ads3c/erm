export default function CompanyInfo() {
  return (
    <div className="border rounded-xl p-5 bg-white dark:bg-[#121212]">
      <div>
        <h1 className="font-bold">اطلاعات شرکت</h1>
      </div>
      <div className="grid grid-cols-5 gap-5 mt-3">
        <div className="w-full">
          <p className="text-gray-400 text-sm">نام شرکت</p>
          <p>آرمان همراه ارتباطات آریا</p>
        </div>
        <div className="w-full">
          <p className="text-gray-400 text-sm">شناسه ملی</p>
          <p>14004973518</p>
        </div>
        <div className="w-full">
          <p className="text-gray-400 text-sm">کد اقتصادی</p>
          <p>411488879445</p>
        </div>
        <div className="w-full">
          <p className="text-gray-400 text-sm">شماره ثبت</p>
          <p>411488879445</p>
        </div>
        <div className="w-full">
          <p className="text-gray-400 text-sm">تاریخ تاسیس</p>
          <p>1394/03/10</p>
        </div>
      </div>
      <div className="flex items-center gap-5 mt-3">
        <div className="w-2/5">
          <p className="text-gray-400 text-sm">آدرس</p>
          <p>
            استان تهران، شهرستان تهران، بخش مرکزی، شهر تهران، باغ صبا-سهروردی،
            خیابان شهید استاد مطهری، خیابان شهید سلیمان خاطر، پلاک 130، مجتمع
            تجاری اداری امیر اتابک، طبقه 3، واحد 304
          </p>
        </div>
        <div className="w-1/5">
          <p className="text-gray-400 text-sm">کدپستی</p>
          <p>1575945341</p>
        </div>
      </div>
    </div>
  );
}

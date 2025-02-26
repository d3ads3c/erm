export default function CategoriesComp() {
  return (
    <div>
      <div>
        <h1>دسته بندی ها</h1>
      </div>
      <div className="flex items-center gap-5 mt-5">
        <div className="w-1/2">
          <div className="border rounded-xl p-5">
            <div>
              <h2>دستگاه ها</h2>
            </div>
            <div>
              <table className="w-full table mt-3">
                <thead className="bg-gray-100 rounded-xl text-gray-500 text-right">
                  <tr>
                    <th className="rounded-r-xl py-3 px-5">شناسه</th>
                    <th>برند</th>
                    <th>مدل</th>
                    <th>کشور ساخت</th>
                    <th>وضعیت</th>
                    <th className="rounded-l-xl py-3 px-5 text-center">
                      عملیات
                    </th>
                  </tr>
                </thead>
                <tbody>
                    <td></td>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="w-1/2"></div>
      </div>
    </div>
  );
}

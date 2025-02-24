"use client";
import { useEffect, useState, ChangeEvent } from "react";
import Image from "next/image";

interface Row {
  id: number;
  info: string;
  quantity: string;
  price: string;
  totalprice: string;
}

export default function RepairDetail() {
  const [rows, setRows] = useState<Row[]>([]);
  const [counter, setCounter] = useState(0);
  const [formValues, setFormValues] = useState({
    works: rows,
  });

  const addRow = () => {
    setRows([
      ...rows,
      { id: counter, info: "", quantity: "", price: "", totalprice: "" },
    ]);
    setCounter(counter + 1);
  };

  const deleteRow = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
    setCounter(counter - 1);
  };

  const handleInputChange = (
    id: number,
    field: "info" | "quantity" | "price" | "totalprice",
    value: string
  ) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      works: rows,
    }));
  };
  return (
    <div>
      <div className="flex items-center justify-between mt-10">
        <div className="flex items-center justify-between w-1/2">
          <div className="flex items-center gap-2 font-bold">
            <p className="text-gray-400 text-lg">#25487 -</p>
            <p>نیما نیک عمل</p>
            <div className="w-fit px-3 py-1 rounded-lg font-bold text-sm bg-sky-100 text-sky-500">
              درحال انجام
            </div>
            <div className="w-fit px-3 py-1 rounded-lg font-bold text-sm bg-red-100 text-red-500">
              فوری
            </div>
          </div>
        </div>
        <div className="w-1/2 flex items-center justify-end gap-3">
          {/* <button
            type="button"
            className="border border-red-500 rounded-xl size-10 text-red-500 hover:bg-red-500 hover:text-white duration-150 flex items-center justify-center"
          >
            <i className="fi fi-sr-comments mt-1"></i>
          </button> */}
          <button
            type="button"
            disabled
            className="bg-gray-100 rounded-xl size-10 text-gray-400 flex items-center justify-center"
          >
            <i className="fi fi-sr-comments mt-1"></i>
          </button>
          <button
            type="button"
            className="border border-red-500 rounded-xl py-2 text-red-500 w-fit px-5 hover:bg-red-500 hover:text-white duration-150"
          >
            ارجاع به دیگر
          </button>
        </div>
      </div>
      <div className="flex gap-5 mt-8 pb-14">
        <div className="w-3/4 space-y-4">
          <div className="border rounded-xl p-5">
            <div>
              <h2 className="text-lg">اطلاعات مشتری</h2>
            </div>
            <div className="grid grid-cols-4 mt-5">
              <div className="w-full">
                <p className="text-sm text-gray-400">نام مشتری</p>
                <p>نیما نیک عمل</p>
              </div>
              <div className="w-full">
                <p className="text-sm text-gray-400">تلفن تماس</p>
                <p>09374244001</p>
              </div>
              <div className="w-full">
                <p className="text-sm text-gray-400">کدملی</p>
                <p>0024640379</p>
              </div>
              <div className="w-full">
                <p className="text-sm text-gray-400">آدرس</p>
                <p>شریعتی، خیابان سلیمان خاطر، خیابان مطهری</p>
              </div>
              <div className="w-full">
                <p className="text-sm text-gray-400">اهراز هویت</p>
                <div className="w-fit px-3 py-1 rounded-lg font-bold text-sm bg-orange-100 text-orange-500">
                  اهراز نشده
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="w-1/2 border p-5 rounded-xl">
              <div>
                <h2 className="text-lg">شرح خرابی</h2>
              </div>
              <div className="mt-1">
                <p className="text-gray-700">
                  دستگاه پس از افتادن بر روی زمین دیگر روشن نشد.
                </p>
                <div className="bg-gray-100 rounded-lg p-3 mt-3 text-gray-500">
                  <p>رمز دستگاه 33587</p>
                </div>
              </div>
            </div>
            <div className="w-1/2 h-[300px]">
              <div className="border rounded-xl p-5 h-full">
                <div className="h-[10%]">
                  <h2 className="text-lg">یادداشت ها</h2>
                </div>
                <div className="w-full max-h-[70%] h-[70%] overflow-auto space-y-3 pb-5">
                  <div className="w-full flex items-center justify-end">
                    <div className="w-1/2 border rounded-xl p-3">
                      <p className="text-xs text-gray-400">زهره کرابی</p>
                      <p className="text-sm">
                        مشتری عجله داره دستگاه رو تا 2 روز دیگر میخواد
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-start">
                    <div className="w-1/2 border rounded-xl p-3">
                      <p className="text-xs text-gray-400">ایمان ابراهیمی</p>
                      <p className="text-sm">
                        مشتری دستگاه مشتری تا سال دیگه آماده نمیشه
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-start">
                    <div className="w-1/2 border rounded-xl p-3">
                      <p className="text-xs text-gray-400">ایمان ابراهیمی</p>
                      <p className="text-sm">
                        مشتری دستگاه مشتری تا سال دیگه آماده نمیشه
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center h-[10%] gap-2 w-full">
                  <div className="w-[10%] mt-8">
                    <button
                      type="button"
                      className="bg-red-500 text-white rounded-xl size-10 flex items-center justify-center hover:shadow-xl hover:shadow-red-200 duration-150"
                    >
                      <i className="fi fi-sr-paper-plane-top mt-1"></i>
                    </button>
                  </div>
                  <div className="w-[90%] mt-8">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="متن یادداشت ..."
                      className="bg-gray-100 rounded-xl p-2 w-full focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Works */}
          <div className="border rounded-xl p-5">
            <div className="h-[10%]">
              <h2 className="text-lg">اجرت و قطعات</h2>
            </div>
            <div className="mt-4">
              <div>
                {/* <div className="flex items-center gap-3 text-center">
                <div className="w-1/12">ردیف</div>
                <div className="w-4/12">شرح کار یا قطعه</div>
                <div className="w-1/12"> تعداد</div>
                <div className="w-4/12"> قیمت</div>
                <div className="w-2/12">قیمت کل</div>
                <div className="w-[3rem]">حذف</div>
              </div> */}
                {rows.map((row) => (
                  <div className="flex items-center gap-3 my-3" key={row.id}>
                    <div className="w-1/12">
                      <input
                        type="text"
                        name="quantity"
                        value={row.id + 1}
                        disabled
                        className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none"
                      />
                    </div>
                    <div className="w-5/12">
                      <input
                        type="text"
                        name="info"
                        placeholder="شرح کار یا قطعه"
                        value={row.info}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleInputChange(row.id, "info", e.target.value)
                        }
                        className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none"
                      />
                    </div>
                    <div className="w-1/12">
                      <input
                        type="text"
                        name="quantity"
                        placeholder="تعداد"
                        value={row.quantity}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleInputChange(row.id, "quantity", e.target.value)
                        }
                        className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none"
                      />
                    </div>
                    <div className="w-3/12">
                      <input
                        type="text"
                        name="price"
                        placeholder="قیمت"
                        value={row.price}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleInputChange(row.id, "price", e.target.value)
                        }
                        className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none"
                      />
                    </div>
                    <div className="w-3/12">
                      <input
                        type="text"
                        name="totalprice"
                        placeholder="قیمت کل"
                        value={row.totalprice}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleInputChange(
                            row.id,
                            "totalprice",
                            e.target.value
                          )
                        }
                        className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none"
                      />
                    </div>
                    <div className="size-12">
                      <button
                        onClick={() => deleteRow(row.id)}
                        className="border border-gray-300 size-12 w-full rounded-lg focus:outline-none flex items-center justify-center"
                      >
                        <i className="fi fi-rr-trash mt-1"></i>
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addRow}
                  className="text-blue-400 underline underline-offset-8 decoration-blue-400"
                >
                  افزودن
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4 space-y-4 sticky top-5 h-full">
          <div className="border rounded-xl p-5">
            <Image
              src={"/img/products/iphone16-pro-max.webp"}
              width={200}
              height={200}
              alt="Product Image"
              className="mx-auto"
            ></Image>
            <div className="text-center mt-5">
              <h2 className="font-bold">Apple iPhone 16 Pro Max</h2>
              <p className="text-sm text-gray-500">33652841894</p>
            </div>
          </div>
          <div className="border rounded-xl p-5">
            <ul className="space-y-5">
              <li className="flex items-center gap-1">
                <p className="text-gray-600">گارانتی :</p>
                <div className="text-sm w-fit px-3 py-1 rounded-xl bg-emerald-100 text-emerald-400">
                  تا 130 روز دیگر
                </div>
              </li>
              <li className="flex items-center gap-1 text-gray-600">
                <p>تاریخ پذیرش :</p>
                <p>1403/08/07</p>
              </li>
              <li className="flex items-center gap-1 text-gray-600">
                <p>موقعیت دستگاه :</p>
                <p>تکنسین | ایمان ابراهیمی</p>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-2">
            {/* <button className="bg-sky-500 text-white py-3 w-1/2 rounded-xl hover:shadow-xl hover:shadow-sky-200 duration-150">
              پیام به مشتری
            </button> */}
            <button className="bg-emerald-400 text-white py-3 w-full rounded-xl hover:shadow-xl hover:shadow-emerald-200 duration-150">
              تغییر وضعیت
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

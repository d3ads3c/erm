"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState, ChangeEvent } from "react";

interface Row {
  id: number;
  name: string;
  serial1: string;
  serial2: string;
}

export default function ImportStockComp() {
  const [rows, setRows] = useState<Row[]>([]);
  const [counter, setCounter] = useState(0);
  const [storageList, setStorageList] = useState<[] | null>(null);
  const [productList, setProductList] = useState<[] | null>(null);

  const addRow = () => {
    setRows([...rows, { id: counter, name: "", serial1: "", serial2: "" }]);
    setCounter(counter + 1);
  };
  const deleteRow = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  async function GetProducts() {
    await fetch("/api/warehouse/products/list")
      .then((res) => res.json())
      .then((data) => {
        setProductList(data);
      });
  }

  async function GetStorages() {
    await fetch("/api/warehouse/storage/list")
      .then((res) => res.json())
      .then((data) => {
        setStorageList(data);
        console.log(data);
      });
  }
  useEffect(() => {
    GetStorages();
    GetProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1>ورود کالا به انبار</h1>
      </div>
      <div className="my-5 space-y-5">
        <div className="w-full border rounded-xl p-5">
          <div className="grid grid-cols-5 gap-5">
            <div className="w-full space-y-1">
              <p className="text-gray-600 text-sm">عنوان حواله</p>
              <input
                type="text"
                name="name"
                className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
              />
            </div>
            <div className="w-full space-y-1">
              <p className="text-gray-600 text-sm">شماره حواله</p>
              <input
                type="text"
                name="name"
                className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
              />
            </div>
            <div className="w-full space-y-1">
              <p className="text-gray-600 text-sm">انتخاب فاکتور</p>
              <input
                type="text"
                name="name"
                defaultValue="تنها با ماژول خرید و فروش"
                className="border border-gray-300 p-2 w-full rounded-lg bg-gray-100 text-gray-400 focus:outline-none"
              />
            </div>
            <div className="w-full space-y-1">
              <p className="text-gray-600 text-sm">انتخاب انبار</p>
              <Select dir="rtl" name="manager">
                <SelectTrigger className="w-full h-10">
                  <SelectValue placeholder="انتخاب" />
                </SelectTrigger>
                <SelectContent>
                  {storageList?.map(
                    (Storage: any, index: number) =>
                      Storage.Status == "active" && (
                        <SelectItem value={Storage.ID} key={index}>
                          {Storage.Name}
                          <p className="text-xs text-gray-400">
                            {Storage.Manager}
                          </p>
                        </SelectItem>
                      )
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="w-full border rounded-xl p-5">
          <div className="mb-3">
            <h3>کالاها</h3>
          </div>
          <div className="mt-5">
            {rows.map((row) => (
              <div className="flex items-center gap-3 my-3" key={row.id}>
                <Select dir="rtl" name="manager">
                  <SelectTrigger className="w-1/5 h-10">
                    <SelectValue placeholder="انتخاب" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="p-3">
                      <input
                        type="text"
                        name="name"
                        placeholder="نام کالا، شناسه کالا ..."
                        className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none text-sm"
                      />
                    </div>
                    {productList?.map(
                      (product: any, index: number) =>
                        product.Status == "active" && (
                          <SelectItem value={product.ID} key={index}>
                            {product.Name}
                            <p className="text-xs text-gray-400">
                              شناسه : {product.ID}
                            </p>
                          </SelectItem>
                        )
                    )}
                  </SelectContent>
                </Select>
                <div className="w-[100px] space-y-1">
                  <input
                    type="text"
                    name="Quantity"
                    placeholder="تعداد"
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
                  />
                </div>
                <button className="w-fit px-5 py-2 bg-emerald-400 text-white rounded-xl hover:shadow-xl hover:shadow-emerald-200 duration-150">
                  ثبت سریال
                </button>
                <div className="size-10">
                  <button
                    onClick={() => deleteRow(row.id)}
                    className=" border border-gray-300 size-10 w-full rounded-lg focus:outline-none flex items-center justify-center"
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
            </button>{" "}
          </div>
          {/* <Attr /> */}
        </div>
      </div>
    </div>
  );
}

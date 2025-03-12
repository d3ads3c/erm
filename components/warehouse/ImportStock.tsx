"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

interface Row {
  id: number;
  product: string;
  quantity: string;
  info: string;
  serial: string[]; // Store serials as JSON array
}

interface Product {
  ID: string;
  Name: string;
  Status: string;
}

interface ImportDetail {
  Title: string;
  Serial: string;
  Invoice: string;
  Warehouse: string;
  Extra: string;
  Products: {};
}

export default function ImportStockComp() {
  const [rows, setRows] = useState<Row[]>([]);
  const [counter, setCounter] = useState(0);
  const [storageList, setStorageList] = useState<[] | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<string>("");
  const [productList, setProductList] = useState<Product[] | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [importDetail, setImportDetail] = useState<ImportDetail>({
    Title: "",
    Serial: "",
    Invoice: "",
    Warehouse: "",
    Extra: "",
    Products: {},
  });

  // States for Dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);
  const [serialInputs, setSerialInputs] = useState<string[]>([]);

  const addRow = () => {
    setRows([
      ...rows,
      { id: counter, product: "", info: "", quantity: "", serial: [] },
    ]);
    setCounter(counter + 1);
  };

  const deleteRow = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleSerialRegistration = (row: Row) => {
    if (row.quantity) {
      const quantity = parseInt(row.quantity, 10);

      // Use existing serials if available; otherwise, initialize them as empty
      const inputs =
        row.serial.length === quantity
          ? row.serial
          : Array.from({ length: quantity }, () => "");

      setSerialInputs(inputs);
      setSelectedRow(row);
      setIsDialogOpen(true);
    }
  };

  const handleSerialInputChange = (index: number, value: string) => {
    const updatedSerials = [...serialInputs];
    updatedSerials[index] = value;
    setSerialInputs(updatedSerials);
  };

  const saveSerials = () => {
    if (selectedRow) {
      const updatedRows = rows.map((row) =>
        row.id === selectedRow.id ? { ...row, serial: serialInputs } : row
      );
      setRows(updatedRows);
      setIsDialogOpen(false);
      setSelectedRow(null);
      setSerialInputs([]);
    }
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
      });
  }

  useEffect(() => {
    GetStorages();
    GetProducts();
  }, []);

  const HandleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setImportDetail((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const SubmitImport = async () => {
    setImportDetail((prevState) => ({
      ...prevState,
      Products: JSON.stringify(rows),
      Warehouse: selectedStorage,
    }));
    await fetch("/api/warehouse/stocks/import", {
      method: "POST",
      body: JSON.stringify(importDetail),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1>ورود کالا به انبار</h1>
      </div>
      <div className="flex gap-5">
        <div className="space-y-5 w-2/3">
          <div className="w-full border rounded-xl p-5">
            <div className="grid grid-cols-4 gap-5">
              <div className="w-full space-y-1">
                <p className="text-gray-600 text-sm">عنوان حواله</p>
                <input
                  type="text"
                  name="Title"
                  onChange={HandleChange}
                  className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
                />
              </div>
              <div className="w-full space-y-1">
                <p className="text-gray-600 text-sm">شماره حواله</p>
                <input
                  type="text"
                  name="Serial"
                  onChange={HandleChange}
                  className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
                />
              </div>
              <div className="w-full space-y-1">
                <p className="text-gray-600 text-sm">انتخاب فاکتور</p>
                <input
                  type="text"
                  name="Invoice"
                  onChange={HandleChange}
                  defaultValue="تنها با ماژول خرید و فروش"
                  disabled
                  className="border border-gray-300 p-2 w-full rounded-lg bg-gray-100 text-gray-400 focus:outline-none"
                />
              </div>
              <div className="w-full space-y-1">
                <p className="text-gray-600 text-sm">انتخاب انبار</p>
                <Select
                  dir="rtl"
                  name="Warehouse"
                  onValueChange={(value) => setSelectedStorage(value)}
                >
                  <SelectTrigger className="w-full h-10">
                    <SelectValue placeholder="انتخاب" />
                  </SelectTrigger>
                  <SelectContent>
                    {storageList?.map(
                      (Storage: any, index: number) =>
                        Storage.Status === "active" && (
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
                  <Select
                    dir="rtl"
                    name="product"
                    onValueChange={(e) =>
                      setRows(
                        rows.map((r) =>
                          r.id === row.id ? { ...r, product: e } : r
                        )
                      )
                    }
                  >
                    <SelectTrigger className="w-2/5 h-10">
                      <SelectValue placeholder="انتخاب" />
                    </SelectTrigger>
                    <SelectContent>
                      <div className="w-full p-3">
                        {/* Search Input */}
                        <input
                          type="text"
                          name="search"
                          placeholder="کد کالا، نام کالا..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state
                          className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none text-sm"
                        />
                      </div>
                      {/* Conditional Rendering Based on Search Query */}
                      {(searchQuery
                        ? productList?.filter((product) =>
                            product.Name.includes(searchQuery)
                          )
                        : productList
                      )?.map((product: any, index: number) => (
                        <SelectItem value={product.ID} key={index}>
                          {product.Name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="w-[80px] space-y-1">
                    <input
                      type="text"
                      name="Quantity"
                      placeholder="تعداد"
                      className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none text-center"
                      onChange={(e) =>
                        setRows(
                          rows.map((r) =>
                            r.id === row.id
                              ? { ...r, quantity: e.target.value }
                              : r
                          )
                        )
                      }
                    />
                  </div>
                  <div className="w-1/5 space-y-1">
                    <input
                      type="text"
                      name="info"
                      placeholder="توضیحات"
                      className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
                      onChange={(e) =>
                        setRows(
                          rows.map((r) =>
                            r.id === row.id
                              ? { ...r, quantity: e.target.value }
                              : r
                          )
                        )
                      }
                    />
                  </div>
                  <button
                    onClick={() => handleSerialRegistration(row)}
                    className="w-fit px-5 py-2 bg-emerald-400 text-white rounded-lg hover:shadow-xl"
                  >
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
              <button onClick={addRow} className="text-blue-400 underline">
                افزودن
              </button>
            </div>
          </div>
        </div>
        <div className="h-full sticky top-5 w-1/3 space-y-5">
          <div className="w-full border rounded-xl p-5">
            <div className="mb-3">
              <h3>توضیخات</h3>
            </div>
            <textarea
              rows={5}
              name="Extra"
              onChange={HandleChange}
              placeholder="متن توضیحات ..."
              className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <button
              onClick={SubmitImport}
              className="py-3 bg-emerald-400 text-white rounded-lg hover:bg-emerald-500 w-full duration-150 hover:shadow-xl hover:shadow-emerald-200"
            >
              ثبت ورود کالا
            </button>
          </div>
        </div>
      </div>

      {/* Dialog Component */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg w-[40%] max-h-[60%] overflow-auto">
            <h2 className="mb-3 text-sm">
              {productList?.find(
                (product: any) => product.ID === selectedRow?.product
              )?.Name || "ثبت سریال"}
            </h2>
            {serialInputs.map((serial, index) => (
              <input
                key={index}
                type="text"
                placeholder={`سریال ${index + 1}`}
                value={serial}
                onChange={(e) => handleSerialInputChange(index, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // Prevent the default Enter behavior
                    const serialInputsList =
                      document.querySelectorAll<HTMLInputElement>(
                        '[placeholder^="سریال "]'
                      ); // Select only the serial inputs
                    if (index + 1 < serialInputsList.length) {
                      serialInputsList[index + 1].focus(); // Move focus to the next serial input
                    }
                  }
                }}
                className="border border-gray-200 p-2 w-full rounded-lg mb-3"
              />
            ))}
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 border border-gray-600 text-gray-600 rounded-lg"
              >
                بستن
              </button>
              <button
                onClick={saveSerials}
                className="px-8 py-2 bg-emerald-500 text-white rounded-lg"
              >
                ذخیره
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

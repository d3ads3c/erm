"use client";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Row {
  id: number;
  input1: string;
  input2: string;
}

interface Data {
  faName: string;
  enName: string;
  shortDesc: string;
  Link: string;
  Category: string;
  mainimg: File | null;
  attr: Row[];
  flag: boolean;
}

export default function NewSiteProduct() {
  const Categories = ["موبایل", "تبلت", "لپ تاپ", "ساعت هوشمند", "اسپیکر"];
  const [category, setCategory] = useState("");
  const [rows, setRows] = useState<Row[]>([]);
  const [counter, setCounter] = useState(0);

  const [values, setValues] = useState<Data>({
    faName: "",
    enName: "",
    shortDesc: "",
    Link: "",
    Category: "",
    mainimg: null,
    attr: [],
    flag: false,
  });

  const addRow = () => {
    setRows([...rows, { id: counter, input1: "", input2: "" }]);
    setCounter(counter + 1);
  };
  const deleteRow = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };
  const handleInputChange = (
    id: number,
    field: "input1" | "input2",
    value: string
  ) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
    setValues((prevFormValues) => ({
      ...prevFormValues,
      attr: rows,
      mainimg: selectedImage,
    }));
  };
  const InputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedImage(file);
      // Create a preview of the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValues((prevFormValues) => ({
      ...prevFormValues,
      Category: category,
    }));
    console.log(values);
  };

  return (
    <div>
      <div>
        <div className="flex items-center justify-between">
          <h2>محصولات جدید</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="flex gap-5 text-sm mt-5">
          <div className="w-3/4 space-y-5">
            <div className="border border-gray-200 p-5 rounded-2xl space-y-5">
              <div className="flex items-center gap-5">
                <div className="w-1/2">
                  <p>نام فارسی محصول</p>
                  <input
                    type="text"
                    name="faName"
                    id="faName"
                    onChange={InputChange}
                    className="border rounded-xl p-3 border-gray-200 w-full mt-1.5"
                  />
                </div>
                <div className="w-1/2">
                  <p>نام لاتین</p>
                  <input
                    type="text"
                    name="enName"
                    onChange={InputChange}
                    id="enName"
                    className="border rounded-xl p-3 border-gray-200 w-full mt-1.5"
                  />
                </div>
              </div>
              {/* Link */}
              <div>
                <p>لینک محصول</p>
                <input
                  type="text"
                  name="Link"
                  id="Link"
                  onChange={InputChange}
                  className="border rounded-xl p-3 border-gray-200 w-full mt-1.5"
                />
              </div>
              <div>
                <p>توضیحات کوتاه</p>
                <textarea
                  name="shortDesc"
                  onChange={InputChange}
                  id="shortDesc"
                  className="border rounded-xl p-3 border-gray-200 w-full mt-1.5"
                ></textarea>
              </div>
            </div>
            <div className="border border-gray-200 p-5 rounded-2xl space-y-5">
              <div>
                <h2>مشخصات فنی</h2>
              </div>
              <div>
                {rows.map((row) => (
                  <div className="flex items-center gap-3 my-3" key={row.id}>
                    <div className="w-1/2">
                      <input
                        type="text"
                        name="attr"
                        placeholder="نام"
                        value={row.input1}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleInputChange(row.id, "input1", e.target.value)
                        }
                        className=" border border-gray-300 p-3 w-full rounded-lg focus:outline-none"
                      />
                    </div>
                    <div className="w-1/2">
                      <input
                        type="text"
                        name="attr"
                        placeholder="مقدار"
                        value={row.input2}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleInputChange(row.id, "input2", e.target.value)
                        }
                        className=" border border-gray-300 p-3 w-full rounded-lg focus:outline-none"
                      />
                    </div>
                    <div className="size-12">
                      <button
                        onClick={() => deleteRow(row.id)}
                        className=" border border-gray-300 size-12 w-full rounded-lg focus:outline-none flex items-center justify-center"
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
          <div className="w-1/4 space-y-5">
            <div className="border p-5 rounded-xl">
              {preview && (
                <div>
                  {" "}
                  <img
                    src={preview}
                    alt="Image Preview"
                    className=" max-w-[300px] max-h-[300px] mx-auto"
                  />{" "}
                </div>
              )}
              {!preview ? (
                <div className="bg-red-100 rounded-xl border border-dashed border-red-400 flex items-center justify-center p-10">
                  <div>
                    <h2 className="text-red-400">بازگذاری عکس اصلی</h2>
                    <div className="mt-3 text-center">
                      <button
                        type="button"
                        className="text-white bg-red-500 rounded-xl py-3 px-6 font-bold"
                        onClick={() =>
                          document.getElementById("mainimg")?.click()
                        }
                      >
                        انتخاب تصویر
                      </button>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      id="mainimg"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mt-3 text-center">
                    <button
                      type="button"
                      className="text-white bg-red-500 rounded-xl py-3 px-6 font-bold"
                      onClick={() =>
                        document.getElementById("mainimg")?.click()
                      }
                    >
                      تغییر تصویر
                    </button>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    id="mainimg"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              )}
            </div>
            <div className="border p-5 rounded-xl space-y-4">
              <div>
                <Select
                  dir="rtl"
                  onValueChange={(e) => setCategory(e)}
                  name="Manager"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="انتخاب" />
                  </SelectTrigger>
                  <SelectContent>
                    {Categories?.map((category: any, index: number) => (
                      <SelectItem value={category} key={index}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="items-center flex gap-2">
                <Checkbox id="BestProduct" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="BestProduct"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    محصول پرچم دار
                  </label>
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="bg-red-600 text-white w-full rounded-xl py-3 duration-150 hover:shadow-xl hover:shadow-red-200"
              >
                ثبت و انتشار
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

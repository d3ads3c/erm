"use client";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/toaster";
import { toast, useToast } from "@/hooks/use-toast";

interface NewProduct {
  model: string;
  brand: string;
  country: string;
}
interface NewFee {
  name: string;
  price: string;
}

export default function CategoriesComp() {
  const { toast } = useToast();
  const [productList, setProductList] = useState<[] | null>(null);
  const [feeList, setFeeList] = useState<[] | null>(null);

  const [newProduct, setNewProduct] = useState<NewProduct>({
    model: "",
    brand: "",
    country: "",
  });
  const [newFee, setNewFee] = useState<NewFee>({
    name: "",
    price: "",
  });

  function separateWithCommas(num: string): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name == "model" || name == "brand" || name == "country") {
      setNewProduct((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      if (name == "price") {
        setNewFee((prevState) => ({
          ...prevState,
          price: separateWithCommas(value),
        }));
      } else {
        setNewFee((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    }
  };
  const initialProductState: NewProduct = {
    model: "",
    brand: "",
    country: "",
  };
  const initialFeeState: NewFee = {
    name: "",
    price: "",
  };

  useEffect(() => {
    fetch("/api/aftersale/categories/list/products")
      .then((res) => res.json())
      .then((data) => {
        setProductList(data);
      });
    fetch("/api/aftersale/categories/list/fee")
      .then((res) => res.json())
      .then((data) => {
        setFeeList(data);
      });
  }, []);

  const SubmitProduct = () => {
    fetch("/api/aftersale/categories/new/product", {
      method: "POST",
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg == "Data stored") {
          toast({
            description: "محصول جدید ذخیره شد.",
          });
          setNewProduct({ ...initialProductState });
        }
      });
  };

  const SubmitFee = () => {
    fetch("/api/aftersale/categories/new/fee", {
      method: "POST",
      body: JSON.stringify(newFee),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg == "Data stored") {
          toast({
            description: "اجرت جدید ذخیره شد.",
          });
          setNewFee(initialFeeState);
        }
      });
  };
  return (
    <div>
      <div>
        <h1>دسته بندی ها</h1>
      </div>
      <div className="flex gap-5 mt-5">
        <div className="w-1/2">
          <div className="border rounded-xl p-5">
            <div className="flex items-center justify-between">
              <h2>محصول ها</h2>
              <Sheet>
                <SheetTrigger className="text-white bg-emerald-400 py-2 px-5 rounded-lg font-bold hover:shadow-xl hover:shadow-emerald-200 duration-150">
                  + افزودن
                </SheetTrigger>
                <SheetContent side={"left"}>
                  <SheetHeader>
                    <SheetTitle>تعریف محصول جدید</SheetTitle>
                  </SheetHeader>
                  <div className="space-y-5 my-5">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="w-full">
                        <p className="text-sm mb-2">برند</p>
                        <input
                          type="text"
                          name="brand"
                          value={newProduct.brand}
                          onChange={handleInputChange}
                          className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
                        />
                      </div>
                      <div className="w-full">
                        <p className="text-sm mb-2">مدل</p>
                        <input
                          type="text"
                          name="model"
                          value={newProduct.model}
                          onChange={handleInputChange}
                          className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
                        />
                      </div>
                      <div className="w-full">
                        <p className="text-sm mb-2">کشور ساخت</p>
                        <input
                          type="text"
                          name="country"
                          value={newProduct.country}
                          onChange={handleInputChange}
                          className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={SubmitProduct}
                        className="bg-emerald-400 text-white shadow-xl shadow-emerald-200 py-3 w-full rounded-lg"
                      >
                        ثبت محصول جدید
                      </button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <div className="max-h-[350px] overflow-auto">
              <table className="w-full relative table mt-3">
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
                <tbody className="max-h-[100px] overflow-auto">
                  {productList &&
                    productList.map((product: any, index: number) => (
                      <tr key={index}>
                        <td className="py-3 px-5">{product.Serial}</td>
                        <td className="py-3 px-5">{product.Brand}</td>
                        <td className="py-3 px-5">{product.Model}</td>
                        <td className="py-3 px-5">{product.country}</td>
                        <td className="py-3 px-5">
                          <div className="bg-emerald-100 text-emerald-400 rounded-lg p-2 text-center text-sm font-bold">
                            {product.Status}
                          </div>
                        </td>
                        <td>
                          <button className="text-center w-full">مشاهده</button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div className="border rounded-xl p-5">
            <div className="flex items-center justify-between">
              <h2>اجرت ها</h2>
              <Sheet>
                <SheetTrigger className="text-white bg-emerald-400 py-2 px-5 rounded-lg font-bold hover:shadow-xl hover:shadow-emerald-200 duration-150">
                  + افزودن
                </SheetTrigger>
                <SheetContent side={"left"}>
                  <SheetHeader>
                    <SheetTitle>تعریف اجرت جدید</SheetTitle>
                  </SheetHeader>
                  <div className="space-y-5 my-5">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="w-full">
                        <p className="text-sm mb-2">نام اجرت</p>
                        <input
                          type="text"
                          name="name"
                          value={newFee.name}
                          onChange={handleInputChange}
                          className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
                        />
                      </div>
                      <div className="w-full">
                        <p className="text-sm mb-2">هزینه</p>
                        <input
                          type="text"
                          name="price"
                          value={newFee.price}
                          onChange={handleInputChange}
                          className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={SubmitFee}
                        className="bg-emerald-400 text-white shadow-xl shadow-emerald-200 py-3 w-full rounded-lg"
                      >
                        ثبت محصول جدید
                      </button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <div className="max-h-[350px] overflow-auto">
              <table className="w-full relative table mt-3">
                <thead className="bg-gray-100 rounded-xl text-gray-500 text-right">
                  <tr>
                    <th className="rounded-r-xl py-3 px-5">شناسه</th>
                    <th>نام اجرت</th>
                    <th>هزینه</th>
                    <th>وضعیت</th>
                    <th className="rounded-l-xl py-3 px-5 text-center">
                      عملیات
                    </th>
                  </tr>
                </thead>
                <tbody className="max-h-[100px] overflow-auto">
                  {feeList &&
                    feeList.map((fee: any, index: number) => (
                      <tr key={index}>
                        <td className="py-3 px-5">{fee.Serial}</td>
                        <td className="py-3 px-5">{fee.Name}</td>
                        <td className="py-3 px-5">
                          {separateWithCommas(fee.Price)}
                        </td>
                        <td className="py-3 px-5">
                          <div className="bg-emerald-100 text-emerald-400 rounded-lg p-2 text-center text-sm font-bold">
                            {fee.Status}
                          </div>
                        </td>
                        <td>
                          <button className="text-center w-full">مشاهده</button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

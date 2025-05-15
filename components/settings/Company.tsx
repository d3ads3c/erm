"use client";
import React, { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast, useToast } from "@/hooks/use-toast";

export default function CompanyCom() {
  const { toast } = useToast();
  const [initialValues, setInitialValues] = useState<{ [key: string]: string }>(
    {
      Name: "",
      MeliID: "",
      FinacialCode: "",
      RegCode: "",
      RegDate: "",
      PostalCode: "",
      Address: "",
    }
  );

  const [CompValue, setValue] = useState<{ [key: string]: string }>({
    Name: "",
    MeliID: "",
    FinacialCode: "",
    RegCode: "",
    RegDate: "",
    PostalCode: "",
    Address: "",
  });

  useEffect(() => {
    fetch("/api/settings/company/info")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setInitialValues(data[0]);
          setValue(data[0]);
        }
      });
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValue({
      ...CompValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const json: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      json[key] = value as string;
    });
    await fetch("/api/settings/company/set", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(CompValue),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg == "Data Set") {
          toast({
            description: "اطلاعات شرکت با موفقیت ثبت شد.",
          });
        } else {
          toast({
            variant: "destructive",
            description: "ثبت اطلاعات با خطا مواجعه شد.",
          });
        }
      });
    setInitialValues(CompValue);
  };

  const isChanged = JSON.stringify(initialValues) !== JSON.stringify(CompValue);

  return (
    <div className="space-y-5">
      <div className="border p-3 rounded-xl">
        <div>
          <h2>اطاعات شرکت</h2>
          <p className="text-sm text-gray-400">
            تمامی اطلاعات به صورت رمز نگاری و غیرقابل مشاهده ذخیره می شوند.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mt-5">
            <div className="w-full">
              <p className="text-sm mb-1">نام شرکت</p>
              <input
                type="text"
                name="Name"
                value={CompValue.Name}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
              />
            </div>
            <div className="w-full">
              <p className="text-sm mb-1">شناسه ملی</p>
              <input
                type="text"
                name="MeliID"
                value={CompValue.MeliID}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
              />
            </div>
            <div className="w-full">
              <p className="text-sm mb-1">کد اقتصادی</p>
              <input
                type="text"
                name="FinacialCode"
                value={CompValue.FinacialCode}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
              />
            </div>
            <div className="w-full">
              <p className="text-sm mb-1">شماره ثبت</p>
              <input
                type="text"
                name="RegCode"
                value={CompValue.RegCode}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
              />
            </div>
            <div className="w-full">
              <p className="text-sm mb-1">تاریخ تاسیس</p>
              <input
                type="text"
                name="RegDate"
                value={CompValue.RegDate}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
              />
            </div>
            <div className="w-full">
              <p className="text-sm mb-1">کدپستی</p>
              <input
                type="text"
                name="PostalCode"
                value={CompValue.PostalCode}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
              />
            </div>
          </div>
          <div className="mt-5">
            <p className="text-sm mb-1">آدرس</p>
            <textarea
              name="Address"
              value={CompValue.Address}
              rows={5}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
            ></textarea>
          </div>
          <div className="flex items-center justify-end mt-3">
            <button
              type="submit"
              disabled={!isChanged}
              className={`bg-emerald-400 text-white w-fit py-2 px-5 rounded-xl duration-150 ${!isChanged && "opacity-50 cursor-not-allowed"
                }`}
            >
              ثبت مشخصات
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

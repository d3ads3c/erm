"use client";

import CustomCheckbox from "@/components/CustomCheckBox";
import { useState } from "react";

interface NewAcceptance {
  customer: {
    name: string;
    phone: string;
    nationalId: string;
    visitDate: string;
    address: string;
    customerNotes: string;
  };
  device: {
    brand: string;
    model: string;
    imei1: string;
    imei2: string;
    damageConditions: {
      impact: boolean;
      scratches: boolean;
      waterDamage: boolean;
      bent: boolean;
      off: boolean;
    };
    damageDescription: string;
    deviceNotes: string;
  };
  info: {
    technicianNotes: string;
  };
}

export default function NewacceptanceComp() {
  const [acceptance, setAcceptance] = useState<NewAcceptance>({
    customer: {
      name: "",
      phone: "",
      nationalId: "",
      visitDate: "",
      address: "",
      customerNotes: "",
    },
    device: {
      brand: "",
      model: "",
      imei1: "",
      imei2: "",
      damageConditions: {
        impact: false,
        scratches: false,
        waterDamage: false,
        bent: false,
        off: false,
      },
      damageDescription: "",
      deviceNotes: "",
    },
    info: {
      technicianNotes: "",
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name in acceptance.customer) {
      setAcceptance((prev) => ({
        ...prev,
        customer: {
          ...prev.customer,
          [name]: value,
        },
      }));
    } else if (name in acceptance.device) {
      setAcceptance((prev) => ({
        ...prev,
        device: {
          ...prev.device,
          [name]: value,
        },
      }));
    } else {
      setAcceptance((prev) => ({
        ...prev,
        info: {
          ...prev.info,
          [name]: value,
        },
      }));
    }
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setAcceptance((prev) => ({
      ...prev,
      device: {
        ...prev.device,
        damageConditions: {
          ...prev.device.damageConditions,
          [name]: checked,
        },
      },
    }));
  };

  const SubmitForm = async () => {

    const response = await fetch("/api/aftersale/acceptance/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(acceptance),
    });

    const result = await response.json();
    console.log(result);
  };

  return (
    <div className="space-y-5 my-5">
      <div className="flex items-center justify-between">
        <h2>پذیرش جدید</h2>
      </div>
      <div className="flex gap-5">
        <div className="w-3/4 space-y-3">
          <div className="rounded-xl p-5 border border-gray-200">
            <div>
              <h2 className="text-lg">اطلاعات مشتری</h2>
            </div>
            <div className="grid grid-cols-4 gap-5 my-5">
              <div className="w-full space-y-1">
                <p className="text-gray-500 text-sm">نام و نام خانوادگی</p>
                <input
                  type="text"
                  name="name"
                  value={acceptance.customer.name}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none"
                />
              </div>
              <div className="w-full space-y-1">
                <p className="text-gray-500 text-sm">شماره تماس</p>
                <input
                  type="text"
                  name="phone"
                  value={acceptance.customer.phone}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none"
                />
              </div>
              <div className="w-full space-y-1">
                <p className="text-gray-500 text-sm">کدملی</p>
                <input
                  type="text"
                  name="nationalId"
                  value={acceptance.customer.nationalId}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none"
                />
              </div>
              <div className="w-full space-y-1">
                <p className="text-gray-500 text-sm">تاریخ مراجعه</p>
                <input
                  type="text"
                  name="visitDate"
                  value={acceptance.customer.visitDate}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-1/2 space-y-1">
                <p className="text-gray-500 text-sm">آدرس</p>
                <textarea
                  name="address"
                  value={acceptance.customer.address}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none"
                ></textarea>
              </div>
              <div className="w-1/2 space-y-1">
                <p className="text-gray-500 text-sm">توضیخات مشتری</p>
                <textarea
                  name="customerNotes"
                  value={acceptance.customer.customerNotes}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none"
                ></textarea>
              </div>
            </div>
          </div>
          {/* Device Info */}
          <div className="rounded-xl p-5 border border-gray-200">
            <div>
              <h2 className="text-lg">اطلاعات دستگاه</h2>
            </div>
            <div className="grid grid-cols-4 gap-5 my-5">
              <div className="w-full space-y-1">
                <p className="text-gray-500 text-sm">برند دستگاه</p>
                <input
                  type="text"
                  name="brand"
                  value={acceptance.device.brand}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none"
                />
              </div>
              <div className="w-full space-y-1">
                <p className="text-gray-500 text-sm">مدل دستگاه</p>
                <input
                  type="text"
                  name="model"
                  value={acceptance.device.model}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none"
                />
              </div>
              <div className="w-full space-y-1">
                <p className="text-gray-500 text-sm">سریال / IMEI 1</p>
                <input
                  type="text"
                  name="imei1"
                  value={acceptance.device.imei1}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none"
                />
              </div>
              <div className="w-full space-y-1">
                <p className="text-gray-500 text-sm">سریال / IMEI 2</p>
                <input
                  type="text"
                  name="imei2"
                  value={acceptance.device.imei2}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none"
                />
              </div>
            </div>
            <div className="my-8 flex items-center text-sm gap-4">
              <CustomCheckbox
                id="impact"
                label="ضربه خوردگی"
                checked={acceptance.device.damageConditions.impact}
                onChange={(checked) => handleCheckboxChange("impact", checked)}
              />
              <CustomCheckbox
                id="scratches"
                label="خط و خش"
                checked={acceptance.device.damageConditions.scratches}
                onChange={(checked) =>
                  handleCheckboxChange("scratches", checked)
                }
              />
              <CustomCheckbox
                id="waterDamage"
                label="آب خوردگی"
                checked={acceptance.device.damageConditions.waterDamage}
                onChange={(checked) =>
                  handleCheckboxChange("waterDamage", checked)
                }
              />
              <CustomCheckbox
                id="bent"
                label="خم شدگی"
                checked={acceptance.device.damageConditions.bent}
                onChange={(checked) => handleCheckboxChange("bent", checked)}
              />
              <CustomCheckbox
                id="off"
                label="خاموش"
                checked={acceptance.device.damageConditions.off}
                onChange={(checked) => handleCheckboxChange("off", checked)}
              />
            </div>

            <div className="flex items-center gap-5">
              <div className="w-1/2 space-y-1">
                <p className="text-gray-500 text-sm">شرح خرابی</p>
                <textarea
                  name="damageDescription"
                  value={acceptance.device.damageDescription}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none"
                ></textarea>
              </div>
              <div className="w-1/2 space-y-1">
                <p className="text-gray-500 text-sm">توضیخات دستگاه</p>
                <textarea
                  name="deviceNotes"
                  placeholder="رمز دستگاه ..."
                  value={acceptance.device.deviceNotes}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4 h-full">
          <div className="space-y-5 sticky top-0">
            <div>
              <p className="text-gray-500 text-sm">توضیحات تکنسین</p>
              <p className="text-xs text-gray-600 mb-2">
                این قسمت فقط توسط تکنسین قابل مشاهده است.
              </p>
              <textarea
                name="technicianNotes"
                value={acceptance.info.technicianNotes}
                onChange={handleInputChange}
                rows={5}
                className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full !my-5">
        <button
          type="button"
          onClick={SubmitForm}
          className="text-white bg-emerald-400 rounded-lg py-4 w-full hover:shadow-lg hover:shadow-emerald-200 duration-150"
        >
          ثبت پذیرش جدید
        </button>
        <button
          type="button"
          className="text-red-500 rounded-lg py-1 w-full mt-5"
        >
          انصراف
        </button>
      </div>
    </div>
  );
}

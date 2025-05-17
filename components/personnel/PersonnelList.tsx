"use client";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/toaster";
import { toast, useToast } from "@/hooks/use-toast";
import JalaliDatePicker from "@/components/DatePicker";
import moment, { Moment } from "moment-jalaali";
import { useState, useEffect } from "react";
import { Value } from "@radix-ui/react-select";
import { split } from "postcss/lib/list";

interface Permission {
  ID: number;
  name: string;
  bg: string;
  text: string;
}
type Permissions = {
  [key: string]: Permission[];
};

type NewPersonnel = {
  Fname: string;
  Lname: string;
  Phone: string;
  Title: string;
  BDay: Moment | null;
  Permissions: string | null;
  Manager: string;
};

const Checkbox: React.FC<{
  id: string;
  className: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ id, className, checked, onChange }) => (
  <input
    type="checkbox"
    id={id}
    className={className}
    checked={checked}
    onChange={onChange}
  />
);

export default function PersonnelList() {
  const { toast } = useToast();
  const [permissions, setPermissions] = useState<Permissions>({});
  const [checkedPermissions, setCheckedPermissions] = useState<{
    [key: string]: boolean;
  }>({});
  const [permisisonModal, setModal] = useState<boolean>(false);
  const [personnels, setPersonnel] = useState<any[] | null>(null);
  const [managers, setManagers] = useState<string | null>(null);
  const [bDay, setBday] = useState(moment());
  const [statusFilter, setStatusFilter] = useState("all");
  const [newPersonnel, setNewPersonnel] = useState<NewPersonnel>({
    Fname: "",
    Lname: "",
    Phone: "",
    Title: "",
    BDay: moment(),
    Permissions: "",
    Manager: "",
  });

  const initialPersonnelState: NewPersonnel = {
    Fname: "",
    Lname: "",
    Phone: "",
    Title: "",
    BDay: moment(),
    Permissions: "",
    Manager: "",
  };

  const initialCheckedPermissions: { [key: string]: boolean } = {};
  const initialManagers: string | null = null;
  const initialBday = moment();

  useEffect(() => {
    async function GetPersonnel() {
      await fetch("/api/personnel/list")
        .then((res) => res.json())
        .then((data) => {
          setPersonnel(data);
        });
    }
    async function GetPermissions() {
      await fetch("/api/personnel/permissions")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPermissions(data);
        });
    }
    GetPersonnel();
    GetPermissions();
  }, []);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setCheckedPermissions((prev) => {
      const newCheckedPermissions = { ...prev };
      if (checked) {
        newCheckedPermissions[id] = checked;
      } else {
        delete newCheckedPermissions[id];
      }
      return newCheckedPermissions;
    });
  };

  const filteredPersonnels = personnels?.filter((user) => {
    if (statusFilter === "all") return true;
    return user.Status === statusFilter;
  });

  const getPermissionNameById = (id: string): string | undefined => {
    for (const main in permissions) {
      const subPermissions = permissions[main];
      const permission = subPermissions.find((p) => p.ID === Number(id));
      if (permission) {
        return permission.name;
      }
    }
    return undefined;
  };

  // Function to update the newPersonnel state
  const updatePersonnel = (field: keyof NewPersonnel, value: string) => {
    setNewPersonnel((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  // Example usage
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name == "Phone") {
      let Phone = value;
      // Remove any non-numeric characters
      Phone = value.replace(/[^\d]/g, "");

      // Limit input value to 11 characters
      if (value.length > 11) {
        Phone = value.slice(0, 11);
      }
      updatePersonnel(name as keyof NewPersonnel, Phone);
    } else {
      updatePersonnel(name as keyof NewPersonnel, value);
    }
  };
  const submitData = () => {
    // Convert checkedPermissions to a string of comma-separated IDs
    const checkedPermissionsString = Object.keys(checkedPermissions)
      .filter((key) => checkedPermissions[key])
      .join(", ");

    // Update newPersonnel.Permissions and newPersonnel.Manager
    const updatedNewPersonnel = {
      ...newPersonnel,
      Permissions: checkedPermissionsString,
      Manager: managers || "",
      BDay: bDay.format("jYYYY/jMM/jDD"),
    };

    const dataString = JSON.stringify(updatedNewPersonnel);

    // Now you can post dataString to your endpoint
    fetch("/api/personnel/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: dataString }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data == "Mobile Exist") {
          toast({
            variant: "destructive",
            description: "کاربری با این شماره وجود دارد.",
          });
        } else if (data == "User Stored") {
          toast({
            description: "پرسنل جدید ذخیره شد.",
          });
          setNewPersonnel({ ...initialPersonnelState });
          setCheckedPermissions({ ...initialCheckedPermissions });
          setManagers(initialManagers);
          setBday(initialBday);
        }
      });
  };

  const findPermissionDetails = (id: number) => {
    for (const key in permissions) {
      const permissionArray = permissions[key];
      for (const permission of permissionArray) {
        if (permission.ID === id) {
          return {
            name: permission.name,
            bg: permission.bg,
            text: permission.text,
          };
        }
      }
    }
    return {
      name: "Unknown Permission",
      bg: "#ffffff",
      text: "#000000",
    };
  };
  return (
    <div className="space-y-5 p-3 xl:p-0">
      <div className="flex items-center justify-between">
        <h2 className="text-xs xl:text-base w-1/3">لیست پرسنل ها</h2>
        <div className="gap-3 items-center justify-center overflow-auto max-w-1/3 hide-scroll hidden xl:flex">
          <button
            className={`${statusFilter === "all"
              ? "bg-emerald-400 text-white"
              : "bg-gray-100 text-gray-400"
              } border border-gray-200 rounded-xl py-2 w-fit px-5 text-sm min-w-fit`}
            onClick={() => setStatusFilter("all")}
          >
            همه
          </button>
          <button
            className={`${statusFilter === "active"
              ? "bg-emerald-400 text-white"
              : "bg-gray-100 text-gray-400"
              } border border-gray-200 rounded-xl py-2 w-fit px-5 text-sm min-w-fit`}
            onClick={() => setStatusFilter("active")}
          >
            فعال
          </button>
          <button
            className={`${statusFilter === "inactive"
              ? "bg-emerald-400 text-white"
              : "bg-gray-100 text-gray-400"
              } border border-gray-200 rounded-xl py-2 w-fit px-5 text-sm min-w-fit`}
            onClick={() => setStatusFilter("inactive")}
          >
            غیرفعال
          </button>
          <button
            className={`${statusFilter === "suspend"
              ? "bg-emerald-400 text-white"
              : "bg-gray-100 text-gray-400"
              } border border-gray-200 rounded-xl py-2 w-fit px-5 text-sm min-w-fit`}
            onClick={() => setStatusFilter("suspend")}
          >
            تعلیق شده
          </button>
          <button
            className={`${statusFilter === "exit"
              ? "bg-emerald-400 text-white"
              : "bg-gray-100 text-gray-400"
              } border border-gray-200 rounded-xl py-2 w-fit px-5 text-sm min-w-fit`}
            onClick={() => setStatusFilter("exit")}
          >
            قطع همکاری
          </button>
        </div>
        <div className="xl:w-1/3 flex items-center justify-end">
          <Sheet>
            <SheetTrigger className="bg-emerald-400 text-white shadow-xl shadow-emerald-200 px-7 py-3 w-fit rounded-xl">
              پرسنل جدید
            </SheetTrigger>
            <SheetContent side={"left"} className="w-full xl:min-w-[500px]">
              <SheetHeader>
                <SheetTitle>ثبت پرسنل جدید</SheetTitle>
                <SheetDescription>
                  تمام اطلاعات به صورت رمزنگاری شده و غیرقابل مشاهده ذخیره خواهند
                  شد.
                </SheetDescription>
              </SheetHeader>
              {permisisonModal && (
                <div className="fixed top-0 left-0 w-full h-screen bg-black/30 flex items-center justify-center backdrop-blur-lg z-50">
                  <div className="xl:w-[40%] w-full h-[60%] bg-white shadow-xl rounded-2xl p-5">
                    <div className="h-[5%] w-full">
                      <h2>انتخاب سطح دسترسی کاربر</h2>
                    </div>
                    <div className="w-full max-h-[80%] h-[80%] overflow-auto">
                      {Object.keys(permissions).map((main) => (
                        <div key={main} className="my-5 border p-3 rounded-xl">
                          <div className="flex items-center gap-1">
                            <p className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              {main}
                            </p>
                          </div>
                          <div className="mr-2 border-r mt-3 pr-4 space-y-3">
                            {permissions[main].map((sub) => (
                              <div
                                key={sub.ID}
                                className="flex items-center gap-1"
                              >
                                <Checkbox
                                  id={String(sub.ID)}
                                  className="size-5"
                                  checked={!!checkedPermissions[sub.ID]}
                                  onChange={handleCheckboxChange}
                                />
                                <label
                                  htmlFor={String(sub.ID)}
                                  className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {sub.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="h-[15%] w-full flex items-end justify-end">
                      <button
                        type="button"
                        onClick={() => setModal(false)}
                        className="text-white bg-emerald-400 py-2 px-4 w-fit rounded-xl"
                      >
                        تایید دسترسی
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div className="space-y-5 my-5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="w-full">
                    <p className="text-sm mb-2">نام</p>
                    <input
                      type="text"
                      name="Fname"
                      value={newPersonnel.Fname}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-sm mb-2">نام خانوادگی</p>
                    <input
                      type="text"
                      name="Lname"
                      value={newPersonnel.Lname}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-sm mb-2">شماره همراه</p>
                    <input
                      type="text"
                      name="Phone"
                      value={newPersonnel.Phone}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-sm mb-2">سمت شغلی</p>
                    <input
                      type="text"
                      name="Title"
                      value={newPersonnel.Title}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
                    />
                  </div>
                </div>
                <div className="border p-3 rounded-lg">
                  <p className="text-sm mb-2">تاریخ تولد (اختیاری)</p>
                  <JalaliDatePicker
                    name={"Bday"}
                    value={bDay}
                    onChange={setBday}
                  />
                </div>
                <div className="border p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">دسترسی ها</p>
                    <button
                      type="button"
                      onClick={() => setModal(true)}
                      className="text-sm text-blue-400"
                    >
                      افزودن
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-3 rounded-xl mt-3">
                    {Object.keys(checkedPermissions).map((id) => (
                      <div
                        className="w-fit bg-gray-100 rounded-full py-1 px-2 text-xs text-gray-400 flex items-center gap-2"
                        key={id}
                      >
                        <p>{getPermissionNameById(id)}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm mb-2">انتخاب سرپرست</p>
                  <Select
                    dir="rtl"
                    onValueChange={(e) => setManagers(e)}
                    name="Manager"
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="انتخاب" />
                    </SelectTrigger>
                    <SelectContent>
                      {personnels?.map(
                        (personnel: any, index: number) =>
                          personnel.Status == "active" && (
                            <SelectItem value={personnel.ID} key={index}>
                              {personnel.Fname + " " + personnel.Lname}
                            </SelectItem>
                          )
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={submitData}
                    className="bg-emerald-400 text-white shadow-xl shadow-emerald-200 py-3 w-full rounded-lg"
                  >
                    ثبت پرسنل جدید
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="gap-3 items-center overflow-auto max-w-1/3 hide-scroll xl:hidden flex !mt-8">
        <button
          className={`${statusFilter === "all"
            ? "bg-emerald-400 text-white"
            : "bg-gray-100 text-gray-400"
            } border border-gray-200 rounded-xl py-2 w-fit px-5 text-sm min-w-fit`}
          onClick={() => setStatusFilter("all")}
        >
          همه
        </button>
        <button
          className={`${statusFilter === "active"
            ? "bg-emerald-400 text-white"
            : "bg-gray-100 text-gray-400"
            } border border-gray-200 rounded-xl py-2 w-fit px-5 text-sm min-w-fit`}
          onClick={() => setStatusFilter("active")}
        >
          فعال
        </button>
        <button
          className={`${statusFilter === "inactive"
            ? "bg-emerald-400 text-white"
            : "bg-gray-100 text-gray-400"
            } border border-gray-200 rounded-xl py-2 w-fit px-5 text-sm min-w-fit`}
          onClick={() => setStatusFilter("inactive")}
        >
          غیرفعال
        </button>
        <button
          className={`${statusFilter === "suspend"
            ? "bg-emerald-400 text-white"
            : "bg-gray-100 text-gray-400"
            } border border-gray-200 rounded-xl py-2 w-fit px-5 text-sm min-w-fit`}
          onClick={() => setStatusFilter("suspend")}
        >
          تعلیق شده
        </button>
        <button
          className={`${statusFilter === "exit"
            ? "bg-emerald-400 text-white"
            : "bg-gray-100 text-gray-400"
            } border border-gray-200 rounded-xl py-2 w-fit px-5 text-sm min-w-fit`}
          onClick={() => setStatusFilter("exit")}
        >
          قطع همکاری
        </button>
      </div>
      <div className="w-full overflow-auto hide-scroll">
        <table className="table-fixed mt-3 relative overflow-auto hide-scroll w-max xl:w-full">
          <thead className="bg-gray-100 rounded-xl text-gray-500 text-right text-xs xl:text-base">
            <tr>
              <th className="rounded-r-xl py-3 px-5">پرسنل</th>
              <th>سرپرست / مدیر</th>
              <th>واحد</th>
              <th className="">دسترسی ها</th>
              <th>تاریخ تولد</th>
              <th>وضعیت</th>
              <th className="rounded-l-xl py-3 px-5 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody className="text-right text-xs xl:text-base">
            {filteredPersonnels?.map((user: any, index: number) => (
              <tr className="border-b" key={index}>
                <td className="py-5 px-5">
                  <div className="flex items-center gap-2">
                    <div>
                      <Image
                        src={"/img/default-user-icon.jpg"}
                        width={45}
                        height={45}
                        alt="User Image"
                        className="rounded-xl"
                      ></Image>
                    </div>
                    <div>
                      <h2>{user.Fname + " " + user.Lname}</h2>
                      <p className="text-xs text-gray-400">{user.Title}</p>
                    </div>
                  </div>
                </td>
                <td>{user.Manager}</td>
                <td>{user.Departman}</td>
                <td className="">
                  <div className="flex flex-wrap max-w-[400px] my-3 items-center gap-3">
                    {Array.isArray(user.Permission) ? (
                      user.Permission.map((id: number, index: number) => {
                        const { name, bg, text } = findPermissionDetails(id);
                        return (
                          <div
                            key={index}
                            className="rounded-lg py-1 px-2 w-fit text-xs"
                            style={{ backgroundColor: bg, color: text }}
                          >
                            {name}
                          </div>
                        );
                      })
                    ) : (
                      <div
                        className="rounded-lg py-1 px-2 w-fit text-xs"
                        style={{
                          backgroundColor: findPermissionDetails(
                            user.Permission
                          ).bg,
                          color: findPermissionDetails(user.Permission).text,
                        }}
                      >
                        {findPermissionDetails(user.Permission).name}
                      </div>
                    )}
                  </div>
                </td>

                <td>
                  {user.BDay}
                </td>

                <td>
                  {user.Status == "active" ? (
                    <div className="rounded-lg py-1 px-2 bg-emerald-100 text-emerald-500 w-fit xl:text-sm flex items-center gap-1 justify-center text-xs">
                      <span className="relative flex size-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400"></span>
                      </span>
                      <p>فعال</p>
                    </div>
                  ) : user.Status == "exit" ? (
                    <div className="rounded-lg py-1 px-2 bg-red-100 text-red-500 w-fit xl:text-sm flex items-center gap-1 justify-center text-xs">
                      <span className="relative flex size-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex size-2.5 rounded-full bg-red-400"></span>
                      </span>
                      <p>قطع همکاری</p>
                    </div>
                  ) : (
                    user.Status == "suspend" && (
                      <div className="rounded-lg py-1 px-2 bg-orange-100 text-orange-500 w-fit xl:text-sm flex items-center gap-1 justify-center text-xs">
                        <span className="relative flex size-2.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                          <span className="relative inline-flex size-2.5 rounded-full bg-orange-400"></span>
                        </span>
                        <p>تعلیق شده</p>
                      </div>
                    )
                  )}
                </td>
                <td className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="bg-gray-100 rounded-lg px-4 py-2 text-gray-500">
                      <p>گزینه ها</p>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[200px] ml-12">
                      <DropdownMenuLabel>
                        {user.Fname + " " + user.Lname}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>پروفایل</DropdownMenuItem>
                      <DropdownMenuItem>تغییر دسترسی</DropdownMenuItem>
                      <DropdownMenuItem>تغییر وضعیت</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Toaster />
    </div>
  );
}

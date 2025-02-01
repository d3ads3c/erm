import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function Tasks() {
  return (
    <Tabs
      defaultValue="vacation"
      className="w-full border rounded-xl p-5 max-h-[400px] h-[400px] bg-white dark:bg-[#121212]"
      dir="rtl"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-bold">پروژه و لیست کار ها</h2>
        <TabsList className="flex items-center gap-3">
          <TabsTrigger value="vacation">لیست کار ها</TabsTrigger>
          <TabsTrigger value="imprest">پروژه ها</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent
        value="vacation"
        className="space-y-3 max-h-[270px] overflow-auto hide-scroll"
      >
        <table className="w-full table mt-3">
          <thead className="bg-gray-100 rounded-xl text-gray-500 text-center">
            <tr>
              <th className="rounded-r-xl py-2 px-5">#</th>
              <th>عنوان</th>
              <th>وضعیت</th>
              <th>افراد</th>
              <th>تاریخ اتمام</th>
              <th className="rounded-l-xl py-2 px-5">الویت</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td className="p-1"></td>
            </tr>
            <tr>
              <td className="py-5">TSK-324</td>
              <td>سایت رادیکال</td>
              <td>
                <div className="rounded-lg py-1 px-2 bg-sky-100 text-sky-500 w-fit text-sm mx-auto">
                  درحال انجام
                </div>
              </td>
              <td>
                <div className="flex items-center justify-center">
                  <div className="size-8 rounded-full">
                    <Image
                      src={"/img/default-user-icon.jpg"}
                      width={32}
                      height={32}
                      alt="User Image"
                      className="rounded-full"
                    ></Image>
                  </div>
                  <div className="size-8 rounded-full -mr-4">
                    <Image
                      src={"/img/default-user-icon.jpg"}
                      width={32}
                      height={32}
                      alt="User Image"
                      className="rounded-full"
                    ></Image>
                  </div>
                  <div className="size-8 rounded-full -mr-4">
                    <Image
                      src={"/img/default-user-icon.jpg"}
                      width={32}
                      height={32}
                      alt="User Image"
                      className="rounded-full"
                    ></Image>
                  </div>
                </div>
              </td>
              <td>1403/10/05</td>
              <td>
                <div className="rounded-lg py-1 px-2 bg-red-100 text-red-500 w-fit text-sm mx-auto flex items-center gap-1 justify-center">
                  <i className="fi fi-rr-clock-three mt-1.5"></i>
                  <p>فوری</p>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-5">TSK-324</td>
              <td>سایت رادیکال</td>
              <td>
                <div className="rounded-lg py-1 px-2 bg-emerald-100 text-emerald-500 w-fit text-sm mx-auto">
                  تکمیل شده
                </div>
              </td>
              <td>
                <div className="flex items-center justify-center">
                  <div className="size-8 rounded-full">
                    <Image
                      src={"/img/default-user-icon.jpg"}
                      width={32}
                      height={32}
                      alt="User Image"
                      className="rounded-full"
                    ></Image>
                  </div>
                  <div className="size-8 rounded-full -mr-4">
                    <Image
                      src={"/img/default-user-icon.jpg"}
                      width={32}
                      height={32}
                      alt="User Image"
                      className="rounded-full"
                    ></Image>
                  </div>
                  <div className="size-8 rounded-full -mr-4">
                    <Image
                      src={"/img/default-user-icon.jpg"}
                      width={32}
                      height={32}
                      alt="User Image"
                      className="rounded-full"
                    ></Image>
                  </div>
                </div>
              </td>
              <td>1403/10/05</td>
              <td>
                <div className="rounded-lg py-1 px-2 bg-sky-100 text-sky-500 w-fit text-sm mx-auto flex items-center gap-1 justify-center">
                  <i className="fi fi-rr-clock-three mt-1.5"></i>
                  <p>عادی</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </TabsContent>
      <TabsContent value="imprest">
        <div className="w-full bg-gray-100 rounded-2xl h-[100px] text-center p-5 flex items-center justify-center text-gray-400">
          <div>
            <i className="fi fi-sr-drawer-empty text-2xl"></i>
            <p>هیج درخواستی وجود ندارد</p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}

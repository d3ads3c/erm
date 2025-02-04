import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function PersonnelList() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2>لیست پرسنل ها</h2>
      </div>
      <div>
        <table className="w-full table mt-3">
          <thead className="bg-gray-100 rounded-xl text-gray-500 text-right">
            <tr>
              <th className="rounded-r-xl py-3 px-5">پرسنل</th>
              <th>سرپرست / مدیر</th>
              <th>واحد</th>
              <th>دسترسی ها</th>
              <th>عضویت</th>
              <th>وضعیت</th>
              <th className="rounded-l-xl py-3 px-5 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody className="text-right">
            <tr>
              <td className="p-1"></td>
            </tr>
            <tr className="border-b">
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
                    <h2>نیما نیک عمل</h2>
                    <p className="text-xs text-gray-400">مدیر تحقیق و توسعه</p>
                  </div>
                </div>
              </td>
              <td>محمدهادی فتحی</td>
              <td>
                <div className="rounded-lg py-1 px-2 bg-cyan-100 text-cyan-500 w-fit text-sm">
                  فناوری اطلاعات
                </div>
              </td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg py-1 px-2 bg-emerald-100 text-emerald-500 w-fit text-sm">
                    دسترسی کامل
                  </div>
                </div>
              </td>
              <td>1401/03/02</td>

              <td>
                <div className="rounded-lg py-1 px-2 bg-emerald-100 text-emerald-500 w-fit text-sm flex items-center gap-1 justify-center">
                  <span className="relative flex size-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400"></span>
                  </span>
                  <p>فعال</p>
                </div>
              </td>
              <td className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger className="bg-gray-100 rounded-lg px-4 py-2 text-gray-500">
                    <p>گزینه ها</p>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[200px]">
                    <DropdownMenuLabel>نیما نیک عمل</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>پروفایل</DropdownMenuItem>
                    <DropdownMenuItem>تغییر دسترسی</DropdownMenuItem>
                    <DropdownMenuItem>تغییر وضعیت</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

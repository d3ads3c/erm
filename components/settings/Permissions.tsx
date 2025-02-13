"use client";
import { useState, useEffect } from "react";

type Permission = {
  ID: number;
  name: string;
};

type Permissions = {
  [key: string]: Permission[];
};

export default function PermissionsComp() {
  const [Permissions, setPermissions] = useState<Permissions>({});

  useEffect(() => {
    fetch("/api/settings/permissions/list")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPermissions(data);
      });
  }, []);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2>لیست دسترسی ها</h2>
      </div>
      <div>
        <table className="w-full table mt-3">
          <thead className="bg-gray-100 rounded-xl text-gray-500 text-right">
            <tr>
              <th className="rounded-r-xl py-3 px-5">#</th>
              <th>نام دسترسی</th>
              <th>اعضاء</th>
              <th>وضعیت</th>
              <th className="rounded-l-xl py-3 px-5 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody className="text-right">
            {Object.keys(Permissions).map((main: any, index: number) => (
              <tr key={index} className="border-b">
                <td className="py-5 px-5">{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3 ">
                    <div className="rounded-full size-4 bg-purple-100 outline outline-cyan-500 outline-offset-1 shadow-xl shadow-cyan-200"></div>
                    {main}
                  </div>
                </td>
                <td>3 نفر</td>
                <td>{main}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

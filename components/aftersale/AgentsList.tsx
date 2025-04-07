"use client";
import { useEffect, useState } from "react";

export default function AgentsList() {
  const [agents, setAgents] = useState<null | []>(null);

  useEffect(() => {
    fetch("/api/agents/list")
      .then((res) => res.json())
      .then((data) => {
        setAgents(data);
        console.log(data);
      });
  }, []);
  return (
    <div>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2>لیست نمایندگان</h2>
        </div>
      </div>
      <div>
        <table className="w-full table mt-3">
          <thead className="bg-gray-100 rounded-xl text-gray-500 text-right">
            <tr>
              <th className="rounded-r-xl py-3 px-5">شماره</th>
              <th>نام فروشگاه</th>
              <th>استان</th>
              <th>شهر</th>
              <th>آدرس</th>
              <th>تلفن</th>
              <th>وضعیت</th>
              <th className="rounded-l-xl py-3 px-5 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody className="text-right">
            {agents &&
              agents.map((agent: any) => (
                <tr className="border-b" key={agent.ID}>
                  <td className="py-5 px-5">{agent.ID}</td>
                  <td>{agent.Name}</td>
                  <td>{agent.State}</td>
                  <td>{agent.City}</td>
                  <td>{agent.Address}</td>
                  <td>{agent.Phone}</td>
                  <td>Active</td>
                  <td></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

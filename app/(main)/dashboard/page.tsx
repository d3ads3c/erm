import Image from "next/image";
import CompanyInfo from "@/components/dashboard/CompanyInfo";
import RequestTab from "@/components/dashboard/RequestsTab";
import TodoList from "@/components/dashboard/TodoList";
import Tasks from "@/components/dashboard/Tasks";
export default function Home() {
  return (
    <div className="space-y-5 p-3 xl:p-0">
      <CompanyInfo />
      <div>
        <TodoList />
      </div>
      <div className="w-full gap-5 xl:flex space-y-5 xl:space-y-0">
        <div className="xl:w-2/6">
          <RequestTab />
        </div>
        <div className="xl:w-4/6">
          <Tasks />
        </div>
      </div>
    </div>
  );
}

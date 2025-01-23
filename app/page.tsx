import Image from "next/image";
import CompanyInfo from "@/components/dashboard/CompanyInfo";
import RequestTab from "@/components/dashboard/RequestsTab";
export default function Home() {
  return (
    <div className="space-y-5">
      <CompanyInfo />
      <div className="w-full gap-5 flex">
        <div className="w-2/6">
          <RequestTab />
        </div>
      </div>
    </div>
  );
}

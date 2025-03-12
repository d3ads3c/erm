import { useState } from "react";
import Image from "next/image";
import LoadingImg from "@/public/loading.svg";

interface LoadingScreenProps {
  show: boolean;
}

export default function LoadingScreen({ show }: LoadingScreenProps) {
  if (!show) return null;

  return (
    <div className="fixed top-0 right-0 flex items-center justify-center h-screen w-full backdrop-blur-xl z-50">
      <div className="xl:w-[30%] w-full  xl:bg-white rounded-3xl xl:shadow-xl p-10">
        <Image
          src={"/img/logo/arman-ops.png"}
          width={200}
          height={200}
          alt="Arman Ops Logo"
          className="mx-auto"
        />
        <Image
          className="animate-spin mx-auto -mt-5"
          src={LoadingImg}
          alt="Loading icon"
          width={80}
          height={80}
        />
      </div>
    </div>
  );
}

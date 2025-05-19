"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Toaster } from "@/components/ui/toaster";
import { toast, useToast } from "@/hooks/use-toast";
import LoadingScreen from "@/components/LoadingScreen";

export default function LoginPage() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>("");
  const [numbers, setNumbers] = useState<string[]>([]);
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [step, setStep] = useState<string>("number");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;

    // Remove any non-numeric characters
    value = value.replace(/[^\d]/g, "");

    // Limit input value to 11 characters
    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    setInputValue(value);
    setPhone(value);
  };

  const sendOTP = () => {
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        username: phone,
        otp: otp,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg == "LoggedIn") {
          localStorage.setItem(`UserInfo`, JSON.stringify(data));
          router.push("/dashboard");
        } else if (data.msg == "otp set") {
          setLoading(false);
          setStep("otp");
        } else if (data.msg == "invalid") {
          setLoading(false);
          toast({
            variant: "destructive",
            description: "کد ورود اشتباه است!",
          });
        }
      });
  };

  const LoginPassword = async () => {
    setLoading(true)
    await fetch("/api/login/username", {
      method: "POST",
      body: JSON.stringify({ Username: username, Password: password })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg == "LoggedIn") {
          localStorage.setItem(`UserInfo`, JSON.stringify(data));
          router.push("/dashboard");
        } else if (data.msg == "otp set") {
          setLoading(false);
          setStep("otp");
        } else if (data.msg == "invalid") {
          setLoading(false);
          toast({
            variant: "destructive",
            description: "کد ورود اشتباه است!",
          });
        }
      })
  }

  return (
    <div className="w-full h-screen flex items-center justify-center xl:bg-gray-50">
      <LoadingScreen show={loading} />
      <div className="bg-white xl:shadow-xl backdrop-blur-xl rounded-[35px] py-20 xl:w-[35%] h-fit space-y-5 xl:px-20 w-full px-10">
        <div className="w-full">
          <Image
            src={"/img/logo/arman-ops.png"}
            width={150}
            height={150}
            alt="Arman Ops Logo"
            className="mx-auto -my-10"
          ></Image>
        </div>
        <div>
          <h1>ورود به پنل</h1>
        </div>
        {/* <div>
          {step == "number" ? (
            <>
              <p>شماره همراه</p>
              <input
                type="number"
                value={inputValue}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded-xl focus:outline-none mt-1"
              />
            </>
          ) : (
            step == "otp" && (
              <div className="space-y-2 mt-5">
                <div className="flex items-center justify-between mb-3">
                  <p>کد تایید</p>
                  <button
                    type="button"
                    onClick={() => (
                      setStep("number"),
                      setOtp(""),
                      setPhone(""),
                      setInputValue("")
                    )}
                    className="text-cyan-500 text-sm"
                  >
                    تغییر شماره
                  </button>
                </div>
                <div className="w-full">
                  <InputOTP
                    maxLength={5}
                    className="mx-auto"
                    pattern={REGEXP_ONLY_DIGITS}
                    value={otp}
                    onChange={(value) => setOtp(value)}
                  >
                    <InputOTPGroup className="mx-auto xl:gap-9">
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={0} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
            )
          )}
        </div> */}
        <div className="space-y-5">
          <div>
            <p>شماره همراه</p>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded-xl focus:outline-none mt-1"
            />
          </div>
          <div>
            <p>رمز عبور</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded-xl focus:outline-none mt-1"
            />
          </div>
        </div>
        <div>
          {/* <button
            type="button"
            onClick={() => (sendOTP(), setLoading(true))}
            className={`py-3 w-full rounded-xl active:scale-95 duration-150 ${inputValue.trim().length !== 11
              ? "bg-gray-100 text-gray-300 cursor-not-allowed"
              : "bg-red-500 text-white shadow-xl shadow-red-200"
              }`}
            disabled={inputValue.trim().length !== 11}
          >
            ادامه
          </button> */}
          <button
            type="submit"
            onClick={LoginPassword}
            className={`py-3 w-full rounded-xl active:scale-95 duration-150 ${!username && !password
              ? "bg-gray-100 text-gray-300 cursor-not-allowed"
              : "bg-red-500 text-white shadow-xl shadow-red-200"
              }`}
          >
            ورود
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

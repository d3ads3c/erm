"use client";
import { useUserInfo } from "@/lib/functions"
import {
    Sheet,
    SheetContent,
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
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

type NewRequestProp = {
    Subject: string
    Fnumber: string
    Model: string
    Part: string
}

type RequestProp = {
    ID: number
    Subject: string
    Fnumber: string
    Model: string
    Part: string
    Accountant: string
    Ceo: string
    Manager: string
    MgnDate: string
    CeoDate: string
    AcDate: string
    Date: string
    TransID: string
    User: string
}

export default function BuyRequest() {
    const { toast } = useToast();
    const info = useUserInfo();

    const [newReq, setNewReq] = useState<NewRequestProp>({ Subject: "", Fnumber: "", Model: "", Part: "" });
    const Subjects = ['درخواست خرید', 'درخواست تعویض'];
    const [pendings, setPendings] = useState<RequestProp[] | null>(null);

    const SubmitReq = async () => {
        await fetch("/api/aftersale/request/new", {
            method: "POST",
            body: JSON.stringify(newReq)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.msg == "Inserted") {
                    toast({
                        description: "درخواست جدید با موفقیت ثبت شد.",
                    });
                    setNewReq({ Subject: "", Fnumber: "", Model: "", Part: "" }); // Reset form
                } else {
                    toast({
                        description: "عملیات با خطا مواجه شد.",
                    });
                }
                GetRequests();
            });
    };

    const GetRequests = async () => {
        await fetch("/api/aftersale/request/pending")
            .then((res) => res.json())
            .then((data) => {
                if (data.length) {
                    setPendings(data);
                } else {
                    setPendings([]);
                }
            });
    };

    const AcceptRequest = async (ID: number) => {
        await fetch("/api/aftersale/request/accept", {
            method: "POST",
            body: JSON.stringify({ ID: ID })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.msg == 'Accepted') {
                    toast({
                        description: "درخواست با موفقیت تایید شد.",
                    });
                    GetRequests();
                }
            });
    };

    useEffect(() => {
        GetRequests();
    }, []);

    if (!info) {
        return <div>در حال بارگذاری اطلاعات کاربر...</div>;
    }
    return (
        <div>
            <div className="flex items-center justify-between">
                <h2>درخواست ها</h2>
                <Sheet>
                    <SheetTrigger className="bg-emerald-400 text-white shadow-xl shadow-emerald-200 px-7 py-3 w-fit rounded-xl">
                        درخواست جدید
                    </SheetTrigger>
                    <SheetContent side={"left"} className="min-w-full xl:min-w-[500px]">
                        <SheetHeader>
                            <SheetTitle>درخواست جدید</SheetTitle>
                        </SheetHeader>
                        <div className="space-y-5 my-5">
                            <div>
                                <p className="text-sm mb-2">نوع درخواست</p>
                                <Select dir="rtl" value={newReq.Subject} onValueChange={(value) => setNewReq({ ...newReq, Subject: value })}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="انتخاب" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Subjects.map((subject: string, index: number) => (
                                            <SelectItem value={subject} key={index}>
                                                {subject}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="border p-3 rounded-lg">
                                <p className="text-sm mb-2">شماره قبض</p>
                                <input
                                    type="text"
                                    name="Fnumber"
                                    className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
                                    value={newReq.Fnumber}
                                    onChange={e => setNewReq({ ...newReq, Fnumber: e.target.value })}
                                />
                            </div>
                            <div className="border p-3 rounded-lg">
                                <p className="text-sm mb-2">مدل</p>
                                <input
                                    type="text"
                                    name="Model"
                                    className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
                                    value={newReq.Model}
                                    onChange={e => setNewReq({ ...newReq, Model: e.target.value })}
                                />
                            </div>
                            <div className="border p-3 rounded-lg">
                                <p className="text-sm mb-2">قطعه مورد نیاز</p>
                                <input
                                    type="text"
                                    name="Part"
                                    className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
                                    value={newReq.Part}
                                    onChange={e => setNewReq({ ...newReq, Part: e.target.value })}
                                />
                            </div>
                            <div>
                                <button
                                    type="button"
                                    onClick={SubmitReq}
                                    className="bg-emerald-400 text-white shadow-xl shadow-emerald-200 py-3 w-full rounded-lg"
                                >
                                    ثبت درخواست
                                </button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
            <div className="mt-5">
                <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-5">
                    {pendings && (
                        pendings.map((request) => (
                            <Link
                                href={"#"}
                                key={request.ID}
                                className="border rounded-2xl p-5 hover:shadow-xl duration-150"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="w-5/6 flex items-center gap-2 font-bold">
                                        <p className="text-gray-400 text-lg">#{request.ID} -</p>
                                        <p>{request.User}</p>
                                        <div className="w-fit px-3 py-1 rounded-lg font-bold text-sm bg-orange-100 text-orange-500">
                                            در انتظار تایید
                                        </div>
                                    </div>
                                    <div className="w-1/6"></div>
                                </div>
                                <div className="flex !my-5">
                                    {request.Manager === "pending" ? (
                                        <>
                                            <div className="w-1/5 text-center">
                                                <div className="size-5 border mx-auto border-dashed border-orange-400 rounded-full border-spacing-2"></div>
                                                <p className="text-orange-400 text-sm mt-3">تایید سرپرست</p>
                                            </div>
                                            <div className="w-1/5 h-0.5 border-orange-300 mt-3 border-dashed border"></div>
                                        </>
                                    ) : request.Manager === "accepted" ? (
                                        <>
                                            <div className="w-1/5 text-center">
                                                <div className="size-5 outline-1 mx-auto outline-offset-2 outline outline-emerald-400 rounded-full bg-emerald-400"></div>
                                                <p className="text-emerald-400 text-sm mt-3">تایید سرپرست</p>
                                                <p className="text-xs text-gray-400">{request.MgnDate.split("|")[0].replaceAll("-", "/") + " | " + request.MgnDate.split("|")[1].replaceAll("-", ":")}</p>
                                            </div>
                                            <div className="w-1/5 h-0.5 border-emerald-300 mt-3 border-dashed border"></div>
                                        </>
                                    ) : (
                                        request.Manager === "rejected" && (
                                            <>
                                                <div className="w-1/5 text-center">
                                                    <div className="size-5 outline-1 mx-auto outline-offset-2 outline outline-red-400 rounded-full bg-red-400"></div>
                                                    <p className="text-red-400 text-sm mt-3">تایید سرپرست</p>
                                                    <p className="text-xs text-gray-400">{request.MgnDate.split("|")[0].replaceAll("-", "/") + " | " + request.MgnDate.split("|")[1].replaceAll("-", ":")}</p>
                                                </div>
                                                <div className="w-1/5 h-0.5 border-red-300 mt-3 border-dashed border"></div>
                                            </>
                                        )
                                    )}
                                    {request.Ceo == "accepted" ? (
                                        <>
                                            <div className="w-1/5 text-center">
                                                <div className="size-5 outline-1 mx-auto outline-offset-2 outline outline-emerald-400 rounded-full bg-emerald-400"></div>
                                                <p className="text-gray-400 text-sm mt-3">
                                                    تایید مدیریت
                                                </p>
                                                <p className="text-xs text-gray-400">{request.CeoDate.split("|")[0].replaceAll("-", "/") + " | " + request.CeoDate.split("|")[1].replaceAll("-", ":")}</p>

                                            </div>
                                            <div className="w-1/5 h-0.5 border-emerald-300 mt-3 border-dashed border"></div>
                                        </>
                                    ) : request.Ceo === "rejected" ? (
                                        <>
                                            <div className="w-1/5 text-center">
                                                <div className="size-5 outline-1 mx-auto outline-offset-2 outline outline-red-400 rounded-full bg-red-400"></div>
                                                <p className="text-gray-400 text-sm mt-3">
                                                    تایید مدیریت
                                                </p>
                                                <p className="text-xs text-gray-400">{request.CeoDate.split("|")[0].replaceAll("-", "/") + " | " + request.CeoDate.split("|")[1].replaceAll("-", ":")}</p>
                                            </div>
                                            <div className="w-1/5 h-0.5 border-gray-300 mt-3 border-dashed border"></div>
                                        </>
                                    ) : request.Ceo == "pending" && request.Manager == "accepted" ? (

                                        <>
                                            <div className="w-1/5 text-center">
                                                <div className="size-5 border mx-auto border-dashed border-orange-400 rounded-full border-spacing-2"></div>
                                                <p className="text-orange-400 text-sm mt-3">
                                                    تایید مدیریت
                                                </p>
                                            </div>
                                            <div className="w-1/5 h-0.5 border-gray-300 mt-3 border-dashed border"></div>
                                        </>

                                    ) : request.Ceo == "pending" && request.Manager == "pending" && (
                                        <>
                                            <div className="w-1/5 text-center">
                                                <div className="size-5 border mx-auto border-dashed border-gray-400 rounded-full border-spacing-2"></div>
                                                <p className="text-gray-400 text-sm mt-3">
                                                    تایید مدیریت
                                                </p>
                                            </div>
                                            <div className="w-1/5 h-0.5 border-gray-300 mt-3 border-dashed border"></div>
                                        </>
                                    )}
                                    {(request.Accountant == "pending" && request.Ceo == 'accepted') ? (
                                        <div className="w-1/5 text-center">
                                            <div className="size-5 border mx-auto border-dashed border-orange-400 rounded-full border-spacing-2"></div>
                                            <p className="text-orange-400 text-sm mt-3">تکمیل درخواست</p>
                                        </div>
                                    ) : request.Accountant == 'rejected' ? (
                                        <div className="w-1/5 text-center">
                                            <div className="size-5 outline-1 mx-auto outline-offset-2 outline outline-red-400 rounded-full bg-red-400"></div>
                                            <p className="text-gray-400 text-sm mt-3">تکمیل درخواست</p>
                                            <p className="text-xs text-gray-400">{request.AcDate.split("|")[0].replaceAll("-", "/") + " | " + request.AcDate.split("|")[1].replaceAll("-", ":")}</p>

                                        </div>
                                    ) : request.Accountant == 'accepted' ? (
                                        <>
                                            <div className="w-1/5 text-center">
                                                <div className="size-5 outline-1 mx-auto outline-offset-2 outline outline-emerald-400 rounded-full bg-emerald-400"></div>
                                                <p className="text-emerald-400 text-sm mt-3">
                                                    تکمیل درخواست
                                                </p>
                                                <p className="text-xs text-gray-400">{request.AcDate.split("|")[0].replaceAll("-", "/") + " | " + request.AcDate.split("|")[1].replaceAll("-", ":")}</p>
                                            </div>
                                        </>
                                    ) : request.Accountant == 'pending' && request.Ceo == "pending" && (
                                        <div className="w-1/5 text-center">
                                            <div className="size-5 border mx-auto border-dashed border-gray-400 rounded-full border-spacing-2"></div>
                                            <p className="text-gray-400 text-sm mt-3">تکمیل درخواست</p>
                                        </div>
                                    )}
                                </div>
                                {((request.Manager == "pending" && info?.Permissions.includes("16")) || (request.Ceo == "pending" && info?.Permissions.includes("17")) || (request.Accountant == "pending" && info?.Permissions.includes("18"))) && (
                                    <div className="flex items-center justify-center gap-5 mt-1">
                                        <div className="w-1/2">
                                            <button type="button" onClick={() => AcceptRequest(request.ID)} className="text-emerald-400 text-center w-full border-emerald-400 rounded-xl border py-2 hover:bg-emerald-400 hover:text-white duration-150">
                                                <p>تایید</p>
                                            </button>
                                        </div>
                                        <div className="w-1/2">
                                            <button type="button" onClick={() => AcceptRequest(request.ID)} className="text-red-500 text-center w-full border-red-500 rounded-xl border py-2 hover:bg-red-500 hover:text-white duration-150">
                                                <p>رد</p>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center gap-8 my-5 w-full">
                                    <div className="flex items-center font-bold gap-2 text-gray-400">
                                        <i className="fi fi-sr-devices mt-1"></i>
                                        <div>
                                            <p className="text-xs text-gray-400">مدل دستگاه</p>
                                            <p className="text-black text-sm">Apple iPhone 16 Pro Max</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center font-bold gap-2 text-gray-400">
                                        <i className="fi fi-sr-receipt mt-1"></i>
                                        <div>
                                            <p className="text-xs text-gray-400">شماره قبض</p>
                                            <p className="text-black text-sm">52447</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full h-[0.5px] bg-gray-300"></div>
                                <div className="flex gap-5 mt-4">
                                    <div className="w-1/2">
                                        <p className="text-xs text-gray-500">توضیحات</p>
                                        <p className="text-sm">دوربین پشت</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}

                </div>
            </div>
            <Toaster />
        </div>
    )
}
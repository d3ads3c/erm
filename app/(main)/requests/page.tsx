import ImprestReq from "@/components/imprest/NewRequest"
import VacationReq from "@/components/vacation/NewRequest"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function RequestsPage() {
    return (
        <Tabs
            defaultValue="vacation"
            className="w-full p-3 xl:p-5 "
            dir="rtl"
        >
            <div className="mb-3">
                <h2 className="font-bold">درخواست های من</h2>
            </div>
            <TabsList className="w-full">
                <TabsTrigger value="vacation">مرخصی</TabsTrigger>
                <TabsTrigger value="imprest">مساعده</TabsTrigger>
            </TabsList>
            <TabsContent
                value="vacation"
                className="mt-5 xl:mt-0"
            >
                <VacationReq />
            </TabsContent>
            <TabsContent value="imprest" className="mt-5 xl:mt-0">
                <ImprestReq />
            </TabsContent>
        </Tabs>
    )

}
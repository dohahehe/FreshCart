import { Card, CardContent, CardHeader,  CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container max-w-7xl min-h-screen py-6 m-auto grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-5">
    
    <div className="md:col-span-1 flex justify-center items-center w-full h-150 md:h-1/2 lg:h-2/3 xl:h-150  bg-white rounded-xl border shadow-sm border-gray-200">
        <svg className="w-11 h-11 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" /></svg>
    </div>
    
    <div className="md:col-span-2 w-full items-center">
        <Card className="mx-auto w-full px-4 py-6 rounded-2xl overflow-hidden flex flex-col gap-4">
            <CardHeader> 
                 <div className="h-4 bg-gray-200 rounded-full w-1/8 mb-3" />
            </CardHeader>
            <CardContent>
                <div className="h-3 bg-gray-200 rounded-full w-1/4 mb-6" />
                <div className="h-3 bg-gray-200 rounded-full w-2/3 mb-2" />
            </CardContent>
           
            <CardFooter className="w-full flex items-center justify-between relative mt-auto">
                <div className="h-3 bg-gray-200 rounded-full text-left w-1/8" />
                <div className="flex w-1/2 gap-5 items-center justify-end">
                    <svg className="w-6 h-6 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                    </svg>
                    <div className="h-10 bg-gray-200 rounded-md w-1/3" />
                </div>
                
            </CardFooter>
            
        </Card>
    
    </div>
    </div>
  )
}

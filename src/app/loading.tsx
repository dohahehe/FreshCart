import { Spinner } from "@/components/ui/spinner"
import { Button } from '@/components/ui/button';
export default function Loading() {
  return (
     <div className="container max-w-7xl min-h-screen m-auto flex flex-col justify-center items-center">
       <Button className="text-gray-500 border border-gray-400" variant="outline" size="lg">
        <Spinner data-icon="inline-start text-gray-500" />
        Processing Products...
      </Button>
    </div>
  )
}

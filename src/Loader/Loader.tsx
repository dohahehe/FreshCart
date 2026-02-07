import { Spinner } from '@/components/ui/spinner'

function Loader() {
  return (
    <div className='w-full p-8 text-center'>
        <Spinner className="size-10 mx-auto text-green-600" />
        <p className='pt-4 text-xl text-gray-600'>Loading...</p>
    </div>
  )
}

export default Loader
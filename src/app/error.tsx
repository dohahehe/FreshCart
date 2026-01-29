'use client'
export default function Error() {
  return (
    <div className="container max-w-7xl min-h-screen m-auto flex flex-col justify-center items-center">
        
       <p className="flex gap-3">
            <span>
                <svg xmlns="http://www.w3.org" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <circle cx={12} cy={12} r={10} />
                <line x1={15} y1={9} x2={9} y2={15} />
                <line x1={9} y1={9} x2={15} y2={15} />
                </svg>

            </span>
            Error Please Try Again!
        </p>
    </div>
  )
}

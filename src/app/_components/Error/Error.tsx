import Link from 'next/link'

interface ErrorProps {
  title?: string
  message?: string
  showHomeButton?: boolean
  showContactButton?: boolean
}

function Error({ 
  title = "Something went wrong", 
  message = "We encountered an error while processing your request. Please try again or contact support if the issue persists.",
  showHomeButton = true,
  showContactButton = true
}: ErrorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 mx-auto">
      <div className="container max-w-4xl sm:min-w-lg md:min-w-2xl mx-auto px-4 py-8">
        <div className="bg-linear-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Icon Section */}
            <div className="md:w-1/3">
              <div className="w-24 h-24 mx-auto bg-linear-to-br from-red-100 to-rose-100 rounded-full flex items-center justify-center">
                <svg className="w-16 h-16 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>

            {/* Content Section */}
            <div className="md:w-2/3 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {title}
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <svg className="w-3 h-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-600">
                    {message}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {showHomeButton && (
                  <Link 
                    href="/"
                    className="px-6 py-3 bg-linear-to-br from-gray-900 to-gray-800 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Return to Home
                  </Link>
                )}

                {showContactButton && (
                  <Link 
                    href="/contact"
                    className="px-6 py-3 bg-linear-to-br from-red-100 to-rose-100 text-red-700 border border-red-200 rounded-lg font-medium hover:bg-red-200 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Contact Support
                  </Link>
                )}

               
              </div>

              {/* Technical Details (Optional) */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <details className="group">
                  <summary className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-gray-900">
                    <svg className="w-4 h-4 text-gray-500 group-open:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Technical Details
                  </summary>
                  <div className="mt-3 p-4 bg-gray-50 rounded-lg text-left">
                    <p className="text-xs text-gray-500 font-mono">
                      Error Code: ERR-{Math.floor(Math.random() * 10000)}
                      <br />
                      Timestamp: {new Date().toLocaleString()}
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Error
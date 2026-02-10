'use client'

import { signOut, useSession } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Loader from "@/Loader/Loader"
import Link from "next/link"
import { useState } from "react"
import { useQuery } from '@tanstack/react-query'
import { OrdersResponse } from '../order-confirmation/allorders/page'
import ErrorComponent from '../_components/Error/Error'

export default function Profile() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'settings'>('overview')
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  
  // Get Orders Data
  const { data: ordersData, isLoading, isError, error } = useQuery<OrdersResponse>({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await fetch('/api/orders')
      if (!response.ok) {
        throw new Error('Failed to fetch orders')
      }
      return response.json()
    }
  })
  
  const orders = Array.isArray(ordersData) ? ordersData : ordersData?.data || []
  const totalOrders = orders.length
  const totalSpent = orders.reduce((sum, order) => sum + order.totalOrderPrice, 0)
  const completedOrders = orders.filter(order => order.isPaid && order.isDelivered)
  const pendingOrders = orders.filter(order => !order.isPaid || !order.isDelivered)

  if (isLoading) return <Loader />

  if (isError) return <ErrorComponent message={error.message} showContactButton={false} />
  
  if (status === 'unauthenticated') {
    return (
      <div className="w-full">
        <div className="w-full bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-br from-green-100 to-emerald-100 rounded-full">
                  <svg 
                    className="w-4 h-4 text-green-600" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-green-600">Profile</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
            <div className="w-20 h-20 mx-auto mb-6 bg-green-50 rounded-full flex items-center justify-center">
              <svg 
                className="w-10 h-10 text-green-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Please Sign In
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              You need to be signed in to view and manage your profile.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button className="bg-green-600 hover:bg-green-700 cursor-pointer">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" className="cursor-pointer">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const user = session?.user
  const userRole = (user as any)?.role || 'customer'

  function logout() {
      signOut({
        callbackUrl: '/login'
      });
  }

  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <div className="w-full bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-br from-green-100 to-emerald-100 rounded-full">
                <svg 
                  className="w-4 h-4 text-green-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="text-sm font-medium text-green-600">Profile</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
            <p className="text-gray-600 max-w-2xl">
              Manage your profile, orders, and account settings
            </p>
          </div>

          <div className="flex flex-wrap gap-8">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-medium">{user?.name || 'User'}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge className={`px-4 py-1
              ${
                userRole === 'admin' 
                  ? 'bg-purple-50 text-purple-700' 
                  : userRole === 'vendor'
                  ? 'bg-blue-50 text-blue-700'
                  : 'bg-green-50 text-green-700'
              }`}>
                {userRole === 'admin' ? 'Administrator' : userRole === 'vendor' ? 'Vendor' : 'Customer'}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">{user?.email}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md">
              <div className="p-6 border-b">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-white">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{user?.name || 'User'}</h3>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-1">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'overview' 
                      ? 'bg-green-50 text-green-700' 
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-medium">Profile Overview</span>
                </button>

                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'orders' 
                      ? 'bg-green-50 text-green-700' 
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span className="font-medium">My Orders</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'settings' 
                      ? 'bg-green-50 text-green-700' 
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-medium">Account Settings</span>
                </button>

                <button
                onClick={() => {
                  logout();
                }} 
                className="pt-4 border-t mt-4 w-full">
                    <div className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors cursor-pointer text-red-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span className="font-medium">Sign Out</span>
                    </div>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md">
                  <div className="bg-green-600 p-6">
                    <div className="flex items-center gap-3">
                      <svg 
                        className="w-6 h-6 text-white" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <h2 className="text-2xl text-white font-bold">Profile Information</h2>
                    </div>
                    <p className="text-green-100 text-sm mt-1">
                      Your personal account details
                    </p>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* User Info Card */}
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <h3 className="font-bold text-gray-900">Personal Details</h3>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600">Full Name</p>
                            <p className="font-medium">{user?.name || 'Not set'}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-600">Email Address</p>
                            <p className="font-medium">{user?.email}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-600">Account Type</p>
                            <Badge className={`mt-1 ${
                              userRole === 'admin' 
                                ? 'bg-purple-50 text-purple-700' 
                                : userRole === 'vendor'
                                ? 'bg-blue-50 text-blue-700'
                                : 'bg-green-50 text-green-700'
                            }`}>
                              {userRole === 'admin' ? 'Administrator' : userRole === 'vendor' ? 'Vendor' : 'Customer'}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Account Stats */}
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <h3 className="font-bold text-gray-900">Order Summary</h3>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="text-sm text-gray-600">Total Orders</p>
                              <p className="font-bold text-lg text-gray-900">{orders.length}</p>
                            </div>
                            <Link href="/order-confirmation/allorders">
                              <Button variant="outline" size="sm" className="cursor-pointer">
                                View All
                              </Button>
                            </Link>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-green-50 rounded-lg">
                              <p className="text-sm text-green-700">Completed</p>
                              <p className="font-bold text-green-900">{completedOrders.length}</p>
                            </div>
                            
                            <div className="p-3 bg-yellow-50 rounded-lg">
                              <p className="text-sm text-yellow-700">Pending</p>
                              <p className="font-bold text-yellow-900">{pendingOrders.length}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <div>
                          <p className="text-green-800 font-medium">Account Security</p>
                          <p className="text-green-700 text-sm mt-1">
                            Your account is protected. For enhanced security, consider updating your password regularly.
                          </p>
                          <Button 
                            variant="outline" 
                            className="mt-3 cursor-pointer border-green-300 text-green-700 hover:bg-green-50"
                            onClick={() => setActiveTab('settings')}
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Change Password
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md">
                  <div className="bg-green-600 p-6">
                    <div className="flex items-center gap-3">
                      <svg 
                        className="w-6 h-6 text-white" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={1.5} 
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      <h2 className="text-2xl text-white font-bold">Order History</h2>
                    </div>
                    <p className="text-green-100 text-sm mt-1">
                      Your past orders
                    </p>
                  </div>
                  
                  <div className="p-6">
                      {orders.map((order) => {
                        const isSelected = selectedOrder === order._id
                        const totalItems = order.cartItems?.reduce((sum, item) => sum + item.count, 0) || 0
                        
                        return (
                          <div key={order._id} className="bg-white rounded-lg md:rounded-xl border border-gray-200 overflow-hidden shadow-sm md:shadow-md mb-4 md:mb-6">
                            {/* Order Header */}
                            <div className="p-4 md:p-6 border-b">
                              <div className="flex flex-col gap-3 md:gap-4">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                                  <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                      <h3 className="text-base md:text-lg font-semibold text-gray-900">
                                        Order #{order._id.substring(order._id.length - 8).toUpperCase()}
                                      </h3>
                                      <div className="flex flex-wrap gap-2">
                                        <Badge className={`text-xs md:text-sm ${
                                          order.isPaid 
                                            ? 'bg-green-50 text-green-700' 
                                            : 'bg-yellow-50 text-yellow-700'
                                        }`}>
                                          {order.isPaid ? 'Paid' : 'Pending'}
                                        </Badge>
                                        <Badge className={`text-xs md:text-sm ${
                                          order.isDelivered 
                                            ? 'bg-blue-50 text-blue-700' 
                                            : 'bg-gray-50 text-gray-700'
                                        }`}>
                                          {order.isDelivered ? 'Delivered' : 'Processing'}
                                        </Badge>
                                      </div>
                                    </div>
                                    
                                    {/* Order details - mobile stacked, desktop in row */}
                                    <div className="flex flex-col md:flex-row md:flex-wrap gap-2 md:gap-4 text-xs md:text-sm text-gray-600">
                                      <div className="flex items-center gap-1">
                                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                                      </div>
                                      
                                      <div className="flex items-center gap-1">
                                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>{order.totalOrderPrice.toFixed(2)} EGP</span>
                                      </div>
                                      
                                      <div className="flex items-center gap-1">
                                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span>{order.paymentMethodType === 'card' ? 'Card' : 'Cash'}</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="w-full md:w-auto">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => setSelectedOrder(isSelected ? null : order._id)}
                                      className="w-full md:w-auto cursor-pointer hover:bg-green-50 hover:text-green-700 hover:border-green-200 text-xs md:text-sm"
                                    >
                                      {isSelected ? 'Hide Details' : 'View Details'}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Order Details  */}
                            {isSelected && (
                              <div className="p-4 md:p-6 border-t bg-gray-50">
                                {/* Shipping Address */}
                                <div className="mb-4 md:mb-6">
                                  <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 flex items-center gap-2 text-sm md:text-base">
                                    <svg className="w-4 h-4 md:w-5 md:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Shipping Address
                                  </h4>
                                  <div className="bg-white p-3 md:p-4 rounded-lg border text-sm md:text-base">
                                    <p className="text-gray-800">{order.shippingAddress?.details || 'N/A'}</p>
                                    <p className="text-gray-600">{order.shippingAddress?.city || 'N/A'}</p>
                                    <p className="text-gray-600">{order.shippingAddress?.phone || 'N/A'}</p>
                                  </div>
                                </div>

                                {/* Order Items */}
                                <div className="mb-4 md:mb-6">
                                  <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 flex items-center gap-2 text-sm md:text-base">
                                    <svg className="w-4 h-4 md:w-5 md:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    Items ({totalItems})
                                  </h4>
                                  <div className="space-y-2 md:space-y-3">
                                    {order.cartItems?.map((item) => (
                                      <div key={item._id} className="flex items-start md:items-center gap-3 bg-white p-3 md:p-4 rounded-lg border">
                                        {/* Product Image */}
                                        <div className="w-12 h-12 md:w-16 md:h-16 rounded overflow-hidden shrink-0 bg-gray-100">
                                          {item.product?.imageCover ? (
                                            <img 
                                              src={item.product.imageCover} 
                                              alt={item.product.title || 'Product'}
                                              className="w-full h-full object-cover"
                                            />
                                          ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                              </svg>
                                            </div>
                                          )}
                                        </div>
                                        
                                        {/* Product Info */}
                                        <div className="flex-1 min-w-0">
                                          <h5 className="font-medium text-gray-900 text-sm md:text-base mb-1 line-clamp-2">
                                            {item.product?.title || 'Unknown Product'}
                                          </h5>
                                          {item.product?.category?.name && (
                                            <Badge className="hidden sm:visible bg-green-50 text-green-700 text-xs">
                                              {item.product.category.name}
                                            </Badge>
                                          )}
                                        </div>
                                        
                                        {/* Quantity and Price */}
                                        <div className="text-right min-w-20 md:min-w-25">
                                          <div className="flex flex-col md:flex-row md:items-center md:gap-3 mb-1">
                                            <span className="text-xs md:text-sm text-gray-600">Qty: {item.count}</span>
                                            <span className="text-xs md:text-sm font-medium">× {item.price.toFixed(2)} EGP</span>
                                          </div>
                                          <div className="font-bold text-sm md:text-base">
                                            {(item.price * item.count).toFixed(2)} EGP
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Order Summary */}
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 flex items-center gap-2 text-sm md:text-base">
                                    <svg className="w-4 h-4 md:w-5 md:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    Order Summary
                                  </h4>
                                  <div className="bg-white rounded-lg border p-3 md:p-4">
                                    <div className="space-y-2 text-sm md:text-base">
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Items Total</span>
                                        <span className="font-medium">
                                          {order.cartItems?.reduce((sum, item) => sum + (item.price * item.count), 0).toFixed(2)} EGP
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="font-medium">{order.shippingPrice.toFixed(2)} EGP</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Tax</span>
                                        <span className="font-medium">{order.taxPrice.toFixed(2)} EGP</span>
                                      </div>
                                      <div className="pt-2 border-t">
                                        <div className="flex justify-between">
                                          <span className="font-semibold text-gray-900">Total Amount</span>
                                          <span className="font-bold text-base md:text-lg text-gray-900">
                                            {order.totalOrderPrice.toFixed(2)} EGP
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                  </div>
                </div>
              </div>
            )}

            {/* Account Settings */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md">
                <div className="bg-green-600 p-6">
                  <div className="flex items-center gap-3">
                    <svg 
                      className="w-6 h-6 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h2 className="text-2xl text-white font-bold">Account Settings</h2>
                  </div>
                  <p className="text-green-100 text-sm mt-1">
                    Manage your account preferences and security
                  </p>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Password Change Section */}
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Change Password
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Update your password to keep your account secure.
                    </p>
                    <Button className="bg-green-600 hover:bg-green-700 cursor-pointer">
                      Change Password
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
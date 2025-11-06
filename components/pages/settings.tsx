"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/lib/store"
import { updateAccountInfo } from "@/lib/slices/settingsSlice"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export function Settings() {
  const dispatch = useDispatch<AppDispatch>()
  const { account, razorpay, subscription } = useSelector((state: RootState) => state.settings)
   const {  userFullData } = useSelector(
    (state: RootState) => state.auth
  );

  const [accountInfo, setAccountInfo] = useState(account)
  const [isRazorpayEnabled, setIsRazorpayEnabled] = useState(razorpay.isConnected)

  const handleAccountUpdate = () => {
    dispatch(updateAccountInfo(accountInfo))
  }

  return (
    <div>
      <Header title="Settings" subtitle="Manage your library's integration, account, and subscription details." />

      <div className="p-8 space-y-8 max-w-4xl">
        {/* Razorpay Integration */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Razorpay Integration</h3>
              <p className="text-sm text-muted-foreground">Connect your Razorpay account to accept payments.</p>
            </div>
            <button
              onClick={() => setIsRazorpayEnabled(!isRazorpayEnabled)}
              className={`w-12 h-6 rounded-full transition-colors ${isRazorpayEnabled ? "bg-blue-600" : "bg-gray-300"}`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  isRazorpayEnabled ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">API Key</label>
              <input
                type="password"
                value={razorpay.apiKey}
                className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">API Secret</label>
              <input
                type="password"
                value={razorpay.apiSecret}
                className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                disabled
              />
            </div>
          </div>

          {isRazorpayEnabled && (
            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 mb-6">
              <Check className="w-4 h-4" />
              Connected
            </div>
          )}

          <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
        </div>

        {/* Account Information */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Account Information</h3>
          <p className="text-sm text-muted-foreground mb-6">Update your library's details.</p>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Library Name</label>
                <input
                  type="text"
                  value={userFullData?.libraryData?.name || ""}
                  onChange={(e) => setAccountInfo({ ...accountInfo, libraryName: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Contact Email</label>
                <input
                  type="email"
                  value={userFullData?.libraryData?.contactEmail}
                  onChange={(e) => setAccountInfo({ ...accountInfo, contactEmail: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Address</label>
              <textarea
                value={userFullData?.libraryData?.address}
                onChange={(e) => setAccountInfo({ ...accountInfo, address: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <Button onClick={handleAccountUpdate} className="bg-blue-600 hover:bg-blue-700">
              Update Information
            </Button>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-lg">👑</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{subscription.plan}</h3>
                  <p className="text-sm text-muted-foreground">
                    Billed Monthly. Next payment on {subscription.nextBillingDate}.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">Cancel Plan</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Manage Subscription</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

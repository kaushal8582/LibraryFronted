"use client"

import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/lib/store"
import {
  toggleEmailReminders,
  toggleSmsReminders,
  toggleWhatsappReminders,
  setFrequency,
  setTiming,
  setPreviewTab,
} from "@/lib/slices/remindersSlice"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Mail, MessageSquare, MessageCircle } from "lucide-react"

export function Reminders() {
  const dispatch = useDispatch<AppDispatch>()
  const { settings, previewTab } = useSelector((state: RootState) => state.reminders)

  return (
    <div>
      <Header title="Reminder Settings" subtitle="" />

      <div className="p-2 md:p-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Settings Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Channels */}
           <div className="bg-card rounded-lg border border-border p-4 md:p-6">
  <h3 className="text-lg font-semibold text-foreground mb-6 max-sm:mb-4">Channels</h3>
  <div className="space-y-3 md:space-y-4">
    {/* Email Reminders */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg bg-secondary/50 gap-3 sm:gap-0">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 shrink-0">
          <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-foreground text-sm sm:text-base">Email Reminders</p>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Send reminders to student's registered email.
          </p>
        </div>
      </div>
      <button
        onClick={() => dispatch(toggleEmailReminders())}
        className={`w-12 h-6 rounded-full transition-colors self-end sm:self-auto ${
          settings.emailReminders ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-5 h-5 rounded-full bg-white transition-transform ${
            settings.emailReminders ? "translate-x-6" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>

    {/* SMS Reminders */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg bg-secondary/50 gap-3 sm:gap-0">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900 shrink-0">
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-foreground text-sm sm:text-base">SMS Reminders</p>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Send reminders via text message (charges may apply).
          </p>
        </div>
      </div>
      <button
        disabled={true}
        onClick={() => dispatch(toggleSmsReminders())}
        className={`w-12 h-6 rounded-full transition-colors self-end sm:self-auto ${
          settings.smsReminders ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-5 h-5 rounded-full bg-white transition-transform ${
            settings.smsReminders ? "translate-x-6" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>

    {/* WhatsApp Reminders */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg bg-secondary/50 gap-3 sm:gap-0">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900 shrink-0">
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-foreground text-sm sm:text-base">WhatsApp Reminders</p>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Reach students directly on WhatsApp.
          </p>
        </div>
      </div>
      <button
        disabled={true}
        onClick={() => dispatch(toggleWhatsappReminders())}
        className={`w-12 h-6 rounded-full transition-colors self-end sm:self-auto ${
          settings.whatsappReminders ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-5 h-5 rounded-full bg-white transition-transform ${
            settings.whatsappReminders ? "translate-x-6" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  </div>
</div>

            {/* Frequency & Timing */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Frequency & Timing</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label  className="block text-sm font-medium text-foreground mb-2">Send Reminders</label>
                  <select
                  disabled={true}
                    value={settings.frequency}
                    onChange={(e) => dispatch(setFrequency(e.target.value))}
                    className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option>Weekly</option>
                    <option>Bi-Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Timing</label>
                  <select
                  disabled={true}
                    value={settings.timing}
                    onChange={(e) => dispatch(setTiming(e.target.value))}
                    className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option>1 day before due date</option>
                    <option>3 days before due date</option>
                    <option>1 week before due date</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className="bg-card rounded-lg border border-border p-6 h-fit">
            <h3 className="text-lg font-semibold text-foreground mb-6">Live Preview</h3>

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-6 border-b border-border">
              {["Email", "SMS", "WhatsApp"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => dispatch(setPreviewTab(tab as "Email" | "SMS" | "WhatsApp"))}
                  className={`px-3 py-2 text-sm font-medium transition-colors border-b-2 ${
                    previewTab === tab ? "text-blue-600 border-blue-600" : "text-muted-foreground border-transparent"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Preview Content */}
            <div className="bg-secondary/50 rounded-lg p-4 mb-6 min-h-64">
              <p className="text-xs text-muted-foreground mb-2">To: student@example.com</p>
              <p className="text-xs text-muted-foreground mb-4">Subject: Friendly Reminder: Your Book is Due Soon!</p>
              <div className="text-sm text-foreground space-y-3">
                <p>Hi [Student Name],</p>
                <p>
                  This is a reminder that your book "[Book Title]" is due on [Due Date]. Please return it to avoid any
                  late fees.
                </p>
                <p>Thank you,</p>
                <p>LibTrack Library</p>
              </div>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700">Send Test Reminder</Button>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="flex justify-end">
          <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
        </div>
      </div>
    </div>
  )
}

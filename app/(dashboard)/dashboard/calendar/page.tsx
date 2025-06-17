"use client"

import type React from "react"
import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { CalendarIcon, Clock, Plus, Video } from "lucide-react"

export default function CalendarPage() {
  const { toast } = useToast()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isBooking, setIsBooking] = useState(false)

  const upcomingSessions = [
    {
      id: "1",
      title: "Live Q&A: Hair Styling Techniques",
      date: "June 15, 2025",
      time: "2:00 PM - 3:30 PM",
      instructor: "Sarah Johnson",
      location: "Zoom",
    },
    {
      id: "2",
      title: "Makeup Demo: Bridal Looks",
      date: "June 18, 2025",
      time: "1:00 PM - 2:30 PM",
      instructor: "Michael Chen",
      location: "Zoom",
    },
  ]

  const timeSlots = [
    { id: "1", time: "10:00 AM - 11:00 AM", available: true },
    { id: "2", time: "11:30 AM - 12:30 PM", available: true },
    { id: "3", time: "1:00 PM - 2:00 PM", available: false },
    { id: "4", time: "2:30 PM - 3:30 PM", available: true },
    { id: "5", time: "4:00 PM - 5:00 PM", available: true },
  ]

  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsBooking(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      toast({
        title: "Appointment booked",
        description: "Your appointment has been booked successfully.",
      })
      setIsBooking(false)
    } catch (error) {
      toast({
        title: "Error booking appointment",
        description: "There was an error booking your appointment. Please try again.",
        variant: "destructive",
      })
      setIsBooking(false)
    }
  }

  return (
    <div className="space-y-6">
      <DashboardHeader heading="Calendar" text="View your upcoming sessions and book appointments.">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Book Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Book an Appointment</DialogTitle>
              <DialogDescription>Schedule a one-on-one session with an instructor.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleBookAppointment}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="instructor">Select Instructor</Label>
                  <select
                    id="instructor"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  >
                    <option value="">Select an instructor</option>
                    <option value="sarah">Sarah Johnson - Hair Styling</option>
                    <option value="michael">Michael Chen - Makeup</option>
                    <option value="emily">Emily Rodriguez - Nail Care</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="topic">Topic</Label>
                  <Input id="topic" placeholder="What would you like to discuss?" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea id="notes" placeholder="Any specific questions or areas you'd like to focus on?" rows={3} />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isBooking}>
                  {isBooking ? "Booking..." : "Book Appointment"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </DashboardHeader>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>Your scheduled classes and appointments</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingSessions.length > 0 ? (
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="space-y-1 mb-4 md:mb-0">
                        <h3 className="font-medium">{session.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{session.time}</span>
                        </div>
                        <div className="text-sm">Instructor: {session.instructor}</div>
                      </div>
                      <Button variant="outline" className="md:ml-4">
                        <Video className="h-4 w-4 mr-2" />
                        Join Session
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">You don't have any upcoming sessions.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Calendly API integration
export async function getAvailableTimeSlots(instructorId: string, date: string) {
  try {
    // In a real application, this would make an API call to Calendly
    // For now, we'll return mock data
    const response = await fetch(
      `https://api.calendly.com/scheduling_links/${instructorId}/available_times?date=${date}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CALENDLY_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    )

    if (!response.ok) {
      throw new Error("Failed to fetch available time slots")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching Calendly time slots:", error)
    throw error
  }
}

export async function createBooking(instructorId: string, date: string, time: string, userId: string, details: any) {
  try {
    // In a real application, this would make an API call to Calendly
    // For now, we'll return mock data
    const response = await fetch(`https://api.calendly.com/scheduling_links/${instructorId}/bookings`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CALENDLY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date,
        time,
        user_id: userId,
        details,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to create booking")
    }

    return await response.json()
  } catch (error) {
    console.error("Error creating Calendly booking:", error)
    throw error
  }
}

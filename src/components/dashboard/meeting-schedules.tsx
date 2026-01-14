import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { MoreVertical } from "lucide-react"

const meetings = [
  { title: "Project Kickoff", date: "June 1, 2024", time: "10:00 AM" },
  { title: "Weekly Team Sync", date: "June 5, 2024", time: "02:00 PM" },
  { title: "Client Presentation", date: "June 10, 2024", time: "11:00 AM" },
  { title: "Monthly Review", date: "June 15, 2024", time: "03:00 PM" },
  { title: "Weekly Review", date: "June 20, 2024", time: "11:00 AM" },
  { title: "Yearly Meeting", date: "June 22, 2024", time: "09:00 AM" },
  { title: "Strategy Planning", date: "June 28, 2024", time: "02:00 PM" },
]

export function MeetingSchedule() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">Meeting Schedule</CardTitle>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left py-3 px-5 text-sm font-medium text-muted-foreground">Meeting Title</th>
                <th className="text-left py-3 px-5 text-sm font-medium text-muted-foreground">Meeting Date</th>
                <th className="text-left py-3 px-5 text-sm font-medium text-muted-foreground">Meeting Time</th>
              </tr>
            </thead>
            <tbody>
              {meetings.map((meeting, index) => (
                <tr
                  key={index}
                  className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors"
                >
                  <td className="py-3 px-5 text-sm text-foreground">{meeting.title}</td>
                  <td className="py-3 px-5 text-sm text-muted-foreground">{meeting.date}</td>
                  <td className="py-3 px-5 text-sm text-muted-foreground">{meeting.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

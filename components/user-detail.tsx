import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface User {
  id: string
  username: string
  role: string
  createdAt: Date
  updatedAt: Date
  sessions: {
    date: string
    duration: number
    exercises: {
      description: string
      usererrors: number
      timeSpent: number
    }[]
  }[]
  notes: string[]
}

export function UserDetail({ user }: { user: User }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">{user.username}</h2>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20">{user.role}</Badge>
            <span className="text-sm text-muted-foreground">Created: {user.createdAt.toLocaleDateString()}</span>
            <span className="text-sm text-muted-foreground">Updated: {user.updatedAt.toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="sessions" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sessions">Sessions ({user.sessions.length})</TabsTrigger>
          <TabsTrigger value="notes">Notes ({user.notes.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="sessions" className="space-y-4 mt-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Sessions History</CardTitle>
              <CardDescription>View all training sessions for this user</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <Accordion type="single" collapsible className="w-full">
                  {user.sessions.length > 0 ? (
                    user.sessions.map((session, index) => (
                      <AccordionItem key={index} value={`session-${index}`}>
                        <AccordionTrigger>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full pr-4 text-left">
                            <span>Session on {new Date(session.date).toLocaleDateString()}</span>
                            <span className="text-sm text-muted-foreground">Duration: {session.duration} minutes</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3 pt-2">
                            <h4 className="font-medium">Exercises ({session.exercises.length})</h4>
                            {session.exercises.map((exercise, idx) => (
                              <Card key={idx} className="overflow-hidden">
                                <div className="p-4 bg-muted/50">
                                  <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium">{exercise.description}</span>
                                      <Badge
                                        variant={exercise.usererrors > 2 ? "destructive" : "secondary"}
                                        className="ml-2"
                                      >
                                        {exercise.usererrors} errors
                                      </Badge>
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                      Time spent: {exercise.timeSpent} minutes
                                    </span>
                                  </div>
                                </div>
                              </Card>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))
                  ) : (
                    <div className="py-8 text-center text-muted-foreground">
                      <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-muted-foreground"
                        >
                          <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2"></path>
                          <path d="M10 7H9"></path>
                          <path d="M10 11H9"></path>
                          <path d="M10 15H9"></path>
                          <path d="M22 11v1a2 2 0 0 1-2 2h-7"></path>
                          <path d="m16 8-2 3 2 3"></path>
                          <path d="M22 8h-4"></path>
                        </svg>
                      </div>
                      No sessions found for this user.
                    </div>
                  )}
                </Accordion>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4 mt-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>User Notes</CardTitle>
              <CardDescription>Notes and comments about this user</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                {user.notes.length > 0 ? (
                  <div className="space-y-4">
                    {user.notes.map((note, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="p-4 bg-muted/50">
                          <p>{note}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </div>
                    No notes found for this user.
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


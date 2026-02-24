import ReactMarkdown from "react-markdown"
import { Flex, Card, Heading, Badge, ScrollArea } from "@radix-ui/themes"

type Entry = {
  version: string
  date: string
  title: string
  content: string
}

type Props = {
  entries: Entry[]
}

export default function ChangelogCard({ entries }: Props) {
  return (
    <Card>
      <Flex className="w-full px-2 py-3 h-[80vh] gap-5" direction={"column"} gap={"5"}>
        <Heading as="h2" className="px-1">Changelog</Heading>

        <ScrollArea type="always" scrollbars="vertical" style={{ height: "full", paddingRight: "2em" }}>
          <Flex direction={"column"} className="w-full gap-5">
            {entries.map((entry) => (
              <Card
                key={entry.version}
              >
                <Flex direction={"column"} className="w-full p-3">
                  <Flex justify={"between"} className="w-full items-center">
                    <Heading as="h3" size={"4"}>
                      {entry.version} – {entry.title}
                    </Heading>
                    <Badge size={"2"} color="iris">
                      {new Date(entry.date).toLocaleDateString("pl-PL", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      })}
                    </Badge>
                  </Flex>

                  <Flex direction={"column"} className="prose dark:prose-invert max-w-none">
                    <ReactMarkdown
                      components={{
                        h3: ({ children }) => {
                          const text = String(children)

                          let color = "text-foreground"
                          let bg = "bg-muted"

                          if (text.includes("Added")) {
                            color = "text-emerald-400"
                            bg = "bg-emerald-500/10"
                          }
                          if (text.includes("Fixed")) {
                            color = "text-red-400"
                            bg = "bg-red-500/10"
                          }
                          if (text.includes("Changed")) {
                            color = "text-yellow-400"
                            bg = "bg-yellow-500/10"
                          }

                          return (
                            <div className="mt-4 mb-3">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold tracking-wide ${color} ${bg}`}
                              >
                                {children}
                              </span>
                            </div>
                          )
                        },

                        ul: ({ children }) => (
                          <ul className="space-y-2 pl-2 list-disc">
                            {children}
                          </ul>
                        ),

                        li: ({ children }) => (
                          <li className="flex items-center gap-2 text-sm text-foreground">
                            {children}
                          </li>
                        ),
                      }}
                    >
                      {entry.content}
                    </ReactMarkdown>
                  </Flex>
                </Flex>
              </Card>
            ))}
          </Flex>
        </ScrollArea>
      </Flex>
    </Card>
  )
}
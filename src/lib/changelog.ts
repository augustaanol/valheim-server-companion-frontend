import "server-only"

import fs from "fs"
import path from "path"
import matter from "gray-matter"

const changelogDir = path.join(process.cwd(), "src/content/changelog")

export function getAllChangelogs() {
  const files = fs.readdirSync(changelogDir)

  return files
    .map((file) => {
      const filePath = path.join(changelogDir, file)
      const raw = fs.readFileSync(filePath, "utf8")
      const { data, content } = matter(raw)

      const formattedDate = new Date(data.date).toISOString() // 👈 stabilny format

      return {
        version: String(data.version),
        date: formattedDate,
        title: String(data.title),
        content,
      }
    })
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    )
}
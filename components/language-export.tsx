"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, Download } from "lucide-react"
import { LanguageExporter } from "../utils/language-exporters"
import type { LanguageExport } from "../types/export"

interface LanguageExportProps {
  pattern: string
  testString: string
}

export function LanguageExportComponent({ pattern, testString }: LanguageExportProps) {
  const [copiedLanguage, setCopiedLanguage] = useState<string | null>(null)
  const [exports, setExports] = useState<LanguageExport[]>([])

  const generateExports = () => {
    const languageExports = LanguageExporter.exportToLanguages(pattern, testString || "test string")
    setExports(languageExports)
  }

  const copyToClipboard = async (code: string, language: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedLanguage(language)
      setTimeout(() => setCopiedLanguage(null), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const downloadCode = (code: string, language: string) => {
    const extensions: Record<string, string> = {
      JavaScript: "js",
      Python: "py",
      Go: "go",
      Java: "java",
      "C#": "cs",
      PHP: "php",
      Ruby: "rb",
      Rust: "rs",
      Swift: "swift",
    }

    const extension = extensions[language] || "txt"
    const filename = `regex-example.${extension}`

    const blob = new Blob([code], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!pattern) {
    return (
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Export Code</CardTitle>
          <CardDescription>Generate code snippets for different programming languages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <p>Create a regex pattern first to see export options</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (exports.length === 0) {
    return (
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Export Code</CardTitle>
          <CardDescription>Generate code snippets for different programming languages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <Button onClick={generateExports} className="w-full">
              Generate Code Examples
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Export Code</CardTitle>
        <CardDescription>
          Code snippets for using your regex pattern:{" "}
          <Badge variant="outline" className="font-mono ml-2">
            {pattern}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={exports[0]?.language} className="w-full">
          <TabsList className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 h-auto p-1">
            {exports.slice(0, 9).map((exp) => (
              <TabsTrigger
                key={exp.language}
                value={exp.language}
                className="flex items-center gap-1 text-xs px-2 py-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <span>{exp.icon}</span>
                <span className="hidden sm:inline">{exp.language}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {exports.map((exp) => (
            <TabsContent key={exp.language} value={exp.language} className="mt-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium flex items-center gap-2">
                      <span>{exp.icon}</span>
                      {exp.language}
                    </h3>
                    <p className="text-sm text-gray-600">{exp.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(exp.code, exp.language)}
                      className="flex items-center gap-1"
                    >
                      {copiedLanguage === exp.language ? (
                        <>
                          <Check className="h-3 w-3" />
                          <span className="hidden sm:inline">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span className="hidden sm:inline">Copy</span>
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => downloadCode(exp.code, exp.language)}
                      className="flex items-center gap-1"
                    >
                      <Download className="h-3 w-3" />
                      <span className="hidden sm:inline">Download</span>
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{exp.code}</code>
                  </pre>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-4 pt-4 border-t">
          <Button onClick={generateExports} variant="outline" size="sm" className="w-full bg-transparent">
            Regenerate with Current Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

import type { TestResult } from "../types/regex"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface TestResultsProps {
  result: TestResult
  testString: string
}

export function TestResults({ result, testString }: TestResultsProps) {
  if (result.error) {
    return (
      <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
        <AlertCircle className="h-4 w-4 text-red-500" />
        <span className="text-sm text-red-700">Error: {result.error}</span>
      </div>
    )
  }

  if (!testString) {
    return <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-500 text-center">Enter a test string above</div>
  }

  const highlightMatches = (text: string, matches: typeof result.matches) => {
    if (matches.length === 0) return text

    let highlightedText = ""
    let lastIndex = 0

    matches.forEach((match, i) => {
      // Add text before match
      highlightedText += text.slice(lastIndex, match.index)

      // Add highlighted match
      highlightedText += `<mark class="bg-yellow-200 px-1 rounded">${match.match}</mark>`

      lastIndex = match.index + match.match.length
    })

    // Add remaining text
    highlightedText += text.slice(lastIndex)

    return highlightedText
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        {result.isMatch ? (
          <>
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium text-green-700">
              {result.matches.length} match{result.matches.length !== 1 ? "es" : ""} found
            </span>
          </>
        ) : (
          <>
            <XCircle className="h-4 w-4 text-red-500" />
            <span className="text-sm font-medium text-red-700">No matches found</span>
          </>
        )}
      </div>

      {result.isMatch && (
        <>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-xs font-medium text-gray-600 mb-2">Highlighted matches:</div>
            <div
              className="text-sm font-mono break-all"
              dangerouslySetInnerHTML={{
                __html: highlightMatches(testString, result.matches),
              }}
            />
          </div>

          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-600">Match details:</div>
            {result.matches.map((match, index) => (
              <div key={index} className="flex items-center gap-2 text-xs">
                <Badge variant="outline" className="font-mono">
                  {match.match}
                </Badge>
                <span className="text-gray-500">at position {match.index}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

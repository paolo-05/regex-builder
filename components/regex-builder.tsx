"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Copy, Play, RotateCcw, AlertTriangle } from "lucide-react";
import { RegexGenerator } from "../utils/regex-generator";
import { regexOptions } from "../utils/regex-options";
import { TestResults } from "./test-results";
import { LanguageExportComponent } from "./language-export";
import type { TestResult } from "../types/regex";
import Image from "next/image";
import { logo } from "@/images";

export default function MainComponent() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [testString, setTestString] = useState("");
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [hasTestedOnce, setHasTestedOnce] = useState(false);

  const regexGenerator = useMemo(() => new RegexGenerator(regexOptions), []);

  const generatedRegex = useMemo(() => {
    return regexGenerator.generateRegex(selectedOptions);
  }, [selectedOptions, regexGenerator]);

  const handleOptionChange = (optionId: string, checked: boolean) => {
    if (checked) {
      setSelectedOptions([...selectedOptions, optionId]);
    } else {
      setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
    }
    // Reset test results when options change
    setTestResult(null);
    setHasTestedOnce(false);
  };

  const handleTest = () => {
    if (generatedRegex && testString) {
      const result = regexGenerator.testRegex(generatedRegex, testString);
      setTestResult(result);
      setHasTestedOnce(true);
    }
  };

  const handleReset = () => {
    setSelectedOptions([]);
    setTestString("");
    setTestResult(null);
    setHasTestedOnce(false);
  };

  const handleCopy = () => {
    if (generatedRegex) {
      navigator.clipboard.writeText(generatedRegex);
    }
  };

  // Group options by category
  const groupedOptions = regexOptions.reduce((acc, option) => {
    if (!acc[option.category]) {
      acc[option.category] = [];
    }
    acc[option.category].push(option);
    return acc;
  }, {} as Record<string, typeof regexOptions>);

  const categoryDescriptions = {
    "Character Types": "Match specific types of characters",
    Quantifiers: "Specify how many times to match",
    "Anchors & Boundaries": "Match positions in the string",
    "Common Patterns": "Pre-built patterns for common use cases",
    "Special Characters": "Match specific special characters",
  };

  // Check for conflicts and warnings
  const hasConflicts = selectedOptions.some((optionId) => {
    const option = regexOptions.find((opt) => opt.id === optionId);
    return option?.conflictsWith?.some((conflictId) =>
      selectedOptions.includes(conflictId)
    );
  });

  const hasQuantifierWithoutBase = selectedOptions.some((optionId) => {
    const option = regexOptions.find((opt) => opt.id === optionId);
    return (
      option?.requiresBase &&
      !selectedOptions.some((id) => {
        const baseOption = regexOptions.find((opt) => opt.id === id);
        return (
          baseOption?.type === "character" || baseOption?.type === "special"
        );
      })
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 items-center justify-center flex">
            <Image
              src={logo}
              alt="Regex Builder Logo"
              width={40}
              height={40}
              className="inline-block mr-2"
            />
            Regex Builder
          </h1>
          <p className="text-lg text-gray-600">
            Create regular expressions by simply toggling checkboxes
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Options Panel */}
          <div className="lg:col-span-2 space-y-6">
            {Object.entries(groupedOptions).map(([category, options]) => (
              <Card key={category} className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{category}</CardTitle>
                  <CardDescription>
                    {
                      categoryDescriptions[
                        category as keyof typeof categoryDescriptions
                      ]
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {options.map((option) => {
                      const isSelected = selectedOptions.includes(option.id);
                      const hasConflict = option.conflictsWith?.some(
                        (conflictId) => selectedOptions.includes(conflictId)
                      );

                      return (
                        <div
                          key={option.id}
                          className={`flex items-start space-x-3 p-3 rounded-lg transition-colors ${
                            hasConflict
                              ? "bg-red-50 border border-red-200"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <Checkbox
                            id={option.id}
                            checked={isSelected}
                            onCheckedChange={(checked) =>
                              handleOptionChange(option.id, checked as boolean)
                            }
                            className="mt-0.5"
                            disabled={hasConflict}
                          />
                          <div className="flex-1 min-w-0">
                            <Label
                              htmlFor={option.id}
                              className={`text-sm font-medium cursor-pointer ${
                                hasConflict ? "text-red-600" : ""
                              }`}
                            >
                              {option.label}
                              {hasConflict && (
                                <AlertTriangle className="inline h-3 w-3 ml-1 text-red-500" />
                              )}
                            </Label>
                            <div className="mt-1">
                              <Badge
                                variant="secondary"
                                className="text-xs font-mono"
                              >
                                {option.pattern}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Output Panel */}
          <div className="space-y-6">
            {/* Warnings */}
            {(hasConflicts || hasQuantifierWithoutBase) && (
              <Card className="shadow-sm border-orange-200 bg-orange-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-orange-800 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Warnings
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-orange-700 space-y-2">
                  {hasConflicts && (
                    <p>• Some selected options conflict with each other</p>
                  )}
                  {hasQuantifierWithoutBase && (
                    <p>• Quantifiers need a character type to work with</p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Generated Regex */}
            <Card className="shadow-sm top-4">
              <CardHeader>
                <CardTitle className="text-lg">Generated Regex</CardTitle>
                <CardDescription>
                  Your regular expression pattern
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm break-all min-h-[60px] flex items-center">
                    {generatedRegex || (
                      <span className="text-gray-500">
                        Select options to generate regex
                      </span>
                    )}
                  </div>
                  {generatedRegex && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 h-8 w-8 p-0"
                      onClick={handleCopy}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={handleCopy}
                    disabled={!generatedRegex}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleReset}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Test Area */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Test Your Regex</CardTitle>
                <CardDescription>
                  Enter text to test against your pattern
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="test-input" className="text-sm font-medium">
                    Test String
                  </Label>
                  <Input
                    id="test-input"
                    placeholder="Enter text to test..."
                    value={testString}
                    onChange={(e) => setTestString(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <Button
                  className="w-full"
                  onClick={handleTest}
                  disabled={!generatedRegex || !testString}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Test Match
                </Button>

                <Separator />

                <div>
                  <Label className="text-sm font-medium">Results</Label>
                  <div className="mt-2">
                    {hasTestedOnce && testResult ? (
                      <TestResults
                        result={testResult}
                        testString={testString}
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-500 text-center">
                        {!generatedRegex
                          ? "Select options to generate a regex pattern"
                          : !testString
                          ? "Enter a test string above"
                          : "Click 'Test Match' to see results"}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Language Export */}
            <LanguageExportComponent
              pattern={generatedRegex}
              testString={testString}
            />

            {/* Selected Options Summary */}
            {selectedOptions.length > 0 && (
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Selected Options</CardTitle>
                  <CardDescription>
                    {selectedOptions.length} option(s) selected
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedOptions.map((optionId) => {
                      const option = regexOptions.find(
                        (opt) => opt.id === optionId
                      );
                      return (
                        <Badge
                          key={optionId}
                          variant="default"
                          className="text-xs"
                        >
                          {option?.label || optionId.replace("-", " ")}
                        </Badge>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

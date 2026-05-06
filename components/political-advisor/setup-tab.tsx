"use client";

import {
  AlertTriangle,
  ChevronsUpDown,
  FileText,
  RotateCcw,
  Shield,
  Sword,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FlagIcon } from "@/components/ui/flag-icon";
import { TabsContent } from "@/components/ui/tabs";
import { conflictTypes } from "@/lib/conflict-detection";
import {
  exampleQuestions,
  type ExampleScenario,
} from "@/lib/example-scenarios";
import { CountrySelector } from "./country-selector";
import { ExampleScenariosCarousel } from "./example-scenarios-carousel";
import type { Country } from "./types";

interface SetupTabProps {
  countries: Country[];
  selectedCountry: string;
  offensiveCountry: string;
  defensiveCountry: string;
  selectedCountryOpen: boolean;
  offensiveCountryOpen: boolean;
  defensiveCountryOpen: boolean;
  setSelectedCountryOpen: (v: boolean) => void;
  setOffensiveCountryOpen: (v: boolean) => void;
  setDefensiveCountryOpen: (v: boolean) => void;
  onSelectedCountryChange: (code: string) => void;
  onOffensiveCountryChange: (code: string) => void;
  onDefensiveCountryChange: (code: string) => void;
  conflictScenario: string;
  scenarioDetails: string;
  setScenarioDetails: (v: string) => void;
  severityLevel: string;
  setSeverityLevel: (v: string) => void;
  timeFrame: string;
  setTimeFrame: (v: string) => void;
  isMobile: boolean;
  isGeneratingBriefing: boolean;
  onApplyExample: (example: ExampleScenario) => void;
  onClear: () => void;
  onGenerate: () => void;
}

export function SetupTab(props: SetupTabProps) {
  const {
    countries,
    selectedCountry,
    offensiveCountry,
    defensiveCountry,
    selectedCountryOpen,
    offensiveCountryOpen,
    defensiveCountryOpen,
    setSelectedCountryOpen,
    setOffensiveCountryOpen,
    setDefensiveCountryOpen,
    onSelectedCountryChange,
    onOffensiveCountryChange,
    onDefensiveCountryChange,
    conflictScenario,
    scenarioDetails,
    setScenarioDetails,
    severityLevel,
    setSeverityLevel,
    timeFrame,
    setTimeFrame,
    isMobile,
    isGeneratingBriefing,
    onApplyExample,
    onClear,
    onGenerate,
  } = props;

  const detectedConflict = conflictTypes.find((t) => t.id === conflictScenario);

  return (
    <TabsContent value="setup" className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="border-dark-border/60 bg-dark-card/60 backdrop-blur-md rounded-2xl">
            <CardHeader className="bg-gradient-to-r from-flame/20 to-flame/10 py-4 tight-v">
              <CardTitle className="flex items-center space-x-3 text-dark-text text-lg">
                <Users className="w-5 h-5 text-flame" />
                <span>Select Your Country</span>
              </CardTitle>
              <CardDescription className="text-dark-muted text-base">
                Choose which country you want to simulate as
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <CountrySelector
                countries={countries}
                value={selectedCountry}
                onChange={onSelectedCountryChange}
                open={selectedCountryOpen}
                onOpenChange={setSelectedCountryOpen}
                isMobile={isMobile}
                placeholder="Choose a country..."
                showPower
                popoverWidthClass="w-[400px]"
                selectedSummaryLabel="Selected"
              />

              {selectedCountry && (
                <div className="mt-4 p-4 bg-dark-border rounded-lg">
                  <h4 className="font-semibold text-dark-text mb-2 flex items-center space-x-2">
                    <span>Your Country: </span>
                    <FlagIcon
                      countryCode={selectedCountry}
                      className="w-6 h-4"
                    />
                    <span>{selectedCountry} </span>
                  </h4>
                </div>
              )}

              <div className="mt-6">
                <div className="mb-4">
                  <h4 className="flex items-center space-x-2 text-dark-text text-base font-semibold mb-2">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span>Example Scenarios</span>
                  </h4>
                  <p className="text-dark-muted text-sm">
                    Click any example to automatically fill all simulation
                    fields
                  </p>
                </div>
                <ExampleScenariosCarousel
                  examples={exampleQuestions}
                  onApply={onApplyExample}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-dark-border/60 bg-dark-card/60 backdrop-blur-md rounded-2xl min-h-[400px] flex flex-col">
          <CardHeader className="bg-gradient-to-r from-flame/20 to-flame/10 py-4 tight-v">
            <CardTitle className="flex items-center space-x-3 text-dark-text text-lg">
              <AlertTriangle className="w-5 h-5 text-flame" />
              <span>Military Conflict Scenario</span>
            </CardTitle>
            <CardDescription className="text-dark-muted text-base">
              Define the military conflict situation to analyze
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4 flex-1">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-base font-medium text-dark-text mb-3 block flex items-center">
                  <Sword className="w-5 h-5 mr-2 text-flame" />
                  Attacking Military Force
                </label>
                <CountrySelector
                  countries={countries}
                  value={offensiveCountry}
                  onChange={onOffensiveCountryChange}
                  open={offensiveCountryOpen}
                  onOpenChange={setOffensiveCountryOpen}
                  isMobile={isMobile}
                  placeholder="Select aggressor..."
                  excludeCodes={[defensiveCountry, selectedCountry].filter(
                    Boolean,
                  )}
                  selectedSummaryLabel="Aggressor"
                />
              </div>

              <div>
                <label className="text-base font-medium text-dark-text mb-3 block flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-flame" />
                  Defending Military Force
                </label>
                <CountrySelector
                  countries={countries}
                  value={defensiveCountry}
                  onChange={onDefensiveCountryChange}
                  open={defensiveCountryOpen}
                  onOpenChange={setDefensiveCountryOpen}
                  isMobile={isMobile}
                  placeholder="Select defender..."
                  excludeCodes={[offensiveCountry].filter(Boolean)}
                  selectedSummaryLabel="Defender"
                />
              </div>
            </div>

            <div>
              <label className="text-base font-medium text-dark-text mb-3 block">
                Military Scenario Details
              </label>
              <Textarea
                placeholder="Describe your military conflict scenario in detail. Include specific military actions, weapons, forces, or tactical elements..."
                className="min-h-[120px] bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-muted text-base p-4"
                value={scenarioDetails}
                onChange={(e) => setScenarioDetails(e.target.value)}
              />
              {detectedConflict && (
                <div className="mt-3 flex items-center text-sm text-dark-muted">
                  <span className="mr-2">📊 Auto-detected conflict type:</span>
                  <span className="text-flame font-medium">
                    {detectedConflict.icon} {detectedConflict.name}
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-base font-medium text-dark-text mb-3 block">
                  Severity Level
                </label>
                {isMobile ? (
                  <div className="relative">
                    <select
                      value={severityLevel}
                      onChange={(e) => setSeverityLevel(e.target.value)}
                      className="w-full h-12 px-3 bg-dark-bg border border-dark-border text-dark-text rounded-md text-base appearance-none focus:outline-none focus:ring-2 focus:ring-flame focus:border-transparent"
                    >
                      <option value="" disabled>
                        Select severity
                      </option>
                      <option value="low">Low - Minor tensions</option>
                      <option value="medium">
                        Medium - Escalating dispute
                      </option>
                      <option value="high">High - Critical situation</option>
                      <option value="extreme">Extreme - Imminent threat</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <ChevronsUpDown className="h-4 w-4 text-dark-muted" />
                    </div>
                  </div>
                ) : (
                  <Select
                    value={severityLevel}
                    onValueChange={setSeverityLevel}
                  >
                    <SelectTrigger className="bg-dark-bg border-dark-border text-dark-text">
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-card/95 backdrop-blur-md border-dark-border rounded-xl">
                      <SelectItem
                        value="low"
                        className="text-dark-text hover:bg-dark-border"
                      >
                        Low - Minor tensions
                      </SelectItem>
                      <SelectItem
                        value="medium"
                        className="text-dark-text hover:bg-dark-border"
                      >
                        Medium - Escalating dispute
                      </SelectItem>
                      <SelectItem
                        value="high"
                        className="text-dark-text hover:bg-dark-border"
                      >
                        High - Critical situation
                      </SelectItem>
                      <SelectItem
                        value="extreme"
                        className="text-dark-text hover:bg-dark-border"
                      >
                        Extreme - Imminent threat
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div>
                <label className="text-base font-medium text-dark-text mb-3 block">
                  Time Frame
                </label>
                {isMobile ? (
                  <div className="relative">
                    <select
                      value={timeFrame}
                      onChange={(e) => setTimeFrame(e.target.value)}
                      className="w-full h-12 px-3 bg-dark-bg border border-dark-border text-dark-text rounded-md text-base appearance-none focus:outline-none focus:ring-2 focus:ring-flame focus:border-transparent"
                    >
                      <option value="" disabled>
                        Response timeframe
                      </option>
                      <option value="immediate">Immediate (24 hours)</option>
                      <option value="short">Short-term (1 week)</option>
                      <option value="medium">Medium-term (1 month)</option>
                      <option value="long">Long-term (6+ months)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <ChevronsUpDown className="h-4 w-4 text-dark-muted" />
                    </div>
                  </div>
                ) : (
                  <Select value={timeFrame} onValueChange={setTimeFrame}>
                    <SelectTrigger className="bg-dark-bg border-dark-border text-dark-text">
                      <SelectValue placeholder="Response timeframe" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-card/95 backdrop-blur-md border-dark-border rounded-xl">
                      <SelectItem
                        value="immediate"
                        className="text-dark-text hover:bg-dark-border"
                      >
                        Immediate (24 hours)
                      </SelectItem>
                      <SelectItem
                        value="short"
                        className="text-dark-text hover:bg-dark-border"
                      >
                        Short-term (1 week)
                      </SelectItem>
                      <SelectItem
                        value="medium"
                        className="text-dark-text hover:bg-dark-border"
                      >
                        Medium-term (1 month)
                      </SelectItem>
                      <SelectItem
                        value="long"
                        className="text-dark-text hover:bg-dark-border"
                      >
                        Long-term (6+ months)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between pt-6 border-t border-dark-border">
        <Button
          onClick={onClear}
          variant="outline"
          size="responsive"
          className="border-dark-border text-dark-text hover:bg-dark-border bg-transparent text-sm md:text-base"
        >
          <RotateCcw className="w-4 h-4 md:w-5 md:h-5 mr-2" />
          Clear All Fields
        </Button>

        <Button
          onClick={onGenerate}
          disabled={
            !selectedCountry ||
            !offensiveCountry ||
            !defensiveCountry ||
            !scenarioDetails.trim() ||
            isGeneratingBriefing
          }
          size="responsive-lg"
          className="bg-flame hover:bg-flame/90 text-white glow-flame hover-glow-flame transition-all duration-200 hover:scale-[1.02] disabled:hover:scale-100 disabled:opacity-50"
        >
          {isGeneratingBriefing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-b-2 border-white mr-2"></div>
              <span className="hidden xs:inline">Generating Briefing...</span>
              <span className="xs:hidden">Generating...</span>
            </>
          ) : (
            <>
              <FileText className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              <span className="hidden xs:inline">Generate Briefing</span>
              <span className="xs:hidden">Generate</span>
            </>
          )}
        </Button>
      </div>
    </TabsContent>
  );
}

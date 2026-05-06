"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FlagIcon } from "@/components/ui/flag-icon";
import type { ExampleScenario } from "@/lib/example-scenarios";

interface ExampleScenariosCarouselProps {
  examples: ExampleScenario[];
  onApply: (example: ExampleScenario) => void;
}

const SEVERITY_BADGE: Record<string, string> = {
  extreme: "bg-red-500/20 text-red-400",
  high: "bg-orange-500/20 text-orange-400",
};

const SEVERITY_LABEL: Record<string, string> = {
  extreme: "Critical",
  high: "High",
  medium: "Medium",
};

const TIMEFRAME_LABEL: Record<string, string> = {
  immediate: "24h",
  short: "1 week",
  medium: "1 month",
  long: "6+ months",
};

export function ExampleScenariosCarousel({
  examples,
  onApply,
}: ExampleScenariosCarouselProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-2 md:-ml-4">
        {examples.map((example, index) => (
          <CarouselItem
            key={index}
            className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
          >
            <Card
              className="h-full bg-dark-bg/60 backdrop-blur-sm border-dark-border/60 hover:border-flame/50 hover:bg-dark-bg/80 transition-all cursor-pointer rounded-xl"
              onClick={() => onApply(example)}
            >
              <CardContent className="p-4 h-full flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <Badge
                    variant="secondary"
                    className={`text-xs ${
                      SEVERITY_BADGE[example.severityLevel] ??
                      "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {SEVERITY_LABEL[example.severityLevel] ?? "Low"}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <FlagIcon
                      countryCode={example.selectedCountry}
                      className="w-4 h-3"
                    />
                    <span className="text-xs text-dark-muted">vs</span>
                    <FlagIcon
                      countryCode={example.offensiveCountry}
                      className="w-4 h-3"
                    />
                  </div>
                </div>

                <h3 className="font-semibold text-dark-text text-sm mb-1 line-clamp-2">
                  {example.title}
                </h3>

                <p className="text-xs text-dark-muted mb-3 line-clamp-2 flex-1">
                  {example.description}
                </p>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-blue-400 font-medium">
                    {example.conflictScenario}
                  </span>
                  <span className="text-dark-muted">
                    {TIMEFRAME_LABEL[example.timeFrame] ?? example.timeFrame}
                  </span>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="text-dark-text border-dark-border hover:bg-dark-border" />
      <CarouselNext className="text-dark-text border-dark-border hover:bg-dark-border" />
    </Carousel>
  );
}

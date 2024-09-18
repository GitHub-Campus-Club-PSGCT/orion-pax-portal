"use client";
import { title } from "@/components/primitives";
import CompetitionCard from "@/components/competition/compCard";
import { OrionPax } from "@/data/OrionPax";

export default function AboutPage() {
  return (
    <div className="gap-5">
      <h1 className={title()}>Competitons</h1>
      <div className="p-5">
        <CompetitionCard {...OrionPax.CompetitionCard} />
      </div>
    </div>
  );
}

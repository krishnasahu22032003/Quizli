"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import * as d3 from "d3";
import cloud from "d3-cloud";

type Props = {
  formattedTopics: { text: string; value: number }[];
};

const fontSizeMapper = (value: number) => Math.log2(value) * 5 + 16;

export default function WordCloud({ formattedTopics }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!svgRef.current || !formattedTopics.length) return;

    const width = svgRef.current.clientWidth || 600;
    const height = 550;
    const fill = "#1a1612";
    const hoverFill = "rgba(139,115,85,1)";

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    cloud()
      .size([width, height])
      .words(
        formattedTopics.map((d) => ({
          text: d.text,
          size: fontSizeMapper(d.value),
          value: d.value,
        }))
      )
      .padding(10)
      .rotate(0)
      .font("Times")
      .fontSize((d: any) => d.size)
      .on("end", (words: any[]) => {
        g.selectAll("text")
          .data(words)
          .enter()
          .append("text")
          .style("font-size", (d: any) => `${d.size}px`)
          .style("font-family", "Times")
          .style("font-weight", (d: any) =>
            d.size > 28 ? "700" : d.size > 22 ? "600" : "500"
          )
          .style("fill", fill)
          .style("cursor", "pointer")
          .style("transition", "fill 0.2s ease, opacity 0.2s ease")
          .style("opacity", (d: any) => {
            if (d.size >= 34) return "1";
            if (d.size >= 26) return "0.85";
            if (d.size >= 20) return "0.65";
            return "0.45";
          })
          .attr("text-anchor", "middle")
          .attr("transform", (d: any) => `translate(${d.x},${d.y})`)
          .text((d: any) => d.text)
          .on("mouseover", function () {
            d3.select(this).style("fill", hoverFill).style("opacity", "1");
          })
          .on("mouseout", function (_, d: any) {
            d3.select(this)
              .style("fill", fill)
              .style("opacity", () => {
                if (d.size >= 34) return "1";
                if (d.size >= 26) return "0.85";
                if (d.size >= 20) return "0.65";
                return "0.45";
              });
          })
          .on("click", (_: any, d: any) => {
            router.push("/quiz?topic=" + d.text);
          });
      })
      .start();
  }, [formattedTopics]);

  return <svg ref={svgRef} className="w-full" style={{ height: 550 }} />;
}
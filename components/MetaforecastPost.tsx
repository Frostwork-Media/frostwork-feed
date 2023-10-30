import { MetaforecastPost as Post } from "@/lib/db";
import { getQuestion } from "@/lib/metaforcastApi";
import { Card, Subtitle, Text, Title } from "@tremor/react";
import { ProbabilityBarChart } from "./ProbabilityBarChart";
import { IconStarFilled, IconStar } from "@tabler/icons-react";

export async function MetaforecastPost({ post }: { post: Post }) {
  const { platform, title, description, chartData, stars, rest } =
    await getData(post.slug);
  return (
    <Card>
      <Text>{platform}</Text>
      <Title>{title}</Title>
      <Subtitle className="line-clamp-2 mb-6">{description}</Subtitle>
      <ProbabilityBarChart chartData={chartData} />
      {/* <pre className="text-xs">{JSON.stringify(rest, null, 2)}</pre> */}
      <Stars stars={stars} />
    </Card>
  );
}

async function getData(slug: string) {
  const { title, description, platform, options, qualityIndicators, ...rest } =
    await getQuestion(slug);

  const chartData = options
    .reduce((acc, option) => {
      if (typeof option.probability !== "number" || !option.name) return acc;

      acc.push({
        name: option.name,
        probability: option.probability,
      });

      return acc;
    }, [] as { name: string; probability: number }[])
    .sort((a, b) => {
      return b.probability - a.probability;
    })
    // Filter top 5
    .slice(0, 5);

  return {
    title,
    description,
    platform: platform.label,
    chartData,
    stars: qualityIndicators.stars,
    rest,
  };
}

function Stars({ stars }: { stars: number }) {
  return (
    <div className="flex justify-start items-center text-slate-500">
      {Array(5)
        .fill(0)
        .map((_, i) => {
          if (i < stars) return <IconStarFilled key={i} size={16} />;
          return <IconStar key={i} size={16} />;
        })}
    </div>
  );
}

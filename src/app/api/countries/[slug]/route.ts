import { NextResponse } from "next/server";
import toursData from "@/data/tours.json";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  // Simulate API delay for realistic behavior
  await new Promise((resolve) => setTimeout(resolve, 100));

  const country = toursData.countries?.find(
    (c) => c.slug === params.slug
  );

  if (!country) {
    return NextResponse.json(
      { error: "Country not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(country);
}

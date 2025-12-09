import { NextResponse } from "next/server";
import toursData from "@/data/tours.json";

export async function GET() {
  // Simulate API delay for realistic behavior
  await new Promise((resolve) => setTimeout(resolve, 100));

  return NextResponse.json(toursData);
}

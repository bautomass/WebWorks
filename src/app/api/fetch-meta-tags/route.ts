import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  // Ensure the URL has a protocol
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = `https://${url}`;
  }

  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });
    const html = response.data;
    const $ = cheerio.load(html);

    const metaTags = {
      title: $("title").text(),
      description: $('meta[name="description"]').attr("content"),
      keywords: $('meta[name="keywords"]').attr("content"),
      og: {
        title: $('meta[property="og:title"]').attr("content"),
        description: $('meta[property="og:description"]').attr("content"),
        image: $('meta[property="og:image"]').attr("content"),
      },
      twitter: {
        card: $('meta[name="twitter:card"]').attr("content"),
        title: $('meta[name="twitter:title"]').attr("content"),
        description: $('meta[name="twitter:description"]').attr("content"),
      },
      canonical: $('link[rel="canonical"]').attr("href"),
    };

    return NextResponse.json(metaTags);
  } catch (error) {
    console.error("Error fetching meta tags:", error);
    return NextResponse.json(
      { error: "Failed to fetch meta tags" },
      { status: 500 }
    );
  }
}

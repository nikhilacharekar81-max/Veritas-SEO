import React from 'react';
import type { Metadata } from 'next';
import { DEMO_PRESET_BLOG_POSTS } from '../../../src/lib/demo-presets';
import App from '../../../src/App';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = DEMO_PRESET_BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: `${slug.replace(/-/g, ' ')} | Veritas SEO Blog`,
      description: 'Technical SEO article and optimization guide.',
    };
  }

  const canonicalUrl = `https://veritas-seo.dev/blog/${post.slug}`;

  return {
    title: post.seoTitle || `${post.title} | Veritas SEO`,
    description: post.seoDescription || post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      url: canonicalUrl,
      type: 'article',
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  return <App initialRoute={{ type: 'blog_post', postSlug: slug }} />;
}

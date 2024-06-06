'use client';

import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote';
import { replaceLinks } from '../lib/remark-plugins';
import { Tweet } from 'react-tweet';
import BlurImage from './blur-image';
import styles from './mdx.module.css';

export default function MDX({ source }: { source: MDXRemoteProps }) {
  const components = {
    a: replaceLinks,
    BlurImage,
    Tweet,
  };

  return (
    <article
      className={`prose-md prose prose-stone dark:prose-invert sm:prose-lg m-auto w-11/12 sm:w-3/4 ${styles.root}`}
      suppressHydrationWarning={true}
    >
      {/* @ts-ignore */}
      <MDXRemote {...source} components={components} />
    </article>
  );
}

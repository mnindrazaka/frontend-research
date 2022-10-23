import React from 'react';
import { css } from '@emotion/react';
import Link from 'next/link';

export function Index() {
  return (
    <div>
      <h1
        css={css`
          color: red;
        `}
      >
        Welcome
      </h1>
      <Link href="/products">products</Link>
    </div>
  );
}

export default Index;

import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import { withApollo } from '@lib/apollo';

import { PublicLayout } from '@templates/Layout';
import { PostsView } from '@templates/PostsView';
import { GetPosts } from '@lib/gql/queries.gql';

function Posts() {
  const { data, loading, refetch } = useQuery(GetPosts);
  const posts = data?.posts || [];

  return (
    <PublicLayout loading={loading}>
      <PostsView posts={posts} refetchPosts={refetch} />
    </PublicLayout>
  );
}

// eslint-disable-next-line import/no-default-export
export default withApollo(Posts);

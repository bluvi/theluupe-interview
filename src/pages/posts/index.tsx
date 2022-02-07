import { useQuery } from '@apollo/react-hooks';
import { withApollo } from '@lib/apollo';
import { GetPosts, GetUserPosts } from '@lib/gql/queries.gql';
import { PublicLayout } from '@templates/Layout';
import { PostsView } from '@templates/PostsView';
import React, { useState } from 'react';

export interface ISelectedAuthor {
  id: string;
  fullName: string;
}

function Posts() {
  const [selectedAuthor, setSelectedAuthor] = useState<ISelectedAuthor | null>(null);
  const { data, loading, refetch } = useQuery(GetPosts);
  const { data: userData, loading: loadingUserPosts, refetch: refetchUserPosts } = useQuery(GetUserPosts, {
    variables: { userId: selectedAuthor?.id || null },
    skip: !selectedAuthor,
  });

  const posts = (selectedAuthor ? userData?.user.posts : data?.posts) || [];

  return (
    <PublicLayout loading={loading || loadingUserPosts}>
      <PostsView
        posts={posts}
        refetchPosts={selectedAuthor ? refetchUserPosts : refetch}
        selectedAuthor={selectedAuthor}
        selectAuthor={(author: ISelectedAuthor | null) => setSelectedAuthor(author)}
      />
    </PublicLayout>
  );
}

// eslint-disable-next-line import/no-default-export
export default withApollo(Posts);

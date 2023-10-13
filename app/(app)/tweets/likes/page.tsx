import { Feed } from '@/src/components/Feed';
import {
  CONTENT,
  ROUTE_TWEETS_LIKES,
  ROUTE_TWEETS_MINE,
} from '@/src/constants';
import { createServerComponentClient } from '@/src/utils/createServerComponentClient';
import { type ApiParameters } from '@/src/utils/fetching/apiParameters';
import { getTweets } from '@/src/utils/fetching/tweets';
import { TwitterLogo } from '@phosphor-icons/react/dist/ssr';

export const metadata = {
  title: CONTENT.tweetsLikeTitle,
};

export default async function LikedTweetsPage({
  searchParams,
}: {
  searchParams: Partial<Pick<ApiParameters, 'limit' | 'offset' | 'order'>>;
}) {
  const { limit, offset } = searchParams;
  const supabaseClient = createServerComponentClient();
  const { data, count } = await getTweets({
    supabaseClient,
    params: searchParams,
    likes: true,
  });
  return (
    <Feed
      items={data}
      count={count || 0}
      limit={limit}
      offset={offset}
      allowGroupByDate={true}
      title={CONTENT.tweetsTitle}
      icon={<TwitterLogo aria-label="My tweets" size={24} weight="duotone" />}
      feedType="tweets"
      subNav={[
        {
          text: CONTENT.tweetsMineTitle,
          href: ROUTE_TWEETS_MINE,
          isActive: false,
        },
        {
          text: CONTENT.tweetsLikeTitle,
          href: ROUTE_TWEETS_LIKES,
          isActive: true,
        },
      ]}
    />
  );
}

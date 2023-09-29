'use client';

import { Note, TwitterLogo } from '@phosphor-icons/react';

// import { useClickBookmark } from '../../hooks';
import { Bookmark } from '../types/db';
import './Feed.styles.css';
import { FeedItemFooter } from './FeedItemFooter';
// import { FeedItemFooter } from './FeedItemFooter';
import { Flex } from './Flex';
import { Link } from './Link';
import { Markdown } from './Markdown';

export interface BookmarkFeedItemProps extends Bookmark {
  allowDeletion?: boolean;
}

export const BookmarkFeedItem = (props: BookmarkFeedItemProps) => {
  const { title, url, description, note, id, tweet } = props;
  // const handleClickRegister = useClickBookmark(id);

  return (
    <div className="feed-wrapper">
      {url && title ? (
        <div>
          <Link
            href={url}
            variant="feedTitle"
            // onClick={handleClickRegister} // TODO: add this back
          >
            {title}
          </Link>
        </div>
      ) : title ? (
        <div>{title}</div>
      ) : null}
      {description ? <Markdown>{description}</Markdown> : null}
      {note ? (
        <div className="bg-theme4 rounded p-xs">
          <Flex
            gap="2xs"
            align="center"
            className="text-step--1 mb-s border-solid border-b-2 border-theme7 pb-3xs"
          >
            <Note
              aria-label="Note"
              weight="duotone"
              size={20}
              className="shrink-0 text-theme10"
            />
            Note
          </Flex>
          <Markdown>{note}</Markdown>
        </div>
      ) : null}
      {tweet?.text ? (
        <Flex gap="2xs">
          <div className="shrink-0 text-theme10">
            <TwitterLogo size={18} weight="duotone" />
          </div>
          <div className="shrink-0 text-step--1 tracking-tight">
            <Link href={tweet.url}>@{tweet.username}</Link>
            <Markdown>{tweet.text}</Markdown>
          </div>
        </Flex>
      ) : null}
      <FeedItemFooter {...props} key={`footer-${id}`} />
    </div>
  );
};
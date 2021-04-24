import { Post as PostType } from './graphcms';

export const Post : React.FC<PostType> = ({ title, coverImage, date, author, slug, excerpt}) => {
  return (
    <section>
      <div>{title}</div>
    </section>
  );
}

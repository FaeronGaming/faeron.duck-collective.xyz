import { Post as PostType } from './graphcms';

export const Post : React.FC<PostType> = ({ title, }) => {
  return (
    <section>
      <div>{title}</div>
    </section>
  );
}

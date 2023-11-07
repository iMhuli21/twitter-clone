export default function Tabs() {
  return (
    <div className="flex items-center w-full px-5 py-2 justify-between">
      <a className="active-tab">Posts</a>
      <a className="normal-tab">Replies</a>
      <a className="normal-tab">Retweets</a>
      <a className="normal-tab">Likes</a>
      <a className="normal-tab">Comments</a>
    </div>
  );
}

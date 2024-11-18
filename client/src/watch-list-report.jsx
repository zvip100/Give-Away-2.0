export function WatchListReport({ id, item, url }) {
  return (
    <div className="single-item" key={id}>
      <figure>
        <img src={url} alt={item} width="300" height="300"></img>
        <figcaption>{item}</figcaption>
      </figure>
    </div>
  );
}

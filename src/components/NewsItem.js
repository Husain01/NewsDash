import React from "react";

const NewsItem =(props)=> {
  
    let { title, description, image, newsUrl, author, date, source } =
      props;
    return (
      <div className="my-3">
        <div className="card" style={{ margin: "0 .5rem " }}>
          <div
            style={{
              display: "flex",
              position: "absolute",
              right: "0",
            }}
          >
            <span className=" badge bg-danger">{source}</span>
          </div>
          <img src={image} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "Unknown"} on{" "}
                {date}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default NewsItem;

import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let { title, description, imgUrl, newsUrl, publishedAt, author, source } = this.props;
    return (
      <div>
        <div className="card" style={{ width: "18rem", height: "460px" }}>
          <img src={imgUrl == null ? 'https://images.pexels.com/photos/4057663/pexels-photo-4057663.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' : imgUrl} className="card-img-top" alt="News" style={{ minHeight: "190px" }} />
          <div className="card-body">
            <a href={newsUrl} target="_blank" rel="noreferrer" className="text-decoration-none text-dark"><h5 className="card-title">{title}...</h5></a>
            <p className="card-text" style={{ height: "72px" }}>{description}...</p>
            <p className="card-text" style={{height:"50px"}}><small className="text-muted">By {author === null ? "Unknown" : author} on {new Date(publishedAt).toGMTString().slice(0, -3)}</small></p>
            <div className="d-flex align-items-center justify-content-between">
              <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-outline-secondary btn-sm">Read more</a>
              <span className="badge rounded-pill bg-secondary">{source}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem

import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: 'in',
    category: 'general'

  }
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string

  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      pageSize: 12,
      totalResults: 0
    }
    document.title = `Newsapp - ${this.capitalizeFirstLetter(this.props.category)}`
  }
  async updateNews() {
    this.props.setProgress(10);
    const URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.state.pageSize}`;
    this.setState({
      loading: true,
    })
    this.props.setProgress(30);
    let data = await fetch(URL)
    let parsedData = await data.json()
    this.props.setProgress(80);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    })

    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.props.setProgress(10);
    console.log("Now " + this.state.page);
    this.updateNews()
    this.props.setProgress(100);
  }

  handlePrevClick = async () => {
    await this.setState({
      page: this.state.page - 1
    })
    // console.log("Prev " + this.state.page);
    await this.updateNews(this.state.page)
  }

  handleNextClick = async () => {
    await this.setState({
      page: this.state.page + 1
    })
    // console.log("Next "+this.state.page);
    await this.updateNews(this.state.page)
  }

  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1
    })
    const URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.state.pageSize}`;
    this.setState({
      loading: true,
    })
    let data = await fetch(URL)
    let parsedData = await data.json()
    // console.log(parsedData.totalResults);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
      // totalResults: parsedData.totalResults
    })
  };

  render() {
    // console.log("Remder");
    return (
      <div className="mx-5 my-3 mw-750">
        <h2 style={{ textTransform: "capitalize" }}>Newsapp - {this.props.category === "general" ? "Top Headlines" : this.props.category}</h2>
        {/* {this.state.loading && <Spinner />} */}

        <InfiniteScroll style={{ overflow: "none" }} dataLength={this.state.articles.length} next={this.fetchMoreData} hasMore={this.state.articles.length !== this.state.totalResults} loader={<Spinner />}>
          <div className="row d-flex align-items-center justify-content-center flex-wrap">
            {this.state.articles.map((element) => (
              <div className="col-auto d-flex align-items-center justify-content-center p-1" key={element.url}>
                <NewsItem title={element.title ? element.title.slice(0, 42) : ""} description={element.description ? element.description.slice(0, 85) : ""} imgUrl={element.urlToImage} newsUrl={element.url} publishedAt={element.publishedAt} author={element.author} source={element.source.name} />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    )
  }
}

export default News

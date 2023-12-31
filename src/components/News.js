import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";


export default class News extends Component {
  static defaultProps = {
    country:'in',
    pageSize: 5,
    category:'general'
  }

  static propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title  = this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)
    //document.title = this.props.category;
  }

  async updateNews(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2f277e0ec0d94955948061989538d447&page=${
      this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true
    })
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false
    });
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePreClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handleNextClick = async () => {
      this.setState({ page: this.state.page + 1 });
      this.updateNews();
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">News - Top Headlines {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines</h1>
        { this.state.loading && <Spinner></Spinner>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imageUrl={
                    !element.urlToImage !== false
                      ? "https://www.123telugu.com/content/wp-content/themes/123telugu/images/logo.gif"
                      : element.urlToImage
                  }
                  url={element.url}
                  author ={element.author}
                  date = {element.publishedAt}
                  source = {element.source.name}
                ></NewsItem>
              </div>
            );
          })}
          <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-dark"
              onClick={this.handlePreClick}
            >
              &larr; Pre
            </button>
            <button
              disabled={
                this.state.page + 1 > Math.ceil(this.state.totalResults / 20)
              }
              type="button"
              className="btn btn-dark"
              onClick={this.handleNextClick}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

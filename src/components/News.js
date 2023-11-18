import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    //this.loading = true;
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=2f277e0ec0d94955948061989538d447&page=${this.state.page}&pageSize=20`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({ articles: parseData.articles, totalResults: parseData.totalResults });
    //this.loading = false;
  }

  handlePreClick = async ()=> {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=2f277e0ec0d94955948061989538d447&page=${this.state.page - 1}&pageSize=20`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parseData.articles
    });
  }

  handleNextClick = async ()=> {
    if(this.state.page + 1 > Math.ceil(this.state.totalResults/20)){
      
    }
    else{
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=2f277e0ec0d94955948061989538d447&page=${this.state.page + 1}&pageSize=20`;
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parseData.articles
      });
    }
    
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">News - Top Headlines</h1>
        <div className="row">
          {this.state.articles.map((element) => {
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
              type="button"
              className="btn btn-dark"
              onClick={this.handleNextClick}
            >
              {" "}
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
}
import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";




export class News extends Component {
    
    static defaultProps = {
      country: 'in',
      pageSize: 9,
      category: 'general'
    }
    static propTypes = {
      country: PropTypes.string,
      pageSize: PropTypes.number,
      category: PropTypes.string,
    }
     capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    constructor(props){
        super(props); 
        this.state = {
            articles: [],
            loading: true, 
            page:1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} -  NewsDash`
    }

    async updateNews()  {
      this.props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true})
      let data =await fetch(url);
      this.props.setProgress(30);
      let parsedData = await data.json();
      this.props.setProgress(50);
      this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults,
        loading:false})
        this.props.setProgress(100);
    }

    async componentDidMount(){
      this.updateNews();
    }

    //  handleNextClick= async () => {
    //   //  if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    //   //    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=22b81be15c004372ac98c67c0725c24f&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //   //    this.setState({loading:true});
    //   //    let data =await fetch(url);
    //   //    let parsedData = await data.json();
    //   //    this.setState({
    //   //      page:this.state.page +1,
    //   //      articles: parsedData.articles,
    //   //      loading:false
    //   //    })
    //   //   }
    //   this.setState({page: this.state.page+1});
    //   this.updateNews();
    //    }
    

    // handlePrevClick = async () => {
    //   // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=22b81be15c004372ac98c67c0725c24f&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //   // this.setState({loading:true});
    //   // let data =await fetch(url);
    //   // let parsedData = await data.json();
    //   // this.setState({articles: parsedData.articles})
    //   // console.log(parsedData);

    //   // this.setState({
    //   //   page:this.state.page - 1,
    //   //   articles: parsedData.articles,
    //   //   loading:false
    //   // })
    //   this.setState({page: this.state.page - 1,});
    //   this.updateNews();
    // }

    fetchMoreData = async() => {
      this.setState({page: this.state.page + 1});
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      let data =await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: this.state.articles.concat(parsedData.articles), 
        totalResults: parsedData.totalResults,
        loading:false})
        
    };

  render() {
    return (
      <>
        <h2 className='text-center my-4'>NewsDash - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
        {this.state.articles.map((e)=>{
          return <div className="col-md-4" key={e.url}>
            <NewsItem  title={e.title?e.title.slice(0, 45):''} description={e.description?e.description.slice(0, 88):''}imageUrl={e.urlToImage?e.urlToImage:"http://www.tgsin.in/images/joomlart/demo/default.jpg"} newsUrl = {e.url} author={e.author} date={e.publishedAt} source={e.source.name} />
          </div>
          
        })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
      
    );
  }
}

export default News;

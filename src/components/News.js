import React, { useEffect,useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";




const News =(props)=> {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    // const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    const [limit, setLimit] = useState(25)
    const [offset, setOffset] = useState(0)
    

     const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
   

    const  updateNews = async () =>  {
      props.setProgress(10);
      // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      const url = `http://api.mediastack.com/v1/news?access_key=${props.apiKey}&categories=${props.category}&countries=${props.country}&languages=${props.language}&limit=${limit}&offset=${offset}&sort=published_desc`;
      setLoading(true)
      let data1 =await fetch(url);
      props.setProgress(30);
      let parsedData = await data1.json();
      props.setProgress(50);
      setData(parsedData.data)
      setTotalResults(parsedData.pagination.total)
      setLoading(false)
      
        props.setProgress(100);
    }
    useEffect(() => {
       document.title = `${capitalizeFirstLetter(props.category)} -  NewsDash`;
      updateNews();
      // eslint-disable-next-line
    }, [])
    

    //  handleNextClick= async () => {
    //   //  if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize))){
    //   //    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=22b81be15c004372ac98c67c0725c24f&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
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
    //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=22b81be15c004372ac98c67c0725c24f&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
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

    const fetchMoreData = async() => {
      // this.setState({page: page + 1});
      setOffset(offset+25);
      const url = `http://api.mediastack.com/v1/news?access_key=${props.apiKey}&categories=${props.category}&countries=${props.country}&languages=${props.language}&limit=${limit}&offset=${offset+25}&sort=published_desc`;
      // setLimit(limit<=75?limit+25:limit);
      let data1 =await fetch(url);
      let parsedData = await data1.json();
      setData(data.concat(parsedData.data));
      setTotalResults(parsedData.pagination.total);
      setLoading(false)
    };


    return (
      <>
        <h2 className='text-center ' style={{marginTop: "5rem"}}>NewsDash - Top {capitalizeFirstLetter(props.category)} Headlines</h2>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={data.length}
          next={fetchMoreData}
          hasMore={data.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
        {data.map((e)=>{
          return <div className="col-md-4" key={e.url}>
            <NewsItem  title={e.title?e.title:''} description={e.description?e.description.slice(0, 200):''}image={e.image?e.image:"http://www.tgsin.in/images/joomlart/demo/default.jpg"} newsUrl = {e.url} author={e.author} date={e.published_at} source={e.source} />
          </div>
          
        })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
      
    );
  
}
News.defaultProps = {
  country: 'in',
  pageSize: 9,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}
export default News;

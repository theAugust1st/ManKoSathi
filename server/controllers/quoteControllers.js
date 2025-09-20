const asyncHandler = require("../utils/asyncHandler.js");
const Quote = require("../models/Quote.js");

// first for those controllers which can be seen with the non logged in users too.

/*****************************
@desc create the getQuotes for the non logged in users
@route GET /api/quotes
@access public
*****************************/
const getQuotes = asyncHandler(async (req, res) => {
  // pagesize or limit : how many data wants as the response
  // page : this will carry the page number
  // offset is the value we are going calculate which gives data needs to be ignore
  // offset = (page - 1) * pageSize
  // this is the page-based api pagination first need to sort the documents so the ignored data will not be reoccured

  const pagesize = parseInt(req.query.limit) || 30;
  const page = parseInt(req.query.page) || 1;
  const category = req.query.category || "";
  const search = req.query.search || "";
  const offSet = (page-1)*pagesize;

  const matchStage = {};

  if(category){
    matchStage.category = category
  }
  if(search){
    matchStage.$text = {$search:search}
  }
  const result = await Quote.aggregate([
    {$match:matchStage},
    {$sort:{_id:1}},
    {
        $facet:{
            metadata:[{$count:"total"}],
            data:[
                {$skip:offSet},
                {$limit:pagesize}
            ]
        }
    }
]);
const quotes = result[0].data;
const totalCount = result[0].metadata ? result[0].metadata[0].total : 0;
const totalPages = Math.ceil(totalCount/pagesize); 
  res.status(200).json({
    success: true,
    count: quotes.length,
    message: "Quotes retrieved successfully.",
    quotes: quotes,
    pagination:{
        'current-page':page,
        'limit': pagesize,
        'totalQuotes': totalCount,
        'totalPages' : totalPages,
        'nextPage':`api/quotes?limit=${pagesize}&page=${page+1}`
    }
  });
});
/*****************************
@desc create the getRandomQuotes for the non logged in users
@route GET /api/quotes/random
@access public
*****************************/

const getRandomQuotes = asyncHandler(async (req, res) => {
  const randomQuote = await Quote.aggregate([{ $sample: { size: 1 } }]);
  if (!randomQuote || randomQuote.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Quote available in the database.",
    });
  }
  res.status(200).json({
    success: true,
    message: "Random quote Retrieved Successfully",
    quote: randomQuote[0],
  });
});

module.exports = {
  getQuotes,
  getRandomQuotes,
};

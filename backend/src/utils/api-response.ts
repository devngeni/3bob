import { DocumentQuery } from "mongoose";
export class ApiResponse {
  constructor(public query: any, public queryString: any) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const reqQuery = {
      ...this.queryString,
    };
    const excludedFields = ["page", "limit", "sort", "fields"];
    excludedFields.forEach((el) => delete reqQuery[el]);
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      //   const sortBy= req.query.sort.split(',').join(' ')
      // query = query.sort(sortBy)
      // query = query.sort('price value')
      this.query = this.query.sort(this.queryString);
    } else {
      // default one
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      // api/v1/tours/?fields=name,price,duration
      const fields = this.queryString.fields.split(",").join("");
      // query = query.select('name duration price')
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v"); // exclude __v field
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

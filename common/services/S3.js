"use strict";

const AWS = require("aws-sdk");
AWS.config.update({ region: process.env["AWS_REGION"] });
const s3 = new AWS.S3({apiVersion: '2006-03-01'});

module.exports = logger => ({
  upload: async ({bucket, key, file}) => {
    return s3.putObject({
      Bucket: bucket,
      Key: key,
      Body: file.content,
      ContentEncoding: file.encoding,
      ContentType: file.mimetype
    }).promise().then(result => {
      logger.info({
        service: "s3",
        method: "upload",
        params: {bucket, key},
        result
      });

      return `https://${bucket}.s3.amazonaws.com/${key}`
    });
  }
});

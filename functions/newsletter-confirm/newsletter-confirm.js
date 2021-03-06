const hamSubmissionState = require("./assets/mark-as-ham")

const FORM_ID = "5eb03b64ed85550007242fba"
const GET = "GET"

exports.handler = (event, _ctx, callback) => {
  console.log(event)
  const { id, fid } = event.queryStringParameters
  if (fid !== FORM_ID) {
    callback(true, {
      statusCode: 403,
      body: "Forbidden"
    })
  }

  if (event.httpMethod === GET) {
    return hamSubmissionState(id)
      .then(() => {
        console.log("Email verified successfully")
        callback(null, {
          statusCode: 200,
          body: "Email verification successful",
        })
      })
      .catch(err => {
        console.log("Error verifying email.\nCould not 'ham' submission ", err)
        callback(true, {
          statusCode: 502,
          body: "Bad Gateway"
        })
      })
  }

  callback(true, {
    statusCode: 404,
    body: "Not Found"
  })
}

import winston from 'winston'
import * as Express from 'express'
// Imports the Google Cloud client library
import { ErrorReporting } from '@google-cloud/error-reporting'

// Imports the Google Cloud client library for Winston
import { LoggingWinston } from '@google-cloud/logging-winston'

let errorReporting
let loggingWinston
let winstonLogger

export const initStackDriverLogger = () => {
  // if (CONFIG.env !== "production") return
  try {
    // Instantiates a client
    errorReporting = new ErrorReporting({
      reportMode: 'production'
    })
    loggingWinston = new LoggingWinston()

    // Create a Winston logger that streams to Stackdriver Logging
    // Logs will be written to: "projects/YOUR_PROJECT_ID/logs/winston_log"
    winstonLogger = winston.createLogger({
      level: 'info',
      transports: [
        new winston.transports.Console(),
        // Add Stackdriver Logging
        loggingWinston
      ]
    })
  } catch (error) {
    console.error(error)
  }
}

// report error
export const reportError = (
  error: Error,
  metadata?: Object,
  request?: Express.Request
) => {
  // if (CONFIG.env !== "production") return
  try {
    const event = errorReporting.event()
    event.setMessage(error.stack)
    if (request) {
      event.setUserAgent(request.get('User-Agent'))
      event.setHttpMethod(request.method)
      event.setUrl(request.originalUrl)
    }
    errorReporting.report(event)
    logError(error, metadata)
  } catch (error) {
    console.error(error)
  }
}

// log with full details
export const logError = (error: Error, metadata?: Object) => {
  // if (CONFIG.env !== "production") return
  try {
    winstonLogger.error(error.message, metadata)
  } catch (error) {
    console.error(error)
  }
}

import * as Sentry from '@sentry/browser';

const init = () => {
  Sentry.init({
    dsn: "https://f190cd75f13c459e801a372418a150a8@sentry.io/1335030"
   });  
}

const log = (error) => {
  Sentry.captureException(error);
}

export default {
  log,
  init
}
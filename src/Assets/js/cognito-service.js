import {
  config
} from 'aws-sdk'
import {
  _REGION,
  _POOL_DATA
} from './properties-aws-cognito'
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'

export default class CognitoService {
  constructor() {
    console.log('CognitoService has been initialized')
    config.region = _REGION
  }

  getUserPool() {
    return new AmazonCognitoIdentity.CognitoUserPool(_POOL_DATA)
  }

  getCurrentUser() {
    return this.getUserPool().getCurrentUser()
  }

  getCognitoIdentity() {
    return config.credentials.identityId
  }

  getCurrentUserData() {
    return this.getUserPool()
      .getCurrentUser()
      .getSession((err, session) => {
        if (err) {
          console.log("Can't set the credentials:" + err)
          return err
        } else {
          if (session.isValid()) {
            let data = JSON.stringify(session.idToken.payload)
            data = JSON.parse(data.replace(/custom:/g, ''))
            return data
          }
        }
      })
  }

  getAuthToken() {
    return this.getCurrentUser().getSession(function (err, session) {
      if (err) {
        return false
      } else {
        if (session.isValid()) {
          return session.getIdToken().getJwtToken()
          // return session.getAccessToken().getJwtToken();
        }
      }
    })
  }

  callback() {}

  callbackWithParam(result) {
    if (result) {
      console.log('Get Token ID was retrieved')
    } else {
      alert('Could not get Token ID com CognitoService')
    }
  }
}
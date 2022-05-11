import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'
import CognitoService from './cognito-service'

export default class UserLoginService {
  constructor() {
    console.log('UserLoginService has been initialized')
  }

  authenticate(username, password, callback) {
    let cognitoService = new CognitoService()

    // Need to provide placeholder keys unless unauthorised user access is enabled for user pool
    // AWSCognito.config.update({ accessKeyId: 'anything', secretAccessKey: 'anything' })

    let authenticationData = {
      Username: username,
      Password: password
    }
    let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      authenticationData
    )

    let userData = {
      Username: username,
      Pool: cognitoService.getUserPool()
    }

    console.log('Authenticating the user')
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        callback('', result)
      },
      onFailure: function (err) {
        callback(err.message, null)
      }
    })
  }

  forgotPassword(username, callback) {
    let cognitoService = new CognitoService()

    let userData = {
      Username: username,
      Pool: cognitoService.getUserPool()
    }

    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)

    cognitoUser.forgotPassword({
      onSuccess: function (result) {
        console.log(result)
      },
      onFailure: function (err) {
        callback.cognitoCallback(err.message, null)
      },
      inputVerificationCode() {
        callback.cognitoCallback('', null)
      }
    })
  }

  confirmNewPassword(email, verificationCode, password, callback) {
    let cognitoService = new CognitoService()
    let userData = {
      Username: email,
      Pool: cognitoService.getUserPool()
    }

    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)

    cognitoUser.confirmPassword(verificationCode, password, {
      onSuccess: function (result) {
        callback.cognitoCallback('', result)
      },
      onFailure: function (err) {
        callback.cognitoCallback(err.message, null)
      }
    })
  }

  logout() {
    let cognitoService = new CognitoService()
    console.log('Logging out')
    cognitoService.getCurrentUser().signOut()
  }

  isAuthenticated(callback) {
    let cognitoService = new CognitoService()
    if (callback == null) throw new Error('Callback in isAuthenticated() cannot be null')

    console.log('Getting the current user')
    let cognitoUser = cognitoService.getCurrentUser()

    if (cognitoUser != null) {
      cognitoUser.getSession(function (err, session) {
        if (err) {
          console.log("Couldn't get the session: " + err, err.stack)
          callback(err, false)
        } else {
          console.log('Session is valid: ' + session.isValid())
          callback(session, session.isValid())
        }
      })
    } else {
      callback("Can't retrieve the CurrentUser", false)
    }
  }
}
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'
import CognitoService from './cognito-service'

export default class UserRegistrationService {
  constructor () {
    console.log('UserRegistrationService has been initialized')
  }

  register (user, callback) {
    let cognitoService = new CognitoService()
    var attributeList = []

    var dataEmail = {
      Name: 'email',
      Value: user.email
    }
    var dataName = {
      Name: 'name',
      Value: user.name
    }
    var dataNickname = {
      Name: 'nickname',
      Value: user.nickname
    }
    var updatedAt = {
      Name: 'updated_at',
      Value: user.updated_at
    }
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail))
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute(dataName))
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute(dataNickname))
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute(updatedAt))

    cognitoService
      .getUserPool()
      .signUp(user.email, user.password, attributeList, [], function (
        err,
        result
      ) {
        if (err) {
          callback(err.message, null)
        } else {
          console.log('registered user: ' + result)
          callback('', result)
        }
      })
  }

  confirmRegistration (username, confirmationCode, callback) {
    let cognitoService = new CognitoService()
    var userData = {
      Username: username,
      Pool: cognitoService.getUserPool()
    }

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)

    cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
      if (err) {
        callback.cognitoCallback(err.message, null)
      } else {
        callback.cognitoCallback('', result)
      }
    })
  }

  resendCode (username, callback) {
    let cognitoService = new CognitoService()
    var userData = {
      Username: username,
      Pool: cognitoService.getUserPool()
    }

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)

    cognitoUser.resendConfirmationCode(function (err, result) {
      if (err) {
        callback.cognitoCallback(err.message, null)
      } else {
        callback.cognitoCallback('', result)
      }
    })
  }
}

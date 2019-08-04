const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp()

exports.deleteUser = functions.https.onCall(async (data, context) => {
  try {
    await admin.auth().deleteUser(data.id)
    console.log('User(s) is/are deleted.')
    await admin.firestore().collection('users').doc(data.id).delete()
    console.log('User(s) is/are deleted from database.')
  }
  catch (error) {
    throw new functions.https.HttpsError(error)
  }
})

exports.deleteSerie = functions.https.onCall(async (data, context) => {
  try {
    await admin.firestore().collection('series').doc(data.title).delete()
    console.log('Serie(s) is/are deleted from database.')
  }
  catch (error) {
    throw new functions.https.HttpsError(error)
  }
})

exports.deleteActor = functions.https.onCall(async (data, context) => {
  try {
    await admin.firestore().collection('actors').doc(data.firstName + ' ' + data.lastName).delete()
    console.log('Actor(s) is/are deleted from database.')
    await admin.storage().bucket().file('actors/' + data.firstName + ' ' + data.lastName).delete()
    console.log('Actor(s) image(s) is/are deleted from storage.')
  }
  catch (error) {
    throw new functions.https.HttpsError(error)
  }
})

const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp()

exports.deleteUser = functions.https.onCall(async (data, context) => {
  try {
    await admin.auth().deleteUser(data.id)
    console.log('User is deleted.')
    await admin.firestore().collection('users').doc(data.id).delete()
    console.log('User is deleted from database.')
  }
  catch (error) {
    console.log('Error deleting user:', error)
  }
})

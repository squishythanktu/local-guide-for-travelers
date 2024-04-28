/* eslint-disable @typescript-eslint/no-explicit-any */
import firebase from 'firebase/compat/app'
import 'firebase/compat/messaging'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCmo6oEfF_JbQ2qkJRBEWLlDb87w8U_RTw',
  authDomain: 'local-guide-notification.firebaseapp.com',
  projectId: 'local-guide-notification',
  storageBucket: 'local-guide-notification.appspot.com',
  messagingSenderId: '765701633222',
  appId: '1:765701633222:web:f9ecee2271ee0ab9d093c7',
  measurementId: 'G-D91DZWSKNW'
}

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

const REACT_APP_VAPID_KEY = 'BBQQ1zChnWRNAXHJNLs0-3cE9NbKb5jYM0-60hXibuLnZqAqWZFTpPi4u3OQQQWxPk89VsfHogPKl_jDvr_yI8Y'
const publicKey = REACT_APP_VAPID_KEY

export const getToken = async () => {
  let currentToken = ''
  try {
    currentToken = await messaging.getToken({ vapidKey: publicKey })
  } catch (error) {
    console.log('An error occurred while retrieving token. ', error)
  }
  return currentToken
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload: any) => {
      resolve(payload)
    })
  })

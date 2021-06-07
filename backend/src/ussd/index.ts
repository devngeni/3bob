import UssdMenu from 'ussd-menu-builder'
import { sendSMS } from '../utils'

let menu = new UssdMenu()

// Define menu states
menu.startState({
    run: () => {
        menu.con('Welcome to 3Bob, Please enter your password to proceed' +
                '\n1. Register')

    },
    next: {
        '1': 'registerUser',
        '*\\w+':  'verifyUser'
    }
})


menu.state('registerUser', {
    run: () => {
        // register user

        // send registration instructions to user via sms
        let message = ''
        sendSMS([menu.args.phoneNumber], message)
    }
})


menu.state('*\\w+', {
    run: () => {
        let password = menu.val
        
    }
})
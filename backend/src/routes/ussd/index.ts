import UssdMenu from 'ussd-menu-builder'
import { Router } from 'express'

import { PasswordManager, sendSMS } from '../../utils'
import { User, UserDoc, Wallet } from '../../models';

let menu = new UssdMenu()

const router = Router();

let message: string;

// Define menu states
menu.startState({
    run: () => {
        menu.con('Welcome to 3BOB, Please enter your password to proceed' +
            '\n1. Register')

    },
    next: {
        '1': 'registerUser',
        '*[a-zA-Z0-9]+': 'verifyUser'
    }
})


menu.state('registerUser', {
    run: () => {
        menu.con('Enter your email')

    },
    next: {
        '*\\w+@\\w+\\.\\w+': 'registerUser.email'
    }
})
menu.state('registerUser.email', {
    run: () => {
        let email = menu.val;
        menu.session.set('email', email)
            .then(() => {
                menu.con('Enter your password')
            })

    },
    next: {
        '*[a-zA-Z0-9]+': 'registerUser.password1'
    }
})
menu.state('registerUser.password1', {
    run: () => {
        let password1 = menu.val;
        menu.session.set('password1', password1)
            .then(() => {
                menu.con('Confirm your password')
            })

    },
    next: {
        '*[a-zA-Z0-9]+': 'registerUser.password2'
    }
})
menu.state('registerUser.password2', {
    run: () => {


    },
    next: {
        'input': function () {
            let password2 = menu.val;
            menu.session.get('password1')
                .then((password1: string) => {

                    if (password1 == password2) {
                        // show main menu
                        return 'mainMenu'
                    } else {
                        // menu.con('Password didn\'t match!')
                        return 'registerUser.password1'
                    }
                })
        }
    }
})

menu.state('verifyUser', {
    run: async () => {
        let password = menu.val

        // Validate user
        const existingUser = await User.findOne({
            $or: [{ phone: menu.args.phoneNumber }],
        }).select("password");
        if (!existingUser) {
            menu.end("Sorry, you don't have an account with us, you will shortly receive an sms with instructions on how to register.");
        } else {
            menu.con('3BOB Wallet Main Menu' +
                '\n1: Buy Crypto' +
                '\n2: Sell Crypto' +
                '\n3: Send Crypto' +
                '\n4: Receive Crypto' +
                '\n\n000: Log Out'
            )
        }
    },
    next: {
        '1': 'buyCrypto',
        '2': 'sellCrypto',
        '3': 'sendCrypto',
        '4': 'receiveCrypto',
        '000': 'logOut',
    },
    defaultNext: 'invalidOption'
})

menu.state('buyCrypto', {
    run: () => {
        menu.con('Select crypto to buy:' +
            '\n1: Bitcoin' +
            '\n2: Ethereum' +
            '\n3: Solana' +
            goBackOptions()
        )
    },
    next: {

        '1': 'buyCrypto.Bitcoin',
        '2': 'buyCrypto.Ethereum',
        '3': 'buyCrypto.Solana'
    },
    defaultNext: 'invalidOption'
})

menu.state('buyCrypto.Solana', {
    run: () => {
        menu.con('Enter amount:')
    },
    next: {
        // using regex to match user input to next state
        '*\\d+': 'buyCrypto.amount'
    }
})
menu.state('buyCrypto.amount', {
    run: async () => {
        let amount = Number(menu.val);

        // verify user's amount
        const user = (await User.findOne({phone: menu.args.phoneNumber})) as UserDoc

        const wallet = await Wallet.findOne({user!: user})

        if (amount<wallet?.amount_balance!) {
            //
        }
        else {
            menu.con('You have insufficient balance to complete this transaction. Please topup and try again.'+ 
            goBackOptions())
        }

    },
    next: {
    }
})


/**
 * Receive Crypto
 */
menu.state('receiveCrypto', {
    run: () => {
        menu.con('Select crypto to receive:' +
            '\n1: Bitcoin' +
            '\n2: Ethereum' +
            '\n3: Solana' +
            goBackOptions()
        )
    },
    next: {

        '1': 'receiveCrypto.Bitcoin',
        '2': 'receiveCrypto.Ethereum',
        '3': 'receiveCrypto.Solana'
    },
    defaultNext: 'invalidOption'
})

menu.state('receiveCrypto.Solana', {
    run: async () => {
        menu.con('Thank you will receive an sms shortly with an address that you can share to receive Solana from anyone.' +
            goBackOptions()
        )

        const user = await User.findOne({ phone: menu.args.phoneNumber })
        message = 'Share this address to receive Solana'
        message += `\nhttps://explorer.solana.com/address/${user!.solana?.address}`
        sendSMS([menu.args.phoneNumber], message)
    }
})


/**
 * Log Out
 */
menu.state('logOut', {
    run: () => {
        menu.end('You have successfully logged out. Thank you for using 3BOB today.')
    }
})


menu.state('invalidOption', {
    run: () => {
        menu.con('No such entry.' + goBackOptions())
    }
})

const goBackOptions = () => {
    return '\n---\n00: Main\n0: Back'
}

// Registering USSD handler with Express
router.post('/api/v1/ussd', function (req: { body: UssdMenu.UssdGatewayArgs }, res: { send: (arg0: any) => void }) {
    menu.run(req.body, (ussdResult: any) => {
        res.send(ussdResult);
    });
});


export { router as USSDRoutes }


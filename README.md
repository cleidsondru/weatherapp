# Welcome to Weather App 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

```bash

npm install

```

2. Make a copy of `.env.exemple` file and rename it to `.env`
3. Place your [open weather api key](https://api.openweathermap.org) in the `.env` file.
4. For tester email you can use any email.
5. For tester password hash you can create a by running this command:

```bash

npm run password

```

6. Your `.env`file should look like this:

```env

EXPO_PUBLIC_API_KEY=<YOUR_API_KEY>
EXPO_PUBLIC_TESTER_EMAIL=tester@test.com
EXPO_PUBLIC_TESTER_PASSWORD_HASH=`\$2a\$10\$......................4wumfGIRSQI3CMSscAE5x8EXDtkjkzu` //testingapp

```

7. Start the app

```bash

npm run [ios|android]

```

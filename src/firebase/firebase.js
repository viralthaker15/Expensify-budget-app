import * as firebase from "firebase";

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
	measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export { firebase, database as default };

// database
// 	.ref()
// 	.set({
// 		name: "viral thaker",
// 		age: 22,
// 		isSingle: true,
// 		location: {
// 			city: "vadodara",
// 			country: "India",
// 		},
// 	})
// 	.then(() => {
// 		console.log("data is saved");
// 	})
// 	.catch(e => {
// 		console.log("Error : ", e);
// 	});

// database.ref().update({
// 	name: "ProDoX",
// 	age: 22,
// 	job: "Software Developer",
// 	isSingle: null,
// });

import {
	google
} from 'googleapis';
import * as fs from 'fs/promises';
import rl from 'readline-promise';
const readline = rl.default;

const TOKEN_PATH = 'token.json';
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

let content = await fs.readFile('credentials.json');
let auth = await authorize(JSON.parse(content));

async function authorize(credentials) {
	const {
		client_secret,
		client_id,
		redirect_uris
	} = credentials.installed;
	const oAuth2Client = new google.auth.OAuth2(
		client_id, client_secret, redirect_uris[0]);
	// Check if we have previously stored a token.
	try {
		let token = await fs.readFile(TOKEN_PATH);
		oAuth2Client.setCredentials(JSON.parse(token));
		return oAuth2Client;
	} catch (err) {
		return await getAccessToken(oAuth2Client);
	}
}

async function getAccessToken(oAuth2Client) {
	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: SCOPES,
	});
	console.log('Authorize this app by visiting this url:', authUrl);
	const rlp = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
		terminal: true
	});
	const code = await rlp.questionAsync('Enter the code from that page here: ');
	rlp.close();
	const res = await oAuth2Client.getToken(code).catch(err => console.error('Error retrieving access token', err));
	oAuth2Client.setCredentials(res.tokens);
	await fs.writeFile(TOKEN_PATH, JSON.stringify(res.tokens));
	return oAuth2Client;
}

export default auth;
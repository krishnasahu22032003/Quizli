import "dotenv/config" ;

const ENV_SECRETS = {

NEXTAUTH_SECRET:process.env.AUTH_SECRET,
Google_clientId:process.env.GOOGLE_CLIENT_ID   ,
Google_clientSecret:process.env.GOOGLE_CLIENT_SECRET

};

export default ENV_SECRETS ;
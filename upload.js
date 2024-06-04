import dotenv from 'dotenv';
import express from 'express';
import { google } from 'googleapis';
import cron from 'node-cron';

dotenv.config();

const app = express();

// Credentials file containing service account details. Security reasons. File added to .gitignore list, not uploaded to git repository.
const CREDENTIALS_FILE = 'keys.json';

// Environment variables for spreadsheet and server configuration.
const { SPREADSHEET_ID, SHEET_NAME, PORT } = process.env;

// Example data to be uploaded to Google spreadsheets
const testData = [
  {
    Name: 'TestName1',
    LastName: 'TestLastName1',
    Age: '20',
    UserID: '114546767',
  },
  {
    Name: 'TestName2',
    LastName: 'TestLastName2',
    Age: '25',
    UserID: '224557678',
    Comment: 'New client',
  },
  {
    Name: 'TestName3',
    LastName: 'TestLastName3',
    Age: '28',
    UserID: '336787987',
  },
  {
    Name: 'TestName4',
    LastName: 'TestLastName4',
    Age: '19',
    UserID: '446567887',
  },
  {
    Name: 'TestName5',
    LastName: 'TestLastName5',
    Age: '43',
    UserID: '555686678',
  },
];

// Authorizes Google Sheets API using service account credentials.
const authorize = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_FILE,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const authClient = await auth.getClient();
  return authClient;
};

//Converts an array of objects into a 2D array
const extractValues = data => data.map(Object.values);

// Clears existing data in the specified sheet and uploads new data.
const clearAndUploadData = async auth => {
  const sheets = google.sheets({ version: 'v4', auth });
  const data = extractValues(testData);

  const resource = {
    values: data,
  };

  try {
    // Clear existing data in the specified sheet.
    await sheets.spreadsheets.values.clear({
      spreadsheetId: SPREADSHEET_ID,
      range: SHEET_NAME,
    });

    // Upload new data to the specified sheet.
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: SHEET_NAME,
      valueInputOption: 'RAW',
      resource,
    });
  } catch (error) {
    console.error('Error:', error);
  }
};

// Main function to authorize and update the sheet.
const main = async () => {
  const auth = await authorize();
  await clearAndUploadData(auth);
};

// Initial data upload and read.
main();

// Scheduler to run data updating process every 2 minutes
cron.schedule('*/2 * * * *', () => {
  main();
});

// Start the Express server.
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

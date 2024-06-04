# Data Uploader

A Node.js application to periodically upload data to a specified Google Sheet using Google Sheets API.

## Project Structure

```
data_uploader/
├── node_modules/
├── .env
├── .gitignore
├── keys.json
├── package-lock.json
├── package.json
├── README.md
└── upload.js
```

## Requirements

- Node.js installed.
- Google Service Account JSON key file (`preferably name it as -> keys.json`)
- Google Sheets API enabled

## Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/Zelchs/data_uploader.git
   cd data_uploader
   ```

2. **Install dependenies**:

   ```sh
   npm install
   ```

3. **Create a '.env' file int the root directory and add the following**:

   ```sh
    SPREADSHEET_ID=your_spreadsheet_id
    SHEET_NAME=your_sheet_name
    PORT=8000
   ```

4. **Download credentials file from service account, select JSON. Rename file to 'keys.json' and add file to the root directory. If file is named differently, add file name to .gitignore and change const CREDENTIALS_FILE value in upload.js to match your file name**:

## Usage

5. **Start the server**:

   ```sh
   npm start
   ```

This will:

- Perform an initial data upload to the specific Google Sheet.
- Schedule uploads every 2 minutes.

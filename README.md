# Project Lobster Technical assignement for a Full Stack developer

## Repository instructions

In order to do the assignement you will need at least:
- Node.js 14
- npm >= 6.0.0.

Once you have those installed in your machine, you need to follow these steps to boot the project:
1. [Fork this repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo) and make your fork private (so other applicants don't copy you!). You shouldn't make any pull request to this repo. This is just so that you can commit your changes to your fork, and then share it with us when you are done.
2. Download the code to your machine
3. Open a terminal inside the folder containing the code
4. Run `npm install` to install all dependencies
5. Create an `.env` file in your root folder and copy the contents of the file `.env.example`
6. Run `npm run dev` to process the front-end assets and start the development server. If everything worked well and you visit [localhost:3333](localhost:3333) on your browser: you should see a page with more instructions that starts with "It Works!"
7. Kill the process (or open another terminal, it's the same) and run `node ace repopulate:db` to start a SQLite database, and populate it with some fake order and items. If you don't do this: you might find some errors navigating through the page

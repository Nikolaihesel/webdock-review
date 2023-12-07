// function for sending emails and fetching posts using Postmark's API

const axios = require('axios');

const postmarkToken = 'c3d41965-18a4-479f-a591-4369b7f5952c';
const postmarkAPI = 'https://api.postmarkapp.com';

const sendEmail = async (recipient, subject, body) => {
  try {
    const response = await axios.post(
      `${postmarkAPI}/email`,
      {
        From: 'uclfeedback@webdock.io',
        To: recipient,
        Subject: subject,
        HtmlBody: body
      },
      {
        headers: {
          'X-Postmark-Server-Token': postmarkToken,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('Email sent:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

const fetchPostsFromClient = async (userId) => {
  try {
    // Your logic to fetch posts from the client or database
    // Return the relevant posts data here
    // For example:
    const response = await axios.get(`http://localhost:4000/api/posts/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

module.exports = {
  sendEmail,
  fetchPostsFromClient
};

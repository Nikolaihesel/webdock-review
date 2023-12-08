const postmarkToken = 'c3d41965-18a4-479f-a591-4369b7f5952c';
const postmarkAPI = 'https://api.postmarkapp.com/';

const sendEmail = async (recipient, subject, body) => {
  try {
    const response = await fetch(`${postmarkAPI}/email`, {
      method: 'POST',
      headers: {
        'X-Postmark-Server-Token': postmarkToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        From: 'uclfeedback@webdock.io',
        To: recipient,
        Subject: subject,
        HtmlBody: body
      })
    });

    const responseData = await response.json();
    console.log('Email sent:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

const fetchPostsFromClient = async (userId) => {
  try {
    const response = await fetch(`http://localhost:4000/api/posts/user/${userId}`);
    const responseData = await response.json();

    console.log('Fetched posts:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export {
  sendEmail,
  fetchPostsFromClient
};

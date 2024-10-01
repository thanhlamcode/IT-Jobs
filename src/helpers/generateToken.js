export const generateToken = () => {
  // Function to generate random string of specified length
  const generateRandomString = (length) => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  // Generate random number string (6 digits)
  const randomNumber = Math.floor(100000 + Math.random() * 900000).toString();

  // Generate random letter string (4 letters)
  const randomLetters = generateRandomString(4);

  // Combine random number and letter strings
  const token = randomNumber + randomLetters;

  return token;
};

export const getWishId = (userID, wishName, remainingWishes) => {
  const sortID = [userID, wishName, remainingWishes].sort()
  const roomID = sortID.join('-')
  return roomID;
}

export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}-${day}-${year}`;
};
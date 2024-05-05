export const formatDate = (created_at) => {
  const date = new Date(created_at);
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  return formattedDate;
};

export const formatDateAndTime = (created_at) => {
  const date = new Date(created_at);
  const formattedDate = `${
    ("0" + date.getHours()).slice(-2) +
    ":" +
    ("0" + date.getMinutes()).slice(-2)
  } · ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  return formattedDate;
};

const COMMENTS = [
  {
    author: "miles acosta",
    date: "12/20/2020",
    message:
      "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
  },

  {
    author: "emilie beach",
    date: "01/09/2021",
    message:
      "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
  },

  {
    author: "connor walton",
    date: "02/17/2021",
    message:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it contains.",
  },
];

const commentsSection = document.querySelector(".conversation-comments");
const currentComments = loadComments();
currentComments.forEach(displayComment);

const form = document.querySelector(".conversation-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const authorNameElement = form.elements.name;
  const authorMessageElement = form.elements.message;

  if (authorNameElement.value === "" || authorMessageElement.value === "") {
    authorNameElement.classList.add("invalid-form");
    authorMessageElement.classList.add("invalid-form");
    setTimeout(removeInvalidFormClass, 300, authorNameElement);
    setTimeout(removeInvalidFormClass, 300, authorMessageElement);
    return;
  }

  const date = getFormattedDate(new Date());
  const new_comment = {
    author: authorNameElement.value,
    date,
    message: authorMessageElement.value,
  };

  currentComments.push(new_comment);
  saveComments(currentComments);
  displayComment(new_comment);

  authorNameElement.value = "";
  authorMessageElement.value = "";
});

function removeInvalidFormClass(element) {
  element.classList.remove("invalid-form");
}

function saveComments(data) {
  localStorage.setItem("comments", JSON.stringify(data));
}

function loadComments() {
  return JSON.parse(localStorage.getItem("comments")) || COMMENTS;
}

function getFormattedDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1; // 0 index based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function getMonth(date) {
  return date.getMonth() + 1;
}

function createComment_article() {
  const article = document.createElement("article");
  article.classList.add("conversation-comments-comment");
  return article;
}

function createCommentInnerContainer_div() {
  const div = document.createElement("div");
  div.classList.add("flex-row-container--space-between");
  return div;
}

function createCommentAuthorPicture_div() {
  const div = document.createElement("div");
  div.classList.add("conversation-comments-comment__user-pic");
  return div;
}

function createCommentAuthor_h2(author) {
  const h2 = document.createElement("h2");
  h2.classList.add("conversation-comments-comment__user-name");
  h2.innerText = author;
  return h2;
}

function createCommentDate_p(date) {
  const p = document.createElement("p");
  p.classList.add("conversation-comments-comment__date");
  p.innerText = date;
  return p;
}

function createCommentMessage_p(message) {
  const p = document.createElement("p");
  p.classList.add("conversation-comments-comment__message");
  p.innerText = message;
  return p;
}

function displayComment(comment) {
  const new_comment = createComment_article();

  const comment_inner_container = createCommentInnerContainer_div();
  const comment_author_picture = createCommentAuthorPicture_div();
  const comment_author_name = createCommentAuthor_h2(comment.author);
  const comment_date = createCommentDate_p(comment.date);

  comment_inner_container.append(
    comment_author_picture,
    comment_author_name,
    comment_date
  );

  const comment_message = createCommentMessage_p(comment.message);

  new_comment.append(comment_inner_container, comment_message);
  commentsSection.prepend(new_comment);
}

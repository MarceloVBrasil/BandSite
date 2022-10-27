const commentsSection = document.querySelector(".conversation-comments");
const GLOBAL_VARIABLES = {
  apiKey: "",
  BASE_URL: "https://project-1-api.herokuapp.com",
};

GLOBAL_VARIABLES.apiKey = await getApiKey();
let currentComments = await loadComments();
currentComments.sort(sortByDate);
currentComments.forEach(displayComment);

const form = document.querySelector(".conversation-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = {
    name: form.elements.name,
    comment: form.elements.message,
  };

  if (formData.name.value === "" || formData.comment.value === "") {
    formData.name.classList.add("invalid-form");
    formData.comment.classList.add("invalid-form");
    setTimeout(removeInvalidFormClass, 300, formData.name);
    setTimeout(removeInvalidFormClass, 300, formData.comment);
    return;
  }

  const promise = postComment({
    name: formData.name.value,
    comment: formData.comment.value,
  });
  promise
    .then((data) => {
      const newComment = {
        id: data.id,
        author: data.name,
        message: data.comment,
        likes: 0,
        date: data.timestamp,
      };

      currentComments.push(newComment);
      clearCommentsSection();
      currentComments.sort(sortByDate);
      currentComments.forEach(displayComment);
    })
    .catch((error) => console.log(error));

  formData.name.value = "";
  formData.comment.value = "";
});

function sortByDate(commentA, commentB) {
  return commentA.date - commentB.date;
}

async function postComment(comment) {
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await axios.post(
    `${GLOBAL_VARIABLES.BASE_URL}/comments?api_key=${GLOBAL_VARIABLES.apiKey}`,
    comment,
    {
      headers,
    }
  );
  return response.data;
}

async function getApiKey() {
  const response = await axios.get(`${GLOBAL_VARIABLES.BASE_URL}/register`);
  return response.data;
}

async function getAllCommentsFromApi() {
  const response = await axios.get(
    `${GLOBAL_VARIABLES.BASE_URL}/comments?api_key=${GLOBAL_VARIABLES.apiKey}`
  );
  const comments = response.data;
  const COMMENTS = [];

  comments.forEach((comment) => {
    const newComment = {
      id: comment.id,
      author: comment.name,
      message: comment.comment,
      likes: comment.likes,
      date: comment.timestamp,
      liked: comment.likes % 2 === 1,
    };
    COMMENTS.push(newComment);
  });

  return COMMENTS;
}

async function deleteComment(e) {
  const comment = e.target;
  await axios.delete(
    `${GLOBAL_VARIABLES.BASE_URL}/comments/${comment.dataset.id}?api_key=${GLOBAL_VARIABLES.apiKey}`
  );
  currentComments = currentComments.filter((c) => c.id !== comment.dataset.id);
  clearCommentsSection();
  currentComments.forEach(displayComment);
}

async function likeComment(e) {
  const likeButton = e.target;
  const likeCounter = likeButton.nextElementSibling;
  const comment = currentComments.find((c) => c.id === likeButton.dataset.id);

  const response = await axios.put(
    `${GLOBAL_VARIABLES.BASE_URL}/comments/${comment.id}/like?api_key=${GLOBAL_VARIABLES.apiKey}`
  );

  likeButton.classList.toggle(
    "conversation-comments-comment__like-button--liked"
  );
  comment.liked = !comment.liked;
  likeCounter.innerText = response.data.likes;
}

function clearCommentsSection() {
  commentsSection.innerHTML = "";
}

function removeInvalidFormClass(element) {
  element.classList.remove("invalid-form");
}

function saveComments(data) {
  localStorage.setItem("comments", JSON.stringify(data));
}

async function loadComments() {
  return await getAllCommentsFromApi();
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

function createCommentDeleteButton_span(comment) {
  const span = document.createElement("span");
  span.classList.add(
    "conversation-comments-comment__delete-button",
    "material-symbols-outlined"
  );
  span.innerText = "close";
  span.addEventListener("click", deleteComment);
  span.dataset.id = comment.id;
  return span;
}

function createCommentLikeButton_span(comment) {
  const span = document.createElement("span");
  span.classList.add(
    "conversation-comments-comment__like-button",
    "material-symbols-outlined"
  );
  if (comment.liked)
    span.classList.add("conversation-comments-comment__like-button--liked");
  span.innerText = "thumb_up";
  span.addEventListener("click", likeComment, { once: true });
  span.dataset.id = comment.id;
  return span;
}

function createCommentLikeCounter__p(comment) {
  const p = document.createElement("p");
  p.classList.add("conversation-comments-comment__like-counter");
  p.innerText = comment.likes;
  return p;
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
  p.innerText = getFormattedDate(new Date(date));
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
  const deleteButton = createCommentDeleteButton_span(comment);
  const likeButton = createCommentLikeButton_span(comment);
  const likeCounter = createCommentLikeCounter__p(comment);

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

  new_comment.append(
    deleteButton,
    likeButton,
    likeCounter,
    comment_inner_container,
    comment_message
  );
  commentsSection.prepend(new_comment);
}

const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const usersList = document.getElementById("users");
const privateChatForm = document.getElementById("private-chat-form");

const { username } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// Serverdan kelgan xabarni chiqarish
socket.on("message", (message) => {
  outMessage(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Foydalanuvchilar ro'yxatini yangilash
socket.on("usersList", (users) => {
  updateUsersList(users, username);
});

// Foydalanuvchini qo'shilishi
socket.emit("join", { username });

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;

  // Xabarni serverga jo'natish
  socket.emit("chatMessage", msg);

  // Inputni tozalash
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

// Xabarlarni ekranga chiqarish
function outMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `
    <p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">${message.text}</p>
  `;
  document.querySelector(".chat-messages").appendChild(div);
}

// Foydalanuvchilar ro'yxatini yangilash va o'zini yashirish
function updateUsersList(users, currentUser) {
  usersList.innerHTML = "";

  // O'zini ro'yxatdan olib tashlash
  const filteredUsers = users.filter((user) => user.username !== currentUser);

  if (filteredUsers.length > 0) {
    filteredUsers.forEach((user) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.classList.add("btn-style");

      // Private chatga o'tkazish uchun link
      a.textContent = user.username;

      // li elementiga "a" tegini qo'shish
      li.appendChild(a);
      usersList.appendChild(li);
    });
  } else {
    // Foydalanuvchi faqat o'zi bo'lsa
    const li = document.createElement("li");
    li.innerHTML = `<span style="color: #7ed; font-size: 18px; font-weight: bold;">Only you Online</span>`;
    usersList.appendChild(li);
  }
}

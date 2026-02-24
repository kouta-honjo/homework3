// ===== モバイルナビ トグル =====
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");

  toggle.addEventListener("click", function () {
    navLinks.classList.toggle("open");
  });

  // ナビリンク押下時にメニューを閉じる
  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
    });
  });

  // ===== 文字数カウント =====
  var titleInput = document.getElementById("post-title");
  var categoryInput = document.getElementById("post-category");
  var bodyInput = document.getElementById("post-body");
  var titleCount = document.getElementById("title-count");
  var categoryCount = document.getElementById("category-count");
  var bodyCount = document.getElementById("body-count");

  titleInput.addEventListener("input", function () {
    titleCount.textContent = titleInput.value.length;
  });

  categoryInput.addEventListener("input", function () {
    categoryCount.textContent = categoryInput.value.length;
  });

  bodyInput.addEventListener("input", function () {
    bodyCount.textContent = bodyInput.value.length;
  });

  // ===== 投稿フォーム =====
  var form = document.getElementById("post-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var title = titleInput.value.trim();
    var category = categoryInput.value.trim();
    var body = bodyInput.value.trim();

    if (!title || !body) {
      return;
    }

    var post = {
      title: title,
      category: category,
      body: body,
      date: new Date().toISOString(),
    };

    var posts = loadPosts();
    posts.unshift(post);
    savePosts(posts);

    // フォームリセット
    form.reset();
    titleCount.textContent = "0";
    categoryCount.textContent = "0";
    bodyCount.textContent = "0";

    renderPosts();
  });

  // 初期表示
  renderPosts();
});

// ===== localStorage 操作 =====
var STORAGE_KEY = "portfolio_posts";

function loadPosts() {
  try {
    var data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function savePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

// ===== 投稿一覧の描画 =====
function renderPosts() {
  var container = document.getElementById("post-list");
  var posts = loadPosts();

  if (posts.length === 0) {
    container.innerHTML = '<div class="post-empty"><p>まだ投稿がありません。</p></div>';
    return;
  }

  var html = "";
  posts.forEach(function (post) {
    var dateStr = formatDate(post.date);
    var categoryTag = post.category
      ? '<span class="post-item-category">' + escapeHtml(post.category) + "</span>"
      : "";

    html +=
      '<div class="post-item">' +
      '<div class="post-item-header">' +
      "<h4>" + escapeHtml(post.title) + "</h4>" +
      categoryTag +
      '<span class="post-item-date">' + dateStr + "</span>" +
      "</div>" +
      '<p class="post-item-body">' + escapeHtml(post.body) + "</p>" +
      "</div>";
  });

  container.innerHTML = html;
}

// ===== ユーティリティ =====
function escapeHtml(str) {
  var div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function formatDate(isoString) {
  var d = new Date(isoString);
  var year = d.getFullYear();
  var month = ("0" + (d.getMonth() + 1)).slice(-2);
  var day = ("0" + d.getDate()).slice(-2);
  var hours = ("0" + d.getHours()).slice(-2);
  var minutes = ("0" + d.getMinutes()).slice(-2);
  return year + "/" + month + "/" + day + " " + hours + ":" + minutes;
}

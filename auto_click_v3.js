(function () {
  // 🚀 Restore lại console.log (Gate có hook để chặn log)
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  console.log = iframe.contentWindow.console.log.bind(window.console);
  console.info = iframe.contentWindow.console.info.bind(window.console);
  console.error = iframe.contentWindow.console.error.bind(window.console);
  console.warn = iframe.contentWindow.console.warn.bind(window.console);

  console.log("✅ Console restored, script starting...");

  // 🚀 Hàm auto click claim
  function clickClaimButton() {
    const btn = [...document.querySelectorAll("button")]
      .find(b => b.innerText.trim() === "Claim Now");

    if (btn) {
      btn.click();
      console.log("🎉 Đã click nút Claim Now!");
      clearInterval(loopId); // ngừng loop sau khi claim thành công
    } else {
      console.log("⏳ Chưa thấy nút Claim Now...");
    }
  }

  // 🚀 Interval check mỗi 50ms (nhanh hơn bot khác)
  const loopId = setInterval(clickClaimButton, 50);
})();

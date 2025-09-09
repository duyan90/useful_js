(function autoClaim() {
  // 🎯 Giờ claim (24h format)
  const targetHour = 20;   // 20h
  const targetMinute = 0;  // 00 phút
  const targetSecond = 0;  // 00 giây

  // 🕒 Trước giờ claim bao nhiêu phút sẽ bắt đầu quan sát
  const preStartMinutes = 2;

  function startObserver() {
    console.log("⏳ Quan sát DOM chờ nút Claim Now...");

    const observer = new MutationObserver(() => {
      const btn = document.querySelector(
        "button.mantine-Button-root.mantine-UnstyledButton-root"
      );
      if (btn && !btn.disabled && btn.innerText.trim() === "Claim Now") {
        console.log("✅ Claim Now xuất hiện! Auto clicking...");
        for (let i = 0; i < 50; i++) btn.click();
        observer.disconnect();
        console.log("🎯 Done!");
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  function scheduleObserver() {
    const now = new Date();
    const target = new Date();
    target.setHours(targetHour, targetMinute, targetSecond, 0);

    // Nếu target đã qua hôm nay → đẩy sang ngày mai
    if (target.getTime() <= now.getTime()) {
      target.setDate(target.getDate() + 1);
    }

    const preStartTime = new Date(target.getTime() - preStartMinutes * 60000);
    const delay = preStartTime.getTime() - now.getTime();

    console.log(
      `⌛ Observer sẽ chạy lúc: ${preStartTime.toLocaleTimeString()}`
    );
    console.log(
      `🎯 Giờ claim chính xác: ${target.toLocaleTimeString()}`
    );

    setTimeout(startObserver, delay);
  }

  scheduleObserver();
})();

// ⚡ Auto claim script with scheduled start time
function scheduleClaim(targetHour, targetMinute, targetSecond) {
  // Tính timestamp mục tiêu hôm nay
  const now = new Date();
  const target = new Date();
  target.setHours(targetHour, targetMinute, targetSecond, 0);

  // Nếu giờ đã qua thì tự động +1 ngày
  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 1);
  }

  const startTime = target.getTime() - 2 * 60 * 1000; // bắt đầu trước 2 phút
  console.log(`⏳ Claim script sẽ khởi động lúc: ${new Date(startTime).toLocaleTimeString()}`);

  // Polling tới khi đến giờ bắt đầu
  const waitInterval = setInterval(() => {
    if (Date.now() >= startTime) {
      clearInterval(waitInterval);
      console.log("🚀 Bắt đầu loop check claim button...");

      const interval = setInterval(() => {
        const button = document.querySelector(
          "button.mantine-Button-root.mantine-UnstyledButton-root"
        );

        if (button && !button.disabled && button.innerText.trim() === "Claim") {
          console.log("✅ Claim button found! Clicking...");

          // spam nhiều click
          for (let i = 0; i < 50; i++) {
            button.click();
          }

          clearInterval(interval);
          console.log("🎯 Done!");
        }
      }, 5); // check mỗi 5ms
    }
  }, 500); // check mỗi 0.5s để xem đã tới giờ chưa
}

// 👉 Ví dụ: đặt claim lúc 20:00:00
scheduleClaim(20, 0, 0);

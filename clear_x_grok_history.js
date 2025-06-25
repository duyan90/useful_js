function realClick(el) {
  const evt = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window
  });
  el.dispatchEvent(evt);
}

async function clickAllTasksAndDelete() {
  const tasks = document.querySelectorAll('.css-175oi2r.r-18u37iz.r-1h0z5md');

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    // ✅ Tìm button thật sự bên trong task
    const btn = task.querySelector('button[role="button"]');
    if (!btn) {
      console.warn(`⚠️ Không tìm thấy nút trong task ${i + 1}`);
      continue;
    }

    // Scroll và click vào button
    btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
    realClick(btn);
    console.log(`✅ Đã click nút trong task ${i + 1}`);

    // ⏳ Chờ 1 giây để menu Delete hiện ra
    await new Promise(resolve => setTimeout(resolve, 1000));

    // ✅ Tìm nút Delete (dựa vào text "Delete")
    const deleteBtn = Array.from(
      document.querySelectorAll('.css-175oi2r.r-16y2uox.r-1wbh5a2 span')
    ).find(el => el.textContent.trim().toLowerCase() === 'delete');

    if (deleteBtn) {
      deleteBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      realClick(deleteBtn);
      console.log(`🗑️ Đã click Delete sau task ${i + 1}`);
    } else {
      console.warn(`❌ Không tìm thấy nút Delete sau task ${i + 1}`);
    }

    // Chờ thêm 1 giây giữa mỗi task (tránh spam)
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('🎉 Hoàn tất xử lý toàn bộ task!');
}

clickAllTasksAndDelete();

const pages = {
  dashboard: `
      <div class="topbar">
          <h1>Dashboard</h1>
          <button style="padding: 10px 20px; background:#1e1e2f; color:white; border:none; border-radius:8px;">+ Add Entry</button>
      </div>
      <div class="cards">
          <div class="card"><h3>Total Balance</h3><p>$5,240</p></div>
          <div class="card"><h3>Income</h3><p>$2,300</p></div>
          <div class="card"><h3>Expenses</h3><p>$1,050</p></div>
      </div>
      <div class="chart"><canvas id="balanceChart"></canvas></div>
      <div class="ai-tips"><h3>AI Insights</h3><p id="ai-tip">Loading smart tip...</p></div>
  `,
  transactions: `
      <div class="topbar"><h1>Transactions</h1></div>
      <div class="table">
          <table>
              <tr><th>Date</th><th>Description</th><th>Amount</th></tr>
              <tr><td>2025-08-01</td><td>Groceries</td><td>-$50</td></tr>
              <tr><td>2025-08-03</td><td>Salary</td><td>+$500</td></tr>
              <tr><td>2025-08-05</td><td>Electricity Bill</td><td>-$75</td></tr>
          </table>
      </div>
  `,
  analytics: `
      <div class="topbar"><h1>Analytics</h1></div>
      <div class="chart"><canvas id="spendingChart"></canvas></div>
  `,
  settings: `
      <div class="topbar"><h1>Settings</h1></div>
      <div class="settings">
          <p><strong>Theme:</strong> Light/Dark (coming soon)</p>
          <p><strong>Profile:</strong> Edit Name, Email</p>
      </div>
  `
};

function showPage(page, e) {
  document.getElementById('main-content').classList.remove('show');
  setTimeout(() => {
      document.getElementById('page-content').innerHTML = pages[page];
      document.querySelectorAll('.sidebar a').forEach(link => link.classList.remove('active'));
      e.target.classList.add('active');
      document.getElementById('main-content').classList.add('show');

      if (page === 'dashboard') loadDashboardCharts();
      if (page === 'analytics') loadAnalyticsCharts();
      if (page === 'dashboard') loadAITip();
  }, 200);
}

function loadDashboardCharts() {
  new Chart(document.getElementById('balanceChart'), {
      type: 'line',
      data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
          datasets: [{
              label: 'Balance Trend',
              data: [5000, 5200, 5100, 5300, 5240],
              borderColor: '#1e1e2f',
              fill: false
          }]
      }
  });
}

function loadAnalyticsCharts() {
  new Chart(document.getElementById('spendingChart'), {
      type: 'doughnut',
      data: {
          labels: ['Food', 'Bills', 'Shopping', 'Transport'],
          datasets: [{
              data: [300, 150, 200, 100],
              backgroundColor: ['#4cafef', '#f44336', '#ff9800', '#8bc34a']
          }]
      }
  });
}

function loadAITip() {
  const tips = [
      "You're spending more on food this week — consider cooking at home to save money.",
      "Your shopping expenses are low — great job keeping it in check!",
      "Bills took 20% of your income this month — aim for under 15% if possible.",
      "Transport costs dropped — keep using budget-friendly travel!"
  ];
  document.getElementById('ai-tip').textContent = tips[Math.floor(Math.random() * tips.length)];
}

// Load default
showPage('dashboard', {target: document.querySelector('.sidebar a')});

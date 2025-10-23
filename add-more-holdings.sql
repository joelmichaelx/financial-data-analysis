-- Add more portfolio holdings to make it more realistic
-- Run this in your Supabase SQL Editor

-- Add more holdings to the existing portfolio
INSERT INTO holdings (portfolio_id, symbol, name, shares, current_price, total_value, change_percent) VALUES
(1, 'TSLA', 'Tesla Inc.', 75, 200.00, 15000.00, 2.56),
(1, 'AMZN', 'Amazon.com Inc.', 30, 3200.00, 96000.00, -0.85),
(1, 'NVDA', 'NVIDIA Corporation', 40, 450.00, 18000.00, 3.25),
(1, 'META', 'Meta Platforms Inc.', 60, 300.00, 18000.00, 1.45),
(1, 'NFLX', 'Netflix Inc.', 25, 400.00, 10000.00, -1.20),
(1, 'ADBE', 'Adobe Inc.', 35, 500.00, 17500.00, 0.75),
(1, 'CRM', 'Salesforce Inc.', 45, 200.00, 9000.00, -0.50),
(1, 'ORCL', 'Oracle Corporation', 80, 100.00, 8000.00, 0.25),
(1, 'INTC', 'Intel Corporation', 100, 35.00, 3500.00, -2.10),
(1, 'AMD', 'Advanced Micro Devices', 50, 120.00, 6000.00, 1.80),
(1, 'PYPL', 'PayPal Holdings Inc.', 40, 60.00, 2400.00, -1.50),
(1, 'UBER', 'Uber Technologies Inc.', 60, 45.00, 2700.00, 0.90),
(1, 'SPOT', 'Spotify Technology S.A.', 30, 150.00, 4500.00, -0.75),
(1, 'SQ', 'Block Inc.', 25, 80.00, 2000.00, 2.15),
(1, 'ZM', 'Zoom Video Communications', 20, 70.00, 1400.00, -3.20);

-- Update the portfolio total value to reflect all holdings
UPDATE portfolio 
SET total_value = (
  SELECT SUM(total_value) 
  FROM holdings 
  WHERE portfolio_id = 1
)
WHERE id = 1;


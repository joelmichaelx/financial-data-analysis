-- Simple script to add more holdings
-- Run this in Supabase SQL Editor

INSERT INTO holdings (portfolio_id, symbol, name, shares, current_price, total_value, change_percent) VALUES
(1, 'TSLA', 'Tesla Inc.', 75, 200.00, 15000.00, 2.56),
(1, 'AMZN', 'Amazon.com Inc.', 30, 3200.00, 96000.00, -0.85),
(1, 'NVDA', 'NVIDIA Corporation', 40, 450.00, 18000.00, 3.25),
(1, 'META', 'Meta Platforms Inc.', 60, 300.00, 18000.00, 1.45),
(1, 'NFLX', 'Netflix Inc.', 25, 400.00, 10000.00, -1.20);


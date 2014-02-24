DELIMITER $$
DROP PROCEDURE IF EXISTS generate_chart_quotes_at_intervals;
CREATE PROCEDURE generate_chart_quotes_at_intervals(
  param_security_id INTEGER,
  param_date DATE,
  param_interval INTEGER
)
BEGIN

  SET @i = 0;

  INSERT INTO chart_quotes
      (security_id, last_price, bid_price, ask_price, created_at, trade_volume)
    SELECT
      security_id, last_price, bid_price, ask_price, created_at, trade_volume
    FROM
      (SELECT
         @i := @i + 1 AS i,
         quotes.*
       FROM
         quotes
       WHERE
         security_id = param_security_id AND
         `date` = param_date) AS quotes_with_indexes
    WHERE
      security_id = param_security_id AND
      `date` = param_date AND
      MOD(quotes_with_indexes.i, param_interval) = 0
    ORDER BY
      created_at;

END$$

DELIMITER ;
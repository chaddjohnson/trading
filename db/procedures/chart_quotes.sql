DELIMITER $$
DROP PROCEDURE IF EXISTS chart_quotes;
CREATE PROCEDURE chart_quotes(
  param_security_id INTEGER,
  param_date DATE
)
BEGIN

  DECLARE quote_date DATE;
  DECLARE done INTEGER DEFAULT 0;
  DECLARE quote_count INTEGER;
  DECLARE current_interval INTEGER;
  DECLARE date_index INTEGER DEFAULT 0;

  DECLARE quote_dates_cursor CURSOR FOR
    SELECT DISTINCT `date` FROM quotes WHERE security_id = param_security_id AND `date` < param_date ORDER BY `date` DESC;

  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = true;

  -- Create a temp table to house the quotes.
  DROP TEMPORARY TABLE IF EXISTS temp_quotes;

  CREATE TEMPORARY TABLE temp_quotes(
    id INTEGER NOT NULL AUTO_INCREMENT,
    security_id INTEGER NOT NULL,
    last_price DECIMAL(10,4) NOT NULL,
    bid_price DECIMAL(10,4) NOT NULL,
    ask_price DECIMAL(10,4) NOT NULL,
    created_at DATETIME NOT NULL,
    trade_volume INTEGER NOT NULL,
    PRIMARY KEY (id)
  ) ENGINE=Memory;

  OPEN quote_dates_cursor;
  REPEAT
    FETCH quote_dates_cursor INTO quote_date;

    IF NOT done THEN
      IF quote_date IS NOT NULL THEN
        SET date_index = date_index + 1;

        -- Get a count of quotes for the security on the date.
        SELECT COUNT(*) FROM quotes WHERE security_id = param_security_id AND `date` = quote_date INTO quote_count;

        -- Determine the interval at which to retrieve quotes based on the date index.
        SELECT CASE
          WHEN date_index = 1             THEN 1
          WHEN date_index = 2             THEN FLOOR(quote_count / 1500)
          WHEN date_index BETWEEN 3 AND 5 THEN FLOOR(quote_count / 100)
          WHEN date_index > 5             THEN FLOOR(quote_count / 15)
        END
        INTO current_interval;

        -- Add quotes to the temp table.
        CALL chart_quotes_at_intervals(param_security_id, quote_date, current_interval);
      END IF;

    END IF;
  UNTIL done END REPEAT;
  CLOSE quote_dates_cursor;

  -- Return results of the temporary table.
  SELECT * FROM temp_quotes ORDER BY created_at;

END$$

DELIMITER ;
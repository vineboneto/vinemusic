CREATE OR REPLACE FUNCTION get_practice_summary(p_start_date TIMESTAMP, p_end_date TIMESTAMP)
RETURNS TABLE (
    month TIMESTAMPTZ,
    year TIMESTAMPTZ,
    minutes BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        date_trunc('month'::text, practice_records.end_date) AS month,
        date_trunc('year'::text, practice_records.end_date) AS year,
        SUM(practice_records.minutes)::BIGINT AS minutes  -- Converte para BIGINT
    FROM practice_records
    WHERE practice_records.end_date IS NOT NULL
        AND practice_records.user_id = requesting_user_id()  -- Assuming it returns text
        AND practice_records.end_date >= p_start_date    -- Filtro de data inicial
        AND practice_records.end_date <= p_end_date      -- Filtro de data final
    GROUP BY 
        date_trunc('month'::text, practice_records.end_date),
        date_trunc('year'::text, practice_records.end_date)
    ORDER BY 
        date_trunc('year'::text, practice_records.end_date) ASC,
        date_trunc('month'::text, practice_records.end_date) ASC;
END;
$$ LANGUAGE plpgsql;